import { useEffect, useRef } from 'react'
import { hero, identidade } from '../../data/campanha.js'
import { useTelaLarga } from '../../lib/useTelaLarga.js'
import { Flor } from '../Flor.jsx'
import { Letreiro } from '../Letreiro.jsx'
import { Icone } from '../Icone.jsx'
import { Filme } from '../Filme.jsx'

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

   No celular o recorte dá lugar ao filme da campanha, e a composição vira
   simétrica: marca centralizada, filme no meio, grito centralizado embaixo.
   No desktop o recorte fica onde estava — lá o filme tem seção própria, logo
   abaixo — e a composição continua assimétrica, como no cartaz.
   ========================================================================== */
/* Onde a cabeça dela cai dentro do recorte, medido no arquivo: 62,7% da
   largura, 7% da altura. */
const CABECA = { x: 0.627, y: 0.07 }

export function Hero() {
  const telaLarga = useTelaLarga()
  const secao = useRef(null)
  const retrato = useRef(null)

  /* O centro do sol precisa cair na cabeça dela, e a conta não cabe em CSS:
     o recorte é alinhado pela grade da `.limite`, que tem largura máxima, então
     a posição dele em relação ao herói (que sangra a tela inteira) muda com o
     tamanho da janela. Em 1280 a cabeça fica em 83,5% da largura do herói; em
     1920, em 72%. Uma porcentagem fixa erraria o alvo por mais de 170px.

     Os valores do CSS continuam valendo como ponto de partida e como reserva se
     o JS não rodar — o sol é enfeite, e errar o centro dele não quebra nada. */
  useEffect(() => {
    const sec = secao.current
    if (!sec) return

    const img = retrato.current
    if (!img) {
      sec.style.removeProperty('--sol-x')
      sec.style.removeProperty('--sol-y')
      return
    }

    const posicionar = () => {
      const r = img.getBoundingClientRect()
      const s = sec.getBoundingClientRect()
      if (!r.width || !s.width) return
      sec.style.setProperty('--sol-x', `${((r.left - s.left + r.width * CABECA.x) / s.width) * 100}%`)
      sec.style.setProperty('--sol-y', `${((r.top - s.top + r.height * CABECA.y) / s.height) * 100}%`)
    }

    posicionar()

    /* Três gatilhos, porque nenhum sozinho cobre tudo: o observador pega a
       troca de layout, o `resize` pega o caso em que a janela muda mas as
       caixas observadas não chegam a reportar, e o `load` cobre a primeira
       pintura em conexão lenta. */
    const observador = new ResizeObserver(posicionar)
    observador.observe(img)
    observador.observe(sec)
    window.addEventListener('resize', posicionar)
    img.addEventListener('load', posicionar)

    return () => {
      observador.disconnect()
      window.removeEventListener('resize', posicionar)
      img.removeEventListener('load', posicionar)
    }
  }, [telaLarga])

  return (
    <section id="inicio" className="heroi grao" ref={secao}>
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

        {telaLarga ? (
          <img
            ref={retrato}
            className="heroi__retrato"
            src="/assets/aurea-rindo.webp"
            alt="Áurea Carolina sorrindo, de blusa vinho"
            width="704"
            height="1500"
            decoding="async"
          />
        ) : (
          <div className="heroi__filme filme">
            <Filme />
          </div>
        )}

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
