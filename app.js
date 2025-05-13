function setLanguage(lang) {
  const plButton = document.getElementById('lang-pl')
  const enButton = document.getElementById('lang-en')

  if (lang === 'pl') {
    plButton.classList.add('header__lang-button--active')
    enButton.classList.remove('header__lang-button--active')
  } else {
    enButton.classList.add('header__lang-button--active')
    plButton.classList.remove('header__lang-button--active')
  }

  document.querySelectorAll('[data-' + lang + ']').forEach((el) => {
    el.textContent = el.getAttribute('data-' + lang)
  })

  localStorage.setItem('lang', lang)
}

const savedLang = localStorage.getItem('lang') || 'pl'
setLanguage(savedLang)
