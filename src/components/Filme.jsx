import { useEffect, useRef } from 'react'
import { filme } from '../data/campanha.js'

/* ============================================================================
   O FILME DA CAMPANHA
   ----------------------------------------------------------------------------
   O mesmo vídeo aparece em dois lugares diferentes da página, e por isso é
   componente: no celular ele ocupa o lugar do retrato recortado dentro do
   herói; no desktop, o retrato fica e o filme vira uma seção logo abaixo.
   Quem decide qual dos dois existe é o `useTelaLarga` — só um é montado por
   vez, senão o navegador baixaria os dois arquivos.

   O arquivo é escolhido pelo mesmo critério: 720p no celular (5,5 MB), 1080p
   no desktop (14 MB). O master de 80 MB fica fora da web; a conversão está em
   `scripts/video.mjs`.

   Toca sozinho, sem som e em laço, como as peças de rede social — mas com
   controles visíveis, porque tem fala e alguém vai querer ouvir. Quem pediu
   menos movimento no sistema recebe o pôster parado e aperta o play. */
export function Filme({ largo = false, className = '' }) {
  const video = useRef(null)

  useEffect(() => {
    const no = video.current
    if (!no) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    /* O autoplay pode ser recusado (bateria fraca, economia de dados). Não é
       erro: o pôster e os controles continuam lá. */
    no.play().catch(() => {})
  }, [])

  return (
    <video
      ref={video}
      className={`filme__video ${className}`.trim()}
      src={largo ? filme.largo : filme.estreito}
      poster={filme.poster}
      width="1920"
      height="1080"
      preload="metadata"
      controls
      muted
      loop
      playsInline
      aria-label={filme.alt}
    />
  )
}
