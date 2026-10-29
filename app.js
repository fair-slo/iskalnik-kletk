/* Fair4u.si – iskalnik pasjih transportnih kletk po avtomobilu
   Ta datoteka se naloži iz Ecwida; podatki (znamke, vozila, izdelki) se naložijo iz iste mape,
   podatki posamezne znamke pa šele, ko jo kupec izbere. */
(function () {
  'use strict';
  if (window.__F4U_KLETKE_LOADED) return;
  window.__F4U_KLETKE_LOADED = true;

  var SCRIPT = document.currentScript && document.currentScript.src;
  var CONFIG = {
    // mapa s podatki (samodejno: ista mapa kot ta datoteka)
    base: SCRIPT ? SCRIPT.replace(/[^\/]*$/, '') : '',
    version: '202610290611',
    // Ecwid ID kategorije, kjer se iskalnik prikaže samodejno, če element #f4u-kletke ni najden
    categoryIds: [208535776],
    photoBase: 'https://hubo.alpuna.de/modules/gallery/galleries/',
    thumbBase: 'https://boxenreferenz.alpuna.de/'
  };

  var STATUS = {
    ok:    { label: 'Ustreza', cls: 'ok' },
    adapt: { label: 'Potrebna prilagoditev', cls: 'adapt' },
    tight: { label: 'Tesno / s pogojem', cls: 'tight' },
    small: { label: 'Samo za manjše pse', cls: 'small' },
    shown: { label: 'Prikazano v vozilu', cls: 'shown' },
    check: { label: 'Za preverjanje', cls: 'check' },
    no:    { label: 'Ne ustreza', cls: 'no' }
  };

  var CSS = '#f4u-kf#f4u-kf#f4u-kf{--ink:#1f1d24;--muted:#625e6b;--line:#e8e4ec;--soft:#f7f4f9;--acc:#6e4b80;--acc2:#8c66a0;--accsoft:#f3edf7;font-family:inherit;color:var(--ink);line-height:1.5;max-width:1180px;margin:8px auto 40px;box-sizing:border-box}#f4u-kf#f4u-kf#f4u-kf *,#f4u-kf#f4u-kf#f4u-kf *::before,#f4u-kf#f4u-kf#f4u-kf *::after{box-sizing:border-box}#f4u-kf#f4u-kf#f4u-kf p{margin:0}#f4u-kf#f4u-kf#f4u-kf .f4u-selects{display:grid;grid-template-columns:repeat(2,minmax(0,320px));gap:16px;margin-bottom:28px}#f4u-kf#f4u-kf#f4u-kf .f4u-field{display:flex;flex-direction:column;gap:6px;font-size:13px;font-weight:600;letter-spacing:.02em;color:var(--muted);text-transform:uppercase}#f4u-kf#f4u-kf#f4u-kf .f4u-sel{appearance:none;-webkit-appearance:none;width:100%;font:inherit;font-size:16px;font-weight:500;text-transform:none;letter-spacing:0;color:var(--ink);background:#fff url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'8\' viewBox=\'0 0 12 8\'%3E%3Cpath d=\'M1 1.5l5 5 5-5\' fill=\'none\' stroke=\'%236e4b80\' stroke-width=\'1.8\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/%3E%3C/svg%3E") no-repeat right 16px center;border:1px solid var(--line);border-radius:12px;padding:13px 44px 13px 16px;cursor:pointer;transition:border-color .15s,box-shadow .15s;margin:0;height:auto}#f4u-kf#f4u-kf#f4u-kf .f4u-sel:hover{border-color:#cfc5d6}#f4u-kf#f4u-kf#f4u-kf .f4u-sel:focus{outline:none;border-color:var(--acc2);box-shadow:0 0 0 3px var(--accsoft)}#f4u-kf#f4u-kf#f4u-kf .f4u-sel:disabled{background-color:var(--soft);color:#a39fab;cursor:not-allowed}#f4u-kf#f4u-kf#f4u-kf .f4u-h{font-size:15px;font-weight:600;margin:0 0 12px;color:var(--ink)}#f4u-kf#f4u-kf#f4u-kf .f4u-cars{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,220px));gap:14px;margin-bottom:28px}#f4u-kf#f4u-kf#f4u-kf .f4u-car{display:flex;flex-direction:column;align-items:stretch;text-align:left;font:inherit;color:inherit;background:#fff;border:1px solid var(--line);border-radius:14px;padding:10px 10px 12px;cursor:pointer;transition:border-color .15s,box-shadow .15s,transform .15s;margin:0}#f4u-kf#f4u-kf#f4u-kf .f4u-car:hover{border-color:#cfc5d6;box-shadow:0 4px 14px rgba(40,20,50,.07);transform:translateY(-1px)}#f4u-kf#f4u-kf#f4u-kf .f4u-car.is-on{border-color:var(--acc);box-shadow:0 0 0 2px var(--accsoft),0 4px 14px rgba(110,75,128,.12)}#f4u-kf#f4u-kf#f4u-kf .f4u-car-img{display:flex;align-items:center;justify-content:center;aspect-ratio:13/10;background:var(--soft);border-radius:9px;overflow:hidden;margin-bottom:10px}#f4u-kf#f4u-kf#f4u-kf .f4u-car-img img{width:100%;height:100%;object-fit:contain;display:block}#f4u-kf#f4u-kf#f4u-kf .f4u-noimg{font-size:12px;color:#9a95a3;padding:8px;text-align:center}#f4u-kf#f4u-kf#f4u-kf .f4u-car-name{font-weight:600;font-size:15px;line-height:1.3}#f4u-kf#f4u-kf#f4u-kf .f4u-car-tag{font-size:13px;color:var(--acc);font-weight:500;margin-top:2px}#f4u-kf#f4u-kf#f4u-kf .f4u-car-years{font-size:13px;color:var(--muted);margin-top:2px}#f4u-kf#f4u-kf#f4u-kf .f4u-result{border-top:1px solid var(--line);padding-top:26px;scroll-margin-top:90px}#f4u-kf#f4u-kf#f4u-kf .f4u-eyebrow{font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:var(--acc);font-weight:600}#f4u-kf#f4u-kf#f4u-kf .f4u-res-head h3{font-size:22px;line-height:1.25;margin:2px 0 2px;font-weight:600;color:var(--ink)}#f4u-kf#f4u-kf#f4u-kf .f4u-sub{color:var(--muted);font-size:14px;margin-bottom:18px !important}#f4u-kf#f4u-kf#f4u-kf .f4u-alert{background:#fff7eb;border:1px solid #f1dcb4;border-left:4px solid #d99a2b;border-radius:12px;padding:12px 16px;margin:0 0 12px;font-size:14.5px}#f4u-kf#f4u-kf#f4u-kf .f4u-alert strong{display:block;font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:#8a5a00;margin-bottom:2px}#f4u-kf#f4u-kf#f4u-kf .f4u-intro{background:var(--soft);border-radius:12px;padding:14px 16px;margin:0 0 18px;font-size:14.5px;color:#3c3844}#f4u-kf#f4u-kf#f4u-kf .f4u-intro p+p{margin-top:6px}#f4u-kf#f4u-kf#f4u-kf .f4u-extras{display:flex;flex-wrap:wrap;gap:12px;margin:0 0 18px}#f4u-kf#f4u-kf#f4u-kf .f4u-extras .f4u-extra{cursor:zoom-in;display:flex;flex-direction:column;width:200px;max-width:calc(50% - 6px);text-decoration:none;color:var(--muted);font-size:12.5px}#f4u-kf#f4u-kf#f4u-kf .f4u-extras img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:10px;background:var(--soft);display:block;margin-bottom:4px}#f4u-kf#f4u-kf#f4u-kf .f4u-sec{font-size:16px;font-weight:600;margin:22px 0 12px;padding-left:10px;border-left:3px solid var(--acc2);color:var(--ink)}#f4u-kf#f4u-kf#f4u-kf .f4u-boxes{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:16px}#f4u-kf#f4u-kf#f4u-kf .f4u-boxes.is-small{grid-template-columns:repeat(auto-fill,minmax(210px,1fr))}#f4u-kf#f4u-kf#f4u-kf .f4u-box{display:flex;flex-direction:column;background:#fff;border:1px solid var(--line);border-radius:14px;overflow:hidden}#f4u-kf#f4u-kf#f4u-kf .f4u-box-img{cursor:zoom-in;display:flex;align-items:center;justify-content:center;aspect-ratio:4/3;background:var(--soft);overflow:hidden;cursor:zoom-in}#f4u-kf#f4u-kf#f4u-kf .f4u-box-img img{width:100%;height:100%;object-fit:cover;display:block}#f4u-kf#f4u-kf#f4u-kf .f4u-box-img.is-prod{cursor:default}#f4u-kf#f4u-kf#f4u-kf .f4u-box-img.is-prod img{object-fit:contain;padding:10px}#f4u-kf#f4u-kf#f4u-kf .f4u-box-img.is-none{cursor:default;color:#9a95a3;font-size:13px}#f4u-kf#f4u-kf#f4u-kf .f4u-cap{display:block;font-size:12px;color:var(--muted);padding:6px 14px 0;min-height:18px}#f4u-kf#f4u-kf#f4u-kf .f4u-box-body{padding:8px 14px 14px;display:flex;flex-direction:column;gap:6px;flex:1}#f4u-kf#f4u-kf#f4u-kf .f4u-box-top{display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap}#f4u-kf#f4u-kf#f4u-kf .f4u-box h4{font-size:17px;font-weight:600;margin:0;color:var(--ink)}#f4u-kf#f4u-kf#f4u-kf .f4u-badge{font-size:11.5px;font-weight:600;padding:3px 9px;border-radius:999px;white-space:nowrap}#f4u-kf#f4u-kf#f4u-kf .f4u-badge.is-ok{background:#e9f6ee;color:#226a40}#f4u-kf#f4u-kf#f4u-kf .f4u-badge.is-adapt{background:#fff2dc;color:#8a5a00}#f4u-kf#f4u-kf#f4u-kf .f4u-badge.is-tight{background:#fdeee3;color:#9a4b12}#f4u-kf#f4u-kf#f4u-kf .f4u-badge.is-small{background:var(--accsoft);color:var(--acc)}#f4u-kf#f4u-kf#f4u-kf .f4u-badge.is-shown{background:#eef0f3;color:#4b5563}#f4u-kf#f4u-kf#f4u-kf .f4u-badge.is-check{background:#fdecec;color:#a3302d}#f4u-kf#f4u-kf#f4u-kf .f4u-badge.is-no{background:#f1f0f2;color:#77727e}#f4u-kf#f4u-kf#f4u-kf .f4u-dims{font-size:13px;color:var(--muted)}#f4u-kf#f4u-kf#f4u-kf .f4u-note{font-size:14px;color:#3c3844}#f4u-kf#f4u-kf#f4u-kf .f4u-box.is-adapt .f4u-note,#f4u-kf#f4u-kf#f4u-kf .f4u-box.is-tight .f4u-note,#f4u-kf#f4u-kf#f4u-kf .f4u-box.is-check .f4u-note{background:#fffaf2;border-radius:8px;padding:8px 10px}#f4u-kf#f4u-kf#f4u-kf .f4u-box.is-check .f4u-note{background:#fdf4f4}#f4u-kf#f4u-kf#f4u-kf .f4u-actions{margin-top:auto;padding-top:6px;display:flex;flex-direction:column;gap:6px}#f4u-kf#f4u-kf#f4u-kf .f4u-btn{display:inline-flex;align-items:center;justify-content:center;text-align:center;font-size:14.5px;font-weight:600;text-decoration:none !important;color:#fff !important;background:var(--acc);border:1px solid var(--acc);border-radius:10px;padding:10px 14px;transition:background .15s}#f4u-kf#f4u-kf#f4u-kf .f4u-btn:hover{background:#5c3d6c}#f4u-kf#f4u-kf#f4u-kf .f4u-btn.is-ghost{background:#fff;color:var(--acc) !important}#f4u-kf#f4u-kf#f4u-kf .f4u-btn.is-ghost:hover{background:var(--accsoft)}#f4u-kf#f4u-kf#f4u-kf .f4u-link{font-size:13px;color:var(--acc) !important;text-align:center}#f4u-kf#f4u-kf#f4u-kf .f4u-nofit{margin-top:26px;border:1px solid var(--line);border-radius:14px;padding:0 16px;background:#fff}#f4u-kf#f4u-kf#f4u-kf .f4u-nofit summary{cursor:pointer;padding:14px 0;font-weight:600;font-size:15px;color:#6b6672}#f4u-kf#f4u-kf#f4u-kf .f4u-nofit .f4u-boxes{padding-bottom:16px}#f4u-kf#f4u-kf#f4u-kf .f4u-nofit .f4u-box{opacity:.92}#f4u-kf#f4u-kf#f4u-kf .f4u-nofit .f4u-box-img img{filter:grayscale(.35)}#f4u-kf#f4u-kf#f4u-kf .f4u-empty{background:var(--accsoft);border-radius:14px;padding:18px;display:flex;flex-direction:column;gap:12px;align-items:flex-start;margin-top:8px}#f4u-kf#f4u-kf#f4u-kf .f4u-foot{margin-top:26px;font-size:13.5px;color:var(--muted)}#f4u-kf#f4u-kf#f4u-kf .f4u-foot a{color:var(--acc)}#f4u-kf#f4u-kf#f4u-kf .f4u-lb{position:fixed;inset:0;z-index:99999;background:rgba(20,16,24,.86);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px}#f4u-kf#f4u-kf#f4u-kf .f4u-lb[hidden]{display:none}#f4u-kf#f4u-kf#f4u-kf .f4u-lb img{max-width:100%;max-height:82vh;object-fit:contain;border-radius:8px}#f4u-kf#f4u-kf#f4u-kf .f4u-lb p{color:#eee;font-size:14px;margin-top:10px !important;text-align:center}#f4u-kf#f4u-kf#f4u-kf .f4u-lb-x{position:absolute;top:12px;right:16px;font-size:34px;line-height:1;color:#fff;background:none;border:0;cursor:pointer}@media (max-width:640px){#f4u-kf#f4u-kf#f4u-kf .f4u-selects{grid-template-columns:1fr;gap:12px}#f4u-kf#f4u-kf#f4u-kf .f4u-cars{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}#f4u-kf#f4u-kf#f4u-kf .f4u-car-name{font-size:14px}#f4u-kf#f4u-kf#f4u-kf .f4u-boxes,#f4u-kf#f4u-kf#f4u-kf .f4u-boxes.is-small{grid-template-columns:1fr}#f4u-kf#f4u-kf#f4u-kf .f4u-res-head h3{font-size:19px}#f4u-kf#f4u-kf#f4u-kf .f4u-extras .f4u-extra{cursor:zoom-in;max-width:calc(50% - 6px)}}#f4u-kf#f4u-kf#f4u-kf h3,#f4u-kf#f4u-kf#f4u-kf h4{font-family:inherit;letter-spacing:0;text-transform:none;line-height:1.3}#f4u-kf#f4u-kf#f4u-kf a{text-decoration:none}#f4u-kf#f4u-kf#f4u-kf .f4u-car,#f4u-kf#f4u-kf#f4u-kf .f4u-box,#f4u-kf#f4u-kf#f4u-kf .f4u-nofit{background-color:#fff}#f4u-kf#f4u-kf#f4u-kf .f4u-sum{border:1px solid var(--line);border-radius:14px;padding:14px 16px;margin:0 0 8px;display:flex;flex-direction:column;gap:10px;background:#fff}#f4u-kf#f4u-kf#f4u-kf .f4u-sum-row{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px}#f4u-kf#f4u-kf#f4u-kf .f4u-sum-l{font-size:13px;font-weight:600;color:var(--muted);min-width:250px}#f4u-kf#f4u-kf#f4u-kf .f4u-chips{display:flex;flex-wrap:wrap;gap:6px}#f4u-kf#f4u-kf#f4u-kf .f4u-chip{font:inherit;font-size:13.5px;font-weight:600;padding:5px 11px;border-radius:999px;border:1px solid var(--line);background:#fff;color:var(--ink);cursor:pointer;margin:0;line-height:1.2}#f4u-kf#f4u-kf#f4u-kf .f4u-chip.is-ours{background:var(--acc);border-color:var(--acc);color:#fff}#f4u-kf#f4u-kf#f4u-kf .f4u-chip.is-no{background:#f1f0f2;color:#8a8590;cursor:default;text-decoration:line-through}#f4u-kf#f4u-kf#f4u-kf .f4u-sum-hint{font-size:12.5px;color:var(--muted)}#f4u-kf#f4u-kf#f4u-kf .f4u-box.is-compact .f4u-box-body{padding-top:14px}#f4u-kf#f4u-kf#f4u-kf .f4u-box.is-flash{box-shadow:0 0 0 3px var(--acc2);transition:box-shadow .3s}@media (max-width:640px){#f4u-kf#f4u-kf#f4u-kf .f4u-sum-l{min-width:0;width:100%}}#f4u-kf#f4u-kf#f4u-kf .f4u-hero{margin:0 0 28px;max-width:none}#f4u-kf#f4u-kf#f4u-kf .f4u-lead{font-size:22px;line-height:1.4;font-weight:500;color:var(--ink);margin:0 0 10px !important;letter-spacing:-.005em}#f4u-kf#f4u-kf#f4u-kf .f4u-lead em{font-style:normal;color:var(--acc);background:linear-gradient(transparent 62%,var(--accsoft) 62%);padding:0 2px}#f4u-kf#f4u-kf#f4u-kf .f4u-lead-sub{font-size:16px;color:var(--muted);margin:0 0 18px !important}#f4u-kf#f4u-kf#f4u-kf .f4u-steps{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:8px 10px}#f4u-kf#f4u-kf#f4u-kf .f4u-steps li{display:flex;align-items:center;gap:8px;font-size:14px;font-weight:500;color:var(--ink);background:#fff;border:1px solid var(--line);border-radius:999px;padding:6px 14px 6px 6px;margin:0}#f4u-kf#f4u-kf#f4u-kf .f4u-steps li span{display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;background:var(--accsoft);color:var(--acc);font-size:12.5px;font-weight:700}#f4u-kf#f4u-kf#f4u-kf .f4u-steps li:last-child span{background:var(--acc);color:#fff}@media (max-width:640px){#f4u-kf#f4u-kf#f4u-kf .f4u-lead{font-size:19px}#f4u-kf#f4u-kf#f4u-kf .f4u-lead-sub{font-size:15px}#f4u-kf#f4u-kf#f4u-kf .f4u-steps li{font-size:13px}}#f4u-kf#f4u-kf#f4u-kf .f4u-foot{background:var(--soft);border-radius:12px;padding:14px 16px;font-size:14px;color:#3c3844}#f4u-kf#f4u-kf#f4u-kf .f4u-foot strong{color:var(--ink)}#f4u-kf#f4u-kf#f4u-kf .f4u-inquiry{display:block;text-align:center;font-size:14px;font-weight:600;color:var(--acc);background:var(--accsoft);border-radius:10px;padding:10px 14px}#f4u-kf#f4u-kf#f4u-kf .f4u-msg{background:#fdecec;color:#7a2522;border-radius:10px;padding:10px 14px;font-size:14px;margin:-12px 0 20px !important}#f4u-kf#f4u-kf#f4u-kf .f4u-box-img{position:relative}#f4u-kf#f4u-kf#f4u-kf .f4u-count{position:absolute;right:8px;bottom:8px;background:rgba(20,16,24,.72);color:#fff;font-size:12px;font-weight:600;padding:3px 9px;border-radius:999px;pointer-events:none}#f4u-kf#f4u-kf#f4u-kf .f4u-thumbs{display:flex;gap:6px;padding:8px 14px 0}#f4u-kf#f4u-kf#f4u-kf .f4u-thumb{width:56px;height:42px;border-radius:7px;overflow:hidden;cursor:zoom-in;background:var(--soft);flex:0 0 auto;border:1px solid var(--line)}#f4u-kf#f4u-kf#f4u-kf .f4u-thumb img{width:100%;height:100%;object-fit:cover;display:block}#f4u-kf#f4u-kf#f4u-kf .f4u-thumb:hover{border-color:var(--acc2)}#f4u-kf#f4u-kf#f4u-kf .f4u-lb figure{margin:0;display:flex;flex-direction:column;align-items:center;max-width:min(1100px,100%)}#f4u-kf#f4u-kf#f4u-kf .f4u-lb figcaption{color:#eee;font-size:14px;margin-top:10px;text-align:center;max-width:760px;line-height:1.45}#f4u-kf#f4u-kf#f4u-kf .f4u-lb-nav{position:absolute;top:50%;transform:translateY(-50%);width:48px;height:48px;border-radius:50%;border:0;background:rgba(255,255,255,.14);color:#fff;font-size:34px;line-height:44px;text-align:center;cursor:pointer;display:none;padding:0}#f4u-kf#f4u-kf#f4u-kf .f4u-lb-nav:hover{background:rgba(255,255,255,.26)}#f4u-kf#f4u-kf#f4u-kf .f4u-lb.is-multi .f4u-lb-nav{display:block}#f4u-kf#f4u-kf#f4u-kf .f4u-lb-nav.is-prev{left:14px}#f4u-kf#f4u-kf#f4u-kf .f4u-lb-nav.is-next{right:14px}#f4u-kf#f4u-kf#f4u-kf .f4u-extras .f4u-extra span{display:block}@media (max-width:640px){#f4u-kf#f4u-kf#f4u-kf .f4u-lb{padding:12px}#f4u-kf#f4u-kf#f4u-kf .f4u-lb-nav{top:auto;bottom:18px;transform:none;width:44px;height:44px;line-height:40px}#f4u-kf#f4u-kf#f4u-kf .f4u-lb img{max-height:72vh}#f4u-kf#f4u-kf#f4u-kf .f4u-thumb{width:64px;height:48px}}';

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function photoUrl(p) { return CONFIG.photoBase + p; }
  function thumbUrl(t) { return t ? CONFIG.thumbBase + t : ''; }

  var cache = {};
  function getJSON(path) {
    if (cache[path]) return cache[path];
    var url = CONFIG.base + path + (CONFIG.version ? '?v=' + CONFIG.version : '');
    cache[path] = fetch(url, { credentials: 'omit' }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    }).catch(function (e) { delete cache[path]; throw e; });
    return cache[path];
  }

  function injectCss() {
    if (document.getElementById('f4u-kletke-css')) return;
    var st = document.createElement('style'); st.id = 'f4u-kletke-css'; st.textContent = CSS;
    (document.head || document.documentElement).appendChild(st);
  }

  function mount(root) {
    if (!root || root.getAttribute('data-f4u-mounted')) return;
    root.setAttribute('data-f4u-mounted', '1');
    injectCss();
    var INDEX = null, PRODUCTS = {}, BRANDDATA = null;
    var state = { brand: null, model: null, variant: null };
    var gal = { list: [], i: 0 };

    root.innerHTML =
      '<div class="f4u-kf" id="f4u-kf">' +
        '<div class="f4u-hero">' +
          '<p class="f4u-lead">Varna pot za vašega psa se začne s kletko, ki se <em>res prilega</em> vašemu prtljažniku.</p>' +
          '<p class="f4u-lead-sub">V nekaj klikih preverite, katere kletke ustrezajo vašemu avtomobilu – s fotografijami iz istega modela vozila in z vsemi nasveti za namestitev.</p>' +
          '<ol class="f4u-steps"><li><span>1</span>Znamka</li><li><span>2</span>Model</li><li><span>3</span>Izvedba vozila</li><li><span>✓</span>Ustrezne kletke</li></ol>' +
        '</div>' +
        '<div class="f4u-selects">' +
          '<label class="f4u-field"><span>Znamka</span><select class="f4u-sel" data-r="brand" disabled><option value="">Nalaganje …</option></select></label>' +
          '<label class="f4u-field"><span>Model</span><select class="f4u-sel" data-r="model" disabled><option value="">Najprej izberite znamko</option></select></label>' +
        '</div>' +
        '<p class="f4u-msg" data-r="msg" hidden></p>' +
        '<div class="f4u-step" data-r="vstep" hidden><h3 class="f4u-h">Izberite izvedbo</h3><div class="f4u-cars" data-r="cars"></div></div>' +
        '<div class="f4u-result" data-r="result" hidden></div>' +
        '<div class="f4u-lb" data-r="lb" hidden role="dialog" aria-modal="true">' +
          '<button type="button" class="f4u-lb-x" aria-label="Zapri">×</button>' +
          '<button type="button" class="f4u-lb-nav is-prev" aria-label="Prejšnja fotografija">‹</button>' +
          '<figure><img alt=""><figcaption></figcaption></figure>' +
          '<button type="button" class="f4u-lb-nav is-next" aria-label="Naslednja fotografija">›</button>' +
        '</div>' +
      '</div>';

    var q = function (r) { return root.querySelector('[data-r="' + r + '"]'); };
    var selB = q('brand'), selM = q('model'), cars = q('cars'), vstep = q('vstep'), result = q('result'), lb = q('lb'), msg = q('msg');

    function showMsg(t) { msg.textContent = t || ''; msg.hidden = !t; }

    function loadIndex() {
      showMsg('');
      Promise.all([getJSON('index.json'), getJSON('products.json').catch(function () { return {}; })]).then(function (r) {
        INDEX = r[0]; PRODUCTS = r[1] || {};
        selB.innerHTML = '<option value="">Izberite znamko</option>' + INDEX.b.map(function (b, i) { return '<option value="' + i + '">' + esc(b.n) + '</option>'; }).join('');
        selB.disabled = false;
      }).catch(function () {
        selB.innerHTML = '<option value="">Podatkov ni bilo mogoče naložiti</option>';
        showMsg('Podatkov trenutno ni bilo mogoče naložiti. Osvežite stran ali poskusite znova čez nekaj trenutkov.');
        setTimeout(loadIndex, 4000);
      });
    }
    loadIndex();

    selB.addEventListener('change', function () {
      state.brand = selB.value === '' ? null : INDEX.b[+selB.value];
      state.model = null; state.variant = null; BRANDDATA = null;
      selM.disabled = true;
      selM.innerHTML = '<option value="">' + (state.brand ? 'Nalaganje …' : 'Najprej izberite znamko') + '</option>';
      renderCars(); renderResult();
      if (!state.brand) return;
      var b = state.brand;
      getJSON('data/' + b.f + '.json').then(function (d) {
        if (state.brand !== b) return;
        BRANDDATA = d;
        selM.innerHTML = '<option value="">Izberite model</option>' + b.m.map(function (m, i) { return '<option value="' + i + '">' + esc(m[0]) + '</option>'; }).join('');
        selM.disabled = false;
        if (b.m.length === 1) { selM.value = '0'; selM.dispatchEvent(new Event('change')); }
      }).catch(function () {
        if (state.brand !== b) return;
        selM.innerHTML = '<option value="">Napaka pri nalaganju</option>';
        showMsg('Podatkov za to znamko ni bilo mogoče naložiti. Izberite znamko znova.');
        selB.value = ''; state.brand = null;
      });
    });
    selM.addEventListener('change', function () {
      state.model = selM.value === '' ? null : state.brand.m[+selM.value];
      state.variant = null;
      if (state.model && state.model[1].length === 1) state.variant = state.model[1][0];
      renderCars(); renderResult();
    });
    cars.addEventListener('click', function (e) {
      var c = e.target.closest('[data-key]'); if (!c) return;
      var k = c.getAttribute('data-key');
      state.variant = state.model[1].filter(function (v) { return v[0] === k; })[0] || null;
      renderCars(); renderResult(true);
    });

    // ---- galerija (lightbox) ----
    function openGal(list, i) { gal.list = list; gal.i = i || 0; showGal(); lb.hidden = false; }
    function showGal() {
      var it = gal.list[gal.i]; if (!it) return;
      lb.querySelector('img').src = it[0];
      lb.querySelector('figcaption').textContent = (gal.list.length > 1 ? (gal.i + 1) + ' / ' + gal.list.length + (it[1] ? ' · ' : '') : '') + (it[1] || '');
      lb.classList.toggle('is-multi', gal.list.length > 1);
    }
    function step(d) { if (gal.list.length < 2) return; gal.i = (gal.i + d + gal.list.length) % gal.list.length; showGal(); }
    var touchX = null;
    lb.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) { if (touchX === null) return; var dx = e.changedTouches[0].clientX - touchX; if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1); touchX = null; });

    root.addEventListener('click', function (e) {
      var g = e.target.closest('[data-goto]');
      if (g) { var t = root.querySelector('.f4u-boxes [data-box="' + g.getAttribute('data-goto') + '"]'); if (t) { t.scrollIntoView({ behavior: 'smooth', block: 'center' }); t.classList.add('is-flash'); setTimeout(function () { t.classList.remove('is-flash'); }, 1600); } return; }
      if (e.target.closest('.f4u-lb-nav')) { step(e.target.closest('.is-prev') ? -1 : 1); return; }
      var z = e.target.closest('[data-gal]');
      if (z) { e.preventDefault(); var set = galleries[z.getAttribute('data-gal')]; if (set) openGal(set, +(z.getAttribute('data-i') || 0)); return; }
      if (e.target === lb || e.target.classList.contains('f4u-lb-x') || e.target.tagName === 'FIGURE') lb.hidden = true;
    });
    root.addEventListener('keydown', function (e) {
      if ((e.key === 'Enter' || e.key === ' ') && e.target.hasAttribute && e.target.hasAttribute('data-gal')) { e.preventDefault(); e.target.click(); }
    });
    document.addEventListener('keydown', function (e) {
      if (lb.hidden) return;
      if (e.key === 'Escape') lb.hidden = true; else if (e.key === 'ArrowRight') step(1); else if (e.key === 'ArrowLeft') step(-1);
    });

    function renderCars() {
      if (!state.model) { vstep.hidden = true; cars.innerHTML = ''; return; }
      vstep.hidden = false;
      vstep.querySelector('.f4u-h').textContent = state.model[1].length > 1 ? 'Izberite izvedbo vozila' : 'Vaše vozilo';
      cars.innerHTML = state.model[1].map(function (v) {
        var on = state.variant === v;
        var img = v[4] ? '<img src="' + esc(thumbUrl(v[4])) + '" alt="' + esc(state.brand.n + ' ' + v[1]) + '" loading="lazy">' : '<span class="f4u-noimg">Fotografija ni na voljo</span>';
        return '<button type="button" class="f4u-car' + (on ? ' is-on' : '') + '" data-key="' + esc(v[0]) + '" aria-pressed="' + on + '">' +
          '<span class="f4u-car-img">' + img + '</span>' +
          '<span class="f4u-car-name">' + esc(v[1]) + '</span>' +
          (v[2] ? '<span class="f4u-car-tag">' + esc(v[2]) + '</span>' : '') +
          '<span class="f4u-car-years">' + esc(v[3]) + '</span></button>';
      }).join('');
    }

    var galleries = {};
    function boxCard(vname, d, code, st, note, gid) {
      var s = STATUS[st] || STATUS.check, p = PRODUCTS[code], ph = (d.p || {})[code];
      var media = '';
      if (ph && ph.length) {
        var list = ph.map(function (x) { return [photoUrl(x[0]), x[1] || ('Model ' + code + ' – ' + vname)]; });
        galleries[gid] = list;
        media = '<span class="f4u-box-img" role="button" tabindex="0" data-gal="' + gid + '" data-i="0" aria-label="Povečaj fotografijo">' +
          '<img src="' + esc(list[0][0]) + '" alt="' + esc('Model ' + code + ' – ' + vname) + '" loading="lazy">' +
          (list.length > 1 ? '<span class="f4u-count">' + list.length + ' fotografije</span>' : '') + '</span>';
        if (list.length > 1) {
          media += '<span class="f4u-thumbs">' + list.map(function (x, i) {
            return '<span class="f4u-thumb" role="button" tabindex="0" data-gal="' + gid + '" data-i="' + i + '"><img src="' + esc(x[0]) + '" alt="" loading="lazy"></span>';
          }).join('') + '</span>';
        }
        media += '<span class="f4u-cap">' + esc(ph[0][1] ? ph[0][1] : 'Fotografija v tem vozilu') + '</span>';
      } else if (p && p.img) {
        media = '<span class="f4u-box-img is-prod"><img src="' + esc(p.img) + '" alt="' + esc('Model ' + code) + '" loading="lazy"></span><span class="f4u-cap">Fotografija izdelka – fotografije v tem vozilu ni</span>';
      }
      var actions = '';
      if (st !== 'no') {
        if (p && p.url) actions += '<a class="f4u-btn" href="' + esc(p.url) + '">Oglej si Model ' + esc(code) + '</a>';
        else actions += '<span class="f4u-inquiry">Pošljite povpraševanje</span>';
      }
      return '<article class="f4u-box is-' + s.cls + (media ? '' : ' is-compact') + '" data-box="' + esc(code) + '">' + media +
        '<div class="f4u-box-body"><div class="f4u-box-top"><h4>Model ' + esc(code) + '</h4><span class="f4u-badge is-' + s.cls + '">' + s.label + '</span></div>' +
        (p && p.dims ? '<p class="f4u-dims">Mere (G × Š × V): ' + esc(p.dims) + '</p>' : '') +
        (note ? '<p class="f4u-note">' + esc(note) + '</p>' : '') +
        (actions ? '<div class="f4u-actions">' + actions + '</div>' : '') + '</div></article>';
    }

    function renderResult(scroll) {
      var v = state.variant;
      if (!v || !BRANDDATA) { result.hidden = true; result.innerHTML = ''; return; }
      var d = BRANDDATA.v[v[0]] || { s: [] };
      galleries = {}; var gn = 0;
      var full = state.brand.n + ' ' + v[1];
      var h = '<div class="f4u-res-head"><div><p class="f4u-eyebrow">Rezultati za</p><h3>' + esc(full) + '</h3><p class="f4u-sub">' + esc([v[2], v[3]].filter(Boolean).join(' · ')) + '</p></div></div>';
      (d.w || []).forEach(function (w) { h += '<div class="f4u-alert"><strong>Pomembno</strong><p>' + esc(w) + '</p></div>'; });
      if (d.i && d.i.length) h += '<div class="f4u-intro">' + d.i.map(function (t) { return '<p>' + esc(t) + '</p>'; }).join('') + '</div>';
      if (d.x && d.x.length) {
        var xl = d.x.map(function (x) { return [photoUrl(x[0]), x[1] + (x[2] ? ' – ' + x[2] : '')]; });
        galleries.x = xl;
        h += '<div class="f4u-extras">' + xl.map(function (x, i) {
          return '<span class="f4u-extra" role="button" tabindex="0" data-gal="x" data-i="' + i + '"><img src="' + esc(x[0]) + '" alt="' + esc(x[1]) + '" loading="lazy"><span>' + esc(x[1]) + '</span></span>';
        }).join('') + '</div>';
      }
      var any = false, noItems = [], allFit = [], body = '', noSeen = {};
      d.s.forEach(function (sec) {
        var fit = [], nof = [];
        sec[1].forEach(function (it) { it[0].split(' ').forEach(function (c) { (it[1] === 'no' ? nof : fit).push([c, it[1], it[2]]); }); });
        nof.forEach(function (x) { if (!noSeen[x[0]]) { noSeen[x[0]] = 1; noItems.push(x); } });
        if (!fit.length) return;
        any = true;
        var score = function (x, i) { var p = PRODUCTS[x[0]]; return (p && p.url ? 0 : 20) + ((d.p || {})[x[0]] ? 0 : 10) + i / 1000; };
        fit = fit.map(function (x, i) { return [x, score(x, i)]; }).sort(function (a, b) { return a[1] - b[1]; }).map(function (y) { return y[0]; });
        fit.forEach(function (x) { allFit.push(x); });
        body += (sec[0] ? '<h4 class="f4u-sec">' + esc(sec[0]) + '</h4>' : '') + '<div class="f4u-boxes">' + fit.map(function (x) { return boxCard(v[1], d, x[0], x[1], x[2], 'g' + (gn++)); }).join('') + '</div>';
      });
      var seen = {}, ours = [], other = [];
      allFit.forEach(function (x) { if (seen[x[0]]) return; seen[x[0]] = 1; (PRODUCTS[x[0]] && PRODUCTS[x[0]].url ? ours : other).push(x[0]); });
      var chips = function (arr, cls) { return arr.map(function (c) { return '<button type="button" class="f4u-chip ' + cls + '" data-goto="' + esc(c) + '">' + esc(c) + '</button>'; }).join(''); };
      if (any) {
        h += '<div class="f4u-sum">' +
          (ours.length ? '<div class="f4u-sum-row"><span class="f4u-sum-l">Na voljo v naši trgovini</span><div class="f4u-chips">' + chips(ours, 'is-ours') + '</div></div>' : '') +
          (other.length ? '<div class="f4u-sum-row"><span class="f4u-sum-l">Druge ustrezne kletke (na povpraševanje)</span><div class="f4u-chips">' + chips(other, '') + '</div></div>' : '') +
          (noItems.length ? '<div class="f4u-sum-row"><span class="f4u-sum-l">Ne ustreza</span><div class="f4u-chips">' + noItems.map(function (x) { return '<span class="f4u-chip is-no">' + esc(x[0]) + '</span>'; }).join('') + '</div></div>' : '') +
          '<p class="f4u-sum-hint">Kliknite oznako za podrobnosti. Opombe o potrebnih prilagoditvah so pri vsaki kletki.</p></div>';
      }
      h += body;
      if (!any) h += '<div class="f4u-empty"><p>Za to izvedbo trenutno nimamo potrjenih podatkov o ustreznih kletkah. Natančno izmerite prtljažnik in mere primerjajte z merami kletk v naši ponudbi.</p></div>';
      if (noItems.length) {
        h += '<details class="f4u-nofit"' + (any ? '' : ' open') + '><summary>Ne ustreza (' + noItems.length + ')</summary><div class="f4u-boxes is-small">' +
          noItems.map(function (x) { return boxCard(v[1], d, x[0], 'no', x[2], 'g' + (gn++)); }).join('') + '</div></details>';
      }
      h += '<div class="f4u-foot"><p><strong>Pred nakupom vseeno izmerite prtljažnik</strong> (globino, širino in višino do vrat prtljažnika) in mere primerjajte z merami izbrane kletke. Izvedbe vozil se lahko razlikujejo, npr. po dvignjenem dnu ali rezervnem kolesu.</p></div>';
      result.innerHTML = h; result.hidden = false;
      if (scroll && result.scrollIntoView) { try { result.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch (e) {} }
    }
  }

  /* ====== Vstavljanje v stran (deluje tudi pri Ecwidovem menjavanju strani brez ponovnega nalaganja) ====== */
  function currentCategoryId() {
    var m = location.href.match(/-c(\d+)(?:[/?#]|$)/); return m ? +m[1] : null;
  }
  function tryMount() {
    var el = document.getElementById('f4u-kletke') || document.querySelector('.f4u-kletke,[data-f4u-kletke]');
    if (!el) {
      var cid = window.__F4U_CAT || currentCategoryId();
      if (cid && CONFIG.categoryIds.indexOf(cid) !== -1) {
        var host = document.querySelector('.grid__description') || document.querySelector('.ec-store .grid__wrap') || document.querySelector('.ec-store');
        if (host) { el = document.createElement('div'); el.id = 'f4u-kletke'; if (host.classList.contains('grid__description')) host.appendChild(el); else host.parentNode.insertBefore(el, host); }
      }
    }
    if (el) mount(el);
  }
  function hookEcwid() {
    if (window.Ecwid && Ecwid.OnPageLoaded && !window.__F4U_HOOKED) {
      window.__F4U_HOOKED = true;
      Ecwid.OnPageLoaded.add(function (page) { window.__F4U_CAT = page && page.type === 'CATEGORY' ? page.categoryId : null; setTimeout(tryMount, 50); setTimeout(tryMount, 600); });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', tryMount); else tryMount();
  var n = 0, iv = setInterval(function () { hookEcwid(); tryMount(); if (++n > 600) clearInterval(iv); }, 800);
})();
