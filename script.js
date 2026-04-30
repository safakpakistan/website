/* ── SAFAK PAKISTAN — MAIN SCRIPTS ── */

/* ============================================================
   GLOBAL FUNCTIONS
   (called from inline onclick="" handlers in HTML — must be
   defined at the top level so they are always reachable)
============================================================ */

/* ---- PAGE ROUTING ---- */
function showPage(id) {
  document.querySelectorAll('.page').forEach(function(p) { p.classList.remove('active'); });
  var t = document.getElementById('page-' + id);
  if (t) {
    t.classList.add('active');
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
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(function(el) { obs.observe(el); });
}

/* ---- MOBILE NAV ---- */
/* Exposed globally so inline onclick="closeMobile()" works */
function closeMobile() {
  var hamburger = document.getElementById('hamburger');
  var navMobile  = document.getElementById('navMobile');
  if (hamburger) hamburger.classList.remove('open');
  if (navMobile)  navMobile.classList.remove('open');
}

/* ---- NAV DROPDOWNS ---- */
function closeDropdowns() {
  document.querySelectorAll('.nav-dropdown.open').forEach(function(el) { el.classList.remove('open'); });
}

/* ---- MODAL SYSTEM ---- */
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

/* ---- CAREERS ROLE MODAL ---- */
function openCareersModal(roleName) {
  var display = document.getElementById('mcr-role-display');
  var hidden  = document.getElementById('mcr-role-hidden');
  if (display) display.textContent = roleName;
  if (hidden)  hidden.value = roleName;
  openModal('modal-careers-role');
}

/* ---- FORM: MODAL SUBMISSIONS → WHATSAPP ---- */
function submitEmailForm(e, modalId, subjectLabel) {
  e.preventDefault();
  var form      = e.target;
  var btn       = form.querySelector('button[type=submit]');
  var successEl = document.getElementById(modalId + '-success');

  var msg = '🌟 *' + subjectLabel + '*\n';
  msg    += '━━━━━━━━━━━━━━━━━━━━━━\n';
  var inputs = form.querySelectorAll('input:not([type=hidden]),textarea,select');
  inputs.forEach(function(f) {
    var label = f.name || f.id || '';
    var val   = f.value ? f.value.trim() : '';
    if (label && val) { msg += '*' + label + ':* ' + val + '\n'; }
  });
  msg += '━━━━━━━━━━━━━━━━━━━━━━\n';
  msg += '_Sent via Safak Pakistan Website_';

  if (btn) { btn.disabled = true; btn.textContent = 'Opening WhatsApp…'; }

  window.open('https://wa.me/923461780236?text=' + encodeURIComponent(msg), '_blank');

  if (successEl) {
    successEl.style.display = 'block';
    successEl.innerHTML =
      '<strong>Submission sent via WhatsApp ✓</strong>' +
      '<span>WhatsApp has opened with your details pre-filled — just hit <em>Send</em> to complete. We\'ll respond within 24–48 hours.</span>';
  }
  form.querySelectorAll('input,textarea,select').forEach(function(f) { f.disabled = true; });
}

/* ---- FORM: CONTACT PAGE → WHATSAPP ---- */
function handleContactWhatsApp(e) {
  e.preventDefault();
  var form   = e.target;
  var fields = form.querySelectorAll('input,textarea,select');
  var values = [];
  fields.forEach(function(f) { if (f.type !== 'submit' && f.tagName !== 'BUTTON') { values.push(f.value || ''); } });
  var msg  = '*New Contact Message — Safak Website*\n\n';
  msg     += 'Name: '    + (values[0] || '') + ' ' + (values[1] || '') + '\n';
  msg     += 'Email: '   + (values[2] || '') + '\n';
  msg     += 'Subject: ' + (values[3] || '') + '\n';
  msg     += 'Message: ' + (values[4] || '');
  window.open('https://wa.me/923461780236?text=' + encodeURIComponent(msg), '_blank');
  var success = document.getElementById('form-success');
  if (success) {
    success.style.display = 'block';
    success.innerHTML = '<strong style="color:var(--accent)">Opening WhatsApp…</strong> <span style="color:var(--mid);font-size:.9rem">Your message has been prepared. Complete sending via WhatsApp to reach us.</span>';
  }
  form.querySelectorAll('input,textarea,select,button').forEach(function(el) { el.disabled = true; });
}


/* ============================================================
   DOM-DEPENDENT INITIALISATION
   Runs once the DOM is fully parsed — safe for both inline
   and external script loading scenarios.
============================================================ */
function initDOM() {

  /* ---- NAV SCROLL ---- */
  var nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', function() {
      nav.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  /* ---- HAMBURGER MENU ---- */
  var hamburger = document.getElementById('hamburger');
  var navMobile = document.getElementById('navMobile');

  if (hamburger && navMobile) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('open');
      navMobile.classList.toggle('open');
    });
  }

  /* Close mobile nav when clicking outside it */
  document.addEventListener('click', function(e) {
    if (nav && navMobile) {
      if (!nav.contains(e.target) && !navMobile.contains(e.target)) {
        closeMobile();
      }
    }
  });

  /* ---- MODAL: CLOSE ON OVERLAY CLICK ---- */
  document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('sf-overlay')) {
      e.target.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  /* ---- MODAL: CLOSE ON ESCAPE ---- */
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.sf-overlay.open').forEach(function(el) {
        el.classList.remove('open');
        document.body.style.overflow = '';
      });
    }
  });

  /* ---- DROPDOWN TOGGLES (touch / keyboard friendly) ---- */
  document.querySelectorAll('.nav-dropdown-trigger').forEach(function(trigger) {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      var parent = this.closest('.nav-dropdown');
      var isOpen = parent.classList.contains('open');
      closeDropdowns();
      if (!isOpen) parent.classList.add('open');
    });
  });

  /* Close dropdowns when clicking anywhere else */
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.nav-dropdown')) closeDropdowns();
  });

  /* ---- INITIAL FADE-IN PASS ---- */
  observeFadeIns();
}

/* ============================================================
   SAFE ENTRY POINT
   Works whether the script loads sync (bottom of <body>)
   or the DOM is already ready (readyState !== 'loading').
============================================================ */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDOM);
} else {
  initDOM();
}
