import { Flor } from './Flor.jsx'
import { Letreiro } from './Letreiro.jsx'

/* A assinatura da campanha, remontada em HTML.

   O letreiro vem do arquivo oficial. O número e o descritor são texto de
   verdade, não imagem: assim o "500" herda o degradê da pétala, cresce junto
   com o resto e continua legível para leitor de tela e para busca.

   Duas montagens, as mesmas do manual:
   `completa`  o bloco empilhado com flor e número. Rodapé.
   `linha`     uma linha só, sem flor. Barra de navegação. */
export function Marca({ variante = 'completa', className = '' }) {
  if (variante === 'linha') {
    return (
      <span className={`marca marca--linha ${className}`}>
        <Letreiro variante="linha" className="marca__letreiro" />
        <span className="marca__numero marca__numero--pequeno" aria-hidden="true">
          500
        </span>
      </span>
    )
  }

  return (
    <span className={`marca marca--completa ${className}`}>
      <span className="marca__topo">
        <Letreiro variante="empilhado" className="marca__letreiro" />
        <Flor cor="laranja" tamanho={96} className="marca__flor" aria-hidden="true" />
      </span>

      <span className="marca__base">
        <span className="marca__descritor">
          A senadora
          <br />
          do povo
        </span>
        <span className="marca__numero">500</span>
      </span>
    </span>
  )
}
