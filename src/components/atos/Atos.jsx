import { atos } from '../../data/campanha.js'
import { useRevelar } from '../../lib/useRevelar.js'

/* ============================================================================
   NAS RUAS E NAS COMISSÕES
   ----------------------------------------------------------------------------
   A trajetória, na seção anterior, conta a história em datas. Aqui a mesma
   história aparece acontecendo: a rua cheia, a roda com as lideranças, o
   plenário com os cartazes no alto.

   A grade é assimétrica de propósito. A foto do ato de rua abre ocupando a
   largura inteira, porque é ela que responde a pergunta da seção; as outras
   quatro entram em duas colunas, num recorte mais fechado. Nenhuma foto é
   cortada com força: os arquivos são todos 3:2 e os recortes tiram cerca de um
   décimo, só o bastante pra criar hierarquia.
   ========================================================================== */

function Foto({ item, indice }) {
  const alvo = useRevelar()

  return (
    <figure
      className="ato revelar"
      data-destaque={item.destaque ? 'sim' : 'nao'}
      style={{ '--atraso': `${indice * 90}ms` }}
      ref={alvo}
    >
      <div className="ato__moldura">
        <img
          src={`/assets/atos/${item.arquivo}.webp`}
          alt={item.alt}
          width={item.largura}
          height={item.altura}
          loading="lazy"
          decoding="async"
        />
      </div>

      <figcaption className="ato__legenda">{item.legenda}</figcaption>
    </figure>
  )
}

export function Atos() {
  const cabeca = useRevelar()

  return (
    <section id="atos" className="secao atos grao">
      <div className="sol atos__sol" aria-hidden="true" />

      <div className="limite">
        <header className="atos__cabeca revelar" ref={cabeca}>
          <p className="tarja atos__tarja">
            <span className="tarja__marca" aria-hidden="true" />
            {atos.tarja}
          </p>
          <h2 className="atos__titulo cartaz">{atos.titulo}</h2>
          <p className="atos__apoio">{atos.apoio}</p>
        </header>

        <div className="atos__grade">
          {atos.fotos.map((item, i) => (
            <Foto key={item.id} item={item} indice={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
