import { useEffect, useState } from 'react'

/* Os 62rem são o mesmo ponto onde o CSS do herói vira duas colunas. Está aqui
   em JS, e não só em CSS, porque o vídeo muda de lugar na página — no celular
   ele fica dentro do herói, no desktop vira seção própria — e esconder um dos
   dois com `display: none` faria o navegador baixar os dois arquivos. */
const CONSULTA = '(min-width: 62rem)'

export function useTelaLarga() {
  const [larga, setLarga] = useState(() => window.matchMedia(CONSULTA).matches)

  useEffect(() => {
    const mq = window.matchMedia(CONSULTA)
    const aoMudar = (e) => setLarga(e.matches)
    mq.addEventListener('change', aoMudar)
    return () => mq.removeEventListener('change', aoMudar)
  }, [])

  return larga
}
