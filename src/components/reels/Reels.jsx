import { useCallback, useEffect, useState } from 'react'
import { reels } from '../../data/campanha.js'
import { useRevelar } from '../../lib/useRevelar.js'
import { Icone } from '../Icone.jsx'

/* ============================================================================
   DIRETO DAS REDES
   ----------------------------------------------------------------------------
   Depois do papel, a tela do celular. A página não hospeda cópia destes dois
   vídeos: eles estão no Instagram da campanha e continuam lá.

   O cartão mostra o post pequeno, no embed oficial (`/embed/`), sem legenda e
   sem interação — quem recebe o clique é o botão que cobre o quadro inteiro,
   não o Instagram. Quando o modal abre, entra o embed com legenda
   (`/embed/captioned/`): aí sim o post completo, com vídeo, legenda, perfil e
   contadores, do jeito que o Instagram entrega.

   Dois embeds diferentes de propósito. O do cartão é vitrine e não precisa de
   texto; o do modal é o post, e é onde a legenda tem que estar.
   ========================================================================== */

const url = (codigo) => `https://www.instagram.com/reel/${codigo}/`
const embed = (codigo, comLegenda) =>
  `${url(codigo)}embed/${comLegenda ? 'captioned/' : ''}`

/* O post aberto. O embed do Instagram é um documento de outra origem: não dá
   para estilizar por dentro nem medir o tamanho da legenda daqui. Por isso o
   quadro ocupa a altura que sobra na tela e a legenda comprida rola por
   dentro dele — é o único jeito de o "Fechar" continuar sempre à mão. */
function Post({ item, aoFechar }) {
  useEffect(() => {
    const aoTeclar = (e) => e.key === 'Escape' && aoFechar()
    window.addEventListener('keydown', aoTeclar)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', aoTeclar)
      document.body.style.overflow = ''
    }
  }, [aoFechar])

  return (
    <div
      className="lupa reels__lupa"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.rotulo}: ${item.titulo}`}
      onClick={aoFechar}
    >
      <div className="reels__post" onClick={(e) => e.stopPropagation()}>
        <header className="reels__post-cabeca">
          <p className="tarja reels__post-tarja">
            <span className="tarja__marca" aria-hidden="true" />
            {item.rotulo}
          </p>
          <h3 className="reels__post-titulo">{item.titulo}</h3>
        </header>

        <iframe
          className="reels__quadro"
          src={embed(item.codigo, true)}
          title={`Reel no Instagram: ${item.titulo}`}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className="lupa__acoes" onClick={(e) => e.stopPropagation()}>
        <a
          className="btn btn--claro"
          href={url(item.codigo)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icone nome="instagram" tamanho={20} />
          Ver no Instagram
        </a>
        <button className="btn btn--vazado lupa__fechar" type="button" onClick={aoFechar}>
          <Icone nome="fechar" tamanho={20} />
          Fechar
        </button>
      </div>
    </div>
  )
}

/* O cartão observa a própria entrada em tela, como os princípios logo acima —
   e o embed só é montado depois disso: são dois documentos de terceiro, e
   carregar os dois no primeiro pixel da página custa caro em rede. */
function Cartao({ item, indice, aoAbrir }) {
  const alvo = useRevelar()

  return (
    <li className="reels__item revelar" style={{ '--atraso': `${indice * 110}ms` }} ref={alvo}>
      <div className="reels__moldura">
        <iframe
          className="reels__quadro reels__quadro--capa"
          src={embed(item.codigo, false)}
          title={`Prévia do reel: ${item.titulo}`}
          loading="lazy"
          scrolling="no"
          tabIndex={-1}
          aria-hidden="true"
        />

        <button
          className="reels__toque"
          type="button"
          onClick={aoAbrir}
          aria-label={`Assistir: ${item.titulo}`}
        >
          <span className="reels__play" aria-hidden="true">
            <Icone nome="tocar" tamanho={26} />
          </span>
        </button>
      </div>

      <div className="reels__legenda">
        <p className="tarja reels__item-tarja">
          <span className="tarja__marca" aria-hidden="true" />
          {item.rotulo}
        </p>
        <h3 className="reels__item-titulo">{item.titulo}</h3>
        <p className="reels__item-texto">{item.legenda}</p>
      </div>
    </li>
  )
}

export function Reels() {
  const [aberto, setAberto] = useState(null)
  const fechar = useCallback(() => setAberto(null), [])

  return (
    <section id="reels" className="secao reels">
      <div className="limite">
        <header className="reels__cabeca">
          <p className="tarja reels__tarja">
            <span className="tarja__marca" aria-hidden="true" />
            {reels.tarja}
          </p>
          <h2 className="reels__titulo">{reels.titulo}</h2>
          <p className="reels__apoio">{reels.apoio}</p>
        </header>

        <ul className="reels__lista">
          {reels.itens.map((item, i) => (
            <Cartao key={item.codigo} item={item} indice={i} aoAbrir={() => setAberto(item)} />
          ))}
        </ul>
      </div>

      {aberto && <Post item={aberto} aoFechar={fechar} />}
    </section>
  )
}
