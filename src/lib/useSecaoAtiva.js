import { useEffect, useState } from 'react'

/* Diz qual seção está sob a barra agora, para o menu marcar onde a pessoa
   está. A linha de leitura fica a 40% da altura da janela: é onde o olho
   costuma estar quando a pessoa para de rolar. */
export function useSecaoAtiva(ids) {
  const [ativa, setAtiva] = useState(ids[0] ?? null)

  useEffect(() => {
    if (!ids.length) return

    const medir = () => {
      const linha = window.innerHeight * 0.4
      let atual = null

      for (const id of ids) {
        const no = document.getElementById(id)
        if (!no) continue
        const { top, bottom } = no.getBoundingClientRect()
        if (top <= linha && bottom > linha) {
          atual = id
          break
        }
      }

      setAtiva(atual)
    }

    medir()
    window.addEventListener('scroll', medir, { passive: true })
    window.addEventListener('resize', medir)
    return () => {
      window.removeEventListener('scroll', medir)
      window.removeEventListener('resize', medir)
    }
  }, [ids])

  return ativa
}
