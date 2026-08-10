/* A faixa que costura a página.

   Nos cartazes, a tarja de fonte expandida ("COM ÁUREA É OUTROS 500") corre na
   borda de cima ou de baixo da peça. Aqui ela é a emenda entre um painel de
   cor e o outro: sempre que a página troca de fundo, a faixa passa.

   O trilho é duplicado porque a animação percorre metade da pista e recomeça;
   sem a cópia, o fim do texto entregaria uma faixa vazia. Mas a pista só tem
   a largura do próprio conteúdo (`width: max-content`) — se as frases forem
   poucas e curtas, essa largura fica menor que a da seção, e sobra um vão em
   branco à direita do container. Como a pista desliza para a esquerda, esse
   vão cresce ao longo da animação e "estoura" quando ela reinicia.

   Por isso as frases são repetidas o quanto for preciso para o trilho ficar
   sempre bem mais largo que qualquer tela — 14 itens é folga de sobra mesmo
   para um monitor ultrawide. A cópia inteira fica escondida do leitor de
   tela. */
const MINIMO_DE_ITENS = 14

export function Faixa({ frases, variante = 'amarela', velocidade = 42, className = '' }) {
  const repeticoes = Math.max(1, Math.ceil(MINIMO_DE_ITENS / frases.length))
  const itens = Array.from({ length: repeticoes }, () => frases).flat()
  // A duração cresce junto com o número de itens, senão o trilho mais longo
  // (frases curtas) andaria bem mais rápido que o trilho de frases longas.
  const duracao = velocidade * repeticoes

  const trilho = (
    <span className="faixa__trilho">
      {itens.map((frase, i) => (
        <span className="faixa__item" key={i}>
          {frase}
          <span className="faixa__ponto" aria-hidden="true" />
        </span>
      ))}
    </span>
  )

  return (
    <div
      className={`faixa faixa--${variante} ${className}`}
      style={{ '--duracao': `${duracao}s` }}
    >
      <div className="faixa__pista">
        {trilho}
        <span className="faixa__trilho" aria-hidden="true">
          {itens.map((frase, i) => (
            <span className="faixa__item" key={i}>
              {frase}
              <span className="faixa__ponto" />
            </span>
          ))}
        </span>
      </div>
    </div>
  )
}
