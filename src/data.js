// The review scenario has a fixed date so every reset starts at the same point.
export const today = '2026-11-23';
export const worker = 'Nora Spiel';
const people = [
  ['Lea Muster', 'Nelkenweg 8', 'Aktiv', 'Wohnsituation und Alltagsberatung', 'mint'],
  ['Nino Beispiel', 'Beispielrain 12', 'Aktiv', 'Beruflicher Wiedereinstieg', 'sand'],
  ['Mira Fabel', 'Papiergasse 4', 'In Abklärung', 'Begleitung beim Ausbildungsstart', 'lilac'],
  ['Elio Modell', 'Skizzenweg 6', 'Aktiv', 'Beratung zur Tagesstruktur', 'blue'],
  ['Ada Probe', 'Musterbogen 2', 'Abgeschlossen', 'Abschluss der Wohnberatung', 'rose']
];
const sourceDocs = [
  ['Mietzinsbestätigung', 'Bestätigung', 'Wohnbau Beispiel', '2026-11-23', 'Lea Muster', 'Wir bestätigen für die Wohnung am Nelkenweg 8 einen monatlichen Mietzins von CHF 980.– inklusive Nebenkosten. Die Bestätigung gilt ab dem 01.12.2026.'],
  ['Einsatzplan Werkatelier', 'Einsatzplan', 'Werkatelier Modell', '2026-11-20', 'Nino Beispiel', 'Der begleitete Einsatz im Werkatelier beginnt am 30.11.2026. Die Einführung findet am Montag um 09.00 Uhr im Atelier statt.'],
  ['Kursanmeldung', 'Anmeldung', 'Lernhaus Fabel', '2026-11-20', 'Mira Fabel', 'Der Platz im Vorbereitungskurs ist reserviert. Bitte bringen Sie zum ersten Kurstag Ihre ausgefüllte Anmeldung mit.']
];
export const types = ['Bestätigung', 'Einsatzplan', 'Anmeldung', 'Korrespondenz', 'Vereinbarung', 'Weitere Unterlagen'];
export function initialState() {
  const clients = people.map(([name, street, status, topic, color], i) => ({
    id: 'DEMO-' + (1001 + i), name, street, city: '9999 Musterwil', status, topic, color, worker,
    docs: [{ id: 'basis-' + i, title: ['Beratungsvereinbarung', 'Einsatzvereinbarung', 'Anmeldung Erstberatung', 'Wochenplan', 'Abschlussbestätigung'][i],
      type: ['Vereinbarung', 'Vereinbarung', 'Anmeldung', 'Einsatzplan', 'Bestätigung'][i], date: '2026-11-' + (16 - i), sender: 'Sozialdienst Musterwil', person: name,
      body: 'Im Gespräch mit ' + name + ' wurde das Thema «' + topic + '» besprochen. Die nächsten Schritte wurden gemeinsam festgehalten.' }],
    notes: [{id: 'notiz-' + i, date: '2026-11-' + (16 - i), title: ['Erstgespräch zur Wohnsituation', 'Einstieg im Werkatelier', 'Ausbildungsstart besprochen', 'Wochenstruktur vereinbart', 'Abschlussgespräch'][i],
      type: 'Gesprächsnotiz', body: ['Frau Muster bringt die Mietzinsbestätigung zum nächsten Termin mit. Gemeinsam prüfen wir die Unterlagen für das Wohndossier.',
        'Der Start im Werkatelier ist vereinbart. Der Einsatzplan folgt per Post.', 'Der Vorbereitungskurs ist besprochen. Die Kursanmeldung steht noch aus.',
        'Die vereinbarte Wochenstruktur wird beim nächsten Treffen besprochen.', 'Die Wohnberatung wurde im gegenseitigen Einverständnis abgeschlossen.'][i]}]
  }));
  clients[0].docs.push({id:'wohnen', title:'Unterlagen zum Erstgespräch', type:'Weitere Unterlagen', date:'2026-11-12',
    sender:'Sozialdienst Musterwil',person:'Lea Muster',body:'Frau Muster hat eine Übersicht ihrer Wohnkosten mitgebracht. Die aktuelle Mietzinsbestätigung wird nachgereicht.'});
  clients[0].notes.push({id:'kontakt',date:'2026-11-12',title:'Telefonische Anmeldung',type:'Telefonnotiz',body:'Frau Muster bittet um einen Beratungstermin zu ihrer Wohnsituation.'});
  return {clients, recent:clients.map(c=>c.id), inbox:sourceDocs.map(([title,type,sender,date,person,body], i)=>({id:'eingang-'+i,title,type,sender,date,person,body}))};
}
export const paperText = 'Unterlagen gemeinsam gesichtet. Offene Fragen beim nächsten Termin klären. Rückmeldung bis Freitag vereinbart.';
