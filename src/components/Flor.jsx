/* ============================================================================
   FLOR DE PEQUI
   ----------------------------------------------------------------------------
   O símbolo da campanha. Fruto do cerrado, símbolo regional de Minas e
   tatuagem da própria Áurea.

   Aqui existiu uma reconstrução em SVG: cinco pétalas em degradê e 64
   filamentos gerados por senoide, feita quando o pacote da identidade só
   trazia a flor em bitmap de peça. O arquivo oficial chegou
   (`04. Grafismos`) e a reconstrução saiu — o desenho de verdade tem pétalas
   de larguras diferentes e filamentos que a fórmula não acertava.

   A flor não faz mais parte da marca: a assinatura nova é só
   "SENADORA / ÁUREA / 500". Ela continua como elemento de apoio, que é o papel
   que o manual lhe dá — e o manual traz três versões, com a hierarquia escrita
   ao lado de cada uma:

   `laranja`  uso prioritário. É a da assinatura do herói.
   `rosa`     uso secundário. Sobre bege e amarelo, onde a laranja empataria
              com o fundo.
   `amarela`  uso terciário. Sobre vinho e preto, onde só ela acende.

   O miolo de filamentos existe separado, em `.raios` (ver base.css): é o mesmo
   desenho sem as pétalas, e é ele que vai atrás das fotos.
   ========================================================================== */

const ARQUIVOS = {
  laranja: { arquivo: 'flor-pequi', altura: 583 },
  rosa: { arquivo: 'flor-pequi-rosa', altura: 589 },
  amarela: { arquivo: 'flor-pequi-amarela', altura: 589 },
}

export function Flor({ tamanho = 200, variante = 'laranja', className = '', ...resto }) {
  const { arquivo, altura } = ARQUIVOS[variante] ?? ARQUIVOS.laranja

  return (
    <img
      className={`flor flor--${variante} ${className}`.trim()}
      src={`/assets/${arquivo}.webp`}
      alt=""
      width={tamanho}
      height={Math.round((tamanho * altura) / 600)}
      decoding="async"
      {...resto}
    />
  )
}
