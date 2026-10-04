'use strict';
const artworks = window.ARTWORKS;
const grid = document.querySelector('#artworks');
const search = document.querySelector('#search');
const reset = document.querySelector('#reset');
const dialog = document.querySelector('#viewer');
let category = 'All';
let visible = artworks;
let selectedIndex = 0;
let opener = null;
function render() {
  const query = search.value.trim().toLowerCase();
  visible = artworks.filter(art => (category === 'All' || art.category === category) && `${art.title} ${art.category} ${art.description}`.toLowerCase().includes(query));
  grid.replaceChildren(...visible.map(art => {
    const article = document.createElement('article');
    article.className = 'art-card';
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-label', `View ${art.title}`);
    const wrap = document.createElement('span'); wrap.className = 'image-wrap';
    const img = document.createElement('img');
    img.src = `assets/${art.id}-480.webp`;
    img.srcset = `assets/${art.id}-480.webp 480w, assets/${art.id}-960.webp 960w`;
    img.sizes = '(max-width: 420px) 88vw, (max-width: 760px) 42vw, 28vw';
    img.alt = art.description; img.width = art.width; img.height = art.height;
    img.loading = 'lazy'; img.decoding = 'async';
    const label = document.createElement('span');label.className='view-label';label.textContent='Take a closer look ↗';label.setAttribute('aria-hidden','true');
    wrap.append(img,label);
    const meta = document.createElement('span');meta.className='card-meta';
    const title = document.createElement('h3');title.textContent=art.title;
    const arrow = document.createElement('span');arrow.textContent='↗';arrow.setAttribute('aria-hidden','true');meta.append(title,arrow);
    const cat = document.createElement('p');cat.className='category';cat.textContent=art.category;
    button.append(wrap,meta,cat);button.addEventListener('click',()=>openArtwork(art,button));article.append(button);return article;
  }));
  document.querySelector('#results').textContent = `${visible.length} ${visible.length === 1 ? 'artwork' : 'artworks'}${category === 'All' ? ' in the collection' : ` · ${category}`}`;
  document.querySelector('#empty').hidden=visible.length>0;
  reset.hidden=category==='All'&&!query;
  document.querySelectorAll('[data-category]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.category===category)));
}
function resetFilters(){category='All';search.value='';render();}
document.querySelectorAll('[data-category]').forEach(b=>b.addEventListener('click',()=>{category=b.dataset.category;render();}));
search.addEventListener('input',render);reset.addEventListener('click',resetFilters);document.querySelector('#empty-reset').addEventListener('click',resetFilters);
function updateViewer(){
  const art=visible[selectedIndex];const img=document.querySelector('#viewer-image');
  img.src=`assets/${art.id}-1600.webp`;img.alt=art.description;img.width=art.width;img.height=art.height;
  document.querySelector('#viewer-title').textContent=art.title;
  document.querySelector('#viewer-category').textContent=art.category;
  document.querySelector('#viewer-description').textContent=art.description;
  document.querySelector('#viewer-count').textContent=`${selectedIndex+1} / ${visible.length}`;
  document.querySelector('#previous').disabled=visible.length<2;document.querySelector('#next').disabled=visible.length<2;
}
function openArtwork(art,button){opener=button;selectedIndex=visible.indexOf(art);updateViewer();dialog.showModal();document.body.classList.add('modal-open');document.querySelector('#close-viewer').focus();}
function step(direction){selectedIndex=(selectedIndex+direction+visible.length)%visible.length;updateViewer();}
document.querySelector('#previous').addEventListener('click',()=>step(-1));document.querySelector('#next').addEventListener('click',()=>step(1));
document.querySelector('#close-viewer').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');opener?.focus();});
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('keydown',event=>{if(event.key==='ArrowRight'){event.preventDefault();step(1);}if(event.key==='ArrowLeft'){event.preventDefault();step(-1);}});
document.querySelector('#enquire').addEventListener('click',()=>{dialog.close();requestAnimationFrame(()=>{document.querySelector('#contact .button').focus({preventScroll:true});document.querySelector('#contact').scrollIntoView();});});
const toggle=document.querySelector('.menu-toggle');const navigation=document.querySelector('#navigation');
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));navigation.classList.toggle('open',open);});
navigation.addEventListener('click',event=>{if(event.target.closest('a')){toggle.setAttribute('aria-expanded','false');navigation.classList.remove('open');}});
navigation.addEventListener('keydown',event=>{if(event.key==='Escape'){toggle.setAttribute('aria-expanded','false');navigation.classList.remove('open');toggle.focus();}});
document.querySelector('#year').textContent=new Date().getFullYear();
render();
