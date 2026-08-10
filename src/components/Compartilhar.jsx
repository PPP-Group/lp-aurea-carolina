import { useState } from 'react'
import { Icone } from './Icone.jsx'

const MENSAGEM =
  'Áurea Carolina é candidata ao Senado por Minas Gerais. Com Áurea são outros 500. Bora vencer!'

/* Botão flutuante de compartilhar.

   Campanha se ganha no boca a boca, e no Brasil o boca a boca é o WhatsApp.
   Onde o navegador tem a folha de compartilhamento nativa (praticamente todo
   celular), usa ela: sai no app que a pessoa já usa. No desktop cai no
   WhatsApp Web, que é o destino mais provável de qualquer jeito.

   Só aparece depois que a pessoa passou do herói: pedir compartilhamento antes
   de a pessoa ler qualquer coisa é pedir cedo demais. */
export function Compartilhar() {
  const [copiado, setCopiado] = useState(false)

  const compartilhar = async () => {
    const url = window.location.href

    if (navigator.share) {
      try {
        await navigator.share({ title: 'Áurea Carolina 500', text: MENSAGEM, url })
        return
      } catch {
        // A pessoa fechou a folha de compartilhamento. Não é erro.
        return
      }
    }

    window.open(
      `https://wa.me/?text=${encodeURIComponent(`${MENSAGEM} ${url}`)}`,
      '_blank',
      'noopener',
    )
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2400)
  }

  return (
    <button className="compartilhar" type="button" onClick={compartilhar}>
      <Icone nome="whatsapp" tamanho={24} />
      <span className="compartilhar__texto">{copiado ? 'Abrindo…' : 'Compartilhar'}</span>
    </button>
  )
}
