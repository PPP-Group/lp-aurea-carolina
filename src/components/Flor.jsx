import { useMemo } from 'react'

/* ============================================================================
   FLOR DE PEQUI
   ----------------------------------------------------------------------------
   O símbolo da campanha, redesenhado em SVG.

   O manual explica de onde ele vem: a flor de pequi é fruto do cerrado, é
   símbolo regional de Minas e é tatuagem da própria Áurea. As pétalas têm
   degradê "aquecido e com sensação de movimento"; os filamentos radiais são
   "lembrança distante do símbolo antigo e energia solar".

   Existe também a versão em bitmap do manual (public/assets/flor-*.webp), fiel
   ao arquivo original. Esta versão vetorial existe porque a flor precisa
   abrir na urna, girar no rodapé e trocar de cor nas bandeiras. Bitmap não faz
   nada disso sem pesar.
   ========================================================================== */

const PETALAS = 5
const RAIO = 74 // até a ponta da pétala
const LARGURA = 33 // meia-largura da pétala
const FILAMENTOS = 64
const RAIO_FILAMENTO = 90

/* As quatro combinações que o manual mostra na página de grafismos. */
const CORES = {
  laranja: { base: '#fac400', ponta: '#ff5a3d', veia: '#ffe8c7', fio: '#ffe8c7' },
  rosa: { base: '#ff5a3d', ponta: '#cc3aa0', veia: '#ffe8c7', fio: '#ffe8c7' },
  vinho: { base: '#cc3aa0', ponta: '#50002b', veia: '#fac400', fio: '#ff5a3d' },
  amarela: { base: '#fac400', ponta: '#fac400', veia: '#fff4e2', fio: '#fac400' },
}

/* Uma pétala apontando para cima, com a base no centro da flor. Os dois pares
   de pontos de controle deixam a base afilada e a ponta arredondada, que é o
   desenho do arquivo original. */
const PETALA = [
  `M 0 0`,
  `C ${-LARGURA} ${-RAIO * 0.42} ${-LARGURA * 0.82} ${-RAIO} 0 ${-RAIO}`,
  `C ${LARGURA * 0.82} ${-RAIO} ${LARGURA} ${-RAIO * 0.42} 0 0`,
  `Z`,
].join(' ')

export function Flor({ cor = 'laranja', tamanho = 200, className = '', girando = false, ...resto }) {
  const paleta = CORES[cor] ?? CORES.laranja
  const id = `flor-${cor}`

  /* Os filamentos não são simétricos no arquivo original: cada fio tem o seu
     comprimento e a sua curvatura. O desvio vem de uma senoide sobre o índice,
     e não de Math.random, para o desenho ser o mesmo em toda renderização. */
  const fios = useMemo(
    () =>
      Array.from({ length: FILAMENTOS }, (_, i) => {
        const angulo = (i / FILAMENTOS) * Math.PI * 2
        const variacao = Math.sin(i * 2.399) * 0.5 + Math.sin(i * 0.7) * 0.5
        const alcance = RAIO_FILAMENTO * (0.72 + variacao * 0.24)
        const curva = variacao * 0.16

        const x = Math.cos(angulo) * alcance
        const y = Math.sin(angulo) * alcance
        // Ponto de controle deslocado na tangente: dá ao fio a leve curva de
        // quem está sendo empurrado pelo vento.
        const cx = Math.cos(angulo + curva) * alcance * 0.6
        const cy = Math.sin(angulo + curva) * alcance * 0.6

        return { d: `M 0 0 Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`, x, y }
      }),
    [],
  )

  /* Veias: três traços dentro de cada pétala, abrindo em leque a partir do
     centro. É o que dá a "sensação de movimento" que o manual pede. */
  const veias = [-0.42, -0.14, 0.14, 0.42]

  return (
    <svg
      className={`flor ${girando ? 'flor--girando' : ''} ${className}`}
      width={tamanho}
      height={tamanho}
      viewBox="-110 -110 220 220"
      role="img"
      aria-label="Flor de pequi, símbolo da campanha de Áurea Carolina"
      {...resto}
    >
      <defs>
        <linearGradient id={`${id}-petala`} x1="0.5" y1="1" x2="0.5" y2="0">
          <stop offset="0" stopColor={paleta.base} />
          <stop offset="1" stopColor={paleta.ponta} />
        </linearGradient>
        <radialGradient id={`${id}-miolo`}>
          <stop offset="0" stopColor="#fff8e8" stopOpacity="0.95" />
          <stop offset="0.55" stopColor={paleta.base} stopOpacity="0.55" />
          <stop offset="1" stopColor={paleta.base} stopOpacity="0" />
        </radialGradient>
      </defs>

      <g className="flor__fios" stroke={paleta.fio} strokeWidth="1.1" fill="none" opacity="0.85">
        {fios.map((fio, i) => (
          <g key={i}>
            <path d={fio.d} strokeLinecap="round" />
            <circle cx={fio.x} cy={fio.y} r="2" fill={paleta.fio} stroke="none" />
          </g>
        ))}
      </g>

      <g className="flor__petalas">
        {Array.from({ length: PETALAS }, (_, i) => (
          <g key={i} transform={`rotate(${(i * 360) / PETALAS})`}>
            <path d={PETALA} fill={`url(#${id}-petala)`} />
            <g stroke={paleta.veia} strokeWidth="0.9" opacity="0.5" strokeLinecap="round">
              {veias.map((desvio, v) => (
                <path
                  key={v}
                  d={`M 0 -4 Q ${desvio * LARGURA * 1.1} ${-RAIO * 0.55} ${desvio * LARGURA * 1.35} ${-RAIO * 0.9}`}
                  fill="none"
                />
              ))}
            </g>
          </g>
        ))}
      </g>

      <circle r="26" fill={`url(#${id}-miolo)`} />
    </svg>
  )
}
