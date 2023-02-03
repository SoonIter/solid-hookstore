import { Signal } from '@solid-hookstore/basic';
import { createRenderEffect, on } from 'solid-js';

function getDefaultDark() {
  const body = document?.body;
  if (body === undefined) return false;
  return body.getAttribute('theme-mode') === 'dark';
}

function useDark() {
  const isDark = Signal(getDefaultDark());

  createRenderEffect(
    on(isDark, (isDark) => {
      const body = document.body;
      if (isDark) {
        body.setAttribute('theme-mode', 'dark');
      } else {
        body.hasAttribute('theme-mode') && body.removeAttribute('theme-mode');
      }
    })
  );
  return isDark;
}
export { useDark };
