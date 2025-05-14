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

async function fetchImagesJson(url) {
  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error('Nie udało się załadować pliku JSON')
    return await response.json()
  } catch (error) {
    console.error('Błąd podczas pobierania obrazów:', error)
    return []
  }
}

function setGallery(imagesNames) {
  const galleryDiv = document.getElementById('gallery')
  const lightbox = document.getElementById('lightbox')
  const lightboxImg = document.getElementById('lightbox-img')
  const lightboxClose = document.getElementById('lightbox-close')

  imagesNames.forEach((file) => {
    const img = document.createElement('img')
    img.src = `images/gallery/${file}`
    img.alt = file
    img.classList.add('main__gallery-image')
    img.style.cursor = 'pointer'
    galleryDiv.appendChild(img)

    img.addEventListener('click', () => {
      lightboxImg.src = img.src
      lightbox.classList.remove('hidden')
    })
  })

  lightboxClose.addEventListener('click', () => {
    lightbox.classList.add('hidden')
    lightboxImg.src = ''
  })

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.add('hidden')
      lightboxImg.src = ''
    }
  })
}

fetchImagesJson('/images.json').then((imageFiles) => {
  setGallery(imageFiles)
})
