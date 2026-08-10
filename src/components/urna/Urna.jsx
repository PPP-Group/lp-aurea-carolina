import { useCallback, useEffect, useRef, useState } from 'react'
import { urna, identidade } from '../../data/campanha.js'
import { Flor } from '../Flor.jsx'
import { Icone } from '../Icone.jsx'

/* ============================================================================
   A URNA
   ----------------------------------------------------------------------------
   O diferencial da página: dá pra ensaiar o voto antes do dia.

   Não é enfeite. Quem tem 70 anos chega na cabine e tem poucos segundos para
   digitar três números que viu uma vez num santinho; quem tem 18 nunca votou.
   Ensaiar aqui resolve os dois casos, e de quebra é a coisa mais
   compartilhável do site.

   Três decisões:

   1. A tela reproduz a urna de verdade (ordem dos campos, os avisos de rodapé,
      o retângulo do retrato), porque a familiaridade é o ponto. Mas as cores
      são as da campanha, e não as do TSE: isto é um ensaio, não uma imitação
      de urna oficial.
   2. Funciona por teclado além do toque. Digitar 5-0-0 no teclado físico faz o
      mesmo que apertar os botões.
   3. Confirmar abre a flor. É o único lugar da página onde o símbolo da
      campanha entra em cena com animação, e ele entra como recompensa.
   ========================================================================== */

const NUMERO = identidade.numero.split('')
const CASAS = NUMERO.length

export function Urna() {
  const [digitos, setDigitos] = useState([])
  const [confirmado, setConfirmado] = useState(false)
  const painel = useRef(null)

  const completo = digitos.length === CASAS
  const correto = completo && digitos.join('') === identidade.numero

  const digitar = useCallback(
    (d) => {
      if (confirmado) return
      setDigitos((atual) => (atual.length >= CASAS ? atual : [...atual, d]))
    },
    [confirmado],
  )

  const corrigir = useCallback(() => {
    setConfirmado(false)
    setDigitos([])
  }, [])

  const confirmar = useCallback(() => {
    if (!completo) return
    setConfirmado(true)
  }, [completo])

  /* Teclado físico. Só escuta quando a urna está na tela, senão roubaria os
     números de quem estiver digitando em qualquer outro lugar da página. */
  useEffect(() => {
    const no = painel.current
    if (!no) return

    let ativa = false
    const observador = new IntersectionObserver(([e]) => (ativa = e.isIntersecting), {
      threshold: 0.35,
    })
    observador.observe(no)

    const aoTeclar = (e) => {
      if (!ativa || e.metaKey || e.ctrlKey || e.altKey) return
      if (/^[0-9]$/.test(e.key)) {
        digitar(e.key)
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        e.preventDefault()
        corrigir()
      } else if (e.key === 'Enter' && document.activeElement === document.body) {
        confirmar()
      }
    }

    window.addEventListener('keydown', aoTeclar)
    return () => {
      observador.disconnect()
      window.removeEventListener('keydown', aoTeclar)
    }
  }, [digitar, corrigir, confirmar])

  return (
    <section id="urna" className="secao urna grao" ref={painel}>
      <div className="limite urna__interior">
        <header className="urna__cabeca">
          <p className="tarja urna__tarja">
            <span className="tarja__marca" aria-hidden="true" />
            {urna.tarja}
          </p>
          <h2 className="urna__titulo cartaz">{urna.titulo}</h2>
          <p className="urna__apoio">{urna.apoio}</p>
        </header>

        <div className="urna__maquina">
          {/* ---------- Tela ---------- */}
          <div className="urna__tela" data-confirmado={confirmado ? 'sim' : 'nao'}>
            {confirmado ? (
              <div className="urna__fim">
                <Flor cor="laranja" tamanho={230} className="urna__flor" girando />
                <p className="urna__fim-rotulo">Voto registrado no ensaio</p>
                <p className="urna__fim-grito cartaz">Bora vencer</p>
                <p className="urna__fim-nota">
                  No dia da eleição são dois votos para senador. Um deles pode ser{' '}
                  <strong>{identidade.numero}</strong>.
                </p>
                <button className="btn btn--claro urna__refazer" type="button" onClick={corrigir}>
                  Ensaiar de novo
                </button>
              </div>
            ) : (
              <div className="urna__ficha">
                <p className="urna__cargo">
                  Seu voto para
                  <strong>Senador</strong>
                </p>

                <div className="urna__linha">
                  <span className="urna__campo">Número</span>
                  <span className="urna__casas">
                    {Array.from({ length: CASAS }, (_, i) => (
                      <span className="urna__casa" key={i} data-cheia={digitos[i] ? 'sim' : 'nao'}>
                        {digitos[i] ?? ''}
                      </span>
                    ))}
                  </span>
                </div>

                {completo && (
                  <div className="urna__candidata" data-correto={correto ? 'sim' : 'nao'}>
                    {correto ? (
                      <>
                        {/* Retrato enquadrado no rosto, como na urna de
                            verdade: em 6,5rem de largura um corpo inteiro
                            viraria mancha. */}
                        <img
                          className="urna__foto"
                          src="/assets/aurea-rosto.webp"
                          alt=""
                          width="480"
                          height="579"
                          loading="lazy"
                        />
                        <dl className="urna__dados">
                          <div>
                            <dt>Nome</dt>
                            <dd>{identidade.nome}</dd>
                          </div>
                          <div>
                            <dt>Partido</dt>
                            <dd>{identidade.partido}</dd>
                          </div>
                        </dl>
                      </>
                    ) : (
                      <p className="urna__erro">
                        Número {digitos.join('')} não é o da Áurea. O número dela é{' '}
                        <strong>{identidade.numero}</strong>. Aperte CORRIGE e tente de novo.
                      </p>
                    )}
                  </div>
                )}

                <p className="urna__aviso">
                  Aperte <strong>CONFIRMA</strong> para votar ou <strong>CORRIGE</strong> para
                  recomeçar.
                </p>
              </div>
            )}
          </div>

          {/* ---------- Teclado ---------- */}
          <div className="urna__teclado">
            <p className="urna__instrucao" id="urna-instrucao">
              Digite o número da Áurea
            </p>

            <div className="urna__numeros" role="group" aria-labelledby="urna-instrucao">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((d) => (
                <button
                  key={d}
                  className="tecla tecla--numero"
                  type="button"
                  onClick={() => digitar(d)}
                  disabled={confirmado || completo}
                  aria-label={`Número ${d}`}
                >
                  {d}
                </button>
              ))}
            </div>

            <div className="urna__comandos">
              <button className="tecla tecla--corrige" type="button" onClick={corrigir}>
                Corrige
              </button>
              <button
                className="tecla tecla--confirma"
                type="button"
                onClick={confirmar}
                disabled={!completo || confirmado}
              >
                Confirma
                <Icone nome="seta" tamanho={20} />
              </button>
            </div>

            <p className="urna__dica">
              <Icone nome="tocar" tamanho={16} />
              Dá pra digitar no teclado também.
            </p>
          </div>
        </div>

        {/* O leitor de tela acompanha pelo aviso, não pelos botões. */}
        <p className="urna__leitura" role="status" aria-live="polite">
          {confirmado
            ? `Voto de ensaio registrado para ${identidade.nome}, número ${identidade.numero}.`
            : completo && correto
              ? `Número ${digitos.join('')}. ${identidade.nome}, ${identidade.partido}. Aperte confirma.`
              : completo
                ? `Número ${digitos.join('')} não corresponde à candidata.`
                : `${digitos.length} de ${CASAS} dígitos.`}
        </p>
      </div>
    </section>
  )
}
