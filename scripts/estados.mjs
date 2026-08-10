/* Fotografa os estados que só existem depois de um clique: bandeira aberta,
   lupa da peça, menu do celular. */
import puppeteer from 'puppeteer-core'
import { join } from 'node:path'

const SAIDA = process.argv[2] ?? 'shots'
const URL = 'http://localhost:5177'
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const espera = (ms) => new Promise((r) => setTimeout(r, ms))

const navegador = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--hide-scrollbars', '--disable-gpu', '--force-color-profile=srgb'],
})

async function abrir(l, a) {
  const p = await navegador.newPage()
  await p.setViewport({ width: l, height: a })
  await p.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
  await p.goto(URL, { waitUntil: 'networkidle0' })
  await p.evaluate(() => document.fonts.ready)
  await espera(800)
  return p
}

// 1. Bandeira aberta, desktop
let p = await abrir(1440, 900)
await p.evaluate(() => {
  document.getElementById('bandeiras').scrollIntoView()
  document.querySelector('.bandeira__topo').click()
})
await espera(500)
await p.screenshot({ path: join(SAIDA, 'estado-bandeira-aberta.png') })

// 2. Lupa da peça
await p.evaluate(() => {
  document.getElementById('pecas').scrollIntoView()
  document.querySelector('.pecas__botao').click()
})
await espera(600)
await p.screenshot({ path: join(SAIDA, 'estado-lupa.png') })
await p.close()

// 3. Menu do celular
p = await abrir(390, 844)
await p.evaluate(() => window.scrollTo(0, 2000))
await espera(500)
await p.evaluate(() => document.querySelector('.nav__botao').click())
await espera(600)
await p.screenshot({ path: join(SAIDA, 'estado-menu.png') })

// 4. Bandeira aberta no celular
await p.evaluate(() => document.querySelector('.nav__botao').click())
await espera(300)
await p.evaluate(() => {
  document.getElementById('bandeiras').scrollIntoView()
  document.querySelector('.bandeira__topo').click()
})
await espera(500)
await p.screenshot({ path: join(SAIDA, 'estado-bandeira-celular.png') })
await p.close()

console.log('ok')
await navegador.close()
