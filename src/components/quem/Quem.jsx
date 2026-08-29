import { quem, principios } from '../../data/campanha.js'
import { useRevelar } from '../../lib/useRevelar.js'
import { Flor } from '../Flor.jsx'
import { Psol } from '../Psol.jsx'

/* ============================================================================
   QUEM SOU EU
   ----------------------------------------------------------------------------
   Depois do cartaz, o papel. O fundo vira bege e a tipografia muda de registro:
   o manual chama a Origin Light de "título de paz", e é ela que abre aqui.

   O parágrafo em destaque é o coração do texto que a campanha escreveu — "nas
   duas vezes, disseram que seria impossível" — e por isso sai do corpo do
   texto e ganha a escala de um cartaz pequeno.
   ========================================================================== */
/* Cada princípio observa a própria entrada em tela: por isso é componente, e
   não um `<li>` solto dentro do map. */
function Principio({ item, indice }) {
  const alvo = useRevelar()

  return (
    <li
      className="principio revelar"
      data-cor={item.cor}
      style={{ '--atraso': `${indice * 110}ms` }}
      ref={alvo}
    >
      <h3 className="principio__titulo">{item.titulo}</h3>
      <p className="principio__texto">{item.texto}</p>
    </li>
  )
}

export function Quem() {
  const bloco = useRevelar()

  return (
    <section id="quem" className="secao quem">
      <div className="limite quem__interior">
        <div className="quem__coluna revelar" ref={bloco}>
          <p className="tarja quem__tarja">
            <span className="tarja__marca" aria-hidden="true" />
            {quem.tarja}
          </p>

          <h2 className="quem__titulo">{quem.titulo}</h2>

          <div className="quem__texto">
            {quem.paragrafos.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <blockquote className="quem__destaque">
            <p>{quem.destaque}</p>
          </blockquote>
        </div>

        {/* A pílula recorta tudo que encosta nela, então a flor fica do lado de
            fora: é um bloco só, com o retrato dentro e a flor por cima da
            borda — o canto de flor que o manual põe nas peças de fundo claro. */}
        <div className="quem__retrato">
          <span className="quem__canto" aria-hidden="true">
            <Flor variante="rosa" tamanho={150} className="quem__flor" />
            <Psol variante="escuro" className="quem__psol" />
          </span>
          <figure className="quem__figura">
            {/* Uma das fotos de apoio, recortada do fundo branco em que foram
                entregues. A de blusa vinho e não a de roupa clara: sobre o bege
                deste painel o claro se dissolveria, e o vinho é cor da casa. */}
            <img
              src="/assets/aurea-quem.webp"
              alt="Áurea Carolina sorrindo, de blusa vinho, com uma das mãos no bolso"
              width="900"
              height="1720"
              loading="lazy"
              decoding="async"
            />
            <div className="raios quem__raios" aria-hidden="true" />
            <div className="luz quem__luz" aria-hidden="true" />
          </figure>
        </div>
      </div>

      <div className="limite quem__principios">
        <p className="tarja quem__tarja quem__tarja--principios">
          <span className="tarja__marca" aria-hidden="true" />
          {principios.tarja}
        </p>

        <ul className="principios">
          {principios.itens.map((item, i) => (
            <Principio key={item.titulo} item={item} indice={i} />
          ))}
        </ul>

        <p className="principios__fecho">{principios.fecho}</p>
      </div>
    </section>
  )
}
