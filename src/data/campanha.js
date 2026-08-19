/* ============================================================================
   CONTEÚDO DA CAMPANHA
   ----------------------------------------------------------------------------
   Todo texto abaixo veio do documento "TEXTOS SITE ÁUREA" (versão atualizada),
   enviado para aprovação. Não reescreva aqui: se a redação mudar, ela muda no
   documento e depois neste arquivo.

   Os textos aqui são cópia literal do documento, sem resumo e sem troca de
   pessoa: onde o documento diz "nós", o site diz "nós". Nas bandeiras,
   `chamada` é o primeiro parágrafo do documento e `completa` guarda o segundo,
   que só aparece quando a pessoa abre o cartão.
   ========================================================================== */

export const identidade = {
  nome: 'Áurea Carolina',
  cargo: 'Senadora',
  cargoCompleto: 'Senado Federal',
  estado: 'Minas Gerais',
  numero: '500',
  partido: 'PSOL',
  coligacao: 'Time do Lula',
  cnpj: '68.571.277/0001-08',
  responsavel: 'Áurea Carolina',
  site: 'www.aureacarolina.com',
  arroba: '@aureacarolina',
  slogan: 'A senadora do povo mineiro',
}

/* ---------------------------------------------------------------------------
   O FILME
   Convertido do master que a campanha entregou. Ver `scripts/video.mjs`.
   ------------------------------------------------------------------------- */

export const filme = {
  largo: '/assets/video/aurea-1080.mp4',
  estreito: '/assets/video/aurea-720.mp4',
  poster: '/assets/video/aurea-poster.webp',
  alt: 'Vídeo de campanha de Áurea Carolina, candidata ao Senado por Minas Gerais.',
  tarja: 'O filme da campanha',
  titulo: 'Bora vencer',
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
    'Entrei na política pelos movimentos sociais: juventude periférica, movimento negro, movimento de mulheres. Não sou herdeira, nem vim de família com nome na política. Em 2016, fiz história ao me tornar a vereadora mais votada de Belo Horizonte. Em 2018, fui a mulher mais votada de Minas Gerais para deputada federal. Nas duas vezes, disseram que seria impossível. Nas duas vezes, o povo decidiu pela vitória.',
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
        'Não acredito em protagonismo solitário. A Gabinetona provou que dividir poder multiplica resultado.',
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
   A lista do documento, inteira e sem corte. O número não é reescrito num
   rótulo à parte: ele fica onde sempre esteve, dentro da frase aprovada, e só
   muda de tamanho.
   ------------------------------------------------------------------------- */

export const provas = {
  tarja: 'Atuação institucional',
  titulo: 'Política que transforma',
  /* Cada item é uma linha do documento, copiada inteira e na ordem em que
     aparece lá. `realce` nunca é texto novo: é sempre um pedaço da própria
     frase, o pedaço que muda de tipografia. `contar` faz o número dentro
     desse pedaço subir do zero quando ele entra na tela. */
  itens: [
    {
      texto: 'Vereadora mais votada de Belo Horizonte em 2016, com 17.420 votos',
      realce: '17.420',
      contar: true,
    },
    {
      texto:
        'Criadora da Gabinetona, primeiro mandato coletivo e popular de Belo Horizonte, em covereança com Cida Falabella e Bella Gonçalves',
      realce: 'Gabinetona',
    },
    {
      texto:
        'Criação dos Laboratórios Populares de Leis, espaço de elaboração coletiva de projetos de lei com movimentos populares e coletivos locais',
      realce: 'Laboratórios Populares de Leis',
    },
    {
      texto:
        'Autoria do PL Morada Segura, que virou lei em BH, garantindo prioridade em programas habitacionais a mulheres em situação de violência atendidas pela rede pública',
      realce: 'Morada Segura',
    },
    {
      texto:
        'Relatório inédito sobre homicídios de jovens negros e pobres em Belo Horizonte, produzido na Comissão Especial de Estudo sobre o Genocídio da Juventude Negra e Pobre da Câmara Municipal',
      realce: 'Relatório inédito',
    },
    {
      texto: 'Mulher mais votada de Minas Gerais para deputada federal em 2018, com 162.740 votos',
      realce: '162.740',
      contar: true,
    },
    {
      texto:
        'Vice-presidenta da CPI de Brumadinho, que indiciou 14 pessoas por homicídio, entre elas o ex-presidente da Vale',
      realce: 'CPI de Brumadinho',
    },
    {
      texto:
        'Proponente do Marco Regulatório do Fomento à Cultura, que se tornou lei em 2024, simplificando o acesso a recursos por gestores públicos e agentes culturais',
      realce: 'Marco Regulatório do Fomento à Cultura',
    },
    {
      texto:
        'Coautora do novo marco regulatório da mineração, construído na Comissão Externa do Desastre de Brumadinho, com destaque para a Lei 14.755/2023, que criou a Política Nacional de Direitos das Populações Atingidas por Barragens',
      realce: 'Lei 14.755/2023',
    },
    {
      texto:
        'Criadora do Emenda com a Gente, consulta pública para destinação de emendas parlamentares que destinou quase R$ 70 milhões a projetos de agroecologia, cultura, direitos humanos, saúde e enfrentamento à mineração',
      realce: 'R$ 70 milhões',
    },
    {
      texto: 'Vice-presidenta da Comissão de Cultura',
      realce: 'Comissão de Cultura',
    },
    {
      texto:
        'Integrante da Comissão Externa sobre Violência Doméstica contra a Mulher e da Comissão Permanente Mista de Combate à Violência contra a Mulher',
      realce: 'Comissão Externa sobre Violência Doméstica contra a Mulher',
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
        'Nasço em Tucuruí, no Pará. Ainda criança, minha família se muda pra Belo Horizonte, no bairro João Pinheiro.',
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
        'Participo da criação do Fórum das Juventudes da Grande BH e me torno conselheira municipal de Juventude.',
    },
    {
      ano: '2010',
      texto:
        'Recebo uma bolsa da Fundación Carolina e vou pra Espanha fazer especialização em Gênero e Igualdade na Universitat Autònoma de Barcelona.',
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
   NAS RUAS E NAS COMISSÕES

   A trajetória conta a história em datas; esta seção mostra a mesma história
   acontecendo. Vem logo depois dela de propósito: quem acabou de ler a linha do
   tempo vê, em seguida, como é o trabalho por dentro.

   As fotos são do acervo da campanha (pasta FOTOS). `destaque` marca a que
   abre a grade ocupando a largura inteira.
   ------------------------------------------------------------------------- */

export const atos = {
  tarja: 'Nas ruas e nas comissões',
  titulo: 'Política se faz junto',
  apoio:
    'Rua, plenário, aldeia, comissão. O lugar muda, o jeito não: é sempre com gente do lado.',
  fotos: [
    {
      id: 'rua',
      arquivo: 'ato-rua',
      largura: 2400,
      altura: 1600,
      destaque: true,
      alt: 'Áurea Carolina fala ao microfone num ato de rua à noite, de frente para uma multidão com bandeiras e cartazes.',
    },
    {
      id: 'povos',
      arquivo: 'ato-povos',
      largura: 960,
      altura: 640,
      alt: 'Áurea Carolina sentada numa roda de conversa ao ar livre com lideranças indígenas, em volta de uma mesa comprida.',
    },
    {
      id: 'comissao',
      arquivo: 'ato-comissao',
      largura: 1100,
      altura: 733,
      alt: 'Áurea Carolina aplaude em pé, sorrindo, cercada de pessoas que também aplaudem numa sala de comissão.',
    },
    {
      id: 'plenario',
      arquivo: 'ato-plenario',
      largura: 1100,
      altura: 733,
      alt: 'Áurea Carolina no plenário da Câmara, entre parlamentares que erguem cartazes de "Vidas negras importam" e "Brumadinho não foi acidente".',
    },
    {
      id: 'marielle',
      arquivo: 'ato-marielle',
      largura: 1100,
      altura: 733,
      alt: 'Áurea Carolina e outras três mulheres seguram placas de rua com o nome de Marielle Franco e girassóis, no plenário da Câmara.',
    },
  ],
}

/* ---------------------------------------------------------------------------
   BANDEIRAS
   `chamada` é o primeiro parágrafo do documento; `completa` guarda o segundo,
   que só entra na tela quando a pessoa abre o cartão.
   ------------------------------------------------------------------------- */

export const bandeiras = {
  tarja: 'Nossas bandeiras',
  titulo: 'Para um Senado do lado do povo',
  apoio:
    'Toque em cada bandeira para ler o compromisso inteiro e o que eu vou levar pro Senado.',
  itens: [
    {
      id: 'mulheres',
      titulo: 'Mulheres vivas',
      cor: 'roxo',
      icone: 'flor',
      chamada:
        'Chega de violência e de feminicídio. Precisamos fortalecer as políticas de prevenção, garantir educação para o respeito e lutar por um percentual fixo de emendas parlamentares para o enfrentamento da violência contra mulheres e meninas. A rede de proteção tem que funcionar de verdade, com delegacias especializadas, casas-abrigo e atendimento psicossocial em todos os municípios.',
      completa: [
        'No Senado, quero levar a Lei Maria da Penha pra dentro das escolas, cobrar responsabilização das plataformas pela violência digital contra as mulheres e avançar num pacto nacional pelo fim do feminicídio, com financiamento garantido para políticas de prevenção.',
      ],
    },
    {
      id: 'sus',
      titulo: 'SUS mais forte',
      cor: 'laranja',
      icone: 'coracao',
      chamada:
        'Acreditamos no SUS e vamos lutar para fortalecê-lo. Saúde perto de casa, atenção básica funcionando, saúde mental levada a sério e valorização dos profissionais que precisam ser prioridade. O cuidado tem que chegar onde as pessoas vivem, para reduzir as desigualdades entre as regiões de Minas.',
      completa: [
        'No Senado, vou defender financiamento federal permanente para atenção básica e saúde mental, com prioridade para os municípios do interior. Quero lutar pela recomposição do recurso que hoje falta na rede de saúde mental e pela regulação do uso de emendas parlamentares na saúde, para assegurar políticas públicas baseadas em garantia de direitos e embasamento científico.',
      ],
    },
    {
      id: 'trabalho',
      titulo: 'Vida além do trabalho',
      cor: 'amarelo',
      icone: 'relogio',
      chamada:
        'As pessoas precisam trabalhar para viver, e não viver para trabalhar. Nós defendemos trabalho decente, renda que acompanha o custo de vida e políticas de cuidado pra quem cuida de crianças, idosos e pessoas doentes.',
      completa: [
        'Quem entrega comida de app, quem é diarista, quem faz bico atrás de bico merece proteção que hoje não existe. No Senado, vou brigar pelo fim da escala 6x1, pela atualização da legislação trabalhista para alcançar autônomo, intermitente, diarista e entregador, e por políticas de cuidado como direito, não como favor.',
      ],
    },
    {
      id: 'riquezas',
      titulo: 'Firmeza com nossas riquezas',
      cor: 'verde',
      icone: 'serra',
      chamada:
        'Minas Gerais conhece bem o preço de um modelo de mineração que coloca o lucro acima das pessoas e dos territórios. Defendo nossas serras, nossas águas, nossas comunidades e a soberania sobre as riquezas do nosso estado. Não existe desenvolvimento em terra arrasada.',
      completa: [
        'No Senado, vou defender a soberania dos territórios sobre minerais estratégicos como lítio e terras raras, pra que regiões como o Vale do Jequitinhonha e o Sul de Minas não sejam só fonte de riqueza pra quem já tem poder. E lutar por responsabilização de verdade pelos crimes de mineração.',
      ],
    },
    {
      id: 'cultura',
      titulo: 'Cultura é chave',
      cor: 'vinho',
      icone: 'chave',
      chamada:
        'Cultura também é trabalho. Investir em cultura é gerar renda, fortalecer a economia, preservar nossas tradições e apoiar os agentes culturais de Minas Gerais. É uma área que precisa ser tratada com prioridade.',
      completa: [
        'No Senado, quero consolidar políticas que levam o recurso até a ponta, avançar em marcos de proteção social para trabalhadores da cultura e regulamentar a taxação das plataformas de streaming, que hoje lucram com a produção cultural brasileira sem devolver nada pro país.',
      ],
    },
    {
      id: 'golpe',
      titulo: 'Chega de golpe',
      cor: 'laranja',
      icone: 'escudo',
      chamada:
        'A internet precisa ser um espaço seguro para pessoas de todas as idades. Hoje, as plataformas digitais lucram com anúncios fraudulentos e a conta fica com quem foi enganado. Isso precisa mudar.',
      completa: [
        'No Senado, quero trabalhar para enfrentar os golpes digitais com prevenção, proteção de dados, responsabilização das plataformas e atendimento rápido a quem foi vítima.',
      ],
    },
    {
      id: 'stf',
      titulo: 'De olho no STF',
      cor: 'roxo',
      icone: 'balanca',
      chamada:
        'Ninguém está acima da lei. O STF precisa ser um espaço forte, representativo e transparente, comprometido com a Constituição e com a defesa da democracia.',
      completa: [
        'E mais: as instituições brasileiras precisam refletir a diversidade do nosso povo. O Brasil nunca teve uma ministra negra no STF e está mais do que na hora de mudar essa história.',
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
      titulo: 'Entrar no grupo do zap',
      texto:
        'Recebe as novidades da campanha, as convocações e o material pra compartilhar direto no seu WhatsApp.',
      cta: 'Entrar no grupo',
      href: 'https://chat.whatsapp.com/Bfb3e2bsvrt1SWnUV7f8kB',
      icone: 'whatsapp',
      cor: 'verde',
    },
    {
      id: 'bonde',
      titulo: 'Entrar no Bonde da Áurea',
      texto:
        'Seja voluntária ou voluntário: ajuda na rua, na militância, nas redes. Todo mundo tem lugar no bonde.',
      cta: 'Quero ser voluntária(o)',
      href: 'https://docs.google.com/forms/d/e/1FAIpQLSftATtjysqWaWVUUiztqOoTIfzu3P_u-J9HG7DmdjxCuHAYgA/viewform',
      icone: 'mao',
      cor: 'laranja',
    },
    {
      id: 'doacao',
      titulo: 'Fazer uma doação',
      texto:
        'Campanha popular se sustenta com quem acredita nela. Qualquer valor ajuda a levar a Áurea pra mais gente.',
      cta: 'Doar agora',
      href: 'https://doarpara.com.br/aurea',
      icone: 'coracao',
      cor: 'roxo',
    },
    {
      id: 'material',
      titulo: 'Receber material no interior',
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
  { id: 'atos', rotulo: 'Nas ruas' },
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
