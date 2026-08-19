import { provas } from '../../data/campanha.js'
import { useContador } from '../../lib/useContador.js'
import { useRevelar } from '../../lib/useRevelar.js'

/* ============================================================================
   ATUAÇÃO INSTITUCIONAL
   ----------------------------------------------------------------------------
   Painel escuro. Depois da biografia, a página precisa provar o que afirmou.

   O texto aqui é político e já foi aprovado palavra por palavra: cada item é
   uma linha do documento, inteira. Por isso o número não sai da frase pra
   virar cartaz com um rótulo resumido embaixo — ele fica exatamente onde foi
   escrito e só cresce, no degradê da pétala. A frase continua legível de
   ponta a ponta; o olho é que para no 17.420 antes de ler o resto.
   ========================================================================== */

/* A contagem corre dentro de uma caixa que já nasce do tamanho do número
   final: o molde é o próprio número, escondido, e o valor corrente fica
   empilhado em cima dele na mesma célula da grade. Assim a palavra seguinte
   não anda enquanto os dígitos sobem — e a caixa não sobra um dedo de espaço,
   como sobrava quando a largura era estimada em `ch`. */
function Contagem({ token }) {
  const [no, valor] = useContador(Number(token.replace(/\./g, '')))

  return (
    <span className="prova__contagem" ref={no}>
      <span className="prova__molde" aria-hidden="true">
        {token}
      </span>
      <span className="prova__contado">{valor}</span>
    </span>
  )
}

/* `realce` é sempre um pedaço da própria frase. Quem conta vira número grande
   no degradê; o resto é nome próprio e fica no amarelo, no corpo do texto. */
function Realce({ trecho, contar }) {
  if (!contar) return <b className="prova__realce prova__realce--nome">{trecho}</b>

  return (
    <b className="prova__realce prova__realce--numero">
      <Contagem token={trecho} />
    </b>
  )
}

function Prova({ item }) {
  const alvo = useRevelar()
  const corte = item.realce ? item.texto.indexOf(item.realce) : -1

  return (
    <li className="prova revelar" ref={alvo}>
      <p className="prova__texto">
        {corte < 0 ? (
          item.texto
        ) : (
          <>
            {item.texto.slice(0, corte)}
            <Realce trecho={item.realce} contar={item.contar} />
            {item.texto.slice(corte + item.realce.length)}
          </>
        )}
      </p>
    </li>
  )
}

export function Provas() {
  return (
    <section id="provas" className="secao provas grao">
      <div className="sol sol--denso provas__sol" aria-hidden="true" />

      <div className="limite provas__interior">
        <header className="provas__cabeca">
          <p className="tarja provas__tarja">
            <span className="tarja__marca" aria-hidden="true" />
            {provas.tarja}
          </p>
          <h2 className="provas__titulo cartaz">{provas.titulo}</h2>
        </header>

        <ul className="provas__lista">
          {provas.itens.map((item) => (
            <Prova key={item.texto} item={item} />
          ))}
        </ul>
      </div>
    </section>
  )
}
