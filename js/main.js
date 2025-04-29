const openModal = document.getElementById('open-email-form');
const modal = document.getElementById('email-modal');
const closeModal = document.querySelector('.close');
const cancelButton = document.getElementById('cancel');
const searchInput = document.getElementById('search-input');
const servicePlates = document.querySelectorAll('.service-plate');
const mosaicTiles   = document.querySelectorAll('.mosaic-tile');

openModal.addEventListener('click', (e) => {
  e.preventDefault();
  modal.style.display = 'flex';
});

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

cancelButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// Search Functionality
// document.getElementById('search-input').addEventListener('input', function() {
//   const searchTerm = this.value.toLowerCase();
//   const servicePlates = document.querySelectorAll('.service-plate');
//   servicePlates.forEach(function(plate) {
//     const captions = plate.querySelectorAll('.caption');
//     const matches = Array.from(captions).some(function(caption) {
//       return caption.textContent.toLowerCase().includes(searchTerm);
//     });
//     if (searchTerm === '' || matches) {
//       plate.classList.remove('inactive');
//     } else {
//       plate.classList.add('inactive');
//     }
//   });
// });

searchInput.addEventListener('input', function() {
  const term = this.value.trim().toLowerCase();

  // 1) Plate‐level filtering (as you already have)
  servicePlates.forEach(plate => {
    const matchesPlate = [...plate.querySelectorAll('.caption')]
      .some(c => c.textContent.toLowerCase().includes(term));

    plate.classList.toggle('inactive', term !== '' && !matchesPlate);
  });

  // 2) Tile‐level filtering
  mosaicTiles.forEach(tile => {
    const captionText = tile.querySelector('.caption').textContent.toLowerCase();
    const matchesTile = captionText.includes(term);

    tile.classList.toggle('inactive', term !== '' && !matchesTile);
  });
});

