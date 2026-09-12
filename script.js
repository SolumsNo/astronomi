const photos = [
  {src:'assets/images/north-america-detail.jpeg', title:'North America Nebula', subtitle:'NGC 7000 · detalj', cat:'nebula'},
  {src:'assets/images/veil-nebula.jpeg', title:'Veil Nebula', subtitle:'Supernovarest', cat:'nebula'},
  {src:'assets/images/heart-nebula.jpeg', title:'Heart Nebula', subtitle:'IC 1805', cat:'nebula'},
  {src:'assets/images/elephants-trunk-wide.jpeg', title:"Elephant's Trunk", subtitle:'IC 1396 · widefield', cat:'nebula'},
  {src:'assets/images/silver-sliver-galaxy.jpeg', title:'Silver Sliver Galaxy', subtitle:'Galaksefelt', cat:'galaxy'},
  {src:'assets/images/crescent-nebula.jpeg', title:'Crescent Nebula', subtitle:'NGC 6888', cat:'nebula'},
  {src:'assets/images/m17-omega-nebula.jpeg', title:'Omega Nebula', subtitle:'M17', cat:'nebula'},
  {src:'assets/images/pacman-nebula.jpeg', title:'Pacman Nebula', subtitle:'NGC 281', cat:'nebula'},
  {src:'assets/images/bubble-nebula.jpeg', title:'Bubble Nebula', subtitle:'NGC 7635', cat:'nebula'},
  {src:'assets/images/north-america-nebula.jpeg', title:'North America Nebula', subtitle:'NGC 7000', cat:'nebula'},
  {src:'assets/images/elephants-trunk-red.jpeg', title:"Elephant's Trunk", subtitle:'IC 1396', cat:'nebula'},
  {src:'assets/images/reflection-nebula.jpeg', title:'Reflection Nebula', subtitle:'Deep sky', cat:'nebula'},
  {src:'assets/images/veil-detail.jpeg', title:'Veil Nebula', subtitle:'Detalj', cat:'nebula'},
  {src:'assets/images/horsehead-nebula.jpeg', title:'Horsehead Nebula', subtitle:'Barnard 33', cat:'nebula'},
  {src:'assets/images/whirlpool-galaxy.jpeg', title:'Whirlpool Galaxy', subtitle:'M51', cat:'galaxy'},
  {src:'assets/images/m81-m82.jpeg', title:'M81 & M82', subtitle:'Bodes Galaxy & Cigar Galaxy', cat:'galaxy'},
  {src:'assets/images/galaxy-portrait.jpeg', title:'Spiralgalakse', subtitle:'Deep sky', cat:'galaxy'},
  {src:'assets/images/deep-sky-field-1.jpeg', title:'Deep Sky', subtitle:'Stjernefelt', cat:'nebula'},
  {src:'assets/images/deep-sky-field-2.jpeg', title:'Deep Sky', subtitle:'Stjernefelt', cat:'nebula'},
  {src:'assets/images/pleiades.jpeg', title:'Pleiadene', subtitle:'M45', cat:'nebula'},
  {src:'assets/images/full-moon-blue.jpeg', title:'Fullmånen', subtitle:'Månen', cat:'moon'},
  {src:'assets/images/full-moon-warm.jpeg', title:'Fullmånen', subtitle:'Varm tone', cat:'moon'},
  {src:'assets/images/half-moon-blue.jpeg', title:'Månen', subtitle:'Terminatorsonen', cat:'moon'},
  {src:'assets/images/moon-warm-phase.jpeg', title:'Månen', subtitle:'Varm tone', cat:'moon'},
  {src:'assets/images/moonrise-landscape.jpeg', title:'Måneoppgang', subtitle:'Nattlandskap', cat:'event'},
  {src:'assets/images/sun-spots-orange.jpeg', title:'Solen', subtitle:'Solflekker', cat:'sun'},
  {src:'assets/images/sun-red.jpeg', title:'Solen', subtitle:'Solflekker', cat:'sun'},
  {src:'assets/images/solar-eclipse-wide.jpeg', title:'Solformørkelse', subtitle:'Partiell fase', cat:'event'},
  {src:'assets/images/solar-eclipse-screen.jpeg', title:'Solformørkelse', subtitle:'Partiell fase', cat:'event'}
];

const categoryNames = {nebula:'Tåke / Deep Sky', galaxy:'Galakse', moon:'Månen', sun:'Solen', event:'Astronomisk hendelse'};
const grid = document.querySelector('#gallery-grid');
const lightbox = document.querySelector('#lightbox');
const lbImage = document.querySelector('#lb-image');
const lbTitle = document.querySelector('#lb-title');
const lbCategory = document.querySelector('#lb-category');
const lbNote = document.querySelector('#lb-note');
let visible = photos.map((_,i)=>i), current = 0;

function render(filter='all') {
  grid.innerHTML='';
  visible=[];
  photos.forEach((p,i)=>{
    if(filter!=='all' && p.cat!==filter) return;
    visible.push(i);
    const item=document.createElement('article');
    item.className='card';
    item.innerHTML=`<img src="${p.src}" alt="${p.title}" loading="lazy"><div class="card-info"><p>${categoryNames[p.cat]}</p><h3>${p.title}</h3></div>`;
    item.addEventListener('click',()=>openLightbox(i));
    grid.appendChild(item);
  });
}

function openLightbox(photoIndex){
  current = Math.max(0,visible.indexOf(photoIndex));
  updateLightbox();
  lightbox.showModal();
  document.body.style.overflow='hidden';
}
function updateLightbox(){
  const p=photos[visible[current]];
  lbImage.src=p.src; lbImage.alt=p.title; lbTitle.textContent=p.title;
  lbCategory.textContent=categoryNames[p.cat]; lbNote.textContent=p.subtitle;
}
function step(dir){ current=(current+dir+visible.length)%visible.length; updateLightbox(); }
function closeBox(){ lightbox.close(); document.body.style.overflow=''; }

document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active'); render(btn.dataset.filter);
}));
document.querySelector('.lb-close').addEventListener('click',closeBox);
document.querySelector('.lb-prev').addEventListener('click',()=>step(-1));
document.querySelector('.lb-next').addEventListener('click',()=>step(1));
lightbox.addEventListener('click',e=>{if(e.target===lightbox) closeBox();});
window.addEventListener('keydown',e=>{
  if(!lightbox.open) return;
  if(e.key==='ArrowLeft') step(-1); if(e.key==='ArrowRight') step(1); if(e.key==='Escape') closeBox();
});

document.querySelector('#year').textContent=new Date().getFullYear();
render();
