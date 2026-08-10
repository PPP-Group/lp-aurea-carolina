/* Um traço só para todos os ícones: 2px, pontas redondas, sem preenchimento.
   Combina com a Origin, que é uma grotesca de cantos arredondados.

   As exceções são as marcas das redes sociais, que são desenhos fechados e
   precisam vir preenchidas para serem reconhecíveis. */

const TRACO = {
  /* A flor de pequi reduzida ao essencial: cinco pétalas e o miolo. Em 24px o
     desenho completo, com filamentos, vira borrão. */
  flor: (
    <g transform="translate(12 12)">
      <path
        id="petala-icone"
        d="M0 -1.6C-3.4 -3.6 -3 -8.4 0 -10.4 3 -8.4 3.4 -3.6 0 -1.6Z"
        transform="translate(0 0.6)"
      />
      <use href="#petala-icone" transform="rotate(72)" />
      <use href="#petala-icone" transform="rotate(144)" />
      <use href="#petala-icone" transform="rotate(216)" />
      <use href="#petala-icone" transform="rotate(288)" />
      <circle r="1.9" />
    </g>
  ),
  coracao: (
    <path d="M12 20.3s-7.4-4.6-7.4-9.6a4.2 4.2 0 0 1 7.4-2.7 4.2 4.2 0 0 1 7.4 2.7c0 5-7.4 9.6-7.4 9.6Z" />
  ),
  relogio: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.2V12l3.2 1.9" />
    </>
  ),
  serra: (
    <>
      <path d="M2.5 18.5 8.2 9l3.4 5.2L14.9 9l6.6 9.5Z" />
      <path d="M2.5 21.5h19" />
    </>
  ),
  chave: (
    <>
      <circle cx="7.6" cy="14.4" r="3.9" />
      <path d="m10.6 11.9 8-8 2.9 2.9-1.9 1.9-1.7-1.7M15.9 8.6l1.7 1.7" />
    </>
  ),
  escudo: (
    <>
      <path d="M12 2.9 4.8 5.8v5.6c0 4.3 3 8.2 7.2 9.7 4.2-1.5 7.2-5.4 7.2-9.7V5.8Z" />
      <path d="m9 12 2.2 2.2L15.4 10" />
    </>
  ),
  balanca: (
    <>
      <path d="M12 3.6v17M6.6 20.4h10.8M4.4 7.2h15.2M12 5.4l7.6 1.8M12 5.4 4.4 7.2" />
      <path d="M4.4 7.2 1.9 13.1a2.7 2.7 0 0 0 5 0ZM19.6 7.2l-2.5 5.9a2.7 2.7 0 0 0 5 0Z" />
    </>
  ),
  seta: <path d="M5 12h14m-5.6-5.6L19 12l-5.6 5.6" />,
  descer: <path d="M12 5v14m5.6-5.6L12 19l-5.6-5.6" />,
  tocar: (
    <>
      <path d="M9.4 11V6.3a1.8 1.8 0 1 1 3.6 0v8" />
      <path d="M13 10.6a1.6 1.6 0 0 1 3.2 0v.9M16.2 11.9a1.6 1.6 0 0 1 3.2 0v3.2A6 6 0 0 1 13.4 21h-1a5 5 0 0 1-4.2-2.3l-2.5-3.9a1.7 1.7 0 0 1 2.7-2l1 1.2" />
    </>
  ),
  mais: <path d="M12 5.5v13M5.5 12h13" />,
  fechar: <path d="M6 6l12 12M18 6 6 18" />,
  baixar: <path d="M12 4v11m-4.4-4.4L12 15l4.4-4.4M4.5 19.5h15" />,
}

const CHEIO = {
  instagram: (
    <path d="M12 2.2c-2.7 0-3 0-4.1.1-1 0-1.8.2-2.4.5a4.8 4.8 0 0 0-1.8 1.1 4.8 4.8 0 0 0-1.1 1.8c-.3.6-.4 1.3-.5 2.4C2 9.2 2 9.5 2 12.2s0 3 .1 4.1c0 1 .2 1.8.5 2.4a4.8 4.8 0 0 0 1.1 1.8 4.8 4.8 0 0 0 1.8 1.1c.6.3 1.3.4 2.4.5 1.1 0 1.4.1 4.1.1s3 0 4.1-.1c1 0 1.8-.2 2.4-.5a5.1 5.1 0 0 0 2.9-2.9c.3-.6.4-1.3.5-2.4 0-1.1.1-1.4.1-4.1s0-3-.1-4.1c0-1-.2-1.8-.5-2.4a4.8 4.8 0 0 0-1.1-1.8 4.8 4.8 0 0 0-1.8-1.1c-.6-.3-1.3-.4-2.4-.5-1.1 0-1.4-.1-4.1-.1Zm0 1.8c2.7 0 3 0 4 .1.9 0 1.4.2 1.8.3.4.2.7.4 1 .7.3.3.5.6.7 1 .1.4.3.9.3 1.8.1 1 .1 1.3.1 4s0 3-.1 4c0 .9-.2 1.4-.3 1.8-.2.4-.4.7-.7 1-.3.3-.6.5-1 .7-.4.1-.9.3-1.8.3-1 .1-1.3.1-4 .1s-3 0-4-.1c-.9 0-1.4-.2-1.8-.3-.4-.2-.7-.4-1-.7a2.7 2.7 0 0 1-.7-1c-.1-.4-.3-.9-.3-1.8-.1-1-.1-1.3-.1-4s0-3 .1-4c0-.9.2-1.4.3-1.8.2-.4.4-.7.7-1 .3-.3.6-.5 1-.7.4-.1.9-.3 1.8-.3 1-.1 1.3-.1 4-.1Zm0 3.1a5.1 5.1 0 1 0 0 10.2 5.1 5.1 0 0 0 0-10.2Zm0 8.4a3.3 3.3 0 1 1 0-6.6 3.3 3.3 0 0 1 0 6.6Zm6.5-8.6a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Z" />
  ),
  x: (
    <path d="M17.2 3h3.3l-7.2 8.2L21.8 21h-6.6l-5.2-6.8L4.1 21H.8l7.7-8.8L.5 3h6.8l4.7 6.2Zm-1.2 16h1.8L6.1 4.8H4.2Z" />
  ),
  facebook: (
    <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.5-3.92 3.77-3.92 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.9h2.78l-.45 2.9h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
  ),
  linkedin: (
    <path d="M6.2 21H2.6V9.2h3.6V21ZM4.4 7.6a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2ZM21.4 21h-3.6v-5.7c0-1.4 0-3.1-1.9-3.1s-2.2 1.5-2.2 3v5.8H10V9.2h3.4v1.6h.1a3.8 3.8 0 0 1 3.4-1.9c3.6 0 4.3 2.4 4.3 5.5V21Z" />
  ),
  whatsapp: (
    <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm5.8 14.1c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.8-.6-3-1.3-5-4.4-5.2-4.6-.1-.2-1.2-1.6-1.2-3s.7-2.1 1-2.4c.2-.3.5-.4.7-.4h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2 0 .4-.1.5l-.3.4-.4.4c-.1.1-.3.3-.1.6.1.3.7 1.2 1.5 1.9 1 .9 1.8 1.2 2.1 1.3.3.1.4.1.6-.1l.9-1c.2-.2.4-.2.6-.1l2 1c.2.1.4.2.4.3.1.2.1.7-.1 1.4Z" />
  ),
}

export function Icone({ nome, tamanho = 24, className = '', ...resto }) {
  const cheio = CHEIO[nome]
  const desenho = cheio ?? TRACO[nome]
  if (!desenho) return null

  return (
    <svg
      className={className}
      width={tamanho}
      height={tamanho}
      viewBox="0 0 24 24"
      fill={cheio ? 'currentColor' : 'none'}
      stroke={cheio ? 'none' : 'currentColor'}
      strokeWidth={cheio ? 0 : 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...resto}
    >
      {desenho}
    </svg>
  )
}
