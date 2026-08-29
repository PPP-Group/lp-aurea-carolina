/* ============================================================================
   O SOL DO PSOL
   ----------------------------------------------------------------------------
   O manual põe a marca do partido em toda peça, sempre do mesmo jeito: pequena,
   no canto, logo abaixo da flor de pequi. É exigência legal e é composição — a
   dupla flor + sol é o que assina o canto superior esquerdo dos cartazes.

   Duas versões, uma por fundo, as duas do pacote oficial
   (`10. Pngs de Cobertura / 04. Logo Psol`):

   `claro`   bege palha. Vai sobre o laranja do herói e sobre o vinho do rodapé.
   `escuro`  preto pedra sabão. Vai sobre bege e amarelo.

   O `alt` fica vazio de propósito onde o nome do partido já aparece escrito ao
   lado — repetir "PSOL" em voz alta duas vezes seguidas não informa ninguém.
   Onde a marca aparece sozinha, quem chama passa o `alt`.
   ========================================================================== */

export function Psol({ variante = 'claro', className = '', alt = '' }) {
  return (
    <img
      className={`psol ${className}`.trim()}
      src={`/assets/psol-${variante}.webp`}
      alt={alt}
      width="360"
      height="375"
      decoding="async"
    />
  )
}
