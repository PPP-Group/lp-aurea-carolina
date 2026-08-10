import empilhado from '../assets/logo-empilhado.svg?raw'
import linha from '../assets/logo-linha.svg?raw'

/* Os letreiros oficiais, inseridos no documento em vez de carregados como
   imagem.

   O motivo é a cor: o letreiro precisa ser vinho sobre o amarelo do herói e
   bege sobre o preto do rodapé. Um `<img>` não herda `currentColor` — o SVG
   carregado por src vive num documento à parte e ignora o CSS da página. Como
   arquivo embutido, o `fill="currentColor"` funciona e o letreiro acompanha a
   cor do texto ao redor, sem precisar de duas cópias do arquivo.

   Vem de `01. Logo/SVG/Marcas-0*.svg`, com o viewBox recortado no espaço em
   volta das letras. */

const DESENHOS = { empilhado, linha }

export function Letreiro({ variante = 'empilhado', className = '' }) {
  return (
    <span
      className={`letreiro letreiro--${variante} ${className}`}
      role="img"
      aria-label="Áurea Carolina"
      dangerouslySetInnerHTML={{ __html: DESENHOS[variante] }}
    />
  )
}
