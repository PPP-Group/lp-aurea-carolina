import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'

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
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
}

function handler(req, res) {
  const urlPath = decodeURIComponent(req.url.split('?')[0])
  let filePath = path.join(DIST_DIR, urlPath === '/' ? 'index.html' : urlPath)

  // Seguranca: previne directory traversal
  if (!filePath.startsWith(DIST_DIR)) {
    res.writeHead(403)
    return res.end('Forbidden')
  }

  // Fallback de SPA: se o arquivo nao existir fisicamente, entrega o index.html
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(DIST_DIR, 'index.html')
  }

  const ext = path.extname(filePath).toLowerCase()
  const contentType = MIME_TYPES[ext] || 'application/octet-stream'
  const isHtml = ext === '.html'
  const isHashedAsset = urlPath.startsWith('/assets/')

  const headers = {
    'Content-Type': contentType,
    'X-Content-Type-Options': 'nosniff',
  }

  if (isHashedAsset) {
    headers['Cache-Control'] = 'public, max-age=31536000, immutable'
  } else if (isHtml) {
    headers['Cache-Control'] = 'no-cache'
  } else {
    headers['Cache-Control'] = 'public, max-age=604800'
  }

  const raw = fs.createReadStream(filePath)
  const acceptEncoding = req.headers['accept-encoding'] || ''

  if (acceptEncoding.includes('gzip')) {
    headers['Content-Encoding'] = 'gzip'
    res.writeHead(200, headers)
    raw.pipe(zlib.createGzip()).pipe(res)
  } else {
    res.writeHead(200, headers)
    raw.pipe(res)
  }
}

const server1 = http.createServer(handler)
server1.listen(PRIMARY_PORT, '0.0.0.0', () => {
  console.log(`Servidor de producao rodando na porta ${PRIMARY_PORT}`)
})

// Suporte adicional a porta 3000 caso o Easypanel esteja mapeado para ela
if (PRIMARY_PORT !== 3000) {
  const server2 = http.createServer(handler)
  server2.listen(3000, '0.0.0.0', () => {
    console.log('Servidor escutando tambem na porta 3000 (Easypanel)')
  }).on('error', () => {})
}
