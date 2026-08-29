import { identidade } from '../data/campanha.js'

/* ============================================================================
   A ASSINATURA DA CAMPANHA
   ----------------------------------------------------------------------------
   Vem pronta do pacote oficial (`01. Logos`). Antes era remontada em HTML —
   letreiro "Áurea Carolina" em SVG, flor no canto, "500" como texto — porque a
   marca antiga era monocromática e cabia num `currentColor`.

   A marca nova não cabe: é "SENADORA / ÁUREA / 500", cada palavra numa cor, e
   o 500 num degradê. Remontar isso em HTML seria redesenhar a marca, então ela
   entra como arquivo, do jeito que a Cambia entregou.

   Três montagens, uma por fundo:

   `quente`    ÁUREA em vinho, 500 em amarelo. É a que lê melhor sobre o
               laranja do herói. Horizontal e sem suplentes — igual ao que a
               `linha` já resolvia embaixo, o retrato do herói não tem altura
               de sobra para uma marca empilhada em três linhas.
   `negativa`  bege e amarelo, vertical, com os suplentes. Rodapé.
   `linha`     negativa horizontal, sem suplentes. Barra de navegação — a
               120px de largura os nomes dos suplentes seriam ilegíveis, e
               eles aparecem por extenso no rodapé.

   O alt descreve a marca inteira porque é assim que ela é lida em voz alta:
   quem usa leitor de tela precisa do número da urna, que é a informação mais
   importante da página.
   ========================================================================== */

const MONTAGENS = {
  quente: {
    arquivo: 'marca-horizontal-quente',
    largura: 1400,
    altura: 249,
  },
  negativa: {
    arquivo: 'marca-vertical-negativa',
    largura: 800,
    altura: 653,
    suplentes: true,
  },
  linha: {
    arquivo: 'marca-horizontal-negativa',
    largura: 1100,
    altura: 281,
  },
}

export function Marca({ variante = 'negativa', className = '' }) {
  const montagem = MONTAGENS[variante] ?? MONTAGENS.negativa

  const alt = montagem.suplentes
    ? `Senadora ${identidade.nome} ${identidade.numero}. 1ª suplente Raquell Guimarães, 2º suplente Felipe Fonseca.`
    : `Senadora ${identidade.nome} ${identidade.numero}`

  return (
    <img
      className={`marca marca--${variante} ${className}`.trim()}
      src={`/assets/marca/${montagem.arquivo}.webp`}
      alt={alt}
      width={montagem.largura}
      height={montagem.altura}
      decoding="async"
    />
  )
}
