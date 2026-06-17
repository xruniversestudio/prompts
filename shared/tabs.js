/**
 * shared/tabs.js — Tab switching + select-all for tabbed prompt pages.
 *
 * Expects the page to define a global `PROMPTS` object keyed by tab data-key,
 * and contain:
 *   .tab-btn[data-key]  — tab buttons
 *   #textToCopy         — text display area
 *   #copyButton         — copy button
 *   #copiedMsg          — toast element
 *   #selectAll          — select-all button
 */
document.addEventListener('DOMContentLoaded', function () {
  var textEl = document.getElementById('textToCopy');
  var copyBtn = document.getElementById('copyButton');
  var copiedMsg = document.getElementById('copiedMsg');
  var tabs = document.querySelectorAll('.tab-btn');
  var selectAllBtn = document.getElementById('selectAll');

  if (!textEl || !copyBtn || !copiedMsg || !window.PROMPTS) return;

  // Determine default key from first tab
  var currentKey = tabs.length > 0 ? tabs[0].dataset.key : Object.keys(window.PROMPTS)[0];

  function renderPrompt(key) {
    currentKey = key;
    textEl.textContent = window.PROMPTS[key];
    tabs.forEach(function (btn) {
      var active = btn.dataset.key === key;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-selected', active ? 'true' : 'false');
    });
  }

  renderPrompt(currentKey);

  // Tab switching
  tabs.forEach(function (btn) {
    btn.addEventListener('click', function () {
      renderPrompt(btn.dataset.key);
    });
  });

  // Copy current text
  copyBtn.addEventListener('click', async function () {
    try {
      await navigator.clipboard.writeText(textEl.textContent);
      copiedMsg.classList.add('show');
      setTimeout(function () { copiedMsg.classList.remove('show'); }, 2000);
    } catch (err) {
      console.error('فشل في نسخ النص: ', err);
      alert('حدث خطأ أثناء محاولة النسخ، يرجى المحاولة مرة أخرى');
    }
  });

  // Select all text
  if (selectAllBtn) {
    selectAllBtn.addEventListener('click', function () {
      var range = document.createRange();
      range.selectNodeContents(textEl);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    });
  }
});
