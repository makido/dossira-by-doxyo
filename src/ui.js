export function esc(value = '') {
  return String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[ch]));
}
export const dateCH = value => value.split('-').reverse().join('.');
const paths = {
  home:'<path d="M3 10 12 3l9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
  grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  clients:'<circle cx="9" cy="8" r="3.4"/><path d="M2 20v-2a7 7 0 0 1 14 0v2M16 4.8a3.4 3.4 0 0 1 0 6.6M19 14a6 6 0 0 1 3 5"/>',
  inbox:'<path d="m3 14 3-9h12l3 9v6H3zm0 0h5l1.5 3h5l1.5-3h5"/>',
  letter:'<path d="M5 3h9l5 5v13H5zM14 3v6h5M8 13h8M8 16h6"/>',
  notes:'<path d="M13 4H5v16h15v-8M10 14l1-4L18.5 2.5a1.4 1.4 0 0 1 3 3L14 13z"/>',
  reset:'<path d="M4 10a8 8 0 1 1 0 5m0-11v6h6"/>',
  calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 11h18"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  folder:'<path d="M3 6h6l2 2h10v12H3z"/>',
  search:'<circle cx="10" cy="10" r="6.5"/><path d="m15 15 6 6"/>',
  add:'<path d="M12 5v14M5 12h14"/>',
  scan:'<path d="M3 8V3h5m8 0h5v5m0 8v5h-5m-8 0H3v-5M3 12h18"/>',
  print:'<path d="M7 8V3h10v5M7 17H3V9h18v8h-4M7 14h10v7H7z"/>',
  check:'<path d="m4 12 5 5L20 6"/>',
  pin:'<path d="M5 9a7 7 0 1 1 14 0c0 5-7 12-7 12S5 14 5 9z"/><circle cx="12" cy="9" r="2"/>',
  stack:'<path d="m3 8 9-4 9 4-9 4zm0 5 9 4 9-4m-18 5 9 4 9-4"/>'
};
export const icon = name => '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(paths[name] || '')+'</svg>';
export function avatar(c) { return '<span class="avatar '+c.color+'" aria-hidden="true">'+c.name.split(' ').map(s=>s[0]).join('')+'</span>'; }
export function status(c) { return '<span class="status '+(c.status==='Aktiv'?'active':'')+'">'+c.status+'</span>'; }
export const href = (path,label,cls='',glyph='') => '<a class="'+cls+'" href="#'+esc(path)+'">'+(glyph?icon(glyph):'')+esc(label)+'</a>';
export const dest = c => '<div class="destination">'+icon('folder')+'<span>Zieldossier <strong>'+esc(c.name)+' · '+c.id+'</strong></span></div>';
export function options(items, selected) {return items.map(item=>'<option'+(item===selected?' selected':'')+'>'+esc(item)+'</option>').join('');}
export const clientOptions = (clients, selected) => clients.map(c=>'<option value="'+c.id+'"'+(c.id===selected?' selected':'')+'>'+esc(c.name)+' · '+c.id+'</option>').join('');
export const empty = message => '<p class="empty">'+esc(message)+'</p>';
export const search = (label,placeholder) => '<label class="search">'+icon('search')+'<input type="search" aria-label="'+label+'" placeholder="'+placeholder+'" data-search></label>';
export const uid=()=>crypto.randomUUID?.() ?? Date.now().toString(36)+'-'+Math.random().toString(36).slice(2);
