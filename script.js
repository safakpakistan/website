/* ============================================================
   SAFAK PAKISTAN — script.js
   Global functions first (reachable from onclick="" in HTML),
   DOM setup inside initDOM() which fires safely after parsing.
============================================================ */

/* ---- PAGE ROUTING ---- */
function showPage(id) {
  document.querySelectorAll('.page').forEach(function(p) { p.classList.remove('active'); });
  var target = document.getElementById('page-' + id);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(observeFadeIns, 120);
  }
}

/* ---- PEOPLE TABS ---- */
function switchTab(id, btn) {
  document.querySelectorAll('.ptab').forEach(function(t) { t.classList.remove('active'); });
  document.querySelectorAll('.people-panel').forEach(function(p) { p.classList.remove('active'); });
  btn.classList.add('active');
  var panel = document.getElementById('panel-' + id);
  if (panel) { panel.classList.add('active'); setTimeout(observeFadeIns, 80); }
}

/* ---- FADE-IN OBSERVER ---- */
function observeFadeIns() {
  var els = document.querySelectorAll('.fade-in:not(.visible)');
  if (!els.length) return;
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.05, rootMargin: '0px' });
  els.forEach(function(el) { obs.observe(el); });
}

/* ---- MOBILE NAV ---- */
function closeMobile() {
  var h = document.getElementById('hamburger');
  var m = document.getElementById('navMobile');
  if (h) h.classList.remove('open');
  if (m) m.classList.remove('open');
}

/* ---- DROPDOWNS ---- */
function closeDropdowns() {
  document.querySelectorAll('.nav-dropdown.open').forEach(function(el) { el.classList.remove('open'); });
}

/* ---- MODALS ---- */
function openModal(id) {
  var el = document.getElementById(id);
  if (!el) return;
  el.classList.add('open');
  document.body.style.overflow = 'hidden';
  el.querySelectorAll('.sf-success').forEach(function(s) { s.style.display = 'none'; });
  el.querySelectorAll('input,textarea,select,button[type=submit]').forEach(function(f) { f.disabled = false; });
  el.querySelectorAll('form').forEach(function(f) { f.reset(); });
}

function closeModal(id) {
  var el = document.getElementById(id);
  if (el) { el.classList.remove('open'); document.body.style.overflow = ''; }
}

/* ---- CAREERS MODAL ---- */
function openCareersModal(roleName) {
  var d = document.getElementById('mcr-role-display');
  var h = document.getElementById('mcr-role-hidden');
  if (d) d.textContent = roleName;
  if (h) h.value = roleName;
  openModal('modal-careers-role');
}

/* ---- MODAL FORM → WHATSAPP ---- */
function submitEmailForm(e, modalId, subjectLabel) {
  e.preventDefault();
  var form = e.target;
  var btn  = form.querySelector('button[type=submit]');
  var suc  = document.getElementById(modalId + '-success');
  var msg  = '🌟 *' + subjectLabel + '*\n━━━━━━━━━━━━━━━━━━━━━━\n';
  form.querySelectorAll('input:not([type=hidden]),textarea,select').forEach(function(f) {
    if (f.name && f.value.trim()) msg += '*' + f.name + ':* ' + f.value.trim() + '\n';
  });
  msg += '━━━━━━━━━━━━━━━━━━━━━━\n_Sent via Safak Pakistan Website_';
  if (btn) { btn.disabled = true; btn.textContent = 'Opening WhatsApp…'; }
  window.open('https://wa.me/923461780236?text=' + encodeURIComponent(msg), '_blank');
  if (suc) {
    suc.style.display = 'block';
    suc.innerHTML = '<strong>Sent via WhatsApp ✓</strong><span>Just hit Send in WhatsApp to complete. We\'ll respond within 24–48 hours.</span>';
  }
  form.querySelectorAll('input,textarea,select').forEach(function(f) { f.disabled = true; });
}

/* ---- CONTACT FORM → WHATSAPP ---- */
function handleContactWhatsApp(e) {
  e.preventDefault();
  var form = e.target;
  var vals = [];
  form.querySelectorAll('input,textarea,select').forEach(function(f) {
    if (f.type !== 'submit' && f.tagName !== 'BUTTON') vals.push(f.value || '');
  });
  var msg = '*New Contact — Safak Website*\n\nName: ' + (vals[0]||'') + ' ' + (vals[1]||'') +
            '\nEmail: ' + (vals[2]||'') + '\nSubject: ' + (vals[3]||'') + '\nMessage: ' + (vals[4]||'');
  window.open('https://wa.me/923461780236?text=' + encodeURIComponent(msg), '_blank');
  var suc = document.getElementById('form-success');
  if (suc) {
    suc.style.display = 'block';
    suc.innerHTML = '<strong style="color:var(--accent)">Opening WhatsApp…</strong> <span style="color:var(--mid);font-size:.9rem">Complete sending via WhatsApp to reach us.</span>';
  }
  form.querySelectorAll('input,textarea,select,button').forEach(function(el) { el.disabled = true; });
}

/* ============================================================
   DOM INIT — runs after DOM is fully parsed
============================================================ */
function initDOM() {
  /* Nav scroll */
  var nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', function() {
      nav.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  /* Hamburger */
  var hamburger = document.getElementById('hamburger');
  var navMobile = document.getElementById('navMobile');
  if (hamburger && navMobile) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('open');
      navMobile.classList.toggle('open');
    });
  }

  /* Close mobile nav on outside tap */
  document.addEventListener('click', function(e) {
    if (!nav || !navMobile) return;
    if (!nav.contains(e.target) && !navMobile.contains(e.target)) closeMobile();
  });

  /* Modal: close on overlay tap */
  document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('sf-overlay')) {
      e.target.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  /* Modal: close on Escape */
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.sf-overlay.open').forEach(function(el) {
        el.classList.remove('open');
        document.body.style.overflow = '';
      });
    }
  });

  /* Dropdown toggles */
  document.querySelectorAll('.nav-dropdown-trigger').forEach(function(trigger) {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      var parent = this.closest('.nav-dropdown');
      var wasOpen = parent.classList.contains('open');
      closeDropdowns();
      if (!wasOpen) parent.classList.add('open');
    });
  });
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.nav-dropdown')) closeDropdowns();
  });

  /* Initial fade-in */
  observeFadeIns();
}

/* Safe entry point */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDOM);
} else {
  initDOM();
}
