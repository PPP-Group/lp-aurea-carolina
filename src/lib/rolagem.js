import Lenis from 'lenis'

/* Rolagem suave. A página é uma pilha de cartazes de cor cheia; a inércia do
   Lenis faz um painel entregar o outro em vez de os dois saltarem.

   Em telas de toque não entra: o iOS já tem a própria inércia, e sobrepor
   uma segunda deixa o scroll pastoso. Quem pediu menos movimento também
   fica de fora. */
export function iniciarRolagem() {
  const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const toque = window.matchMedia('(hover: none)').matches
  if (semMovimento || toque) return () => {}

  const lenis = new Lenis({ duration: 1.05, smoothWheel: true })

  let quadro = 0
  const passo = (tempo) => {
    lenis.raf(tempo)
    quadro = requestAnimationFrame(passo)
  }
  quadro = requestAnimationFrame(passo)

  // Os links do menu apontam para âncoras; sem isso o Lenis e o scroll nativo
  // brigam e a página chega no lugar errado.
  const aoClicar = (evento) => {
    const link = evento.target.closest('a[href^="#"]')
    if (!link) return
    const id = link.getAttribute('href').slice(1)
    const destino = document.getElementById(id)
    if (!destino) return
    evento.preventDefault()
    lenis.scrollTo(destino, { offset: -70 })
  }

  document.addEventListener('click', aoClicar)

  return () => {
    document.removeEventListener('click', aoClicar)
    cancelAnimationFrame(quadro)
    lenis.destroy()
  }
}
