const $ = s => document.querySelector(s);
const ler = k => JSON.parse(localStorage.getItem(k) || '[]');
const guardar = (k, v) => localStorage.setItem(k, JSON.stringify(v));
const esc = t => Object.assign(document.createElement('p'), { textContent: t }).innerHTML;

const artigos = [
   { tipo:'venda', nome:'excelente', categoria:'roupas', estado:'usado', preco:'500 MT', imagem:'imagens/Roupas1.jpg' },
   { tipo:'venda', nome:'excelente', categoria:'eletronicos', estado:'usado', preco:'500 MT', imagem:'imagens/AA.jpg' },
   { tipo:'venda', nome:'excelente', categoria:'eletronicos', estado:'usado', preco:'500 MT', imagem:'imagens/AA.jpg' },
   { tipo:'venda', nome:'excelente', categoria:'eletronicos', estado:'usado', preco:'500 MT', imagem:'imagens/AA.jpg' },
   { tipo:'venda', nome:'excelente', categoria:'eletronicos', estado:'usado', preco:'500 MT', imagem:'imagens/AA.jpg' },
   { tipo:'venda', nome:'excelente', categoria:'eletronicos', estado:'usado', preco:'500 MT', imagem:'imagens/AA.jpg' },
   { tipo:'venda', nome:'excelente', categoria:'eletronicos', estado:'usado', preco:'500 MT', imagem:'imagens/AA.jpg' },
   { tipo:'venda', nome:'excelente', categoria:'eletronicos', estado:'usado', preco:'500 MT', imagem:'imagens/AA.jpg' }
   
   
];

const nomes = { eletronicos: 'Acessórios eletrónicos', roupas: 'Roupas', calcados: 'Calçados' };
const filtro = { tipo: 'venda', cat: 'todos', estado: 'todos', q: '' };

function mostrar() {
  const lista = [...artigos, ...ler('cv_artigos')].filter(a =>
    a.tipo === filtro.tipo &&
    (filtro.cat === 'todos' || a.categoria === filtro.cat) &&
    (filtro.estado === 'todos' || a.estado === filtro.estado) &&
    a.nome.toLowerCase().includes(filtro.q));

  $('#lista').innerHTML = lista.map(a => `
    <article class="card">
      ${a.imagem ? `<img src="${esc(a.imagem)}" alt="${esc(a.nome)}">` : '<div class="sem-img">Adicionar imagem</div>'}
      <div>
        <span class="tag">${a.estado === 'novo' ? 'Novo' : 'Usado'}</span>
        <h3>${esc(a.nome)}</h3>
        <small>${nomes[a.categoria]}</small>
        <p>${esc(a.preco || '')}</p>
        ${a.contacto ? `<small>Contacto: ${esc(a.contacto)}</small>` : ''}
      </div>
    </article>`).join('') || '<p class="vazio">Nenhum artigo encontrado.</p>';
}

document.querySelectorAll('.grupo').forEach(g => g.addEventListener('click', e => {
  if (e.target.tagName !== 'BUTTON') return;
  g.querySelector('.ativo').classList.remove('ativo');
  e.target.classList.add('ativo');
  filtro[g.dataset.f] = e.target.dataset.v;
  mostrar();
}));

// Pesquisa
$('#formPesquisa').addEventListener('submit', e => {
  e.preventDefault();
  filtro.q = $('#pesquisa').value.trim().toLowerCase();
  mostrar();
  $('#artigos').scrollIntoView({ behavior: 'smooth' });
});

// Publicar artigo para venda
$('#formVender').addEventListener('submit', e => {
  e.preventDefault();
  const dados = Object.fromEntries(new FormData(e.target));
  guardar('cv_artigos', [...ler('cv_artigos'), { tipo: 'venda', ...dados }]);
  e.target.reset();
  $('#msgVender').textContent = 'Artigo publicado na secção Venda.';
  mostrar();
});

// Cadastro por e-mail
$('#formCadastro').addEventListener('submit', e => {
  e.preventDefault();
  const email = e.target.email.value.trim().toLowerCase();
  const lista = ler('cv_usuarios');
  const msg = $('#msgCadastro');
  if (lista.includes(email)) { msg.textContent = 'Este e-mail já está cadastrado.'; return; }
  guardar('cv_usuarios', [...lista, email]);
  e.target.reset();
  msg.textContent = 'Cadastro concluído com sucesso.';
});

mostrar();
