import { hero, identidade } from '../../data/campanha.js'
import { useTelaLarga } from '../../lib/useTelaLarga.js'
import { Flor } from '../Flor.jsx'
import { Marca } from '../Marca.jsx'
import { Psol } from '../Psol.jsx'
import { Icone } from '../Icone.jsx'
import { Filme } from '../Filme.jsx'

/* ============================================================================
   HERÓI
   ----------------------------------------------------------------------------
   A composição segue os cartazes de exemplo do manual: retrato de um lado,
   marca e texto do outro, e o canto de flor + sol do PSOL sempre encostado no
   retrato — não na marca. Nos exemplos, o retrato fica à esquerda e o canto
   sobe no topo esquerdo, junto dele; aqui o retrato está à direita, então o
   canto sobe no topo direito — o mesmo encontro, espelhado.

   O fundo é o degradê previsto pela Cambia — laranja-papaia com o clarão
   quente atrás dela e a cunha rosa-bougainville descendo da direita. Não há
   mais o sol de filamentos girando: era bonito, mas destoava da identidade, e
   o manual pede degradê, não animação.

   A coluna esquerda é uma pilha só (`.heroi__coluna`): marca, credencial,
   grito, apoio e botões, com o mesmo respiro entre cada bloco e ancorada
   embaixo — é o que estava faltando antes, quando o grito ficava sozinho
   flutuando no meio de uma linha de grade elástica, longe da marca em cima e
   longe dos botões embaixo.

   O retrato é a foto oficial (André Solano, arquivo `AureaOficial2`). O pacote
   trouxe dois recortes prontos; o outro (`_recorte`) guardava a cor do fundo
   antigo nos pixels da borda e desenhava um halo claro em volta do cabelo — o
   `AureaOficial2` não tem esse problema, é o que este arquivo usa direto, só
   aparado no alfa. A foto vetada, de blusa roxa, não é nenhum dos dois. Entra
   num enquadramento mais fechado, com o rosto grande — é o que a campanha
   pediu para a primeira seção: foto maior e mais próxima.

   No celular o recorte dá lugar ao filme da campanha, e a composição vira
   simétrica: marca centralizada, filme no meio, grito centralizado embaixo. O
   canto de flor + PSOL continua fixo no topo direito nas duas versões.
   ========================================================================== */

export function Hero() {
  const telaLarga = useTelaLarga()

  return (
    <section id="inicio" className="heroi grao">
      {/* Nesta ordem: os filamentos por baixo, o clarão por cima. É o clarão que
          apaga o miolo dos raios, e é assim que eles aparecem nas peças — trama
          nas pontas, luz no centro. */}
      <div className="heroi__ceu" aria-hidden="true">
        <div className="raios heroi__raios" />
        <div className="luz heroi__luz" />
      </div>

      {/* O canto das peças: flor em cima, sol do PSOL embaixo, sempre no topo
          junto do retrato — não preso à marca. */}
      <span className="heroi__canto" aria-hidden="true">
        <Flor tamanho={110} className="heroi__flor" />
        <Psol variante="claro" className="heroi__psol" />
      </span>

      <div className="heroi__interior">
        <div className="heroi__coluna">
          <header className="heroi__assinatura">
            <Marca variante="quente" className="heroi__assinatura-marca" />

            <p className="heroi__credencial">
              <span className="heroi__legenda">
                {identidade.cargoCompleto} por {identidade.estado} · {identidade.partido} ·{' '}
                {identidade.coligacao}
              </span>
            </p>
          </header>

          <h1 className="heroi__grito heroi__titulo cartaz">
            {hero.grito.map((palavra) => (
              <span className="heroi__palavra" key={palavra}>
                {palavra}
              </span>
            ))}
          </h1>

          <div className="heroi__pe">
            <div className="heroi__apoio">
              {hero.apoio.map((paragrafo) => (
                <p key={paragrafo.slice(0, 24)}>{paragrafo}</p>
              ))}
            </div>

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

        {telaLarga ? (
          <img
            className="heroi__retrato"
            src="/assets/aurea-oficial.webp"
            alt="Áurea Carolina sorrindo, de vestido verde e laranja"
            width="1200"
            height="2125"
            decoding="async"
          />
        ) : (
          <div className="heroi__filme filme">
            <Filme />
          </div>
        )}
      </div>
    </section>
  )
}
