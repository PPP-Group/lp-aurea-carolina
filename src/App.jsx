import { useEffect, useMemo } from 'react'
import { faixa, filme, jingle, secoes, timeDoLula } from './data/campanha.js'
import { iniciarRolagem } from './lib/rolagem.js'
import { useSecaoAtiva } from './lib/useSecaoAtiva.js'

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
import { Time } from './components/time/Time.jsx'
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

  useEffect(() => iniciarRolagem(), [])

  return (
    <>
      <a className="pular" href="#quem">
        Pular para o conteúdo
      </a>

      <Nav secaoAtiva={secaoAtiva} />

      <main>
        <Hero />

        {/* O filme original ganha seção própria em qualquer tela, não só no
            desktop. No celular ele também toca dentro do herói, no lugar do
            retrato: aqui embaixo é a versão com controles e cabeçalho, para
            quem quiser assistir de novo com calma. */}
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

        {/* O jingle não substitui o filme original — os dois convivem, cada
            um na própria seção. Mesma moldura, vídeo diferente. */}
        <section id="jingle" className="secao filme filme--secao grao">
          <div className="limite filme__interior">
            <header className="filme__cabeca">
              <p className="tarja filme__tarja">
                <span className="tarja__marca" aria-hidden="true" />
                {jingle.tarja}
              </p>
              <h2 className="filme__titulo cartaz">{jingle.titulo}</h2>
            </header>

            <Filme largo dados={jingle} />
          </div>
        </section>

        {/* Do cartaz para o papel. */}
        <Faixa frases={faixa} variante="vinho" />
        <Quem />

        {/* Do papel para a noite, onde ficam os números. */}
        <Faixa frases={['Com ousadia e coragem', 'Mulheres no Senado']} variante="amarela" velocidade={30} />
        <Provas />

        <Trajetoria />

        {/* A chapa entra logo depois da trajetória: quem acabou de ver de
            onde ela veio vê, em seguida, com quem ela caminha agora. Ambas em
            vinho, sem faixa entre elas — é a mesma virada de bege pro vinho
            que a linha do tempo já fazia sozinha. Só existe quando as três
            fotos estão em `public/assets/time/` (ver `timeDoLula.pronto`). */}
        {timeDoLula.pronto && <Time />}

        <Atos />

        <Bandeiras />

        <Pecas />

        <Apoiar />
      </main>

      <Rodape />
      <Compartilhar />
    </>
  )
}
