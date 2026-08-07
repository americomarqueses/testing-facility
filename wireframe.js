/**
 * Mirage Testing Facility — wireframe helpers (static mock only)
 */

(function () {
  'use strict';

  var SIDEBAR_KEY = 'mtf-sidebar-collapsed';

  function currentPage() {
    var path = window.location.pathname || '';
    var file = path.split('/').pop() || 'index.html';
    if (!file || file === '') return 'index.html';
    return file;
  }

  function markActiveNav() {
    var page = currentPage();
    document.querySelectorAll('[data-nav]').forEach(function (el) {
      var href = el.getAttribute('href') || '';
      var target = href.split('/').pop();
      if (target === page || (page === '' && target === 'index.html')) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
  }

  function isMobile() {
    return window.matchMedia('(max-width: 900px)').matches;
  }

  function setSidebarCollapsed(collapsed) {
    var shell = document.querySelector('.app-shell');
    var toggle = document.getElementById('sidebar-toggle');
    if (!shell) return;

    shell.classList.toggle('sidebar-collapsed', collapsed);
    try {
      localStorage.setItem(SIDEBAR_KEY, collapsed ? '1' : '0');
    } catch (e) {
      /* ignore */
    }

    if (toggle) {
      toggle.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
      toggle.setAttribute(
        'aria-label',
        collapsed ? 'Expand navigation' : 'Collapse navigation'
      );
    }
  }

  function bindSidebarToggle() {
    var shell = document.querySelector('.app-shell');
    var toggle = document.getElementById('sidebar-toggle');
    var backdrop = document.getElementById('sidebar-backdrop');
    if (!shell || !toggle) return;

    var stored = null;
    try {
      stored = localStorage.getItem(SIDEBAR_KEY);
    } catch (e) {
      stored = null;
    }

    // Mobile defaults to collapsed; desktop uses stored preference (default open)
    var collapsed = stored === '1' || (stored === null && isMobile());
    setSidebarCollapsed(collapsed);

    toggle.addEventListener('click', function () {
      setSidebarCollapsed(!shell.classList.contains('sidebar-collapsed'));
    });

    if (backdrop) {
      backdrop.addEventListener('click', function () {
        setSidebarCollapsed(true);
      });
    }
  }

  function bindSsoLogin() {
    var btn = document.getElementById('sso-login-btn');
    var status = document.getElementById('sso-login-status');
    if (!btn) return;

    btn.addEventListener('click', function () {
      btn.disabled = true;
      if (status) status.textContent = 'Redirecting to Google SSO… (mock)';
      setTimeout(function () {
        if (status) status.textContent = 'Google SSO succeeded — opening dashboard…';
        setTimeout(function () {
          window.location.href = 'index.html';
        }, 600);
      }, 900);
    });
  }

  function bindScenarioToggles() {
    document.querySelectorAll('.scenario-row input[type="checkbox"]').forEach(function (cb) {
      cb.addEventListener('change', function () {
        var row = cb.closest('.scenario-row');
        if (!row) return;
        row.style.opacity = cb.checked ? '1' : '0.55';
      });
    });

    document.querySelectorAll('.scenario-row input[type="range"]').forEach(function (range) {
      var meta = range.parentElement && range.parentElement.querySelector('[data-range-value]');
      if (!meta) return;
      var suffix = range.getAttribute('data-suffix') || '';
      function sync() {
        meta.textContent = Number(range.value).toLocaleString() + suffix;
      }
      range.addEventListener('input', sync);
      sync();
    });
  }

  function bindDryRunLaunch() {
    var dry = document.getElementById('btn-dry-run');
    var launch = document.getElementById('btn-launch');
    var note = document.getElementById('launch-note');

    if (dry && note) {
      dry.addEventListener('click', function () {
        note.textContent = 'Dry run queued (mock) — validating tokens, Redis, and endpoints…';
        note.className = 'alert-ok';
      });
    }
    if (launch && note) {
      launch.addEventListener('click', function () {
        note.textContent = 'Distributed test launch submitted (mock) — would POST /api/test-runs/launch.';
        note.className = 'alert-ok';
      });
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    markActiveNav();
    bindSidebarToggle();
    bindSsoLogin();
    bindScenarioToggles();
    bindDryRunLaunch();
  });
})();
