import { useEffect, useMemo } from 'react'
import { faixa, filme, secoes } from './data/campanha.js'
import { iniciarRolagem } from './lib/rolagem.js'
import { useSecaoAtiva } from './lib/useSecaoAtiva.js'
import { useTelaLarga } from './lib/useTelaLarga.js'

import { Nav } from './components/Nav.jsx'
import { Faixa } from './components/Faixa.jsx'
import { Compartilhar } from './components/Compartilhar.jsx'
import { Rodape } from './components/Rodape.jsx'
import { Filme } from './components/Filme.jsx'

import { Hero } from './components/hero/Hero.jsx'
import { Quem } from './components/quem/Quem.jsx'
import { Provas } from './components/provas/Provas.jsx'
import { Trajetoria } from './components/trajetoria/Trajetoria.jsx'
import { Atos } from './components/atos/Atos.jsx'
import { Bandeiras } from './components/bandeiras/Bandeiras.jsx'
import { Urna } from './components/urna/Urna.jsx'
import { Pecas } from './components/pecas/Pecas.jsx'
import { Apoiar } from './components/apoiar/Apoiar.jsx'

/* A ordem da página é a ordem de uma conversa de rua:

   quem é você  ->  o que você já fez  ->  de onde você veio  ->
   o que você defende  ->  qual é o seu número  ->  leva isso com você

   A faixa entra sempre que o fundo troca de cor. Ela é a emenda entre um
   cartaz e o outro, e é o que impede a página de virar uma pilha de blocos
   soltos. */
export default function App() {
  const ids = useMemo(() => secoes.map((s) => s.id), [])
  const secaoAtiva = useSecaoAtiva(ids)
  /* No celular o filme já está dentro do herói. Aqui ele só existe no desktop,
     onde o herói mantém o retrato recortado. */
  const telaLarga = useTelaLarga()

  useEffect(() => iniciarRolagem(), [])

  return (
    <>
      <a className="pular" href="#quem">
        Pular para o conteúdo
      </a>

      <Nav secaoAtiva={secaoAtiva} />

      <main>
        <Hero />

        {telaLarga && (
          <section id="filme" className="secao filme filme--secao grao">
            <div className="limite filme__interior">
              <header className="filme__cabeca">
                <p className="tarja filme__tarja">
                  <span className="tarja__marca" aria-hidden="true" />
                  {filme.tarja}
                </p>
                <h2 className="filme__titulo cartaz">{filme.titulo}</h2>
              </header>

              <Filme largo />
            </div>
          </section>
        )}

        {/* Do cartaz para o papel. */}
        <Faixa frases={faixa} variante="vinho" />
        <Quem />

        {/* Do papel para a noite, onde ficam os números. */}
        <Faixa frases={['Bora vencer', 'Com Áurea são outros 500']} variante="amarela" velocidade={30} />
        <Provas />

        <Trajetoria />

        {/* Do bege da linha do tempo para o vinho: a mesma história, agora
            acontecendo. */}
        <Atos />

        <Bandeiras />

        <Faixa frases={['Vote 500', 'Áurea Carolina, senadora', 'Bora vencer']} variante="roxa" velocidade={26} />
        <Urna />

        <Pecas />

        <Apoiar />
      </main>

      <Rodape />
      <Compartilhar />
    </>
  )
}
