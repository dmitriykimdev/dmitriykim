const openModal = document.getElementById('open-email-form');
const modal = document.getElementById('email-modal');
const closeModal = document.querySelector('.close');
const cancelButton = document.getElementById('cancel');
const searchInput = document.getElementById('search-input');
const servicePlates = document.querySelectorAll('.service-plate');
const mosaicTiles = document.querySelectorAll('.mosaic-tile');

// Modal Functionality
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
searchInput.addEventListener('input', function() {
  const term = this.value.trim().toLowerCase();

  servicePlates.forEach(plate => {
    const captions = plate.querySelectorAll('.caption');
    const matchesPlate = Array.from(captions).some(caption => 
      caption.textContent.toLowerCase().includes(term)
    );

    plate.classList.toggle('inactive', term !== '' && !matchesPlate);

    // Tile-level filtering within active plates
    const tiles = plate.querySelectorAll('.mosaic-tile');
    tiles.forEach(tile => {
      const captionText = tile.querySelector('.caption').textContent.toLowerCase();
      const matchesTile = captionText.includes(term);
      tile.classList.toggle('inactive', term !== '' && !matchesTile && matchesPlate);
    });
  });
});

// Randomize Mosaic Grid Columns and Tile Sizes
document.querySelectorAll('.mosaic-grid').forEach(grid => {
  // Set column count: use data-columns if specified, else randomize
  const customColumns = parseInt(grid.dataset.columns);
  const possibleColumns = [3, 4, 5, 6, 7, 8];
  const columns = customColumns || possibleColumns[Math.floor(Math.random() * possibleColumns.length)];
  grid.style.setProperty('--columns', columns);

  // Randomize tile sizes
  const tiles = grid.querySelectorAll('.mosaic-tile');
  const sizes = [
    { colSpan: 1, rowSpan: 1 },
    { colSpan: 2, rowSpan: 1 },
    { colSpan: 1, rowSpan: 2 },
    { colSpan: 2, rowSpan: 2 },
    { colSpan: 3, rowSpan: 1 },
    { colSpan: 1, rowSpan: 3 }
  ];

  tiles.forEach(tile => {
    const size = sizes[Math.floor(Math.random() * sizes.length)];
    const maxColSpan = Math.min(size.colSpan, columns);
    const maxRowSpan = Math.min(size.rowSpan, 3);
    tile.style.gridColumn = `span ${maxColSpan}`;
    tile.style.gridRow = `span ${maxRowSpan}`;
  });
});
