/* ============================================================================
   CONTEÚDO DA CAMPANHA
   ----------------------------------------------------------------------------
   Todo texto abaixo veio do documento "TEXTOS SITE ÁUREA" (versão atualizada),
   enviado para aprovação. Não reescreva aqui: se a redação mudar, ela muda no
   documento e depois neste arquivo.

   O documento atualizado entrega cada bandeira em dois parágrafos corridos,
   sem versão curta separada. `chamada` é o primeiro parágrafo, literal;
   `completa` guarda o segundo, que só aparece quando a pessoa abre o cartão.
   ========================================================================== */

export const identidade = {
  nome: 'Áurea Carolina',
  cargo: 'Senadora',
  cargoCompleto: 'Senado Federal',
  estado: 'Minas Gerais',
  numero: '500',
  partido: 'PSOL',
  coligacao: 'Time do Lula',
  site: 'www.aureacarolina.com',
  arroba: '@aureacarolina',
  slogan: 'A senadora do povo mineiro',
}

export const hero = {
  tarja: 'A senadora do povo mineiro',
  grito: ['Bora', 'vencer'],
  apoio:
    'Áurea Carolina é candidata ao Senado Federal por Minas Gerais. Cientista política, educadora popular, a mulher mais votada do estado em 2018.',
  chamadaPrimaria: { texto: 'Ensaiar meu voto', href: '#urna' },
  chamadaSecundaria: { texto: 'Ver as bandeiras', href: '#bandeiras' },
}

export const faixa = [
  'Com Áurea são outros 500',
  'Bora vencer',
  'A senadora do povo mineiro',
  'Minas Gerais mais forte no Senado',
]

/* ---------------------------------------------------------------------------
   QUEM SOU EU
   ------------------------------------------------------------------------- */

export const quem = {
  tarja: 'Quem sou eu',
  titulo: 'Sou Áurea Carolina',
  paragrafos: [
    'Nasci em Tucuruí, no Pará, e vim pra Belo Horizonte ainda criança. Cresci no bairro João Pinheiro, estudei em escola pública a vida inteira e sou mãe solo. Antes de qualquer cargo que eu tenha ocupado, sou de uma família de mulheres batalhadoras.',
    'Me formei em Ciências Sociais na UFMG, com bolsa de assistência estudantil. Fiz especialização em Gênero e Igualdade na Universitat Autònoma de Barcelona e mestrado em Ciência Política, também na UFMG.',
  ],
  destaque:
    'Entrei na política pelos movimentos sociais: juventude periférica, movimento negro, movimento de mulheres. Não vim de família com nome na política, nem tinha dinheiro pra fazer uma grande campanha. Em 2016, fiz história ao me tornar a vereadora mais votada de Belo Horizonte. Em 2018, fui a mulher mais votada de Minas Gerais para deputada federal. Nas duas vezes, quase ninguém apostava que seria possível. Nas duas vezes, o povo decidiu pela vitória.',
  fecho:
    'Sou cientista política e educadora popular. Criei, com outras mulheres, a Gabinetona, o primeiro mandato coletivo e popular de Belo Horizonte. Fui vice-presidenta da CPI de Brumadinho. Sou uma das 100 jovens negras mais influentes do mundo, segundo o MIPAD/ONU.',
}

export const principios = {
  tarja: 'O que eu levo pra onde eu vou',
  itens: [
    {
      titulo: 'Coragem pra enfrentar',
      texto:
        'As pautas duras eu enfrento no papo reto, sem medir palavras pra não incomodar quem sempre teve poder.',
      cor: 'laranja',
    },
    {
      titulo: 'Construção coletiva',
      texto:
        'Não creio em protagonismo solitário. A Gabinetona provou que dividir poder multiplica resultado.',
      cor: 'roxo',
    },
    {
      titulo: 'Compromisso com quem foi historicamente deixado de lado',
      texto:
        'Mulheres, população negra, periferias, juventudes. É ao lado dessas pessoas que eu quero estar.',
      cor: 'verde',
    },
  ],
  fecho:
    'Ninguém chega no Senado por acaso. Eu cheguei até aqui com trabalho, formação e o povo do meu lado. É assim que eu sigo.',
}

/* ---------------------------------------------------------------------------
   ATUAÇÃO INSTITUCIONAL
   Os números que a campanha pode provar. `valor` é o que anima, `unidade` é o
   que fica parado do lado.
   ------------------------------------------------------------------------- */

export const provas = {
  tarja: 'Atuação institucional',
  titulo: 'O que já foi feito',
  itens: [
    {
      valor: 17420,
      unidade: 'votos',
      rotulo: 'Vereadora mais votada de Belo Horizonte',
      detalhe: '2016, pelo PSOL',
    },
    {
      valor: 162740,
      unidade: 'votos',
      rotulo: 'Mulher mais votada de Minas Gerais para deputada federal',
      detalhe: '2018',
    },
    {
      valor: 9,
      unidade: 'projetos',
      rotulo: 'Projetos de lei aprovados no mandato federal',
      detalhe: 'Entre eles o Aldir Blanc e o Morada Segura',
    },
    {
      valor: 70,
      unidade: 'milhões',
      prefixo: 'R$ ',
      aproximado: true,
      rotulo: 'Em emendas definidas por consulta popular',
      detalhe: 'Programa Emenda Geral, 179 propostas entre 2019 e 2022',
    },
    {
      palavra: 'Gabinetona',
      rotulo: 'O primeiro mandato coletivo e popular de Belo Horizonte',
      detalhe: 'Criado com Cida Falabella e Bella Gonçalves',
    },
    {
      palavra: 'Brumadinho',
      rotulo: 'Vice-presidenta da CPI que apurou o desastre',
      detalhe: 'Indiciou 14 pessoas por homicídio, entre elas o ex-presidente da Vale',
    },
  ],
}

/* ---------------------------------------------------------------------------
   TRAJETÓRIA
   Uma sequência de verdade: por isso os anos aparecem grandes e em ordem.
   ------------------------------------------------------------------------- */

export const trajetoria = {
  tarja: 'Minha trajetória',
  titulo: 'De Tucuruí ao Senado',
  marcos: [
    {
      ano: '1983',
      texto:
        'Nasço em Tucuruí, no Pará. Ainda criança, minha família se muda pra Belo Horizonte, onde cresço e estudo em escola pública.',
    },
    {
      ano: '1999',
      texto:
        'Entro no CEFET-MG para o ensino médio. É nessa época que as questões de periferia, juventude, gênero e raça começam a marcar minha formação política.',
    },
    { ano: '2002', texto: 'Ingresso na graduação em Ciências Sociais na UFMG.' },
    {
      ano: '2004',
      ate: '2006',
      texto:
        'Participo da criação do Fórum das Juventudes da Grande BH e me torno conselheira municipal de juventude.',
    },
    {
      ano: '2010',
      texto:
        'Recebo bolsa da Fundación Carolina e vou pra Espanha fazer especialização em Gênero e Igualdade na Universitat Autònoma de Barcelona.',
    },
    {
      ano: '2015',
      texto:
        'Assumo a Subsecretaria de Políticas para as Mulheres de Minas Gerais e concluo o mestrado em Ciência Política na UFMG.',
    },
    {
      ano: '2016',
      texto:
        'Sou eleita vereadora de Belo Horizonte com 17.420 votos, a mais votada da cidade, pelo PSOL. Construímos a Gabinetona, mandato aberto, coletivo e popular, ao lado de Cida Falabella e Bella Gonçalves.',
      marco: true,
    },
    {
      ano: '2018',
      texto:
        'Sou eleita deputada federal por Minas Gerais com 162.740 votos, a mulher mais votada do estado.',
      marco: true,
    },
    {
      ano: '2019',
      ate: '2022',
      texto:
        'No mandato federal, sou vice-presidenta da CPI de Brumadinho, tenho 9 projetos de lei aprovados e destino quase R$ 70 milhões em emendas parlamentares por consulta popular, através do Emenda Geral.',
    },
    {
      ano: '2019',
      texto: 'Sou eleita uma das 100 jovens negras mais influentes do mundo pelo MIPAD/ONU.',
    },
    {
      ano: '2020',
      texto: 'Recebo o Prêmio Congresso em Foco na categoria Clima e Sustentabilidade.',
    },
    {
      ano: '2022',
      texto:
        'Integro a equipe de transição do governo Lula, no grupo de trabalho da Cultura, que ajudou a reconstruir o Ministério da Cultura e garantir orçamento para as políticas culturais.',
    },
    {
      ano: '2023',
      texto:
        'Assumo a Diretoria Executiva do NOSSAS (que hoje se chama BONDE), organização de mobilização social e formação ativista, comprometida com democracia e justiça social.',
    },
    {
      ano: '2023',
      texto:
        'Sou selecionada para integrar o Keseb Democracy Fellowship, programa internacional dedicado ao fortalecimento da democracia.',
    },
    {
      ano: '2024',
      texto:
        'Recebo homenagem da UFMG como a parlamentar que mais destinou recursos de emendas individuais em toda a história da instituição.',
    },
    {
      ano: '2025',
      texto:
        'Sou selecionada para o Tällberg Leaders Mentoring Leaders, programa internacional de mentoria para lideranças emergentes.',
    },
    {
      ano: '2026',
      texto: 'Sou candidata ao Senado Federal por Minas Gerais, pelo PSOL.',
      marco: true,
      agora: true,
    },
  ],
}

/* ---------------------------------------------------------------------------
   BANDEIRAS
   `chamada` é o primeiro parágrafo do documento; `completa` guarda o segundo,
   que só entra na tela quando a pessoa abre o cartão.
   ------------------------------------------------------------------------- */

export const bandeiras = {
  tarja: 'Minhas bandeiras',
  titulo: 'Sete compromissos',
  apoio:
    'Toque em cada bandeira para ler o compromisso inteiro, com o que já foi feito e o que vem pela frente.',
  itens: [
    {
      id: 'mulheres',
      titulo: 'Mulheres vivas',
      cor: 'roxo',
      icone: 'flor',
      chamada:
        'Chega de violência e de feminicídio. A gente quer fortalecer as políticas de prevenção, garantir educação para o respeito e lutar por um percentual fixo de emendas parlamentares para o enfrentamento da violência contra mulheres e meninas, para que a rede de proteção funcione de verdade, com delegacia especializada, casa abrigo e atendimento psicossocial em todos os municípios.',
      completa: [
        'Essa luta atravessa minha trajetória. Em Belo Horizonte, apresentei o Morada Segura, que virou lei e garante prioridade em programas habitacionais para mulheres em situação de violência atendidas pelos serviços públicos. No Congresso, integrei comissões dedicadas ao enfrentamento da violência doméstica e da violência contra as mulheres. No Senado, quero levar a Lei Maria da Penha pra dentro das escolas, cobrar responsabilização das plataformas pela violência digital contra mulher e avançar num pacto nacional pelo fim do feminicídio, com financiamento garantido.',
      ],
    },
    {
      id: 'sus',
      titulo: 'SUS mais forte',
      cor: 'laranja',
      icone: 'coracao',
      chamada:
        'Acreditamos no SUS e vamos lutar para fortalecê-lo. Saúde perto de casa, atenção básica funcionando, saúde mental levada a sério e profissional valorizado são prioridades. O cuidado precisa chegar onde as pessoas vivem e reduzir as desigualdades entre as regiões de Minas.',
      completa: [
        'No Senado, quero defender financiamento federal permanente para atenção básica e saúde mental, com prioridade para os municípios do interior. Defendo recompor o recurso que hoje falta na rede de saúde mental e rever a destinação de dinheiro público que vai pra comunidade terapêutica em vez de ir pro cuidado de verdade.',
      ],
    },
    {
      id: 'trabalho',
      titulo: 'Vida além do trabalho',
      cor: 'amarelo',
      icone: 'relogio',
      chamada:
        'As pessoas precisam trabalhar para viver, e não viver para trabalhar. Defendo o fim da escala 6x1, trabalho decente, renda que acompanhe o custo de vida e políticas de cuidado pra quem cuida de criança, de idoso e de pessoa doente.',
      completa: [
        'Quem entrega comida de app, quem é diarista, quem faz bico atrás de bico merece proteção que hoje não existe. No Senado, vou brigar pelo fim da escala 6x1, pela atualização da legislação trabalhista pra alcançar autônomo, intermitente, diarista e entregador, e por políticas de cuidado como direito, não como favor.',
      ],
    },
    {
      id: 'riquezas',
      titulo: 'Firmeza com nossas riquezas',
      cor: 'verde',
      icone: 'serra',
      chamada:
        'Minas Gerais conhece bem o preço de um modelo de mineração que coloca o lucro acima das pessoas e dos territórios. Defendo nossas serras, nossas águas, nossas comunidades e a soberania sobre as riquezas do nosso estado.',
      completa: [
        'No Senado, quero soberania sobre mineral estratégico como lítio e terras raras, pra que Jequitinhonha e Sul de Minas não sejam só fonte de riqueza pra quem já tem poder. Defendo a responsabilização criminal de verdade pelos crimes de mineração, não só acordo que monetiza o crime. Justiça climática também é justiça social. Não existe desenvolvimento em terra arrasada.',
      ],
    },
    {
      id: 'cultura',
      titulo: 'Cultura é chave',
      cor: 'vinho',
      icone: 'chave',
      chamada:
        'Cultura é identidade, memória, trabalho e renda. É parte de quem somos e também uma força importante da nossa economia.',
      completa: [
        'No Senado, quero taxar as plataformas de streaming que hoje lucram com a produção cultural brasileira sem devolver nada pro país, e usar esse recurso pra manter o fomento à cultura de pé em Minas Gerais.',
      ],
    },
    {
      id: 'golpe',
      titulo: 'Chega de golpe',
      cor: 'laranja',
      icone: 'escudo',
      chamada:
        'Lutamos por uma internet segura para pessoas de todas as idades. A conta do golpe não pode ficar com quem foi enganado.',
      completa: [
        'A plataforma lucra com anúncios fraudulentos, independentemente de quem cai. No Senado, quero levar esse debate além do discurso de "dever de cuidado": defendo responsabilização financeira direta das plataformas, com devolução da receita de anúncios fraudulentos pra quem foi vítima.',
      ],
    },
    {
      id: 'stf',
      titulo: 'De olho no STF',
      cor: 'roxo',
      icone: 'balanca',
      chamada:
        'Ninguém está acima da lei. Precisamos de um Supremo Tribunal Federal forte, transparente, representativo e comprometido com a Constituição e com a defesa da democracia.',
      completa: [
        'As instituições brasileiras precisam refletir a diversidade do nosso povo. O Brasil nunca teve uma ministra negra no STF. Está mais do que na hora de mudar essa história.',
      ],
    },
  ],
}

/* ---------------------------------------------------------------------------
   URNA
   ------------------------------------------------------------------------- */

export const urna = {
  tarja: 'Ensaia comigo',
  titulo: 'Seu voto para senadora',
  apoio:
    'São dois votos para senador nesta eleição. Um deles pode ser 500. Digite aqui e veja como vai aparecer na urna no dia.',
}

/* ---------------------------------------------------------------------------
   PEÇAS
   ------------------------------------------------------------------------- */

export const pecas = {
  tarja: 'A campanha nas ruas',
  titulo: 'Leva junto',
  apoio:
    'As peças oficiais da campanha. Baixe, compartilhe, cole no seu perfil, imprima e leve pro seu bairro.',
  itens: [
    { arquivo: 'peca-02', alvo: 'Bora vencer', proporcao: '3 / 4' },
    { arquivo: 'peca-01', alvo: 'Bora que é possível', proporcao: '3 / 4' },
    { arquivo: 'peca-05', alvo: 'A senadora do povo mineiro', proporcao: '1126 / 1597' },
    { arquivo: 'peca-03', alvo: 'Áurea, com Áurea é outros 500', proporcao: '3 / 4' },
    { arquivo: 'peca-08', alvo: 'Minas Gerais mais forte no Senado', proporcao: '1126 / 1597' },
    { arquivo: 'peca-09', alvo: 'Áurea Carolina, com Áurea é outros 500', proporcao: '1126 / 1597' },
    { arquivo: 'peca-10', alvo: 'Bora vencer, 500', proporcao: '1126 / 1597' },
    { arquivo: 'peca-07', alvo: 'Flor de pequi, símbolo da campanha', proporcao: '1126 / 1597' },
  ],
}

/* ---------------------------------------------------------------------------
   QUERO APOIAR A CAMPANHA
   Quatro portas de entrada, na ordem do menor para o maior compromisso: ler no
   zap, aparecer numa atividade, doar, e — pra quem mora longe de BH — pedir
   material. Cada uma cai numa cor cheia diferente, como as bandeiras.
   ------------------------------------------------------------------------- */

export const apoiar = {
  tarja: 'Quero apoiar a campanha',
  titulo: 'Toda ajuda entra no jogo',
  apoio: 'Não dá pra vencer sozinha. Escolhe como você quer estar dentro dessa campanha.',
  itens: [
    {
      id: 'zap',
      titulo: 'Entra no grupo do zap',
      texto:
        'Recebe as novidades da campanha, as convocações e o material pra compartilhar direto no seu WhatsApp.',
      cta: 'Entrar no grupo',
      href: 'https://chat.whatsapp.com/Bfb3e2bsvrt1SWnUV7f8kB',
      icone: 'whatsapp',
      cor: 'verde',
    },
    {
      id: 'bonde',
      titulo: 'Entra no Bonde da Áurea',
      texto:
        'Seja voluntária ou voluntário: ajuda na rua, na militância, nas redes. Todo mundo tem lugar no bonde.',
      cta: 'Quero ser voluntária(o)',
      href: 'https://docs.google.com/forms/d/e/1FAIpQLSftATtjysqWaWVUUiztqOoTIfzu3P_u-J9HG7DmdjxCuHAYgA/viewform',
      icone: 'mao',
      cor: 'laranja',
    },
    {
      id: 'doacao',
      titulo: 'Faz uma doação',
      texto:
        'Campanha popular se sustenta com quem acredita nela. Qualquer valor ajuda a levar a Áurea pra mais gente.',
      cta: 'Doar agora',
      href: 'https://doarpara.com.br/aurea',
      icone: 'coracao',
      cor: 'roxo',
    },
    {
      id: 'material',
      titulo: 'Recebe material no interior',
      texto:
        'Mora fora de Belo Horizonte? Pede santinho e adesivo da campanha pra levar pro seu município pelo grupo do zap.',
      cta: 'Pedir pelo zap',
      href: 'https://chat.whatsapp.com/Bfb3e2bsvrt1SWnUV7f8kB',
      icone: 'caixa',
      cor: 'amarelo',
    },
  ],
}

/* ---------------------------------------------------------------------------
   NAVEGAÇÃO
   ------------------------------------------------------------------------- */

export const secoes = [
  { id: 'quem', rotulo: 'Quem sou' },
  { id: 'provas', rotulo: 'O que fiz' },
  { id: 'trajetoria', rotulo: 'Trajetória' },
  { id: 'bandeiras', rotulo: 'Bandeiras' },
  { id: 'urna', rotulo: 'Seu voto' },
  { id: 'pecas', rotulo: 'Peças' },
  { id: 'apoiar', rotulo: 'Apoiar' },
]

export const redes = [
  { rede: 'instagram', rotulo: 'Instagram', href: 'https://instagram.com/aureacarolina' },
  { rede: 'x', rotulo: 'X', href: 'https://x.com/aureacarolina' },
  { rede: 'facebook', rotulo: 'Facebook', href: 'https://facebook.com/aureacarolina' },
  { rede: 'linkedin', rotulo: 'LinkedIn', href: 'https://linkedin.com/in/aureacarolina' },
]
