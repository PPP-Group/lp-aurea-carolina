import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'

/* ==============================================================================
   SERVIDOR DE PRODUÇÃO
   ------------------------------------------------------------------------------
   Serve o `dist/`. Três regras não óbvias moram aqui, e as três nasceram de
   vídeo que não tocava no ar:

   1. Todo arquivo precisa do seu Content-Type. Como a resposta vai com
      `X-Content-Type-Options: nosniff`, o navegador não adivinha: um .mp4
      entregue como `application/octet-stream` é recusado pelo Chrome, e o
      <video> fica preto para sempre.

   2. Vídeo não passa por gzip. Comprimir um MP4 não economiza nada (já é um
      formato comprimido), mas obriga o navegador a baixar o arquivo inteiro
      antes do primeiro quadro e, pior, inviabiliza pedido por faixa.

   3. Vídeo precisa de `Range`. É assim que o navegador pede "os primeiros
      500 KB" e começa a tocar enquanto o resto chega — e é obrigatório no
      Safari do iPhone, que só toca vídeo servido com resposta 206.
   ============================================================================ */

const PRIMARY_PORT = Number(process.env.PORT) || 80
const DIST_DIR = path.resolve('dist')

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.mp4': 'video/mp4',
  '.m4v': 'video/mp4',
  '.webm': 'video/webm',
  '.mov': 'video/quicktime',
  '.mp3': 'audio/mpeg',
  '.m4a': 'audio/mp4',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
}

/* Só texto ganha gzip. Imagem, fonte woff2, vídeo e áudio já saem comprimidos
   da ferramenta que os gerou — passar zlib por cima gasta CPU do servidor para
   devolver o mesmo tamanho. */
const COMPRIMIVEIS = new Set([
  '.html',
  '.js',
  '.mjs',
  '.css',
  '.json',
  '.svg',
  '.txt',
  '.xml',
])

const STREAMAVEIS = new Set(['.mp4', '.m4v', '.webm', '.mov', '.mp3', '.m4a'])

function handler(req, res) {
  const urlPath = decodeURIComponent(req.url.split('?')[0])
  let filePath = path.join(DIST_DIR, urlPath === '/' ? 'index.html' : urlPath)

  // Segurança: previne directory traversal
  if (!filePath.startsWith(DIST_DIR)) {
    res.writeHead(403)
    return res.end('Forbidden')
  }

  let stat = null
  try {
    stat = fs.statSync(filePath)
  } catch {
    stat = null
  }

  // Fallback de SPA: se o arquivo não existir fisicamente, entrega o index.html
  if (!stat || stat.isDirectory()) {
    filePath = path.join(DIST_DIR, 'index.html')
    stat = fs.statSync(filePath)
  }

  const ext = path.extname(filePath).toLowerCase()
  const contentType = MIME_TYPES[ext] || 'application/octet-stream'
  const isHtml = ext === '.html'
  const podeComprimir = COMPRIMIVEIS.has(ext)
  const podeStreamar = STREAMAVEIS.has(ext)

  const headers = {
    'Content-Type': contentType,
    'X-Content-Type-Options': 'nosniff',
  }

  /* O hash no nome só existe nos bundles que o Vite gera. Os arquivos que
     copiamos de `public/` mantêm o nome entre deploys — uma foto trocada com
     cache de um ano nunca chegaria em quem já visitou o site. */
  const temHashDeConteudo = /-[A-Za-z0-9_-]{8,}\.(js|css)$/.test(urlPath)

  if (temHashDeConteudo) {
    headers['Cache-Control'] = 'public, max-age=31536000, immutable'
  } else if (isHtml) {
    headers['Cache-Control'] = 'no-cache'
  } else {
    headers['Cache-Control'] = 'public, max-age=604800'
  }

  if (req.method === 'HEAD') {
    if (podeStreamar) headers['Accept-Ranges'] = 'bytes'
    headers['Content-Length'] = stat.size
    res.writeHead(200, headers)
    return res.end()
  }

  /* Pedido por faixa: o player manda `Range: bytes=0-` para abrir o vídeo e
     depois pede pedaços conforme toca (ou conforme a pessoa arrasta a barra).
     Responder 206 com só aquele trecho é o que faz o vídeo começar rápido em
     vez de esperar dezenas de MB. */
  const range = podeStreamar ? req.headers.range : undefined

  if (range) {
    const casa = /^bytes=(\d*)-(\d*)$/.exec(range.trim())

    if (!casa || (casa[1] === '' && casa[2] === '')) {
      res.writeHead(416, { 'Content-Range': `bytes */${stat.size}` })
      return res.end()
    }

    // `bytes=-500` pede os últimos 500 bytes; as outras formas contam do início.
    let inicio = casa[1] === '' ? stat.size - Number(casa[2]) : Number(casa[1])
    let fim = casa[1] === '' || casa[2] === '' ? stat.size - 1 : Number(casa[2])

    inicio = Math.max(0, inicio)
    fim = Math.min(fim, stat.size - 1)

    if (inicio > fim) {
      res.writeHead(416, { 'Content-Range': `bytes */${stat.size}` })
      return res.end()
    }

    headers['Accept-Ranges'] = 'bytes'
    headers['Content-Range'] = `bytes ${inicio}-${fim}/${stat.size}`
    headers['Content-Length'] = fim - inicio + 1
    res.writeHead(206, headers)
    return fs.createReadStream(filePath, { start: inicio, end: fim }).pipe(res)
  }

  if (podeStreamar) {
    headers['Accept-Ranges'] = 'bytes'
  }

  const acceptEncoding = req.headers['accept-encoding'] || ''

  if (podeComprimir && acceptEncoding.includes('gzip')) {
    headers['Content-Encoding'] = 'gzip'
    headers['Vary'] = 'Accept-Encoding'
    res.writeHead(200, headers)
    return fs.createReadStream(filePath).pipe(zlib.createGzip()).pipe(res)
  }

  /* Sem gzip o tamanho é conhecido de antemão: mandar `Content-Length` deixa a
     conexão sair do modo chunked e dá barra de progresso ao navegador. */
  headers['Content-Length'] = stat.size
  res.writeHead(200, headers)
  fs.createReadStream(filePath).pipe(res)
}

const server1 = http.createServer(handler)
server1.listen(PRIMARY_PORT, '0.0.0.0', () => {
  console.log(`Servidor de producao rodando na porta ${PRIMARY_PORT}`)
})

// Suporte adicional a porta 3000 caso o Easypanel esteja mapeado para ela
if (PRIMARY_PORT !== 3000) {
  const server2 = http.createServer(handler)
  server2
    .listen(3000, '0.0.0.0', () => {
      console.log('Servidor escutando tambem na porta 3000 (Easypanel)')
    })
    .on('error', () => {})
}
