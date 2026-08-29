import { useEffect, useRef } from 'react'
import { filme } from '../data/campanha.js'

/* ============================================================================
   O FILME DA CAMPANHA
   ----------------------------------------------------------------------------
   O mesmo componente monta qualquer um dos dois vídeos (`filme` ou `jingle`,
   ver `data/campanha.js`) — por isso recebe `dados`, em vez de importar um
   arquivo fixo. O `filme` (original) aparece em dois lugares: no celular,
   dentro do herói, no lugar do retrato recortado; no desktop, numa seção
   própria logo abaixo. O `jingle` só existe na seção dele, mais adiante na
   página. Quem decide se o herói mostra o retrato ou o filme é o
   `useTelaLarga` — só um dos dois é montado por vez, senão o navegador
   baixaria os dois arquivos.

   O arquivo é escolhido pelo mesmo critério nos dois vídeos: 720p no celular,
   1080p no desktop. A conversão está em `scripts/video.mjs`.

   Toca sozinho, sem som e em laço, como as peças de rede social — mas com
   controles visíveis, porque tem fala e alguém vai querer ouvir. Quem pediu
   menos movimento no sistema recebe o pôster parado e aperta o play. */
export function Filme({ largo = false, className = '', dados = filme }) {
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
      src={largo ? dados.largo : dados.estreito}
      poster={dados.poster}
      width="1920"
      height="1080"
      preload="metadata"
      controls
      muted
      loop
      playsInline
      aria-label={dados.alt}
    />
  )
}
