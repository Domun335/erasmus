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
  const prevBtn = document.getElementById('prev-btn')
  const nextBtn = document.getElementById('next-btn')

  let currentIndex = 0

  function showImage(index) {
    currentIndex = (index + imagesNames.length) % imagesNames.length
    lightboxImg.src = `images/gallery/${imagesNames[currentIndex]}`
    lightbox.classList.remove('hidden')
  }

  imagesNames.forEach((file, index) => {
    const img = document.createElement('img')
    img.src = `images/gallery/${file}`
    img.alt = file
    img.classList.add('main__gallery-image')
    img.style.cursor = 'pointer'
    galleryDiv.appendChild(img)

    img.addEventListener('click', () => {
      showImage(index)
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

  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation()
    showImage(currentIndex - 1)
  })

  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation()
    showImage(currentIndex + 1)
  })

  document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('hidden')) return

    if (e.key === 'ArrowLeft') {
      showImage(currentIndex - 1)
    } else if (e.key === 'ArrowRight') {
      showImage(currentIndex + 1)
    } else if (e.key === 'Escape') {
      lightbox.classList.add('hidden')
      lightboxImg.src = ''
    }
  })
}

fetchImagesJson('/images.json').then((imageFiles) => {
  setGallery(imageFiles)
})
