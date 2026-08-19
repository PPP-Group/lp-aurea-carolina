import { provas } from '../../data/campanha.js'
import { useContador } from '../../lib/useContador.js'

/* ============================================================================
   O QUE JÁ FOI FEITO
   ----------------------------------------------------------------------------
   Painel escuro. Depois da biografia, a página precisa provar o que afirmou, e
   prova com número.

   Os dois primeiros itens carregam o argumento inteiro da campanha: 17.420 e
   162.740 são votos que ela tirou quando ninguém apostava. Por isso ocupam o
   dobro de espaço dos outros quatro e contam do zero quando entram na tela.

   Dois itens não são contáveis — a Gabinetona e a CPI de Brumadinho. Em vez de
   forçar um "1" que não diz nada, o lugar do número fica com o nome próprio,
   que é justamente o que se reconhece.
   ========================================================================== */

function Numero({ item, duracao }) {
  const [alvo, valor] = useContador(item.valor, { duracao })

  return (
    <strong className="prova__valor" ref={alvo}>
      {item.aproximado && <span className="prova__quase">quase</span>}
      <span className="prova__digitos">
        {item.prefixo}
        {valor}
      </span>
      <span className="prova__unidade">{item.unidade}</span>
    </strong>
  )
}

function Prova({ item, largo }) {
  return (
    <li className="prova" data-largo={largo ? 'sim' : 'nao'}>
      {item.palavra ? (
        <strong className="prova__valor prova__valor--palavra">{item.palavra}</strong>
      ) : (
        <Numero item={item} duracao={largo ? 1900 : 1200} />
      )}

      <p className="prova__rotulo">{item.rotulo}</p>
      <p className="prova__detalhe">{item.detalhe}</p>
    </li>
  )
}

export function Provas() {
  return (
    <section id="provas" className="secao provas grao">
      <div className="sol sol--denso provas__sol" aria-hidden="true" />

      <div className="limite provas__interior">
        <header className="provas__cabeca">
          <p className="tarja provas__tarja">
            <span className="tarja__marca" aria-hidden="true" />
            {provas.tarja}
          </p>
          <h2 className="provas__titulo cartaz">{provas.titulo}</h2>
        </header>

        <ul className="provas__lista">
          {provas.itens.map((item, i) => (
            <Prova key={item.rotulo} item={item} largo={i < 2} />
          ))}
        </ul>

        {/* O resto da atuação institucional não cabe em número: são leis,
            relatórios e comissões. Ficam em lista, logo abaixo do painel. */}
        <ul className="provas__extras">
          {provas.lista.map((texto) => (
            <li key={texto} className="provas__extra">
              {texto}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
