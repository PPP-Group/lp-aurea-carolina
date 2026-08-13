import { apoiar } from '../../data/campanha.js'
import { Icone } from '../Icone.jsx'
import { useRevelar } from '../../lib/useRevelar.js'

/* ============================================================================
   QUERO APOIAR A CAMPANHA
   ----------------------------------------------------------------------------
   A última pergunta da página, antes do rodapé: "e eu, como entro nisso?".
   Quatro portas, cada uma com um verbo diferente — ler, ir, dar, pedir — na
   mesma gramática de cor cheia das bandeiras, pra quem já rolou a página
   inteira reconhecer o formato sem precisar reaprender.
   ========================================================================== */

function Porta({ item, indice }) {
  const alvo = useRevelar()
  const externo = item.href.startsWith('http')

  return (
    <li
      className="porta revelar"
      data-cor={item.cor}
      style={{ '--atraso': `${indice * 80}ms` }}
      ref={alvo}
    >
      <a
        className="porta__caixa"
        href={item.href}
        {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        <span className="porta__icone" aria-hidden="true">
          <Icone nome={item.icone} tamanho={30} />
        </span>

        <span className="porta__titulo">{item.titulo}</span>
        <span className="porta__texto">{item.texto}</span>

        <span className="porta__cta">
          {item.cta}
          <Icone nome="seta" tamanho={18} />
        </span>
      </a>
    </li>
  )
}

export function Apoiar() {
  const cabeca = useRevelar()

  return (
    <section id="apoiar" className="secao apoiar grao">
      <div className="sol apoiar__sol" aria-hidden="true" />

      <div className="limite">
        <header className="apoiar__cabeca revelar" ref={cabeca}>
          <p className="tarja apoiar__tarja">
            <span className="tarja__marca" aria-hidden="true" />
            {apoiar.tarja}
          </p>
          <h2 className="apoiar__titulo cartaz">{apoiar.titulo}</h2>
          <p className="apoiar__apoio">{apoiar.apoio}</p>
        </header>

        <ul className="portas">
          {apoiar.itens.map((item, i) => (
            <Porta key={item.id} item={item} indice={i} />
          ))}
        </ul>
      </div>
    </section>
  )
}
