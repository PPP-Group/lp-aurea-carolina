import { useEffect, useRef, useState } from 'react'

const FORMATO = new Intl.NumberFormat('pt-BR')

/* Conta de zero até o valor quando o número entra na tela.

   Os votos da Áurea são o argumento mais forte da página: 17.420 e 162.740
   são números que ela conquistou quando ninguém apostava. Ver o número subir
   é o que faz a pessoa parar para ler o rótulo embaixo dele.

   Quem pediu menos movimento recebe o número pronto, sem contagem. */
export function useContador(alvo, { duracao = 1600 } = {}) {
  const no = useRef(null)
  const [valor, setValor] = useState(0)

  useEffect(() => {
    const elemento = no.current
    if (!elemento) return

    const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (semMovimento || !('IntersectionObserver' in window)) {
      setValor(alvo)
      return
    }

    let quadro = 0
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return
        observador.disconnect()

        const inicio = performance.now()
        const passo = (agora) => {
          const t = Math.min(1, (agora - inicio) / duracao)
          // Desaceleração cúbica: rápido no começo, pousa suave no valor final.
          const suave = 1 - Math.pow(1 - t, 3)
          setValor(Math.round(alvo * suave))
          if (t < 1) quadro = requestAnimationFrame(passo)
        }
        quadro = requestAnimationFrame(passo)
      },
      { threshold: 0.4 },
    )

    observador.observe(elemento)
    return () => {
      observador.disconnect()
      cancelAnimationFrame(quadro)
    }
  }, [alvo, duracao])

  return [no, FORMATO.format(valor)]
}
