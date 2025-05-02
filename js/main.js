const openEmailModal = document.getElementById('open-email-form');
const emailModal = document.getElementById('email-modal');
const closeEmailModal = emailModal.querySelector('.close');
const cancelButton = document.getElementById('cancel');
const searchInput = document.getElementById('search-input');
const servicePlates = document.querySelectorAll('.service-plate');
const projectModal = document.getElementById('project-modal');
const closeProjectModal = projectModal.querySelector('.close');
let projects = [];

// Load Projects Data
fetch('projects.json')
  .then(response => response.json())
  .then(data => {
    projects = data;
    initializeTiles();
  })
  .catch(error => console.error('Error loading projects:', error));

// Initialize Clickable Tiles
function initializeTiles() {
  document.querySelectorAll('.mosaic-tile').forEach(tile => {
    tile.addEventListener('click', () => {
      const projectId = tile.dataset.projectId;
      const project = projects.find(p => p.projectId === projectId);
      if (project) {
        document.getElementById('project-title').textContent = project.title;
        document.getElementById('project-image').src = project.image;
        document.getElementById('project-image').alt = project.title;
        document.getElementById('project-caption').textContent = project.caption;
        document.getElementById('project-description').textContent = project.description;
        projectModal.style.display = 'flex';
      }
    });
  });
}

// Email Modal Functionality
openEmailModal.addEventListener('click', (e) => {
  e.preventDefault();
  emailModal.style.display = 'flex';
});

closeEmailModal.addEventListener('click', () => {
  emailModal.style.display = 'none';
});

cancelButton.addEventListener('click', () => {
  emailModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === emailModal) {
    emailModal.style.display = 'none';
  }
  if (e.target === projectModal) {
    projectModal.style.display = 'none';
  }
});

// Project Modal Close
closeProjectModal.addEventListener('click', () => {
  projectModal.style.display = 'none';
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
  const customColumns = parseInt(grid.dataset.columns);
  const possibleColumns = [3, 4, 5, 6, 7, 8];
  const columns = customColumns || possibleColumns[Math.floor(Math.random() * possibleColumns.length)];
  grid.style.setProperty('--columns', columns);

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
