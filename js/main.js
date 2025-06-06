// Modal Variables
const openEmailModal = document.getElementById('open-email-form');
const emailModal = document.getElementById('email-modal');
const closeEmailModal = emailModal.querySelector('.close');
const cancelButton = document.getElementById('cancel');
const openPrivacyPolicy = document.getElementById('open-privacy-policy');
const privacyPolicyModal = document.getElementById('privacy-policy-modal');
const closePrivacyPolicy = privacyPolicyModal.querySelector('.close');
const openTermsService = document.getElementById('open-terms-service');
const termsServiceModal = document.getElementById('terms-service-modal');
const closeTermsService = termsServiceModal.querySelector('.close');
const footerOpenEmailForm = document.getElementById('footer-open-email-form');
const privacyToEmail = document.getElementById('privacy-to-email');
const termsToEmail = document.getElementById('terms-to-email');
const searchInput = document.getElementById('search-input');
const servicePlates = document.querySelectorAll('.service-plate');
const projectModal = document.getElementById('project-modal');
const closeProjectModal = projectModal.querySelector('.close');
let projects = [];

// Load Projects Data
fetch('projects.json')
  .then(response => {
    if (!response.ok) throw new Error(`Failed to fetch projects.json: ${response.statusText}`);
    return response.json();
  })
  .then(data => {
    console.log('Projects loaded:', data);
    projects = data;
    initializeTiles();
  })
  .catch(error => {
    console.error('Error loading projects:', error);
    alert('Failed to load project data. Please try refreshing the page.');
  });

// Initialize Clickable Tiles
function initializeTiles() {
  const tiles = document.querySelectorAll('.mosaic-tile');
  console.log('Found tiles:', tiles.length);
  tiles.forEach(tile => {
    const projectId = tile.dataset.projectId;
    tile.addEventListener('click', () => {
      console.log('Tile clicked:', projectId);
      const project = projects.find(p => p.projectId === projectId);
      if (project) {
        console.log('Project found:', project);
        document.getElementById('project-title').textContent = project.title;
        document.getElementById('project-image').src = project.image;
        document.getElementById('project-image').alt = project.title;
        document.getElementById('project-caption').textContent = project.caption;
        document.getElementById('project-description').innerHTML = project.description;
        projectModal.style.display = 'block'; // Changed from 'flex' to 'block'
      } else {
        console.error('Project not found for ID:', projectId);
      }
    });
  });
}

// Email Modal Functionality
openEmailModal.addEventListener('click', (e) => {
  e.preventDefault();
  emailModal.style.display = 'block';
});

closeEmailModal.addEventListener('click', () => {
  emailModal.style.display = 'none';
});

cancelButton.addEventListener('click', () => {
  emailModal.style.display = 'none';
});

footerOpenEmailForm.addEventListener('click', (e) => {
  e.preventDefault();
  emailModal.style.display = 'block';
});

privacyToEmail.addEventListener('click', (e) => {
  e.preventDefault();
  privacyPolicyModal.style.display = 'none';
  emailModal.style.display = 'block';
});

termsToEmail.addEventListener('click', (e) => {
  e.preventDefault();
  termsServiceModal.style.display = 'none';
  emailModal.style.display = 'block';
});

// Privacy Policy Modal
openPrivacyPolicy.addEventListener('click', (e) => {
  e.preventDefault();
  privacyPolicyModal.style.display = 'block';
});

closePrivacyPolicy.addEventListener('click', () => {
  privacyPolicyModal.style.display = 'none';
});

// Terms of Service Modal
openTermsService.addEventListener('click', (e) => {
  e.preventDefault();
  termsServiceModal.style.display = 'block';
});

closeTermsService.addEventListener('click', () => {
  termsServiceModal.style.display = 'none';
});

// Project Modal Close
closeProjectModal.addEventListener('click', () => {
  projectModal.style.display = 'none';
});

// Click Outside to Close Modals
window.addEventListener('click', (e) => {
  if (e.target === emailModal) {
    emailModal.style.display = 'none';
  }
  if (e.target === projectModal) {
    projectModal.style.display = 'none';
  }
  if (e.target === privacyPolicyModal) {
    privacyPolicyModal.style.display = 'none';
  }
  if (e.target === termsServiceModal) {
    termsServiceModal.style.display = 'none';
  }
});

// Search Functionality
searchInput.addEventListener('input', function () {
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
