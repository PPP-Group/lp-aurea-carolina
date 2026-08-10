/* A faixa que costura a página.

   Nos cartazes, a tarja de fonte expandida ("COM ÁUREA É OUTROS 500") corre na
   borda de cima ou de baixo da peça. Aqui ela é a emenda entre um painel de
   cor e o outro: sempre que a página troca de fundo, a faixa passa.

   O conteúdo é duplicado porque a animação percorre metade da largura e
   recomeça; sem a cópia, o fim do texto entregaria uma faixa vazia. A cópia
   fica escondida do leitor de tela. */
export function Faixa({ frases, variante = 'amarela', velocidade = 42, className = '' }) {
  const trilho = (
    <span className="faixa__trilho">
      {frases.map((frase, i) => (
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
      style={{ '--duracao': `${velocidade}s` }}
    >
      <div className="faixa__pista">
        {trilho}
        <span className="faixa__trilho" aria-hidden="true">
          {frases.map((frase, i) => (
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
