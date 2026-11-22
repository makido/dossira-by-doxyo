import {icon, href} from './ui.js';
import {clientRows} from './filing.js';
export function workplace(state) {
  const count=state.inbox.length;
  const label=count+(count===1?' Dokument':' Dokumente')+' im Eingang';
  const recent=state.recent.slice(0,3).map(id=>state.clients.find(c=>c.id===id));
  return `<div class="heading home-heading"><div><h1>Arbeitsplatz</h1><p>Guten Morgen, Nora Spiel.</p></div><div class="date-pill">${icon('calendar')}Montag, 23.11.2026</div></div>
    <section class="inbox-hero" aria-labelledby="inbox-title"><div class="hero-copy"><div class="eyebrow">${icon('inbox')}Dokumentenablage</div><h2 id="inbox-title">${href('dokumentenablage',label)}</h2><p>${count?'Ordnen Sie die eingegangenen Dokumente den passenden Dossiers zu.':'Alle eingegangenen Dokumente sind abgelegt.'}</p>${href('dokumentenablage','Eingang öffnen','hero-btn','inbox')}</div><img class="hero-art" src="./assets/inbox.svg" alt=""></section>
    <div class="home-cols"><section class="panel"><div class="panel-title"><h2>Zuletzt geöffnete Dossiers</h2>${href('klienten','Alle anzeigen','text-link')}</div><div>${clientRows(recent)}</div></section>
    <section class="panel quick"><div class="panel-title"><h2>Schnellzugriff</h2></div>
    ${quick('vorlagen','letter','sand','Dokument erstellen','Brief aus einer Vorlage')}
    ${quick('notiz','notes','lilac','Notiz hinzufügen','Gespräch im Dossier festhalten')}
    ${quick('klienten','search','blue','Klient suchen','Dossier nach Name oder Nummer')}</section></div>
    <div class="home-foot">${icon('stack')}Sozialdienst Musterwil<span>Fiktive Arbeitsumgebung</span></div>`;
}
function quick(path,glyph,color,title,sub) {
  return `<a class="quick-row" href="#${path}"><span class="tile ${color}">${icon(glyph)}</span><span><strong>${title}</strong><small>${sub}</small></span></a>`;
}
