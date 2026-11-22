import {esc, icon, avatar, status, href, dateCH, options, clientOptions, search, empty, dest} from './ui.js';
import {types} from './data.js';
const docPath = (c,d) => c ? 'dossier/'+c.id+'/dokument/'+d.id : 'dokumentenablage/eingang/'+d.id;
export function clientRows(clients) {
  return clients.map(c=>`<a class="client-row" href="#dossier/${c.id}">${avatar(c)}<span class="client-id"><strong>${esc(c.name)}</strong><small>${c.id}</small></span>${status(c)}</a>`).join('') || empty('Keine passenden Dossiers gefunden.');
}
export function clientsView() {
  return `<div class="heading"><h1>Klienten</h1><p>Klienten suchen und Dossiers öffnen.</p></div><section class="panel"><div class="filters">${search('Klient oder Dossier suchen','Name oder Dossiernummer suchen')}<label>Status<select data-filter>${options(['Alle Status','Aktiv','In Abklärung','Abgeschlossen'])}</select></label></div><div id="results"></div></section>`;
}
export const match = (str,q) => str.toLocaleLowerCase('de-CH').includes(q.trim().toLocaleLowerCase('de-CH'));
export function docRows(entries, inbox=false) {
  return entries.map(({d,c})=>`<div class="doc-row"><span class="tile mint">${icon('letter')}</span><div class="grow">${href(docPath(c,d),d.title,'row-title')}<small>${esc(d.type)} · ${esc(c?c.name+' · '+c.id:d.sender)}</small></div><time>${dateCH(d.date)}</time>${inbox?href('ablegen/'+d.id,'Ablegen','btn soft') : ''}</div>`).join('') || empty('Keine Dokumente in dieser Ansicht.');
}
export function filingView(state,filed) {
  return `<div class="heading"><h1>Dokumentenablage</h1><p>Eingegangene Dokumente zuordnen und abgelegte Unterlagen wiederfinden.</p></div><div class="tabs">${href('dokumentenablage','Eingang ('+state.inbox.length+')',filed?'':'on')}${href('dokumentenablage/abgelegt','Abgelegte Dokumente',filed?'on':'')}</div>
    <section class="panel"><div class="filters">${search('Dokument suchen', 'Titel, Name oder Stichwort suchen')}<label>Dokumenttyp<select data-filter>${options(['Alle Typen',...types])}</select></label></div><div id="results"></div></section>`;
}
export function documentSheet(d) {
  return `<article class="sheet"><div class="letter-head"><span class="letter-emblem">${icon('stack')}</span><strong>${esc(d.sender)}</strong></div><div class="letter-meta">Fiktives Beispieldokument</div><p>${esc(d.person)}</p><p class="letter-date">Musterwil, ${dateCH(d.date)}</p><h2>${esc(d.title)}</h2><p class="verbatim">${esc(d.body)}</p><p>Freundliche Grüsse<br>${esc(d.sender)}</p></article>`;
}
export function preview(d,c) {
  return `<div class="heading"><h1>${esc(d.title)}</h1><p>${esc(d.type)} · ${dateCH(d.date)}</p></div><div class="split"><section class="paper-area"><h2>Dokumentvorschau</h2>${d.letter || documentSheet(d)}</section><aside class="panel padded"><h2>${c?'Ablageort':'Eingang'}</h2>${c ? `<p>${href('dossier/'+c.id,c.name+' · '+c.id,'text-link')}</p>${d.keywords?'<p><strong>Stichwörter</strong><br>'+esc(d.keywords)+'</p>':''}${d.comment?'<p><strong>Kommentar</strong><br>'+esc(d.comment)+'</p>':''}` : '<p>Dieses Dokument wartet auf die Zuordnung zu einem Dossier.</p>'+href('ablegen/'+d.id,'Ablegen','btn primary','folder')}</aside></div>`;
}
export function assignment(state,d) {
  return `<div class="heading"><h1>Dokument ablegen</h1><p>${esc(d.title)} · ${esc(d.sender)}</p></div><div class="split"><form id="filing-form" class="panel padded fields"><h2>Dossier zuordnen</h2><label>Klient suchen<input type="search" id="assign-search" placeholder="Name oder Dossiernummer"></label><label>Zieldossier<select name="client" required><option value="">Dossier auswählen</option>${clientOptions(state.clients)}</select></label><div id="filing-destination"></div><label>Dokumenttyp<select name="type">${options(types,d.type)}</select></label><label>Stichwörter (optional)<input name="keywords" placeholder="z. B. Wohnen, Mietzins"></label><label>Kommentar (optional)<textarea name="comment" rows="2"></textarea></label><button class="btn primary">${icon('folder')}Im Dossier ablegen</button></form><section class="paper-area"><h2>Dokumentvorschau</h2>${documentSheet(d)}</section></div>`;
}
export function dossier(c, notes) {
  return `<div class="heading dossier-head">${avatar(c)}<div><p>${c.id} · Klientendossier</p><h1>${esc(c.name)}</h1></div>${status(c)}</div><div class="dossier-info"><span><b>Beratung</b>${esc(c.topic)}</span><span><b>Fallführung</b>${esc(c.worker)}</span><span><b>Adresse</b>${esc(c.street)}, ${esc(c.city)}</span></div>
    <div class="actions dossier-actions">${href('brief/'+c.id,'Dokument erstellen','btn primary','letter')}${href('notiz/'+c.id,'Notiz hinzufügen','btn soft','notes')}</div>
    <div class="tabs">${href('dossier/'+c.id,'Dokumente ('+c.docs.length+')',notes?'':'on')}${href('dossier/'+c.id+'/verlauf','Aktenverlauf ('+c.notes.length+')',notes?'on':'')}</div>
    <section class="panel">${notes?timeline(c.notes.map(n=>({n,c}))) : `<div class="filters">${search('Dokumente in diesem Dossier suchen','Dokument in diesem Dossier suchen')}</div><div id="results"></div>`}</section>`;
}
export function timeline(rows, global=false) {
  return [...rows].sort((a,b)=>b.n.date.localeCompare(a.n.date)).map(({n,c})=>`<article class="note-row"><span class="tile ${n.type.startsWith('Papier')?'sand':'mint'}">${icon(n.type.startsWith('Papier')?'scan':'notes')}</span><div><small>${dateCH(n.date)} · ${esc(n.type)}</small><h3>${esc(n.title)}</h3>${global?href('dossier/'+c.id+'/verlauf',c.name+' · '+c.id,'text-link'):''}<p class="verbatim">${esc(n.body)}</p></div></article>`).join('') || empty('Keine passenden Notizen gefunden.');
}
export function filterFiling(state, route, c, q, filter) {
  if (route[0]==='klienten') return clientRows(state.clients.filter(x=>match(x.name+x.id+' '+x.topic,q)&&(!filter||filter==='Alle Status'||x.status===filter)));
  const inbox=route[0]==='dokumentenablage' && route[1]!=='abgelegt';
  const rows = inbox?state.inbox.map(d=>({d})): (c?[c]:state.clients).flatMap(c=>c.docs.map(d=>({d,c}))).sort((a,b)=>b.d.date.localeCompare(a.d.date));
  return docRows(rows.filter(({d,c})=>match([d.title,d.person,d.sender,c?.name,c?.id,d.keywords,d.comment,d.type].filter(Boolean).join(' '),q)&&(!filter||filter==='Alle Typen'||d.type===filter)), inbox);
}
export function bindAssignment(form,state,d,done) {
  const select=form.elements.client;
  function update() {
    const c=state.clients.find(c=>c.id===select.value);
    form.querySelector('#filing-destination').innerHTML=c?dest(c):'';
  }
  form.querySelector('#assign-search').oninput=e=>{
    const visible=state.clients.filter(c=>match(c.name+' '+c.id,e.target.value));
    const prior=select.value;
    select.innerHTML='<option value="">'+(visible.length?'Dossier auswählen':'Kein passendes Dossier')+'</option>'+clientOptions(visible,prior);
    if (visible.length===1) select.value=visible[0].id;
    update();
  };
  select.onchange=update;
  form.onsubmit=e=>{
    e.preventDefault();
    const c=state.clients.find(c=>c.id===select.value);
    if (!c || !state.inbox.includes(d)) return;
    c.docs.unshift({...d,type:form.elements.type.value,keywords:form.elements.keywords.value.trim(),comment:form.elements.comment.value.trim()});
    state.inbox=state.inbox.filter(item=>item.id!==d.id);
    done(c);
  };
}
