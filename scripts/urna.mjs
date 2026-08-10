/* Confere a urna de ponta a ponta: digita 500, confirma, e fotografa os três
   estados (vazio, número certo, voto registrado) e também o número errado.

   Uso: node scripts/urna.mjs [pasta-de-saida] */

import puppeteer from 'puppeteer-core'
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'

const SAIDA = process.argv[2] ?? 'shots'
const URL = process.env.URL_ALVO ?? 'http://localhost:5177'
const CHROME = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const LARGURA = Number(process.env.L ?? 1440)
const ALTURA = Number(process.env.A ?? 900)

mkdirSync(SAIDA, { recursive: true })

const navegador = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--hide-scrollbars', '--disable-gpu', '--force-color-profile=srgb'],
})

const espera = (ms) => new Promise((r) => setTimeout(r, ms))
const pagina = await navegador.newPage()
await pagina.setViewport({ width: LARGURA, height: ALTURA, deviceScaleFactor: 1 })
await pagina.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])

const erros = []
pagina.on('pageerror', (e) => erros.push(String(e)))
pagina.on('console', (m) => m.type() === 'error' && erros.push(m.text()))

await pagina.goto(URL, { waitUntil: 'networkidle0' })
await pagina.evaluate(() => document.fonts.ready)
await pagina.evaluate(() => document.getElementById('urna').scrollIntoView())
await espera(700)

const marca = process.env.PREFIXO ?? 'urna'

async function apertar(rotulo) {
  await pagina.evaluate((r) => {
    const alvo = [...document.querySelectorAll('.tecla')].find(
      (b) => b.textContent.trim().toLowerCase().startsWith(r.toLowerCase()),
    )
    alvo?.click()
  }, rotulo)
  await espera(160)
}

await pagina.screenshot({ path: join(SAIDA, `${marca}-0-vazia.png`) })

for (const d of ['5', '0', '0']) await apertar(d)
await espera(300)
await pagina.screenshot({ path: join(SAIDA, `${marca}-1-numero.png`) })

await apertar('confirma')
await espera(700)
await pagina.screenshot({ path: join(SAIDA, `${marca}-2-confirmado.png`) })

await apertar('ensaiar')
await espera(300)
for (const d of ['1', '2', '3']) await apertar(d)
await espera(300)
await pagina.screenshot({ path: join(SAIDA, `${marca}-3-errado.png`) })

console.log(
  JSON.stringify(
    {
      erros,
      estados: await pagina.evaluate(() => ({
        telaConfirmada: document.querySelector('.urna__tela')?.dataset.confirmado,
        leitura: document.querySelector('.urna__leitura')?.textContent,
      })),
    },
    null,
    2,
  ),
)

await navegador.close()
