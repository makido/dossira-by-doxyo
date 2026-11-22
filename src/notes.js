import {esc, icon, href, dateCH, dest, clientOptions, search, uid} from './ui.js';
import {paperText, today} from './data.js';
export function notesView(state) {
  return `<div class="heading"><h1>Akten und Notizen</h1><p>Gesprächsnotizen in den Dossiers nachlesen und ergänzen.</p></div><div class="dossier-actions">${href('notiz','Notiz hinzufügen','btn primary','notes')}</div><section class="panel"><div class="filters">${search('Notizen suchen','Titel oder Text suchen')}<label>Dossier<select data-filter><option value="">Alle Dossiers</option>${clientOptions(state.clients)}</select></label></div><div id="results"></div></section>`;
}
export function noteEditor(c,paper) {
  return `<div class="heading"><h1>Notiz hinzufügen</h1><p>${esc(c.name)} · ${c.id}</p></div><div class="tabs">${href('notiz/'+c.id,'Notiz schreiben',paper?'':'on','notes')}${href('notiz/'+c.id+'/papier','Papiernotiz erfassen',paper?'on':'','scan')}</div><div class="${paper?'split':'chooser'}"><form class="panel padded fields" id="note-form">${dest(c)}<label>Datum (TT.MM.JJJJ)<input name="date" required inputmode="numeric" value="${dateCH(today)}" pattern="[0-9]{2}[.][0-9]{2}[.][0-9]{4}"></label><label>Titel<input name="title" required value="${paper?'Gesprächsnotiz vom Beratungstermin':''}"></label><label>${paper?'Erkannter Text (Demo – simuliert)':'Notiztext'}<textarea rows="5" name="body" required>${paper?paperText:''}</textarea></label><button class="btn primary">${icon('notes')}Zur Akte hinzufügen</button></form>${paper?`<section class="paper-area"><h2>Fiktive Papiervorlage</h2><img class="paper-note" src="./assets/example-note.svg" alt="Gesprächsnotiz vom 23.11.2026: ${paperText}"><p class="scan-caption">Vorbereiteter Beispieltext zur Prüfung. Die Texterkennung ist simuliert.</p></section>`:''}</div>`;
}
export function bindNote(c,paper,done) {
  const form=document.querySelector('#note-form');
  form.oninput=e=>e.target.setCustomValidity?.('');
  form.onsubmit=e=>{
    e.preventDefault();
    const {date,title,body}=form.elements;
    const iso=date.value.split('.').reverse().join('-');
    const parsed=new Date(iso+'T12:00:00Z');
    if (Number.isNaN(parsed.valueOf()) || parsed.toISOString().slice(0,10)!==iso) date.setCustomValidity('Bitte geben Sie ein gültiges Datum ein.');
    if (!title.value.trim()) title.setCustomValidity('Bitte geben Sie einen Titel ein.');
    if (!body.value.trim()) body.setCustomValidity('Bitte geben Sie einen Notiztext ein.');
    if (!form.reportValidity()) return;
    c.notes.unshift({id:uid(),date:iso,title:title.value.trim(),body:body.value.trim(),type:paper?'Papiernotiz (simuliert)':'Gesprächsnotiz'});
    done(c);
  };
}
