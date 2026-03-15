// ══════════════════════════════════════
// GOODY GARDEN — global.js
// Carrinho, Auth, Utilitários
// ══════════════════════════════════════

// ── PRODUTOS (lê do localStorage ou do data.js) ──
function getProdutos() {
  const saved = localStorage.getItem('goody_produtos');
  return saved ? JSON.parse(saved) : GOODY.produtos;
}
function saveProdutos(p) { localStorage.setItem('goody_produtos', JSON.stringify(p)); }
function getCategorias() {
  const saved = localStorage.getItem('goody_categorias');
  return saved ? JSON.parse(saved) : GOODY.categorias;
}

// ── CARRINHO ──
function getCarrinho() { return JSON.parse(localStorage.getItem('goody_carrinho') || '[]'); }
function saveCarrinho(c) {
  localStorage.setItem('goody_carrinho', JSON.stringify(c));
  atualizarBadgeCarrinho();
}
function addCarrinho(prodId, qtd = 1) {
  const carrinho = getCarrinho();
  const idx = carrinho.findIndex(i => i.id === prodId);
  if (idx >= 0) carrinho[idx].qtd += qtd;
  else carrinho.push({ id: prodId, qtd });
  saveCarrinho(carrinho);
  showToast('🛒 Produto adicionado ao carrinho!');
}
function removeCarrinho(prodId) {
  saveCarrinho(getCarrinho().filter(i => i.id !== prodId));
}
function updateQtdCarrinho(prodId, qtd) {
  const c = getCarrinho();
  const idx = c.findIndex(i => i.id === prodId);
  if (idx >= 0) { if (qtd <= 0) c.splice(idx, 1); else c[idx].qtd = qtd; }
  saveCarrinho(c);
}
function totalCarrinho() {
  const produtos = getProdutos();
  return getCarrinho().reduce((sum, item) => {
    const p = produtos.find(x => x.id === item.id);
    return sum + (p ? p.preco * item.qtd : 0);
  }, 0);
}
function qtdCarrinho() { return getCarrinho().reduce((s, i) => s + i.qtd, 0); }
function atualizarBadgeCarrinho() {
  document.querySelectorAll('.cart-badge').forEach(el => {
    const q = qtdCarrinho(); el.textContent = q; el.style.display = q > 0 ? 'flex' : 'none';
  });
}

// ── FAVORITOS ──
function getFavoritos() { return JSON.parse(localStorage.getItem('goody_favoritos') || '[]'); }
function toggleFavorito(id) {
  const favs = getFavoritos();
  const idx = favs.indexOf(id);
  if (idx >= 0) favs.splice(idx, 1); else favs.push(id);
  localStorage.setItem('goody_favoritos', JSON.stringify(favs));
  return idx < 0;
}
function isFavorito(id) { return getFavoritos().includes(id); }

// ── USUÁRIO ──
function getUsuario() { return JSON.parse(localStorage.getItem('goody_usuario') || 'null'); }
function setUsuario(u) { localStorage.setItem('goody_usuario', JSON.stringify(u)); }
function logout() { localStorage.removeItem('goody_usuario'); window.location.href = 'login.html'; }
function isAdmin() { const u = getUsuario(); return u && u.role === 'admin'; }

// ── PEDIDOS ──
function getPedidos() { return JSON.parse(localStorage.getItem('goody_pedidos') || '[]'); }
function savePedido(pedido) {
  const pedidos = getPedidos();
  pedido.id = 'GD' + Date.now();
  pedido.data = new Date().toLocaleDateString('pt-BR');
  pedidos.unshift(pedido);
  localStorage.setItem('goody_pedidos', JSON.stringify(pedidos));
  localStorage.removeItem('goody_carrinho');
  atualizarBadgeCarrinho();
  return pedido.id;
}

// ── TOAST ──
function showToast(msg, tipo = 'success') {
  let t = document.getElementById('globalToast');
  if (!t) { t = document.createElement('div'); t.id = 'globalToast'; t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.style.background = tipo === 'erro' ? '#c62828' : 'var(--verde-escuro)';
  t.classList.remove('show'); void t.offsetWidth; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

// ── FORMATAÇÃO ──
function formatPreco(v) { return 'R$ ' + v.toFixed(2).replace('.', ','); }
function strEstrelas(n) { return '★'.repeat(Math.round(n)) + '☆'.repeat(5 - Math.round(n)); }
function getBadgeClass(b) {
  if (!b) return ''; if (b === 'Novo') return 'badge-novo'; if (b === 'Popular') return 'badge-pop';
  if (b === 'Kit') return 'badge-kit'; return 'badge-off';
}

// ── NAVBAR INIT ──
function initNavbar() {
  window.addEventListener('scroll', () => {
    document.getElementById('navbar')?.classList.toggle('scrolled', window.scrollY > 40);
  });
  document.getElementById('navToggle')?.addEventListener('click', () => {
    document.getElementById('navLinks')?.classList.toggle('open');
  });
  document.querySelectorAll('#navLinks a').forEach(a => {
    a.addEventListener('click', () => document.getElementById('navLinks')?.classList.remove('open'));
  });
  atualizarBadgeCarrinho();
  // Marcar link ativo
  const path = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('ativo');
  });
  // Atualizar nome usuário se logado
  const u = getUsuario();
  const btnUser = document.getElementById('btnUser');
  if (btnUser && u) btnUser.title = u.nome;
}

// ── REVEAL SCROLL ──
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => { if (e.isIntersecting) { setTimeout(() => e.target.classList.add('visible'), i * 70); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
}

// ── CONTADOR ──
function animarContador(el, target) {
  const dur = 1600, step = target / (dur / 16); let cur = 0;
  const t = setInterval(() => {
    cur = Math.min(cur + step, target);
    el.textContent = target >= 1000 ? (cur/1000).toFixed(1).replace('.',',') + 'k' : Math.round(cur) + (el.dataset.suffix || '');
    if (cur >= target) clearInterval(t);
  }, 16);
}
function initContadores() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { animarContador(e.target, +e.target.dataset.target); obs.unobserve(e.target); } });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-target]').forEach(el => obs.observe(el));
}

// ── RENDER NAVBAR HTML ──
function renderNavbar(pagina) {
  const u = getUsuario();
  return `
  <nav id="navbar">
    <a class="logo" href="index.html">
      <div class="logo-wrap">
        <div class="logo-goody">GOO<span class="logo-d">D<span class="logo-broto">🌱</span></span>Y</div>
        <span class="logo-garden">Garden</span>
      </div>
    </a>
    <button class="nav-toggle" id="navToggle"><span></span><span></span><span></span></button>
    <ul class="nav-links" id="navLinks">
      <li><a href="index.html">Home</a></li>
      <li><a href="loja.html">Loja</a></li>
      <li><a href="loja.html?cat=horta">Horta</a></li>
      <li><a href="loja.html?cat=ornamental">Plantas</a></li>
    </ul>
    <div class="nav-right">
      <button class="nav-icon-btn" onclick="window.location.href='loja.html'" title="Buscar">🔍</button>
      ${u ? `<button class="nav-icon-btn" id="btnUser" onclick="window.location.href='${u.role==='admin'?'admin.html':'perfil.html'}'" title="${u.nome}">👤</button>` : `<button class="nav-icon-btn" onclick="window.location.href='login.html'" title="Entrar">👤</button>`}
      <button class="nav-icon-btn" onclick="window.location.href='carrinho.html'" title="Carrinho" style="position:relative">
        🛒 <span class="nav-badge cart-badge" style="display:none">0</span>
      </button>
    </div>
  </nav>`;
}

// ── RENDER FOOTER ──
function renderFooter() {
  return `
  <footer>
    <div class="footer-top">
      <div>
        <div class="footer-logo-marca">GOODY</div>
        <div class="footer-logo-sub">Garden</div>
        <p class="footer-desc">Tudo para cuidar das suas plantas, em um só lugar.</p>
        <p class="footer-slogan">"Cuidar das plantas ficou mais fácil."</p>
        <div class="footer-socials">
          <a href="${GOODY.site.instagram}" target="_blank">📸</a>
          <a href="${GOODY.site.tiktok}" target="_blank">🎵</a>
          <a href="https://wa.me/${GOODY.site.whatsapp}" target="_blank">💬</a>
        </div>
      </div>
      <div class="footer-col"><h4>Loja</h4><ul>
        <li><a href="loja.html">Todos os produtos</a></li>
        <li><a href="loja.html?cat=ornamental">Ornamentais</a></li>
        <li><a href="loja.html?cat=horta">Horta</a></li>
        <li><a href="loja.html?cat=suculenta">Suculentas</a></li>
      </ul></div>
      <div class="footer-col"><h4>Ajuda</h4><ul>
        <li><a href="#">Meu pedido</a></li>
        <li><a href="#">Trocas e devoluções</a></li>
        <li><a href="#">Garantia das plantas</a></li>
        <li><a href="#">FAQ</a></li>
      </ul></div>
      <div class="footer-col"><h4>Goody</h4><ul>
        <li><a href="#">Sobre nós</a></li>
        <li><a href="#">Blog</a></li>
        <li><a href="login.html">Minha conta</a></li>
        <li><a href="admin.html">Admin</a></li>
      </ul></div>
    </div>
    <div class="footer-bottom">
      <span>© 2025 Goody Garden. Todos os direitos reservados.</span>
      <div class="footer-selos"><span class="selo">🔒 Compra segura</span><span class="selo">🌱 Sustentável</span></div>
    </div>
  </footer>
  <a href="https://wa.me/${GOODY.site.whatsapp}" class="btn-whatsapp" target="_blank">💬</a>`;
}

// ── RENDER CARD PRODUTO ──
function renderCard(p) {
  const fav = isFavorito(p.id);
  return `
  <div class="prod-card" onclick="window.location.href='produto.html?id=${p.id}'">
    <div class="prod-img" style="background:${p.bg}">
      ${p.emoji}
      ${p.badge ? `<span class="prod-badge ${getBadgeClass(p.badge)}">${p.badge}</span>` : ''}
      <button class="prod-fav ${fav?'ativo':''}" onclick="event.stopPropagation();favToggle(this,${p.id})">${fav?'❤️':'🤍'}</button>
    </div>
    <div class="prod-info">
      <div class="prod-cat">${getCategorias().find(c=>c.id===p.categoria)?.nome||p.categoria}</div>
      <div class="prod-nome">${p.nome}</div>
      <div class="prod-stars"><span class="estrelas">${strEstrelas(p.avaliacao)}</span><span>(${p.avaliacoes})</span></div>
      <div class="prod-rodape">
        <div>${p.preco_de?`<span class="preco-de">${formatPreco(p.preco_de)}</span>`:''}<span class="preco-por">${formatPreco(p.preco)}</span></div>
        <button class="btn-add" onclick="event.stopPropagation();btnAdd(this,${p.id})">+</button>
      </div>
    </div>
  </div>`;
}

function favToggle(btn, id) {
  const ativo = toggleFavorito(id);
  btn.textContent = ativo ? '❤️' : '🤍';
  btn.classList.toggle('ativo', ativo);
}
function btnAdd(btn, id) {
  addCarrinho(id);
  btn.textContent = '✓'; btn.classList.add('adicionado');
  setTimeout(() => { btn.textContent = '+'; btn.classList.remove('adicionado'); }, 1200);
}
