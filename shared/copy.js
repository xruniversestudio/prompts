/**
 * shared/copy.js — Clipboard copy with toast notification.
 *
 * Expects the page to contain:
 *   #copyButton  — the button that triggers copy
 *   #textToCopy  — the element whose textContent is copied
 *   #copiedMsg   — the toast element (gets .show class for 2 s)
 */
document.addEventListener('DOMContentLoaded', function () {
  const copyButton = document.getElementById('copyButton');
  const textToCopy = document.getElementById('textToCopy');
  const copiedMsg = document.getElementById('copiedMsg');

  if (!copyButton || !textToCopy || !copiedMsg) return;

  copyButton.addEventListener('click', function () {
    navigator.clipboard.writeText(textToCopy.textContent)
      .then(function () {
        copiedMsg.classList.add('show');
        setTimeout(function () {
          copiedMsg.classList.remove('show');
        }, 2000);
      })
      .catch(function (err) {
        console.error('فشل في نسخ النص: ', err);
        alert('حدث خطأ أثناء محاولة النسخ، يرجى المحاولة مرة أخرى');
      });
  });
});
