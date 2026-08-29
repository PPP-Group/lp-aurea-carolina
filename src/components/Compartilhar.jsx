import { zap } from '../data/campanha.js'
import { Icone } from './Icone.jsx'

/* Balão flutuante do zap.

   Antes daqui saía um "compartilhar": abria a folha do sistema com um texto
   pronto sobre a campanha. A campanha preferiu o caminho inverso — em vez de
   mandar a pessoa falar com os outros, abrir a conversa com a campanha. É o
   número principal, o mesmo do material impresso, e o link permanente do
   WhatsApp já entra com a mensagem inicial.

   Continua sendo um `<a>` e não um botão: é navegação para outro lugar, o
   celular abre no app instalado e o desktop cai no WhatsApp Web. */
export function Compartilhar() {
  return (
    <a
      className="compartilhar"
      href={zap.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${zap.chamada}: falar com a campanha no WhatsApp, ${zap.numero}`}
    >
      <Icone nome="whatsapp" tamanho={24} />
      <span className="compartilhar__texto">{zap.chamada}</span>
    </a>
  )
}
