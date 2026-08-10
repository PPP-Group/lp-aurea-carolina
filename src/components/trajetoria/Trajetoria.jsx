import { trajetoria } from '../../data/campanha.js'
import { useRevelar } from '../../lib/useRevelar.js'

/* ============================================================================
   TRAJETÓRIA
   ----------------------------------------------------------------------------
   Aqui o ano numerado não é enfeite: a ordem é a informação. É a única seção
   da página que ganha marcador sequencial, e ganha porque a pergunta que ela
   responde — "de onde ela veio?" — só se responde em ordem.

   Três anos recebem o degradê da pétala: 2016, 2018 e 2026. São as eleições.
   O resto fica em vinho. O olho percorre a coluna e para exatamente nos três
   pontos em que o povo decidiu.
   ========================================================================== */

function Marco({ item }) {
  const alvo = useRevelar()

  return (
    <li
      className="marco revelar"
      data-marco={item.marco ? 'sim' : 'nao'}
      data-agora={item.agora ? 'sim' : 'nao'}
      ref={alvo}
    >
      <div className="marco__ano">
        <span className="marco__digitos">{item.ano}</span>
        {item.ate && <span className="marco__ate">até {item.ate}</span>}
      </div>
      <p className="marco__texto">{item.texto}</p>
    </li>
  )
}

export function Trajetoria() {
  const cabeca = useRevelar()

  return (
    <section id="trajetoria" className="secao trajetoria">
      <div className="limite">
        <header className="trajetoria__cabeca revelar" ref={cabeca}>
          <p className="tarja trajetoria__tarja">
            <span className="tarja__marca" aria-hidden="true" />
            {trajetoria.tarja}
          </p>
          <h2 className="trajetoria__titulo">{trajetoria.titulo}</h2>
        </header>

        <ol className="trajetoria__linha">
          {trajetoria.marcos.map((item) => (
            <Marco key={`${item.ano}-${item.texto.slice(0, 16)}`} item={item} />
          ))}
        </ol>
      </div>
    </section>
  )
}
