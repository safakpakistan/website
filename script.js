/* ── MAIN SCRIPTS ── */
/* ---- PAGE ROUTING ---- */
function showPage(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  const t=document.getElementById('page-'+id);
  if(t){t.classList.add('active');window.scrollTo({top:0,behavior:'smooth'});setTimeout(observeFadeIns,120);}
}

/* ---- NAV SCROLL ---- */
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>{nav.classList.toggle('scrolled',window.scrollY>10)},{passive:true});

/* ---- HAMBURGER ---- */
const hamburger=document.getElementById('hamburger');
const navMobile=document.getElementById('navMobile');
hamburger.addEventListener('click',()=>{hamburger.classList.toggle('open');navMobile.classList.toggle('open')});
function closeMobile(){hamburger.classList.remove('open');navMobile.classList.remove('open')}
document.addEventListener('click',e=>{if(!nav.contains(e.target)&&!navMobile.contains(e.target))closeMobile()});

/* ---- PEOPLE TABS ---- */
function switchTab(id,btn){
  document.querySelectorAll('.ptab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.people-panel').forEach(p=>p.classList.remove('active'));
  btn.classList.add('active');
  const panel=document.getElementById('panel-'+id);
  if(panel){panel.classList.add('active');setTimeout(observeFadeIns,80);}
}

/* ---- FADE-IN OBSERVER ---- */
function observeFadeIns(){
  const els=document.querySelectorAll('.fade-in:not(.visible)');
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);}});
  },{threshold:.1,rootMargin:'0px 0px -40px 0px'});
  els.forEach(el=>obs.observe(el));
}
observeFadeIns();

/* ---- FORM ---- */

/* ═══════════════════════════════════════════════════
   SAFAK MODAL & FORM SYSTEM
   Backend: WhatsApp +92 346 1780236 (all forms) + same for contact page
   Contact form backend: WhatsApp +92 346 1780236
═══════════════════════════════════════════════════ */

/* ── Modal controls ───────────────────────────────── */
function openModal(id){
  var el=document.getElementById(id);
  if(!el)return;
  el.classList.add('open');
  document.body.style.overflow='hidden';
  // Reset any previous success state & re-enable fields
  el.querySelectorAll('.sf-success').forEach(function(s){s.style.display='none';});
  el.querySelectorAll('input,textarea,select,button[type=submit]').forEach(function(f){f.disabled=false;});
  el.querySelectorAll('form').forEach(function(f){f.reset();});
}
function closeModal(id){
  var el=document.getElementById(id);
  if(el){el.classList.remove('open');document.body.style.overflow='';}
}
// Close on overlay click
document.addEventListener('click',function(e){
  if(e.target&&e.target.classList.contains('sf-overlay')){
    e.target.classList.remove('open');
    document.body.style.overflow='';
  }
});
// Close on Escape
document.addEventListener('keydown',function(e){
  if(e.key==='Escape'){
    document.querySelectorAll('.sf-overlay.open').forEach(function(el){
      el.classList.remove('open');
      document.body.style.overflow='';
    });
  }
});

/* ── Form Submission → WhatsApp + Email (dual delivery) ── */
function submitEmailForm(e, modalId, subjectLabel){
  e.preventDefault();
  var form = e.target;
  var btn  = form.querySelector('button[type=submit]');
  var successEl = document.getElementById(modalId + '-success');

  // Collect all visible fields (skip hidden _* control fields)
  var msg = '🌟 *' + subjectLabel + '*\n';
  msg    += '━━━━━━━━━━━━━━━━━━━━━━\n';
  var inputs = form.querySelectorAll('input:not([type=hidden]),textarea,select');
  inputs.forEach(function(f){
    var label = f.name || f.id || '';
    var val   = f.value ? f.value.trim() : '';
    if(label && val){
      msg += '*' + label + ':* ' + val + '\n';
    }
  });
  msg += '━━━━━━━━━━━━━━━━━━━━━━\n';
  msg += '_Sent via Safak Pakistan Website_';

  // Disable button & show sending state
  btn.disabled    = true;
  btn.textContent = 'Opening WhatsApp…';

  // Open WhatsApp with the formatted message
  var waUrl = 'https://wa.me/923461780236?text=' + encodeURIComponent(msg);
  window.open(waUrl, '_blank');

  // Show success block
  if(successEl){
    successEl.style.display = 'block';
    successEl.innerHTML =
      '<strong>Submission sent via WhatsApp ✓</strong>' +
      '<span>WhatsApp has opened with your details pre-filled — just hit <em>Send</em> to complete the submission. We\'ll respond within 24–48 hours.</span>';
  }

  // Lock the form
  form.querySelectorAll('input,textarea,select').forEach(function(f){ f.disabled = true; });
}

/* ── Contact Page Form → WhatsApp ─────────────────── */
function handleContactWhatsApp(e){
  e.preventDefault();
  var form=e.target;
  var fields=form.querySelectorAll('input,textarea,select');
  var labels=['First Name','Last Name','Email','Subject','Message'];
  var values=[];
  fields.forEach(function(f,i){if(f.type!=='submit'&&f.tagName!=='BUTTON'){values.push(f.value||'');}});
  var msg='*New Contact Message — Safak Website*\n\n';
  msg+='Name: '+values[0]+' '+values[1]+'\n';
  msg+='Email: '+values[2]+'\n';
  msg+='Subject: '+values[3]+'\n';
  msg+='Message: '+values[4];
  var waUrl='https://wa.me/923461780236?text='+encodeURIComponent(msg);
  window.open(waUrl,'_blank');
  var success=document.getElementById('form-success');
  if(success){
    success.style.display='block';
    success.innerHTML='<strong style="color:var(--accent)">Opening WhatsApp…</strong> <span style="color:var(--mid);font-size:.9rem">Your message has been prepared. Complete sending via WhatsApp to reach us.</span>';
  }
  form.querySelectorAll('input,textarea,select,button').forEach(function(el){el.disabled=true;});
}


/* ── DROPDOWN + MODAL SCRIPTS ── */
/* ── Open careers role modal with pre-filled role ─── */
function openCareersModal(roleName) {
  var display = document.getElementById('mcr-role-display');
  var hidden  = document.getElementById('mcr-role-hidden');
  var title   = document.getElementById('mcr-title');
  if(display) display.textContent = roleName;
  if(hidden)  hidden.value = roleName;
  openModal('modal-careers-role');
}

/* ── Close all nav dropdowns ─── */
function closeDropdowns(){
  document.querySelectorAll('.nav-dropdown.open').forEach(function(el){el.classList.remove('open')});
}

/* ── Dropdown toggle on click (for touch / keyboard) ─── */
document.addEventListener('DOMContentLoaded', function(){
  document.querySelectorAll('.nav-dropdown-trigger').forEach(function(trigger){
    trigger.addEventListener('click', function(e){
      e.preventDefault();
      var parent = this.closest('.nav-dropdown');
      var isOpen = parent.classList.contains('open');
      closeDropdowns();
      if(!isOpen) parent.classList.add('open');
    });
  });
  document.addEventListener('click', function(e){
    if(!e.target.closest('.nav-dropdown')) closeDropdowns();
  });
});
