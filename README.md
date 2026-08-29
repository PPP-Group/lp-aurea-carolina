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

Todo o material saiu do pacote da campanha. Nada foi inventado.

A entrega de 28/08/2026 (`Documentos/entregas-2026-08-28/`) substituiu a
`IDV Áurea V2` como fonte da marca, das fotos e das frases. As duas pastas
convivem: o que a nova traz, manda.

| No site                  | Origem                                                        |
| ------------------------ | ------------------------------------------------------------- |
| Textos                   | `DOCUMENTO INFOS/TEXTOS SITE ÁUREA.docx` + doc de alterações  |
| Paleta                   | `IDV Aurea Campanha/02. Cores/`                               |
| Fontes                   | `IDV Aurea Campanha/03. Fontes/`                              |
| Marca                    | `IDV Aurea Campanha/01. Logos/PNG/`                           |
| Flor de pequi (3 usos)   | `IDV Aurea Campanha/04. Grafismos/Grafismos.pdf`              |
| Raios (miolo da flor)    | `IDV Aurea Campanha/04. Grafismos/Grafismos.pdf`, p. 6        |
| Marca do PSOL            | `IDV Aurea Campanha/10. Pngs de Cobertura/04. Logo Psol/`     |
| Frases da campanha       | `IDV Aurea Campanha/10. Pngs de Cobertura/06. Frases/`        |
| Foto do herói            | `IDV Aurea Campanha/06. Fotos Oficiais/` (arquivo `AureaOficial2`) |
| Foto de "Quem sou eu"    | `Fotos de apoio/Aurea_variacao 02` (André Solano)             |
| Peças da galeria         | `.psd` de `IDV Áurea V2/05. Composicoes/`, achatados          |
| Fotos de rua e comissões | acervo da campanha                                            |
| Fotos do "Time do Lula"  | flagras de evento (`Documentos/entregas-2026-08-28/fotos-evento/`), recortadas à mão — não vêm do IDV |
| Regras de composição     | `00. IDV_AureaCarolina500.pdf`                                |

Os arquivos web em `public/assets/` foram gerados desses originais — logos em
webp sem perdas, fotos em q86, raios em SVG (o vetor sai do próprio
`Grafismos.pdf`). Os zips e o PDF do manual ficam fora de `public/`, que o Vite
copia inteiro para o `dist/`.

**Nem todo recorte oficial está limpo.** A pasta `06. Fotos Oficiais` trouxe
dois: `AureaOficial_recorte` guarda a cor do fundo antigo nos pixels da borda —
um halo claro em volta do cabelo assim que a foto vai para cima do degradê —
e o `AureaOficial2` não tem esse problema (a borda mede a mesma cor do resto
da pele, sem contaminação branca). O herói usa direto o `2`, só aparado no
alfa. Se um recorte novo chegar sujo, o conserto é des-mattear antes de aparar:
`C = (observado − 255·(1−α))/α`.

As fotos de apoio, que vieram sem canal alfa nenhum (fundo branco liso, não
recortado), passam por um processo diferente: a região de fundo é a que se
liga à borda da imagem, achada numa versão reduzida e devolvida em escala
cheia, com a borda macia saindo da rampa de brancura. É isso que deixa o vão
entre o braço e o tronco transparente em vez de branco — é o método por trás
da foto de "Quem sou eu".

As fotos do "Time do Lula" são outra categoria: flagras de evento, não
fotos de estúdio. Não há recorte de fundo — é um retângulo recortado à mão em
volta de cada pessoa, redimensionado para quadrado. O `object-fit: cover` na
moldura (`time.css`) resolve o resto.

### Cores

As sete oficiais, em `src/styles/tokens.css`:

| Nome                | Hex       | Uso no site                            |
| ------------------- | --------- | -------------------------------------- |
| Amarelo Carambola   | `#fac400` | o herói, as faixas, o clarão de fundo  |
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
curl.exe -s https://aurea500.com.br/ | Select-String '<script'
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

O grafismo de apoio é **o degradê da pétala**, como o manual pede: "usaremos
os degradês presentes na flor de pequi áurea como elemento gráfico de
campanha, mesmo que a flor não esteja presente na peça". Cada seção acende um
clarão radial parado (`.luz`, em `base.css`) na sua cor.

**Nenhum degradê inventa cor.** A página ELEMENTOS DE APOIO traz cinco pares, e
são os cinco que existem em `tokens.css`: `--grad-petala` (amarelo → laranja),
`--grad-noite` (roxo → laranja), `--grad-mata` (verde → vinho), `--grad-tinta`
(roxo → vinho) e `--grad-sol` (bege → amarelo). Fora deles, nenhuma folha desta
pasta escreve um hexadecimal solto: ou usa uma das sete cores, ou usa
`color-mix` entre duas delas.

O fundo do herói é a exceção que confirma a regra — ele não é um par, é a rampa
de peça inteira, montada em três camadas para poder controlar o contraste
(laranja no corpo, clarão de amarelo atrás dela, cunha de roxo pela direita).
Antes tinha seis tons inventados (`#ff6d3a`, `#f8542f`, `#ffa93f`, `#ff7434`,
`#e5357f`, `#c22fa8`) — vizinhos das cores da marca, mas nenhum igual a elas, e
era o que fazia o fundo do site não bater com o das peças impressas. Agora as
três camadas saem das sete cores.

**Os raios** (`.raios`, em `base.css`) são o miolo da flor sem as pétalas, o
grafismo que o manual põe atrás da Áurea em toda peça de fundo colorido. O
arquivo é o vetor oficial e entra como máscara CSS: a forma vem do SVG, a cor
vem da folha, então o mesmo arquivo serve o herói laranja e o painel bege.

**A flor** tem as três versões do manual, com a hierarquia que ele escreve ao
lado de cada uma: laranja no uso prioritário (assinatura do herói), rosa no
secundário (sobre bege, em "Quem sou eu"), amarela no terciário (sobre vinho,
no rodapé). Junto dela vai sempre o sol do PSOL, que é como o manual assina o
canto das peças.

Existiu aqui um "sol de pequi" — os filamentos radiais virados em
`repeating-conic-gradient`, girando atrás da Áurea. Saiu a pedido da campanha:
era bonito, mas destoava da identidade. Os raios que voltaram são o desenho
oficial, e estão parados.

---

## Estrutura

```
public/
  assets/
    marca/           a assinatura oficial nas três montagens
    atos/ pecas/     fotos de rua e peças da campanha
    video/           o filme em 720p e 1080p
    aurea-*.webp     os recortes: herói e "quem sou eu"
    flor-pequi*.webp a flor nos três usos: laranja, rosa, amarela
    raios.svg        o miolo da flor, usado como máscara CSS
    psol-*.webp      o sol do partido, claro e escuro
  fonts/             as quatro fontes em woff2
src/
  components/        um diretório por seção
  data/campanha.js   todo o texto aprovado, num arquivo só
  lib/               hooks: revelar, contador, seção ativa, rolagem
  styles/            tokens, base e uma folha por seção
scripts/
  shots.mjs          capturas para revisão (desktop, mobile, medir, verificar)
  estados.mjs        bandeira aberta, lupa da peça, menu do celular
```

Para revisar visualmente, com o `npm run dev` rodando:

```bash
node scripts/shots.mjs shots
```

---

## Antes de publicar

1. **O peso do jingle.** O jingle já está no ar: o master (`AUREA_SENADO-16x9`,
   738 MB em 4K) foi para `Documentos/entregas-2026-08-28/` e virou 26 MB em
   1080p e 10 MB em 720p, com `npm run video`. É o mesmo bitrate por segundo do
   filme anterior, mas o corte é quase o dobro de longo, então o número absoluto
   dobrou. Se a campanha achar pesado, o caminho é encurtar o corte para a web
   ou subir os CRF em `scripts/video.mjs` — o comentário lá mede quanto cada
   ponto custa.
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
6. **Domínio.** O principal é `aurea500.com.br` — está em `index.html`
   (canonical e `og:`) e em `identidade.site`. Os de apoio,
   `aureacarolina.com.br` e `aureasenadora.com.br`, ficam em
   `identidade.sitesApoio` e aparecem no rodapé.
