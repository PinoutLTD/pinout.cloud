function getLocaleFromPath(pathname) {
  return pathname === '/ru' || pathname.startsWith('/ru/') ? 'ru' : 'en';
}

function buildLocalePath(pathname, targetLocale) {
  const isRu = getLocaleFromPath(pathname) === 'ru';
  let path = pathname;

  if (isRu) {
    path = path.replace(/^\/ru(\/|$)/, '/');
    if (path === '') path = '/';
  }

  if (targetLocale === 'ru') {
    path = path === '/' ? '/ru/' : `/ru${path}`;
  }

  return path;
}

function initLangSwitch() {
  const select = document.querySelector('.lang-switch__select');
  if (!select) return;

  const currentLocale = getLocaleFromPath(window.location.pathname);
  select.value = currentLocale;

  select.addEventListener('change', () => {
    const targetLocale = select.value;
    if (!targetLocale || targetLocale === getLocaleFromPath(window.location.pathname)) {
      return;
    }

    window.location.assign(buildLocalePath(window.location.pathname, targetLocale));
  });
}

document.addEventListener('DOMContentLoaded', initLangSwitch);
