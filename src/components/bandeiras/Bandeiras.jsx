import { bandeiras } from '../../data/campanha.js'
import { Icone } from '../Icone.jsx'
import { useRevelar } from '../../lib/useRevelar.js'

/* ============================================================================
   BANDEIRAS
   ----------------------------------------------------------------------------
   Sete compromissos, sete campos de cor. É o momento mais alto da paleta na
   página inteira: cada bandeira pega uma das cores oficiais e ocupa o bloco
   todo, como uma parede de lambe-lambe.

   O documento de texto entregou cada bandeira em duas versões, uma enxuta e
   uma completa. As duas entram: a enxuta é o que se lê de relance, a completa
   abre quando a pessoa quer o argumento inteiro, com o que já foi feito.

   Usa `<details>` de propósito. Abre sem JavaScript, o navegador já dá o papel
   de acessibilidade certo, e o Ctrl+F do navegador encontra o texto fechado.
   ========================================================================== */

function Bandeira({ item, indice }) {
  const alvo = useRevelar()

  return (
    <li className="bandeira revelar" data-cor={item.cor} style={{ '--atraso': `${indice * 70}ms` }} ref={alvo}>
      <details className="bandeira__caixa" name="bandeira">
        <summary className="bandeira__topo">
          <span className="bandeira__icone" aria-hidden="true">
            <Icone nome={item.icone} tamanho={30} />
          </span>

          <span className="bandeira__dizer">
            <span className="bandeira__titulo">{item.titulo}</span>
            <span className="bandeira__chamada">{item.chamada}</span>
          </span>

          <span className="bandeira__abrir" aria-hidden="true">
            <Icone nome="mais" tamanho={22} />
          </span>
        </summary>

        <div className="bandeira__corpo">
          {item.completa.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </details>
    </li>
  )
}

export function Bandeiras() {
  const cabeca = useRevelar()

  return (
    <section id="bandeiras" className="secao bandeiras">
      <div className="limite">
        <header className="bandeiras__cabeca revelar" ref={cabeca}>
          <p className="tarja bandeiras__tarja">
            <span className="tarja__marca" aria-hidden="true" />
            {bandeiras.tarja}
          </p>
          <h2 className="bandeiras__titulo cartaz">{bandeiras.titulo}</h2>
          <p className="bandeiras__apoio">{bandeiras.apoio}</p>
        </header>

        <ul className="bandeiras__lista">
          {bandeiras.itens.map((item, i) => (
            <Bandeira key={item.id} item={item} indice={i} />
          ))}
        </ul>
      </div>
    </section>
  )
}
