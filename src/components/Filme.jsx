import { useEffect, useRef, useState } from 'react'
import { filme } from '../data/campanha.js'
import { useTelaLarga } from '../lib/useTelaLarga.js'

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
   1080p no desktop. A conversão está em `scripts/video.mjs`. Quem decide é a
   tela, não quem monta o componente: `largo` diz "pode usar 1080p", e a
   consulta de mídia diz se vale a pena. Sem isso o jingle descia em 1080p
   (27 MB) no celular, onde ele aparece num vídeo de 340px de largura.

   Quem segura o download é o `preload`, não o `src`. Enquanto o vídeo está
   longe da tela ele fica em `preload="none"`: o navegador mostra o pôster
   (poucas dezenas de KB) e não busca um byte do arquivo. Quando chega perto,
   passa a `metadata` e toca. Sem isso, no desktop os dois arquivos (filme e
   jingle, dezenas de MB somados) começam a descer no mesmo instante em que a
   página monta, disputando banda com as fontes e as fotos do herói — que é o
   que a pessoa está olhando.

   O `src` fica sempre no lugar, e é de propósito: se o observador falhar — aba
   aberta em segundo plano, navegador que o economiza — um vídeo sem `src` teria
   um botão de play que não faz nada. Com o `src` posto e `preload="none"`, o
   pior caso é a pessoa apertar play e o download começar ali.

   Toca sozinho, sem som e em laço, como as peças de rede social — mas com
   controles visíveis, porque tem fala e alguém vai querer ouvir. Quem pediu
   menos movimento no sistema recebe o pôster parado e aperta o play.
   ========================================================================== */
export function Filme({ largo = false, className = '', dados = filme }) {
  const video = useRef(null)
  const telaLarga = useTelaLarga()
  const [perto, setPerto] = useState(false)

  /* Uma margem generosa: o download começa antes de o vídeo aparecer, para que
     ele já esteja pronto quando entrar na tela — mas depois do primeiro
     desenho da página, que é o que importa para quem acabou de abrir o site. */
  useEffect(() => {
    const no = video.current
    if (!no) return

    if (!('IntersectionObserver' in window)) {
      setPerto(true)
      return
    }

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return
        setPerto(true)
        observador.disconnect()
      },
      { rootMargin: '400px 0px' },
    )

    observador.observe(no)
    return () => observador.disconnect()
  }, [])

  useEffect(() => {
    const no = video.current
    if (!no || !perto) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    /* O autoplay pode ser recusado (bateria fraca, economia de dados). Não é
       erro: o pôster e os controles continuam lá. */
    no.play().catch(() => {})
  }, [perto])

  const arquivo = largo && telaLarga ? dados.largo : dados.estreito

  return (
    <video
      ref={video}
      className={`filme__video ${className}`.trim()}
      src={arquivo}
      poster={dados.poster}
      width="1920"
      height="1080"
      preload={perto ? 'metadata' : 'none'}
      controls
      muted
      loop
      playsInline
      aria-label={dados.alt}
    />
  )
}
