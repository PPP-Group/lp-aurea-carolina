import { hero, identidade } from '../../data/campanha.js'
import { Flor } from '../Flor.jsx'
import { Letreiro } from '../Letreiro.jsx'
import { Icone } from '../Icone.jsx'

/* ============================================================================
   HERÓI
   ----------------------------------------------------------------------------
   A composição é a do cartaz oficial, na ordem em que o manual a monta:
   assinatura no alto, retrato recortado sangrando pela borda, e o grito da
   campanha embaixo, na fonte de impacto, com contorno e sombra dura.

   O sol de filamentos gira atrás do retrato — o centro dele fica na cabeça
   dela, como nas peças. É o único movimento contínuo da página, e existe
   porque no cartaz impresso os raios estão parados: é exatamente o que a tela
   pode acrescentar ao papel.
   ========================================================================== */
export function Hero() {
  return (
    <section id="inicio" className="heroi grao">
      <div className="heroi__ceu" aria-hidden="true">
        <div className="sol sol--denso heroi__sol" />
      </div>

      <div className="heroi__interior limite">
        <header className="heroi__assinatura">
          <span className="heroi__marca">
            <Letreiro variante="empilhado" className="heroi__letreiro" />
            <Flor cor="laranja" tamanho={120} className="heroi__flor" aria-hidden="true" />
          </span>

          <p className="heroi__credencial">
            <span className="tarja tarja--caixa">
              <span className="tarja__marca" aria-hidden="true" />
              {hero.tarja}
            </span>
            <span className="heroi__legenda">
              {identidade.cargoCompleto} por {identidade.estado} · {identidade.partido} ·{' '}
              {identidade.coligacao}
            </span>
          </p>
        </header>

        <img
          className="heroi__retrato"
          src="/assets/aurea-rindo.webp"
          alt="Áurea Carolina sorrindo, de blusa vinho"
          width="704"
          height="1500"
          decoding="async"
        />

        <div className="heroi__grito">
          <h1 className="heroi__titulo cartaz">
            {hero.grito.map((palavra) => (
              <span className="heroi__palavra" key={palavra}>
                {palavra}
              </span>
            ))}
          </h1>

          <p className="heroi__numero">
            <span className="heroi__numero-rotulo">Senadora</span>
            <strong className="heroi__numero-digitos">{identidade.numero}</strong>
          </p>
        </div>

        <div className="heroi__pe">
          <p className="heroi__apoio">{hero.apoio}</p>

          <div className="heroi__acoes">
            <a className="btn btn--forte" href={hero.chamadaPrimaria.href}>
              <Icone nome="tocar" tamanho={20} />
              {hero.chamadaPrimaria.texto}
            </a>
            <a className="btn btn--vazado" href={hero.chamadaSecundaria.href}>
              {hero.chamadaSecundaria.texto}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
