import {initialState} from './data.js';
import {icon,esc,href} from './ui.js';
import {workplace} from './home.js';
import {clientsView,filingView,dossier,preview,assignment,filterFiling,bindAssignment,timeline,match} from './filing.js';
import {templates,gallery,chooseClient,letterView,bindLetter} from './letters.js';
import {notesView,noteEditor,bindNote} from './notes.js';

let state=initialState();
const main=document.querySelector('main');
const navItems=[
  ['arbeitsplatz','Arbeitsplatz','grid'],['klienten','Klienten','clients'],
  ['dokumentenablage','Dokumentenablage','inbox'],['vorlagen','Vorlagen','letter'],['akten','Akten und Notizen','notes']
];
const resetDialog=document.querySelector('#reset-dialog');
const notice=document.querySelector('#notice');
let timer;
function announce(message) {
  clearTimeout(timer);
  notice.textContent=message;
  timer=setTimeout(()=>notice.textContent='',5400);
}
function go(path,message) {
  if (location.hash==='#'+path) render();
  else location.hash=path;
  if(message) announce(message);
}
document.querySelector('[data-reset]').insertAdjacentHTML('afterbegin',icon('reset'));
document.querySelector('[data-reset]').onclick=()=>resetDialog.showModal();
resetDialog.addEventListener('close',()=>{
  if(resetDialog.returnValue==='reset') {
    state=initialState();
    go('arbeitsplatz','Demo zurückgesetzt. Drei Dokumente warten im Eingang.');
  }
  resetDialog.returnValue='';
});
const printCopy=document.createElement('div');
printCopy.id='print-copy';
printCopy.hidden=true;
document.body.append(printCopy);
// Keep both prepared images available during an offline walkthrough.
const cachedImages=['inbox.svg','example-note.svg'].map(file=>{
  const image=new Image(); image.src='./assets/'+file; return image;
});
function showNavigation(section,detail) {
  document.querySelector('#nav').innerHTML=navItems.map(([path,label,glyph])=>`<a href="#${path}" class="nav-link" ${section===path?'aria-current="page"':''}>${icon(glyph)}${label}${path==='dokumentenablage'?'<span class="nav-count" aria-label="'+state.inbox.length+' im Eingang">'+state.inbox.length+'</span>':''}</a>`).join('');
  const label=navItems.find(x=>x[0]===section)?.[1]||'Arbeitsplatz';
  document.querySelector('#breadcrumb').innerHTML=icon('home')+'<span class="sep">/</span>'+href(section,label)+(detail?'<span class="sep">/</span><span>'+esc(detail)+'</span>':'');
  document.title=(detail||label)+' · Dossira by Doxyo';
}
function render(moveFocus=false) {
  const route=(location.hash.slice(1)||'arbeitsplatz').split('/');
  const [page,id,sub,docId]=route;
  let section=page,detail='',body='',bind;
  const c=state.clients.find(x=>x.id===id);
  const doneDoc=(client,label)=>go('dossier/'+client.id,label+' · '+client.name+' · '+client.id);
  printCopy.replaceChildren();
  if(page==='arbeitsplatz') body=workplace(state);
  if(page==='klienten') body=clientsView();
  if(page==='dokumentenablage' && id==='eingang'){
    const d=state.inbox.find(x=>x.id===sub);
    if(d){body=preview(d);detail='Dokumentvorschau';}
  } else if(page==='dokumentenablage') body=filingView(state,id==='abgelegt');
  if(page==='ablegen'){
    section='dokumentenablage';detail='Dokument ablegen';
    const d=state.inbox.find(x=>x.id===id);
    if(d){body=assignment(state,d);bind=()=>bindAssignment(document.querySelector('#filing-form'),state,d,client=>doneDoc(client,'Dokument abgelegt'));}
  }
  if(page==='dossier' && c){
    section='klienten';detail=c.name;
    state.recent=[c.id,...state.recent.filter(id=>id!==c.id)];
    if(sub==='dokument'){
      const d=c.docs.find(x=>x.id===docId);
      if(d){body=preview(d,c);bind=()=>{printCopy.innerHTML=main.querySelector('.sheet').outerHTML;};}
    } else body=dossier(c,sub==='verlauf');
  }
  if(page==='vorlagen') body=gallery();
  if(page==='brief'){
    section='vorlagen';detail='Dokument erstellen';
    const t=templates.find(x=>x.id===sub)||templates[0];
    if(c) {body=letterView(c,t);bind=()=>bindLetter(c,t,client=>doneDoc(client,t.name+' abgelegt'));}
    else {body=chooseClient(state,detail);bind=()=>bindChoice('brief',t.id);}
  }
  if(page==='akten') body=notesView(state);
  if(page==='notiz'){
    section='akten';detail='Notiz hinzufügen';
    if(c){body=noteEditor(c,sub==='papier');bind=()=>bindNote(c,sub==='papier',client=>go('dossier/'+client.id+'/verlauf','Notiz hinzugefügt · '+client.name+' · '+client.id));}
    else {body=chooseClient(state,detail);bind=()=>bindChoice('notiz');}
  }
  if(!body){body='<div class="heading"><h1>Ansicht nicht verfügbar</h1><p>Dieses Element ist hier nicht mehr vorhanden.</p></div>'+href(section==='dokumentenablage'?section:'arbeitsplatz','Zur Übersicht','btn primary');}
  main.innerHTML=body;
  showNavigation(section,detail);
  bind?.();
  const results=main.querySelector('#results');
  if(results){
    const search=main.querySelector('[data-search]'), filter=main.querySelector('[data-filter]');
    function refresh(){
      const q=search?.value||'', chosen=filter?.value||'';
      if(page==='akten') results.innerHTML=timeline(state.clients.filter(c=>!chosen||c.id===chosen).flatMap(c=>c.notes.filter(n=>match(n.title+' '+n.body+' '+c.name,q)).map(n=>({n,c}))),true);
      else results.innerHTML=filterFiling(state,route,c,q,chosen);
    }
    search?.addEventListener('input',refresh);
    filter?.addEventListener('change',refresh);
    refresh();
  }
  if(moveFocus){main.focus({preventScroll:true});window.scrollTo(0,0);}
}
function bindChoice(path,sub){
  const form=main.querySelector('#choose-client');
  form.onsubmit=e=>{e.preventDefault();go([path,form.elements.client.value,sub].filter(Boolean).join('/'));};
}
document.querySelector('.skip').onclick=e=>{e.preventDefault();main.focus();};
window.addEventListener('hashchange',()=>render(true));
render();
