import { useCallback, useEffect, useRef, useState } from 'react'
import { urna, identidade } from '../../data/campanha.js'
import { Flor } from '../Flor.jsx'

/* ============================================================================
   A URNA
   ----------------------------------------------------------------------------
   O diferencial da página: dá pra ensaiar o voto antes do dia.

   Não é enfeite. Quem tem 70 anos chega na cabine e tem poucos segundos para
   digitar três números que viu uma vez num santinho; quem tem 18 nunca votou.
   Ensaiar aqui resolve os dois casos, e de quebra é a coisa mais
   compartilhável do site.

   Três decisões:

   1. A réplica é literal: o mesmo chassi cinza do terminal do eleitor, o visor
      à esquerda, o teclado 3x3 com o zero embaixo, as três teclas de comando
      na ordem BRANCO / CORRIGE / CONFIRMA, o braille em cada tecla e os mesmos
      dizeres de tela ("Seu voto para", "Número:", "Aperte a tecla:"). O
      comportamento também é o real: BRANCO só vale com o número vazio, número
      inexistente vira VOTO NULO, e confirmar mostra FIM.

      Uma única coisa não é copiada: a marca da Justiça Eleitoral e o brasão do
      TSE. Insígnia oficial em propaganda eleitoral é vedada, então a
      serigrafia do chassi diz URNA DE ENSAIO — que é o que isto é.
   2. Funciona por teclado além do toque. Digitar 5-0-0 no teclado físico faz o
      mesmo que apertar os botões.
   3. A recompensa da campanha acontece fora da máquina. O visor mostra o FIM
      igual ao da urna de verdade; a flor abre embaixo, no painel da campanha.
   ========================================================================== */

const NUMERO = identidade.numero.split('')
const CASAS = NUMERO.length
const TECLAS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']

/* Braille das teclas, como no teclado real: célula 2x3, numeral escrito com as
   letras a–j. Os índices seguem a numeração clássica dos pontos —
   1,2,3 na coluna esquerda, 4,5,6 na direita. */
const BRAILLE = {
  1: [1],
  2: [1, 2],
  3: [1, 4],
  4: [1, 4, 5],
  5: [1, 5],
  6: [1, 2, 4],
  7: [1, 2, 4, 5],
  8: [1, 2, 5],
  9: [2, 4],
  0: [2, 4, 5],
  branco: [1, 2, 3, 5],
  corrige: [1, 4],
  confirma: [1, 4],
}

function Braille({ pontos }) {
  return (
    <span className="tecla__braille" aria-hidden="true">
      {[1, 2, 3, 4, 5, 6].map((p) => (
        <i key={p} data-ativo={pontos.includes(p) ? 'sim' : 'nao'} />
      ))}
    </span>
  )
}

export function Urna() {
  const [digitos, setDigitos] = useState([])
  const [branco, setBranco] = useState(false)
  const [confirmado, setConfirmado] = useState(false)
  const painel = useRef(null)

  const completo = digitos.length === CASAS
  const correto = completo && digitos.join('') === identidade.numero
  const podeConfirmar = (completo || branco) && !confirmado

  const digitar = useCallback(
    (d) => {
      /* Depois de BRANCO a urna ignora os números até apertarem CORRIGE. */
      if (confirmado || branco) return
      setDigitos((atual) => (atual.length >= CASAS ? atual : [...atual, d]))
    },
    [confirmado, branco],
  )

  /* Na urna de verdade a tecla BRANCO só responde com o número ainda vazio. */
  const votarBranco = useCallback(() => {
    if (confirmado || digitos.length > 0) return
    setBranco(true)
  }, [confirmado, digitos.length])

  const corrigir = useCallback(() => {
    setConfirmado(false)
    setBranco(false)
    setDigitos([])
  }, [])

  const confirmar = useCallback(() => {
    if (!completo && !branco) return
    setConfirmado(true)
  }, [completo, branco])

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

        {/* ---------- O terminal do eleitor ---------- */}
        <div className="maquina">
          <div className="maquina__corpo">
            {/* ---------- Visor ---------- */}
            <div className="maquina__bezel">
              <div className="visor" data-estado={confirmado ? 'fim' : branco ? 'branco' : 'voto'}>
                {confirmado ? (
                  <p className="visor__fim">FIM</p>
                ) : branco ? (
                  <div className="visor__folha">
                    <p className="visor__cargo">
                      <span>Seu voto para</span>
                      <strong>1º SENADOR</strong>
                    </p>
                    <p className="visor__estado">VOTO EM BRANCO</p>
                    <p className="visor__rodape">
                      <span className="visor__rodape-chamada">Aperte a tecla:</span>
                      <span>
                        <strong>CONFIRMA</strong> para CONFIRMAR este voto
                      </span>
                      <span>
                        <strong>CORRIGE</strong> para REESCREVER o voto
                      </span>
                    </p>
                  </div>
                ) : (
                  <div className="visor__folha">
                    <p className="visor__cargo">
                      <span>Seu voto para</span>
                      <strong>1º SENADOR</strong>
                    </p>

                    <div className="visor__numero">
                      <span className="visor__rotulo">Número:</span>
                      <span className="visor__casas">
                        {Array.from({ length: CASAS }, (_, i) => (
                          <span
                            className="visor__casa"
                            key={i}
                            data-cheia={digitos[i] ? 'sim' : 'nao'}
                          >
                            {digitos[i] ?? ''}
                          </span>
                        ))}
                      </span>
                    </div>

                    {completo && correto && (
                      <div className="visor__ficha">
                        <dl className="visor__dados">
                          <div>
                            <dt>Nome:</dt>
                            <dd>{identidade.nome.toUpperCase()}</dd>
                          </div>
                          <div>
                            <dt>Partido:</dt>
                            <dd>{identidade.partido}</dd>
                          </div>
                        </dl>

                        {/* Retrato enquadrado no rosto, como na urna de
                            verdade: em 6,5rem de largura um corpo inteiro
                            viraria mancha. */}
                        <img
                          className="visor__foto"
                          src="/assets/aurea-rosto.webp"
                          alt=""
                          width="480"
                          height="579"
                          loading="lazy"
                        />
                      </div>
                    )}

                    {completo && !correto && (
                      <div className="visor__ficha visor__ficha--nulo">
                        <p className="visor__estado">VOTO NULO</p>
                        <p className="visor__nota">
                          O número da Áurea é <strong>{identidade.numero}</strong>. Aperte CORRIGE e
                          tente de novo.
                        </p>
                      </div>
                    )}

                    <p className="visor__rodape">
                      <span className="visor__rodape-chamada">Aperte a tecla:</span>
                      <span>
                        <strong>CONFIRMA</strong> para CONFIRMAR este voto
                      </span>
                      <span>
                        <strong>CORRIGE</strong> para REESCREVER o voto
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* ---------- Teclado ---------- */}
            <div className="maquina__teclado">
              <p className="maquina__serigrafia" aria-hidden="true">
                Urna de ensaio
              </p>

              <div className="maquina__teclas">
                <div className="maquina__numeros" role="group" aria-label="Teclado numérico">
                  {TECLAS.map((d) => (
                    <button
                      key={d}
                      className="tecla tecla--numero"
                      type="button"
                      onClick={() => digitar(d)}
                      disabled={confirmado || completo || branco}
                      aria-label={`Número ${d}`}
                    >
                      <span className="tecla__digito">{d}</span>
                      <Braille pontos={BRAILLE[d]} />
                    </button>
                  ))}
                </div>

                <div className="maquina__comandos" role="group" aria-label="Teclas de comando">
                  <button
                    className="tecla tecla--branco"
                    type="button"
                    onClick={votarBranco}
                    disabled={confirmado || digitos.length > 0}
                  >
                    <span className="tecla__digito">Branco</span>
                    <Braille pontos={BRAILLE.branco} />
                  </button>
                  <button
                    className="tecla tecla--corrige"
                    type="button"
                    onClick={corrigir}
                    aria-label="Corrige"
                  >
                    <span className="tecla__digito">Corrige</span>
                    <Braille pontos={BRAILLE.corrige} />
                  </button>
                  <button
                    className="tecla tecla--confirma"
                    type="button"
                    onClick={confirmar}
                    disabled={!podeConfirmar}
                    aria-label="Confirma"
                  >
                    <span className="tecla__digito">Confirma</span>
                    <Braille pontos={BRAILLE.confirma} />
                  </button>
                </div>
              </div>

              <span className="maquina__led" data-aceso={confirmado ? 'sim' : 'nao'} aria-hidden="true" />
              <span className="maquina__alto-falante" aria-hidden="true" />
            </div>
          </div>

          <p className="maquina__dica">Dá pra digitar no teclado do computador também.</p>
        </div>

        {/* ---------- A recompensa, fora da máquina ---------- */}
        {confirmado && (
          <div className="urna__festa" data-branco={branco ? 'sim' : 'nao'}>
            <Flor cor="laranja" tamanho={230} className="urna__flor" girando />
            <p className="urna__fim-rotulo">
              {branco ? 'Ensaio em branco registrado' : 'Voto registrado no ensaio'}
            </p>
            <p className="urna__fim-grito cartaz">Bora vencer</p>
            <p className="urna__fim-nota">
              {branco ? (
                <>
                  Branco não elege ninguém. No dia da eleição são dois votos para senador — um deles
                  pode ser <strong>{identidade.numero}</strong>.
                </>
              ) : (
                <>
                  No dia da eleição são dois votos para senador. Um deles pode ser{' '}
                  <strong>{identidade.numero}</strong>.
                </>
              )}
            </p>
            <button className="btn btn--claro urna__refazer" type="button" onClick={corrigir}>
              Ensaiar de novo
            </button>
          </div>
        )}

        {/* O leitor de tela acompanha pelo aviso, não pelos botões. */}
        <p className="urna__leitura" role="status" aria-live="polite">
          {confirmado
            ? branco
              ? 'Ensaio de voto em branco registrado.'
              : `Voto de ensaio registrado para ${identidade.nome}, número ${identidade.numero}.`
            : branco
              ? 'Voto em branco. Aperte confirma para registrar ou corrige para reescrever.'
              : completo && correto
                ? `Número ${digitos.join('')}. ${identidade.nome}, ${identidade.partido}. Aperte confirma.`
                : completo
                  ? `Número ${digitos.join('')} não corresponde a candidata nenhuma. Voto nulo.`
                  : `${digitos.length} de ${CASAS} dígitos.`}
        </p>
      </div>
    </section>
  )
}
