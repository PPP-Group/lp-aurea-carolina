import { useCallback, useEffect, useState } from 'react'
import { pecas } from '../../data/campanha.js'
import { Icone } from '../Icone.jsx'

/* ============================================================================
   A CAMPANHA NAS RUAS
   ----------------------------------------------------------------------------
   As peças aprovadas, num mural. Não é galeria de retrato: é material para
   levar embora, e por isso cada peça tem download.

   O mural é uma faixa que rola na horizontal, com encaixe. No celular vira o
   gesto natural de deslizar; no desktop as setas do teclado funcionam porque a
   faixa é uma região rolável de verdade, não um carrossel de JavaScript.
   ========================================================================== */

function Ampliada({ peca, aoFechar }) {
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
    <div className="lupa" role="dialog" aria-modal="true" aria-label={peca.alvo} onClick={aoFechar}>
      <img
        className="lupa__imagem"
        src={`/assets/pecas/${peca.arquivo}.webp`}
        alt={peca.alvo}
        onClick={(e) => e.stopPropagation()}
      />
      <div className="lupa__acoes" onClick={(e) => e.stopPropagation()}>
        <a
          className="btn btn--claro"
          href={`/assets/pecas/${peca.arquivo}.webp`}
          download
          aria-label={`Baixar a peça ${peca.alvo}`}
        >
          <Icone nome="baixar" tamanho={20} />
          Baixar
        </a>
        <button className="btn btn--vazado lupa__fechar" type="button" onClick={aoFechar}>
          <Icone nome="fechar" tamanho={20} />
          Fechar
        </button>
      </div>
    </div>
  )
}

export function Pecas() {
  const [aberta, setAberta] = useState(null)
  const fechar = useCallback(() => setAberta(null), [])

  return (
    <section id="pecas" className="secao pecas">
      <div className="limite">
        <header className="pecas__cabeca">
          <p className="tarja pecas__tarja">
            <span className="tarja__marca" aria-hidden="true" />
            {pecas.tarja}
          </p>
          <h2 className="pecas__titulo cartaz">{pecas.titulo}</h2>
          <p className="pecas__apoio">{pecas.apoio}</p>
        </header>
      </div>

      <ul className="pecas__mural" tabIndex={0} aria-label="Peças da campanha, role para o lado">
        {pecas.itens.map((peca) => (
          <li className="pecas__item" key={peca.arquivo}>
            <button
              className="pecas__botao"
              type="button"
              onClick={() => setAberta(peca)}
              style={{ aspectRatio: peca.proporcao }}
            >
              <img
                src={`/assets/pecas/${peca.arquivo}.webp`}
                alt={peca.alvo}
                loading="lazy"
                decoding="async"
              />
              <span className="pecas__lupa" aria-hidden="true">
                <Icone nome="mais" tamanho={22} />
              </span>
            </button>
          </li>
        ))}
      </ul>

      {aberta && <Ampliada peca={aberta} aoFechar={fechar} />}
    </section>
  )
}
