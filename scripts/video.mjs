/* ============================================================================
   VÍDEO DA CAMPANHA
   ----------------------------------------------------------------------------
   O arquivo que a campanha entregou é um master: QuickTime, HEVC 10 bits, áudio
   PCM, 1920x1080, 80 MB. Isso não vai para a web — HEVC não toca no Chrome nem
   no Firefox, e 80 MB num hero de celular é inaceitável.

   Este script converte o master em dois arquivos H.264/AAC (1080p e 720p) mais
   um pôster, e é o único lugar onde essa conversão existe. Se a campanha mandar
   um corte novo, troque o .mov na pasta Documentos e rode de novo:

       node scripts/video.mjs

   Os arquivos gerados ficam em public/assets/video/ e são versionados, porque
   o master de 80 MB não entra no repositório.
   ========================================================================== */

import { execFileSync } from 'node:child_process'
import { mkdirSync, readdirSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'
import ffmpeg from 'ffmpeg-static'

const RAIZ = resolve(import.meta.dirname, '..')
const SAIDA = join(RAIZ, 'public', 'assets', 'video')

/* O master pode estar em qualquer subpasta de Documentos, com acento no nome. */
function acharMaster(dir) {
  for (const item of readdirSync(dir, { withFileTypes: true })) {
    const caminho = join(dir, item.name)
    if (item.isDirectory()) {
      const achado = acharMaster(caminho)
      if (achado) return achado
    } else if (/\.(mov|mp4|m4v)$/i.test(item.name) && /HORIZONTAL/i.test(item.name)) {
      return caminho
    }
  }
  return null
}

const master = acharMaster(join(RAIZ, 'Documentos'))
if (!master) {
  console.error('Master não encontrado em Documentos/. Nada a fazer.')
  process.exit(1)
}

mkdirSync(SAIDA, { recursive: true })

const rodar = (args) => execFileSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', ...args])

/* `-map 0:v:0` é obrigatório: o master traz uma capa MJPEG como segunda trilha
   de vídeo, e sem isso o ffmpeg escolhe a capa em vez do filme.
   `+faststart` põe o índice no começo do arquivo, senão o navegador só começa a
   tocar depois de baixar tudo. */
const perfil = (largura, crf, audio) => [
  '-map',
  '0:v:0',
  '-map',
  '0:a:0',
  '-vf',
  `scale=${largura}:-2:flags=lanczos,format=yuv420p`,
  '-c:v',
  'libx264',
  '-preset',
  'slow',
  '-crf',
  String(crf),
  '-profile:v',
  'high',
  '-level',
  '4.0',
  '-movflags',
  '+faststart',
  '-c:a',
  'aac',
  '-b:a',
  audio,
  '-ac',
  '2',
]

const tarefas = [
  ['aurea-1080.mp4', perfil(1920, 23, '128k')],
  ['aurea-720.mp4', perfil(1280, 26, '96k')],
]

for (const [nome, args] of tarefas) {
  const destino = join(SAIDA, nome)
  console.log(`gerando ${nome}...`)
  rodar(['-i', master, ...args, destino])
  console.log(`  ${(statSync(destino).size / 1024 / 1024).toFixed(1)} MB`)
}

/* Pôster: o quadro do segundo 1, antes de qualquer corte, em WebP. */
console.log('gerando pôster...')
rodar([
  '-ss',
  '1',
  '-i',
  master,
  '-map',
  '0:v:0',
  '-frames:v',
  '1',
  '-vf',
  'scale=1280:-2:flags=lanczos',
  '-quality',
  '82',
  join(SAIDA, 'aurea-poster.webp'),
])
console.log(`  ${(statSync(join(SAIDA, 'aurea-poster.webp')).size / 1024).toFixed(0)} KB`)
