# ==============================================================================
# ÁUREA CAROLINA 500 · build de produção
# ------------------------------------------------------------------------------
# Duas etapas: a primeira builda o site com Node (precisa do toolchain do
# Vite), a segunda só serve os arquivos estáticos com nginx. A imagem final
# não carrega Node, npm nem node_modules — só o `dist/` e um servidor.
#
# É essa segunda etapa que faltava no projeto. Sem ela, uma plataforma como o
# EasyPanel tende a detectar isto como app Node e rodar `npm start`, que aqui
# aponta pro servidor de DESENVOLVIMENTO do Vite (não serve build de produção,
# não abre pra fora do container) — dá exatamente uma tela em branco depois de
# um "deploy" que a plataforma marca como bem-sucedido.
# ==============================================================================

FROM node:20-alpine AS build
WORKDIR /app

# Copia só o manifesto primeiro: o cache do Docker só reinstala as
# dependências quando package*.json muda, não a cada alteração de código.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:1.27-alpine AS producao

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
