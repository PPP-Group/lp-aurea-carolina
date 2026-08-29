import { timeDoLula } from '../../data/campanha.js'
import { useRevelar } from '../../lib/useRevelar.js'

/* ============================================================================
   TIME DO LULA EM MINAS GERAIS
   ----------------------------------------------------------------------------
   A chapa inteira num bloco só, logo depois da trajetória: quem acabou de ver
   de onde ela veio vê, em seguida, com quem ela caminha agora.

   Não são retratos de estúdio, um por pessoa — são flagras do mesmo palanque,
   com os três juntos em cada foto (acervo da campanha). Por isso a seção é
   uma galeria, e as fotos entram inteiras: sem recorte, sem forçar quadrado.
   Cada moldura segue a proporção do arquivo original; quem enquadra é a
   própria foto, não o CSS.

   A seção só é montada quando `timeDoLula.pronto` é verdadeiro (ver
   `data/campanha.js`): sem as fotos ela não existe.
   ========================================================================== */

function Foto({ foto, indice }) {
  const alvo = useRevelar()

  return (
    <li className="timao__foto revelar" style={{ '--atraso': `${indice * 80}ms` }} ref={alvo}>
      <img src={`/assets/time/${foto.arquivo}.webp`} alt={foto.alt} loading="lazy" decoding="async" />
    </li>
  )
}

export function Time() {
  const cabeca = useRevelar()

  return (
    <section id="time" className="secao timao grao">
      <div className="luz timao__luz" aria-hidden="true" />

      <div className="limite">
        <header className="timao__cabeca revelar" ref={cabeca}>
          <p className="tarja timao__tarja">
            <span className="tarja__marca" aria-hidden="true" />
            {timeDoLula.tarja}
          </p>
          <h2 className="timao__titulo cartaz">{timeDoLula.titulo}</h2>
          <p className="timao__apoio">{timeDoLula.apoio}</p>
        </header>

        <ul className="timao__grade">
          {timeDoLula.fotos.map((foto, i) => (
            <Foto key={foto.id} foto={foto} indice={i} />
          ))}
        </ul>
      </div>
    </section>
  )
}
