import { useEffect, useRef, useState } from 'react'
import { secoes } from '../data/campanha.js'
import { Marca } from './Marca.jsx'
import { Icone } from './Icone.jsx'

/* A barra.

   Fica escondida enquanto o herói ocupa a tela inteira — o cartaz não precisa
   de moldura — e some, uma vez só, no exato momento em que a pessoa passa
   dele. Depois disso ela fica fixa: não some mais ao rolar para baixo, que é
   o comportamento que fazia a barra piscar em qualquer rolagem — inclusive as
   pequenas que o Lenis dispara o tempo todo.

   No celular o menu abre em painel cheio, com alvos de toque grandes: é a
   parte da página que mais precisa funcionar para quem tem 70 anos e está
   segurando o telefone com uma mão só. */
export function Nav({ secaoAtiva }) {
  const [visivel, setVisivel] = useState(false)
  const [aberto, setAberto] = useState(false)
  const barra = useRef(null)

  useEffect(() => {
    const medir = () => {
      setVisivel(window.scrollY > window.innerHeight * 0.85)

      if (barra.current) {
        document.documentElement.style.setProperty(
          '--nav-altura',
          `${barra.current.offsetHeight}px`,
        )
      }
    }

    medir()
    window.addEventListener('scroll', medir, { passive: true })
    window.addEventListener('resize', medir)
    return () => {
      window.removeEventListener('scroll', medir)
      window.removeEventListener('resize', medir)
    }
  }, [])

  // Com o painel aberto a página atrás não deve rolar.
  useEffect(() => {
    document.body.style.overflow = aberto ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [aberto])

  useEffect(() => {
    if (!aberto) return
    const aoTeclar = (e) => e.key === 'Escape' && setAberto(false)
    window.addEventListener('keydown', aoTeclar)
    return () => window.removeEventListener('keydown', aoTeclar)
  }, [aberto])

  return (
    <>
      <header ref={barra} className="nav" data-visivel={visivel || aberto ? 'sim' : 'nao'}>
        <div className="nav__interior limite">
          <a className="nav__marca" href="#inicio" aria-label="Áurea Carolina 500, ir para o topo">
            <Marca variante="linha" />
          </a>

          <nav className="nav__links" aria-label="Seções da página">
            {secoes.map((s) => (
              <a
                key={s.id}
                className="nav__link"
                href={`#${s.id}`}
                aria-current={secaoAtiva === s.id ? 'true' : undefined}
              >
                {s.rotulo}
              </a>
            ))}
          </nav>

          <a className="nav__voto" href="#urna">
            <span className="nav__voto-rotulo">Vote</span>
            <span className="nav__voto-numero">500</span>
          </a>

          <button
            className="nav__botao"
            type="button"
            onClick={() => setAberto((v) => !v)}
            aria-expanded={aberto}
            aria-controls="menu-painel"
          >
            <Icone nome={aberto ? 'fechar' : 'mais'} tamanho={22} />
            <span>{aberto ? 'Fechar' : 'Menu'}</span>
          </button>
        </div>
      </header>

      <div
        id="menu-painel"
        className="painel"
        data-aberto={aberto ? 'sim' : 'nao'}
        hidden={!aberto}
      >
        <nav className="painel__links" aria-label="Seções da página">
          {secoes.map((s, i) => (
            <a
              key={s.id}
              className="painel__link"
              href={`#${s.id}`}
              onClick={() => setAberto(false)}
              style={{ '--atraso': `${60 + i * 45}ms` }}
            >
              <span className="painel__rotulo">{s.rotulo}</span>
              <Icone nome="seta" tamanho={26} />
            </a>
          ))}
        </nav>

        <a className="btn btn--claro painel__voto" href="#urna" onClick={() => setAberto(false)}>
          <Icone nome="tocar" tamanho={20} />
          Ensaiar meu voto
        </a>
      </div>
    </>
  )
}
