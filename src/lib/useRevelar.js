import { useEffect, useRef } from 'react'

/* Marca o elemento como visível quando ele entra na tela. O CSS cuida do
   resto: a classe `.revelar` já traz o estado inicial e a transição.

   Observa uma vez e desliga. Quem já apareceu não volta a sumir, porque
   reanimar no scroll de volta cansa mais do que encanta. */
export function useRevelar({ margem = '0px 0px -12% 0px' } = {}) {
  const alvo = useRef(null)

  useEffect(() => {
    const no = alvo.current
    if (!no) return

    if (!('IntersectionObserver' in window)) {
      no.dataset.visivel = 'sim'
      return
    }

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return
        no.dataset.visivel = 'sim'
        observador.disconnect()
      },
      { rootMargin: margem, threshold: 0.05 },
    )

    observador.observe(no)
    return () => observador.disconnect()
  }, [margem])

  return alvo
}
