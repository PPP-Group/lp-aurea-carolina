# Áurea Carolina 500 — landing page

Landing page de campanha para o Senado Federal por Minas Gerais, 2026.

```bash
npm install
npm run dev      # http://localhost:5177
npm run build    # gera dist/
npm run preview  # serve dist/ em http://localhost:4173
```

---

## De onde veio cada coisa

Todo o material saiu de `Documentos/ÁUREA CAROLINA/`. Nada foi inventado.

| No site                       | Origem                                                        |
| ----------------------------- | ------------------------------------------------------------- |
| Textos                        | `DOCUMENTO INFOS/TEXTOS SITE ÁUREA.docx`                      |
| Paleta                        | `IDV Áurea V2/02. Cores/`                                     |
| Fontes                        | `IDV Áurea V2/03. Fontes/`                                    |
| Letreiros                     | `IDV Áurea V2/01. Logo/SVG/Marcas-0*.svg`                     |
| Flor de pequi, grafismos      | `IDV Áurea V2/04. Grafismos/`                                 |
| Recortes da Áurea             | camadas dos `.psd` em `IDV Áurea V2/05. Composicoes/`         |
| Peças da galeria              | os mesmos `.psd`, achatados                                   |
| Regras de composição          | `IDV Áurea V2/00. Sotaque Identidade Visual.pdf`, p. 18 e 22  |

### Cores

As sete oficiais, em `src/styles/tokens.css`:

| Nome                | Hex       | Uso no site                            |
| ------------------- | --------- | -------------------------------------- |
| Amarelo Carambola   | `#fac400` | o herói, as faixas, o sol              |
| Bege Palha          | `#ffe8c7` | texto sobre cor cheia, títulos-cartaz  |
| Roxo Bougainville   | `#cc3aa0` | sombra dura, contorno, detalhe         |
| Laranja Papaya      | `#ff5a3d` | degradê da pétala, um dos princípios   |
| Vinho Araçá         | `#50002b` | tinta, painel das provas, barra        |
| Preto Pedra Sabão   | `#1f0d17` | painel das bandeiras, rodapé           |
| Verde Louro         | `#365928` | território: "firmeza com as riquezas"  |

Proporção conforme o manual: amarelo protagonista, depois bege, vinho e roxo;
laranja, verde e preto entram como complementares.

**Um desvio, e o motivo dele.** Bege sobre o Roxo Bougainville puro dá 3,76:1 —
abaixo do mínimo de 4,5:1 para texto corrido. Onde o roxo é fundo de leitura
(bandeiras, princípios, faixa roxa) o site usa `--color-roxo-fundo`, que é o
mesmo roxo com 20% de Vinho Araçá: `#b32e89`, 4,80:1. O roxo puro continua
valendo para sombra, contorno e detalhe. Todos os outros pares da paleta
passam sem ajuste.

### Tipografia

As quatro do manual, servidas do próprio domínio em `woff2` já enxugado para
latim e acentuação portuguesa (153 KB no total):

- **Origin** — títulos. Black para o impacto, Light para os "títulos de paz".
- **Special Gothic Expanded** — faixas e rótulos. É a fonte que "preenche
  espaço", como o manual recomenda.
- **Bobby Jones Soft** — a letra da mão. Aparece uma vez na página inteira,
  no grito do rodapé.
- **Instrument Sans** — texto corrido.

---

## Deploy no EasyPanel (VPS Hostinger)

O serviço usa **Build Method: Nixpacks**, sem configurações manuais complexas.

O projeto utiliza um servidor de produção nativo em Node.js ([server.js](file:///C:/Users/pedro/Documents/antigravity-projects/lp-aurea-carolina/server.js)) acionado via script `"start": "node server.js"` no `package.json`.

O fluxo do Nixpacks funciona automaticamente:
1. `npm ci` — instala as dependências sem pacotes desnecessários.
2. `npm run build` — compila os arquivos do Vite para `dist/`.
3. `npm run start` — executa `server.js`, servindo `dist/` com fallback SPA, compressão Gzip, headers de cache e MIME types estritos.

**Como confirmar que está certo após o deploy:**

```bash
curl.exe -s https://aureacarolina.com.br/ | Select-String '<script'
```

Deve retornar `src="/assets/index-<hash>.js"`. Se retornar `src="/src/main.jsx"`, o servidor não estaria servindo `dist/`.
necessidade — ele só é usado pelos scripts de revisão em `scripts/`. Dá para
enxugar movendo esses scripts para fora do projeto, se o tempo de deploy
incomodar.

---

## A ideia

O manual não descreve um site, descreve cartazes. A página traduz aquela
gramática para a tela e se lê como uma pilha de lambe-lambes: painéis de cor
cheia, títulos com contorno e sombra dura (regra da p. 22), a tarja de fonte
expandida costurando um painel no outro.

O grafismo assinatura é **o sol de pequi**: os filamentos radiais da flor,
que no cartaz impresso estão parados, giram atrás da Áurea. É o que a tela
acrescenta ao papel.

O momento interativo é **a urna** (`src/components/urna/Urna.jsx`). Dá pra
ensaiar o voto — digitar 500, ver a ficha da candidata, confirmar. Funciona
por toque e por teclado físico, e confirmar abre a flor. Serve a quem tem 70
anos e vai ter poucos segundos na cabine, e a quem tem 18 e nunca votou.

---

## Estrutura

```
public/
  assets/            recortes, flores e peças em webp
  fonts/             as quatro fontes em woff2
src/
  assets/            letreiros svg (importados com ?raw para herdar a cor)
  components/        um diretório por seção
  data/campanha.js   todo o texto aprovado, num arquivo só
  lib/               hooks: revelar, contador, seção ativa, rolagem
  styles/            tokens, base e uma folha por seção
scripts/
  shots.mjs          capturas para revisão (desktop, mobile, medir, verificar)
  urna.mjs           percorre a urna e fotografa os quatro estados
  estados.mjs        bandeira aberta, lupa da peça, menu do celular
```

Para revisar visualmente, com o `npm run dev` rodando:

```bash
node scripts/shots.mjs shots
```

---

## Antes de publicar

1. **Fotos.** A pasta `FOTOS/` do pacote veio vazia. Os cinco recortes em uso
   foram extraídos das camadas dos `.psd` de composição. Substitua por
   material da produção quando chegar — os arquivos estão em
   `public/assets/aurea-*.webp`.
2. **Licença da Bobby Jones.** A Origin veio com as pastas `Web-PS` e `Web-TT`
   (licença web contratada). A Bobby Jones veio só em desktop. Confirme a
   licença web antes de subir, ou troque a única ocorrência dela
   (`.rodape__grito`).
3. **Dados legais.** CNPJ da campanha (`68.571.277/0001-08`) e responsável
   ficam em `identidade`, em `src/data/campanha.js`, e o rodapé lê de lá.
4. **Redes sociais.** As URLs em `src/data/campanha.js` foram montadas a partir
   do `@aureacarolina` que aparece nas peças. Confira cada uma.
5. **Imagem de compartilhamento.** O `og:image` aponta para
   `/assets/pecas/peca-02.webp`. Se a campanha tiver uma arte específica de
   OG, troque em `index.html`.
6. **Domínio.** `index.html` e o rodapé usam `www.aureacarolina.com`.
