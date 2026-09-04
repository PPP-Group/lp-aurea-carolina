import { useCallback, useEffect, useRef, useState } from 'react'
import { reels } from '../../data/campanha.js'
import { useRevelar } from '../../lib/useRevelar.js'
import { Icone } from '../Icone.jsx'

/* ============================================================================
   DIRETO DAS REDES
   ----------------------------------------------------------------------------
   Depois do papel, a tela do celular. A página não hospeda cópia destes posts:
   eles estão no Instagram e continuam lá.

   O cartão mostra o post pequeno, no embed oficial (`/embed/`), sem legenda e
   sem interação — quem recebe o clique é o botão que cobre o quadro inteiro,
   não o Instagram. Quando o modal abre, entra o embed com legenda
   (`/embed/captioned/`): aí sim o post completo, com vídeo ou imagem, legenda,
   perfil e contadores, do jeito que o Instagram entrega.

   Dois embeds diferentes de propósito. O do cartão é vitrine e não precisa de
   texto; o do modal é o post, e é onde a legenda tem que estar.

   A fila rola na horizontal, como o mural das peças: são muitos posts, e
   empilhá-los na vertical faria a seção sozinha ser mais alta que o resto da
   página. É região rolável de verdade, então as setas do teclado funcionam.
   ========================================================================== */

/* O endereço `/p/` abre qualquer post — vídeo ou imagem. O `/reel/`, que estava
   aqui antes, só resolve para vídeo, e a fila hoje é mista. */
const url = (codigo) => `https://www.instagram.com/p/${codigo}/`
const embed = (codigo, comLegenda) => `${url(codigo)}embed/${comLegenda ? 'captioned/' : ''}`

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
          title={`Post no Instagram: ${item.titulo}`}
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

/* O cartão observa a própria entrada em tela, como os princípios logo acima — e
   o embed só é montado depois disso.

   Isso aqui não é enfeite: cada capa é um documento de terceiro, com o script
   do Instagram dentro. Montar os oito de uma vez, no primeiro pixel da página,
   custaria mais rede que o resto do site inteiro. A margem generosa faz a capa
   começar a descer um pouco antes de entrar na tela — inclusive quando ela vem
   pelo lado, que é como esta fila anda. Enquanto não chega, a moldura fica com
   o fundo de papel: o espaço já está reservado, então nada pula quando o
   documento entra. */
function Cartao({ item, indice, aoAbrir }) {
  const alvo = useRevelar()
  const moldura = useRef(null)
  const [perto, setPerto] = useState(false)

  useEffect(() => {
    const no = moldura.current
    if (!no) return

    if (!('IntersectionObserver' in window)) {
      setPerto(true)
      return
    }

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return
        setPerto(true)
        observador.disconnect()
      },
      { rootMargin: '300px' },
    )

    observador.observe(no)
    return () => observador.disconnect()
  }, [])

  return (
    <li
      className="reels__item revelar"
      data-formato={item.formato}
      style={{ '--atraso': `${Math.min(indice, 5) * 90}ms` }}
      ref={alvo}
    >
      <div className="reels__moldura" ref={moldura}>
        {perto && (
          <iframe
            className="reels__quadro reels__quadro--capa"
            src={embed(item.codigo, false)}
            title={`Prévia do post: ${item.titulo}`}
            loading="lazy"
            scrolling="no"
            tabIndex={-1}
            aria-hidden="true"
          />
        )}

        <button
          className="reels__toque"
          type="button"
          onClick={aoAbrir}
          aria-label={`Abrir o post: ${item.titulo}`}
        >
          {/* Vídeo pede play; foto e carrossel pedem a marca da rede, que é o
              que a pessoa vai encontrar do outro lado do clique. */}
          <span className="reels__play" aria-hidden="true">
            <Icone nome={item.formato === 'video' ? 'tocar' : 'instagram'} tamanho={24} />
          </span>
        </button>
      </div>

      <div className="reels__legenda">
        <p className="tarja reels__item-tarja">
          <span className="tarja__marca" aria-hidden="true" />
          {item.rotulo}
        </p>
        <h3 className="reels__item-titulo">{item.titulo}</h3>
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
      </div>

      {/* A fila sangra pela direita, fora do `limite`: o cartão cortado na borda
          é o que avisa que tem mais coisa para o lado. */}
      <ul className="reels__fila" tabIndex={0} aria-label="Posts da campanha, role para o lado">
        {reels.itens.map((item, i) => (
          <Cartao key={item.codigo} item={item} indice={i} aoAbrir={() => setAberto(item)} />
        ))}
      </ul>

      {aberto && <Post item={aberto} aoFechar={fechar} />}
    </section>
  )
}
