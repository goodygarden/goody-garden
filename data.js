// ══════════════════════════════════════
// GOODY GARDEN — data.js
// Edite aqui para personalizar o site
// ══════════════════════════════════════

const GOODY = {
  // ── CONFIGURAÇÕES GERAIS ──
  site: {
    nome: "Goody Garden",
    slogan: "Cuidar das plantas ficou mais fácil.",
    whatsapp: "5511999999999",
    instagram: "https://instagram.com/goodygarden",
    tiktok: "https://tiktok.com/@goodygarden",
    email: "contato@goodygarden.com.br",
    frete_gratis_acima: 150,
  },

  // ── CREDENCIAIS ADMIN ──
  admin: {
    usuario: "admin",
    senha: "goody2025"
  },

  // ── CATEGORIAS ──
  categorias: [
    { id: "ornamental", nome: "Ornamentais", emoji: "🌸", descricao: "Plantas para decorar qualquer ambiente" },
    { id: "horta",      nome: "Horta",       emoji: "🥬", descricao: "Cultive seus próprios alimentos em casa" },
    { id: "suculenta",  nome: "Suculentas",  emoji: "🌵", descricao: "Fáceis de cuidar, difíceis de matar" },
    { id: "vaso",       nome: "Vasos",       emoji: "🪴", descricao: "Vasos e cachepôs para todas as plantas" },
    { id: "ferramenta", nome: "Ferramentas", emoji: "🔧", descricao: "Tudo para cuidar do seu jardim" },
    { id: "adubo",      nome: "Nutrição",    emoji: "🧴", descricao: "Adubos e fertilizantes naturais" },
  ],

  // ── PRODUTOS ──
  produtos: [
    {
      id: 1, nome: "Orquídea Phalaenopsis Roxa",
      categoria: "ornamental", emoji: "🌺",
      preco: 89.90, preco_de: 110.00,
      badge: "Popular", destaque: true,
      avaliacao: 4.9, avaliacoes: 248,
      descricao: "Orquídea adulta em floração, vaso 12cm incluso. Ideal para ambientes internos com luz indireta. Floresce por até 3 meses.",
      cuidados: "Rega semanal • Luz indireta • Temperatura 18-28°C",
      estoque: 15, bg: "#E8F5E9"
    },
    {
      id: 2, nome: "Jiboia Marble Queen",
      categoria: "ornamental", emoji: "🌿",
      preco: 54.90, preco_de: null,
      badge: "Novo", destaque: true,
      avaliacao: 4.8, avaliacoes: 134,
      descricao: "Planta trepadeira com folhas variegadas branco e verde. Perfeita para vasos suspensos ou prateleiras altas.",
      cuidados: "Rega quinzenal • Meia sombra • Temperatura 16-30°C",
      estoque: 23, bg: "#F1F8E9"
    },
    {
      id: 3, nome: "Kit 6 Cactos Premium",
      categoria: "suculenta", emoji: "🌵",
      preco: 59.90, preco_de: 79.90,
      badge: "-25%", destaque: true,
      avaliacao: 4.7, avaliacoes: 89,
      descricao: "Kit com 6 espécies diferentes de cactos, cada um em vaso individual 8cm. Ótimo para presentear.",
      cuidados: "Rega mensal • Sol pleno • Temperatura 15-35°C",
      estoque: 40, bg: "#FFF8E1"
    },
    {
      id: 4, nome: "Horta Vertical Goody",
      categoria: "horta", emoji: "🌱",
      preco: 99.90, preco_de: 149.90,
      badge: "Kit", destaque: true,
      avaliacao: 4.9, avaliacoes: 312,
      descricao: "Kit completo com estrutura vertical, 6 vasos, substrato e sementes de temperos. Instala em qualquer parede.",
      cuidados: "Rega diária • Sol direto 4h • Temperatura 18-30°C",
      estoque: 8, bg: "#E8F5E9"
    },
    {
      id: 5, nome: "Lavanda Francesa",
      categoria: "ornamental", emoji: "🪻",
      preco: 34.90, preco_de: null,
      badge: "Novo", destaque: false,
      avaliacao: 4.9, avaliacoes: 76,
      descricao: "Planta aromática com flores roxas. Além de decorativa, repele insetos naturalmente. Ótima para varandas.",
      cuidados: "Rega semanal • Sol pleno • Temperatura 15-25°C",
      estoque: 30, bg: "#F3E5F5"
    },
    {
      id: 6, nome: "Adubo Orgânico Goody 1kg",
      categoria: "adubo", emoji: "🧴",
      preco: 29.90, preco_de: null,
      badge: null, destaque: false,
      avaliacao: 4.9, avaliacoes: 203,
      descricao: "Adubo 100% orgânico para todas as plantas. Enriquece o solo e estimula o crescimento saudável sem químicos.",
      cuidados: "Aplicar mensalmente • Para todas as plantas",
      estoque: 60, bg: "#FFF3E0"
    },
    {
      id: 7, nome: "Vaso Cerâmica Bege 20cm",
      categoria: "vaso", emoji: "🪴",
      preco: 49.90, preco_de: 64.90,
      badge: "-23%", destaque: false,
      avaliacao: 4.6, avaliacoes: 57,
      descricao: "Vaso artesanal em cerâmica com acabamento fosco. Acompanha prato e furo para drenagem.",
      cuidados: "Diâmetro 20cm • Altura 18cm • Com prato",
      estoque: 18, bg: "#FBE9E7"
    },
    {
      id: 8, nome: "Kit Ferramentas 5 peças",
      categoria: "ferramenta", emoji: "🔧",
      preco: 79.90, preco_de: 99.90,
      badge: "-20%", destaque: false,
      avaliacao: 4.8, avaliacoes: 145,
      descricao: "Kit com pá, garfo, regador, luvas e pulverizador. Cabo ergonômico em madeira, ideal para vasos e horta.",
      cuidados: "Aço inox • Cabo de madeira • Bolsa inclusa",
      estoque: 12, bg: "#E8EAF6"
    },
  ],

  // ── BANNERS HERO ──
  banners: [
    { titulo: "Seu jardim começa aqui.", subtitulo: "Cuidar das plantas ficou mais fácil.", cta: "Ver produtos", cor: "#1B5E20" },
    { titulo: "Coleção Primavera 2025", subtitulo: "Novidades que chegaram para ficar.", cta: "Ver novidades", cor: "#2E7D32" },
  ]
};

// Salva no localStorage para persistência
if (typeof localStorage !== 'undefined') {
  if (!localStorage.getItem('goody_produtos')) {
    localStorage.setItem('goody_produtos', JSON.stringify(GOODY.produtos));
  }
  if (!localStorage.getItem('goody_categorias')) {
    localStorage.setItem('goody_categorias', JSON.stringify(GOODY.categorias));
  }
}
