import { identidade, redes, secoes } from '../data/campanha.js'
import { Marca } from './Marca.jsx'
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
      <div className="sol rodape__sol" aria-hidden="true" />

      <div className="limite rodape__interior">
        <div className="rodape__assinatura">
          <Marca variante="completa" className="rodape__marca" />
          <p className="rodape__grito">Com Áurea são outros 500</p>
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
