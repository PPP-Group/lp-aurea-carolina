import { identidade, redes, secoes } from '../data/campanha.js'
import { Marca } from './Marca.jsx'
import { Psol } from './Psol.jsx'
import { Flor } from './Flor.jsx'
import { Icone } from './Icone.jsx'

/* O rodapé fecha a página com a assinatura completa da campanha, do mesmo
   jeito que o cartaz fecha na borda de baixo.

   O bloco legal fica de propósito no fim e em corpo menor, mas legível: é
   informação obrigatória de propaganda eleitoral, não letra miúda para
   esconder. CNPJ e responsável vêm de `identidade`, com os dados do registro
   da candidatura no TSE. */
export function Rodape() {
  const ano = new Date().getFullYear()

  return (
    <footer className="rodape grao">
      <div className="luz rodape__luz" aria-hidden="true" />

      <div className="limite rodape__interior">
        <div className="rodape__assinatura">
          <Marca variante="negativa" className="rodape__marca" />
          {/* O mesmo canto do herói, na versão que o manual manda usar sobre
              fundo escuro: a flor amarela, de uso terciário, ao lado do sol do
              partido. O PSOL leva `alt` porque é a única vez em que aparece
              sem o nome escrito ao lado. */}
          <span className="rodape__canto">
            <Flor variante="amarela" tamanho={120} className="rodape__flor" />
            <Psol variante="claro" className="rodape__psol" alt={identidade.partido} />
          </span>
          <p className="rodape__grito">Bora que é possível</p>
        </div>

        <nav className="rodape__mapa" aria-label="Seções da página">
          <h2 className="rodape__rotulo">Nesta página</h2>
          <ul>
            {secoes.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>{s.rotulo}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="rodape__contato">
          <h2 className="rodape__rotulo">Acompanhe</h2>
          <ul className="rodape__redes">
            {redes.map((r) => (
              <li key={r.rede}>
                <a href={r.href} target="_blank" rel="noopener noreferrer">
                  <Icone nome={r.rede} tamanho={22} />
                  <span>{r.rotulo}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="rodape__arroba">{identidade.arroba}</p>

          <a className="rodape__site" href={`https://${identidade.site}`}>
            {identidade.site}
          </a>
        </div>
      </div>

      <div className="limite rodape__legal">
        <p>
          {identidade.nome} · {identidade.cargo} · {identidade.estado} · {identidade.partido} ·{' '}
          {identidade.coligacao}
        </p>
        <p>
          Propaganda eleitoral gratuita. CNPJ da campanha: {identidade.cnpj}. Responsável:{' '}
          {identidade.responsavel}. {ano}.
        </p>
      </div>
    </footer>
  )
}
