// Confirmar o WhatsApp oficial antes de alterar o status da integração.
const WHATSAPP_NUMBER = '5535992365888';
const WHATSAPP_CONFIRMED = false;
const projects = [
{image:0,category:'Cozinhas',name:'Madeira & luz natural'},
{image:1,category:'Cozinhas',name:'Linhas contemporâneas'},
{image:2,category:'Salas',name:'Aconchego em tons neutros'},
{image:3,category:'Salas',name:'Equilíbrio e amplitude'},
{image:4,category:'Quartos',name:'Refúgio contemporâneo'},
{image:5,category:'Quartos',name:'Conforto em cada composição'},
{image:6,category:'Banheiros',name:'Leveza e materialidade'},
{image:7,category:'Banheiros',name:'Texturas em equilíbrio'},
{image:8,category:'Escritórios',name:'Espaço para novas ideias'},
{image:9,category:'Escritórios',name:'Trabalho e inspiração'},
{image:10,category:'Quartos',name:'Um refúgio em tons suaves'},
{image:11,category:'Salas',name:'Madeira como protagonista'}
];
const environments=[
['Cozinhas planejadas','Projetos que combinam organização, estética e aproveitamento inteligente dos espaços.','Cozinhas',0],
['Quartos e guarda-roupas','Soluções para ambientes confortáveis, funcionais e personalizados.','Quartos',5],
['Salas de estar','Composições que valorizam o ambiente e criam espaços acolhedores.','Salas',2],
['Banheiros e lavabos','Possibilidades de móveis sob medida para organização e aproveitamento dos espaços.','Banheiros',6],
['Escritórios e home office','Ambientes pensados para unir produtividade, conforto e estilo.','Escritórios',8],
['Móveis personalizados','Inspirações para móveis desenvolvidos conforme diferentes necessidades e preferências.','Todos',11]
];
document.querySelector('#environment-grid').innerHTML=environments.map((e,i)=>'<article class="environment-card"><div class="photo"><img loading="lazy" src="assets/room-'+e[3]+'.jpg" alt="'+e[0]+' — inspiração ilustrativa"><span>0'+(i+1)+'</span></div><h3>'+e[0]+'</h3><p>'+e[1]+'</p><button data-category="'+e[2]+'">EXPLORAR AMBIENTE <span>↗</span></button></article>').join('');
let filtered=projects,currentIndex=0,lastFocus=null;
const filters=['Todos','Cozinhas','Quartos','Salas','Banheiros','Escritórios'];
document.querySelector('.filters').innerHTML=filters.map(c=>'<button data-filter="'+c+'" aria-pressed="'+(c==='Todos')+'">'+c+'</button>').join('');
function renderGallery(category='Todos'){
 filtered=projects.filter(p=>category==='Todos'||p.category===category);
 document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===category)));
 document.querySelector('#gallery-grid').innerHTML=filtered.map((p,i)=>'<button class="gallery-item" data-index="'+i+'" aria-label="Ampliar '+p.name+'"><img loading="lazy" src="assets/room-'+p.image+'.jpg" alt="'+p.name+' — '+p.category+', imagem ilustrativa"><span class="gallery-caption">'+p.name+'<span>↗</span></span></button>').join('');
 document.querySelector('#gallery-count').textContent=filtered.length+' inspirações em '+category;
}
renderGallery();
document.querySelector('.filters').addEventListener('click',e=>{const b=e.target.closest('[data-filter]');if(b)renderGallery(b.dataset.filter)});
document.querySelector('#environment-grid').addEventListener('click',e=>{const b=e.target.closest('[data-category]');if(b){renderGallery(b.dataset.category);document.querySelector('#projetos').scrollIntoView();}});
const dialog=document.querySelector('#lightbox');
function showImage(index){currentIndex=(index+filtered.length)%filtered.length;const p=filtered[currentIndex];document.querySelector('#lightbox-image').src='assets/room-'+p.image+'.jpg';document.querySelector('#lightbox-image').alt=p.name+' — inspiração ilustrativa';document.querySelector('#lightbox-title').textContent=p.name;document.querySelector('#image-position').textContent=(currentIndex+1)+' / '+filtered.length;}
document.querySelector('#gallery-grid').addEventListener('click',e=>{const b=e.target.closest('[data-index]');if(!b)return;lastFocus=b;showImage(Number(b.dataset.index));dialog.showModal();document.body.style.overflow='hidden';});
document.querySelector('#close-lightbox').onclick=()=>dialog.close();
dialog.addEventListener('close',()=>{document.body.style.overflow='';lastFocus?.focus()});
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
document.querySelector('#prev').onclick=()=>showImage(currentIndex-1);
document.querySelector('#next').onclick=()=>showImage(currentIndex+1);
dialog.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();showImage(currentIndex+1)}if(e.key==='ArrowLeft'){e.preventDefault();showImage(currentIndex-1)}});
let touchX=0;dialog.addEventListener('touchstart',e=>{touchX=e.changedTouches[0].screenX},{passive:true});dialog.addEventListener('touchend',e=>{const dx=e.changedTouches[0].screenX-touchX;if(Math.abs(dx)>60)showImage(currentIndex+(dx<0?1:-1))},{passive:true});
const materials=[['Madeira clara','Tonalidades suaves que sugerem leveza e acolhimento, especialmente em composições com luz natural.'],['Madeira escura','Tons profundos que criam contraste e uma presença marcante no ambiente.'],['Amadeirado','Veios e tonalidades inspirados na madeira para explorar diferentes linguagens visuais.'],['Tons neutros','Bege, areia e cinza como base para composições discretas e equilibradas.'],['Superfícies foscas','Aparência suave e reflexos contidos como inspiração para um visual contemporâneo.'],['Combinações contemporâneas','Madeira, tons sólidos e contrastes sutis em um mesmo repertório visual.']];
document.querySelector('#swatches').innerHTML=materials.map((m,i)=>'<button class="swatch" data-material="'+i+'" aria-pressed="false"><img src="assets/texture-'+i+'.svg" alt="Amostra ilustrativa de '+m[0]+'" loading="lazy">'+m[0]+'</button>').join('');
function selectMaterial(i){document.querySelectorAll('[data-material]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.material)===i)));const box=document.querySelector('#material-description');box.replaceChildren();const title=document.createElement('strong');title.textContent=materials[i][0];box.append(title,document.createTextNode(materials[i][1]));}selectMaterial(0);
document.querySelector('#swatches').addEventListener('click',e=>{const b=e.target.closest('[data-material]');if(b)selectMaterial(Number(b.dataset.material))});
const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('#nav');function closeMenu(){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menu');}
toggle.onclick=()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu')};nav.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
function buildWhatsAppMessage(data){return 'Olá, Marcenaria Queiroz Neto! Gostaria de solicitar informações sobre um orçamento.\n\nNome: '+data.nome+'\nTelefone: '+data.telefone+'\nCidade: '+data.cidade+'\nAmbiente: '+data.ambiente+'\nDescrição: '+data.descricao+'\nPreferência de contato: '+data.preferencia+'\n\nAguardo o retorno. Obrigado!';}
function buildWhatsAppURL(data){return 'https://wa.me/'+WHATSAPP_NUMBER+'?text='+encodeURIComponent(buildWhatsAppMessage(data));}
document.querySelector('#quote-form').addEventListener('submit',e=>{e.preventDefault();const form=e.currentTarget;if(!form.reportValidity())return;const data=Object.fromEntries(new FormData(form));for(const key of Object.keys(data))data[key]=data[key].trim();if(Object.values(data).some(v=>!v)){document.querySelector('#form-status').textContent='Preencha todos os campos com informações válidas.';return;}if(data.telefone.replace(/\D/g,'').length<10){document.querySelector('#form-status').textContent='Informe um telefone válido com DDD.';return;}const url=buildWhatsAppURL(data);const fallback=document.querySelector('#whatsapp-fallback');fallback.href=url;fallback.hidden=false;window.open(url,'_blank','noopener,noreferrer');document.querySelector('#form-status').textContent='Mensagem preparada. Revise e confirme o envio no WhatsApp. Se a nova janela não abriu, use o link abaixo.';});
document.querySelector('#floating-wa').href='https://wa.me/'+WHATSAPP_NUMBER+'?text='+encodeURIComponent('Olá, Marcenaria Queiroz Neto! Vi o site demonstrativo e gostaria de confirmar se este é o WhatsApp oficial antes de conversar sobre meu projeto.');
document.querySelector('#year').textContent=new Date().getFullYear();
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.animate([{opacity:.4,transform:'translateY(15px)'},{opacity:1,transform:'none'}],{duration:650,easing:'ease-out'});observer.unobserve(e.target)}})},{threshold:.1});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));}
