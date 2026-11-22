import {today} from './data.js';
import {esc, icon, dateCH, dest, clientOptions, uid} from './ui.js';
export const templates = [
  {id:'termin',name:'Terminbestätigung',description:'Datum, Zeit und Ort für den nächsten Beratungstermin mitteilen.',label:'Termin',value:'30.11.2026, 10.00 Uhr',detail:'Ort',extra:'Sozialdienst Musterwil, Zimmer 2',body:(v,x)=>'Gerne bestätigen wir Ihren nächsten Beratungstermin am '+v+'.\n\nWir erwarten Sie hier: '+x+'. Bitte melden Sie sich bei uns, falls Sie verhindert sind.'},
  {id:'unterlagen',name:'Unterlagen anfordern',description:'Benötigte Unterlagen und die Frist für die Abgabe festhalten.',label:'Benötigte Unterlagen',value:'Aktuelle Mietzinsbestätigung',detail:'Frist',extra:'04.12.2026',body:(v,x)=>'Für die weitere Beratung bitten wir Sie um folgende Unterlagen:\n\n'+v+'\n\nBitte reichen Sie diese bis '+x+' beim Sozialdienst Musterwil ein.'},
  {id:'gespraech',name:'Gesprächsbestätigung',description:'Ein geführtes Gespräch und die vereinbarten Schritte bestätigen.',label:'Gespräch vom',value:'23.11.2026',detail:'Vereinbarung',extra:'Wir besprechen die offenen Fragen beim nächsten Beratungstermin.',body:(v,x)=>'Gerne bestätigen wir das Beratungsgespräch vom '+v+'. Gemeinsam haben wir Folgendes vereinbart:\n\n'+x}
];
export function gallery(){
  return `<div class="heading"><h1>Vorlagen</h1><p>Wählen Sie eine Vorlage für Ihr Dokument.</p></div><div class="template-list">${templates.map(t=>`<a class="panel template" href="#brief/auswahl/${t.id}"><span class="tile sand">${icon('letter')}</span><h2>${t.name}</h2><p>${t.description}</p></a>`).join('')}</div>`;
}
export function chooseClient(state,title){
  return `<div class="heading"><h1>${esc(title)}</h1><p>Wählen Sie zuerst das Dossier für die Ablage.</p></div><form class="padded panel chooser" id="choose-client"><label>Zieldossier<select name="client" required><option value="">Dossier auswählen</option>${clientOptions(state.clients)}</select></label><button class="btn primary">Weiter</button></form>`;
}
const field=(name,label,value)=>`<label>${label}<input name="${name}" value="${esc(value)}" required></label>`;
export function letterView(c,t){
  return `<div class="heading"><h1>Dokument erstellen</h1><p>${esc(c.name)} · ${c.id}</p></div><div class="split letter-split"><form id="letter-form" class="fields panel padded">${dest(c)}<label>Vorlage<select id="template-select">${templates.map(x=>'<option value="'+x.id+'"'+(t===x?' selected':'')+'>'+x.name+'</option>').join('')}</select></label>
  ${field('parameter',t.label,t.value)}${field('detail',t.detail,t.extra)}${field('date','Briefdatum',dateCH(today))}
  <details><summary>Empfänger und Absender bearbeiten</summary>${field('person','Name',c.name)}${field('street','Strasse und Hausnummer',c.street)}${field('city','PLZ und Ort',c.city)}${field('greeting','Anrede','Guten Tag '+c.name)}${field('worker','Sachbearbeitung',c.worker)}</details>
  <div class="actions"><button class="btn primary">${icon('folder')}Im Dossier ablegen</button><button class="btn soft" type="button" id="print-letter">${icon('print')}Drucken / Als PDF sichern</button></div></form><section class="paper-area"><h2>Briefvorschau</h2><div id="letter-preview"></div></section></div>`;
}
function sheet(c,t,v){
  return `<article class="sheet"><div class="letter-head"><span class="letter-emblem">${icon('stack')}</span><strong>Sozialdienst Musterwil</strong></div><div class="letter-meta">Gemeindehaus · Musterplatz 1 · 9999 Musterwil</div><p>${esc(v.person)}<br>${esc(v.street)}<br>${esc(v.city)}</p><p class="letter-date">Musterwil, ${esc(v.date)}</p><div class="letter-meta">Dossier ${c.id} · Fiktiver Demobrief</div><h2>${t.name}</h2><p>${esc(v.greeting)}</p><p class="verbatim">${esc(t.body(v.parameter,v.detail))}</p><p>Freundliche Grüsse<br>${esc(v.worker)}<br>Sozialdienst Musterwil</p></article>`;
}
export function bindLetter(c,t,done){
  const form=document.querySelector('#letter-form');
  const preview=document.querySelector('#letter-preview');
  const update=()=>{
    preview.innerHTML=sheet(c,t,Object.fromEntries(new FormData(form)));
    document.querySelector('#print-copy').innerHTML=preview.innerHTML;
  };
  update();
  form.oninput=update;
  document.querySelector('#template-select').onchange=e=>{location.hash='brief/'+c.id+'/'+e.target.value;};
  document.querySelector('#print-letter').onclick=()=>window.print();
  form.onsubmit=e=>{
    e.preventDefault();
    c.docs.unshift({id:uid(),title:t.name,type:'Korrespondenz',date:today,sender:'Sozialdienst Musterwil',person:form.elements.person.value,letter:preview.innerHTML});
    done(c);
  };
}
