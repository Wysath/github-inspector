import './styles/main.css';
import { searchUsers, getUserDetails, getRepoCommits } from './services/github.js';
import { renderSearchResults, renderSearchLoading, renderSearchError, attachSearchResultsListeners } from './views/searchResults.js';
import { renderUserSidebar, renderRepoList, renderProfileLoading, renderProfileError, attachRepoListListeners } from './views/userProfile.js';
import { renderRepoDetails, renderRepoLoading, renderRepoError } from './views/repoDetails.js';
import { Header } from './components/Header.js';
import { Footer } from './components/Footer.js';
import { Breadcrumbs } from './components/Breadcrumbs.js';

const app = document.querySelector('#app');

app.innerHTML = `
  ${Header()}
  <main class="main-content">
    <div id="breadcrumbs-container"></div>
    <div class="container">
      
      <div id="search-view">
        <section class="hero-section">
          <h1 class="hero-title">GitHub</h1>
          <p class="hero-subtitle">
            Découvrez des développeurs, inspectez leurs projets.
          
          <div class="search-container">
            <form id="search-form" class="search-box-wrapper">
              <svg class="search-icon" height="20" width="20" viewBox="0 0 16 16" fill="currentColor">
                <path fill-rule="evenodd" d="M11.5 7a4.499 4.499 0 11-8.998 0A4.499 4.499 0 0111.5 7zm-.82 4.74a6 6 0 111.06-1.06l3.04 3.04a.75.75 0 11-1.06 1.06l-3.04-3.04z"></path>
              </svg>
              <input type="text" id="search-input" placeholder="Rechercher un utilisateur (ex: torvalds)..." required />
              <button type="submit" class="search-btn">Rechercher</button>
            </form>
          </div>
        </section>
        
        <div id="results"></div>
      </div>

      <div id="inspector-view" style="display: none;">
        <aside id="user-sidebar"></aside>
        <section id="inspector-content"></section>
      </div>

    </div>
  </main>
  ${Footer()}
`;

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const resultsDiv = document.getElementById('results');
const searchView = document.getElementById('search-view');
const inspectorView = document.getElementById('inspector-view');
const userSidebar = document.getElementById('user-sidebar');
const inspectorContent = document.getElementById('inspector-content');
const breadcrumbsContainer = document.getElementById('breadcrumbs-container');

// --- State ---
// (State variables removed as they were unused)

// --- Event Listeners ---

searchForm.addEventListener('submit', handleSearch);
document.getElementById('nav-home').addEventListener('click', (e) => {
  e.preventDefault();
  resetView();
});

// --- Breadcrumbs Logic ---

function updateBreadcrumbs(items) {
  breadcrumbsContainer.innerHTML = Breadcrumbs(items);
  
  breadcrumbsContainer.querySelectorAll('.breadcrumb-item').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const action = e.target.dataset.action;
      const payload = e.target.dataset.payload;
      
      if (action === 'home') resetView();
      if (action === 'user') handleInspectUser(payload);
    });
  });
}

function resetView() {
  searchView.style.display = 'block';
  inspectorView.style.display = 'none';
  updateBreadcrumbs([]);
}

// --- Handlers ---

async function handleSearch(e) {
  e.preventDefault();
  const query = searchInput.value.trim();
  
  if (!query) {
    return;
  }

  renderSearchLoading(resultsDiv);

  try {
    const data = await searchUsers(query);
    renderSearchResults(resultsDiv, data.items, data.total_count);
    attachSearchResultsListeners(resultsDiv, handleInspectUser);
  } catch (error) {
    renderSearchError(resultsDiv, `Une erreur est survenue : ${error.message}`);
  }
}

async function handleInspectUser(username) {
  searchView.style.display = 'none';
  inspectorView.style.display = 'flex';
  
  updateBreadcrumbs([
    { label: 'Recherche', action: 'home' },
    { label: username, action: 'user', payload: username }
  ]);

  // Render loading state in content area, but we might want to load sidebar too
  renderProfileLoading(inspectorContent);
  userSidebar.innerHTML = ''; // Clear sidebar while loading

  try {
    const { user, repos } = await getUserDetails(username);
    
    renderUserSidebar(userSidebar, user, () => {
      resetView();
    });
    
    renderRepoList(inspectorContent, repos);
    attachRepoListListeners(inspectorContent, handleInspectRepo);
    
  } catch {
    renderProfileError(inspectorContent, 'Impossible de charger le profil', () => {
      resetView();
    });
  }
}

async function handleInspectRepo(owner, repo) {
  // Ensure inspector view is visible (should be)
  inspectorView.style.display = 'flex';
  
  updateBreadcrumbs([
    { label: 'Recherche', action: 'home' },
    { label: owner, action: 'user', payload: owner },
    { label: repo, action: 'repo' }
  ]);

  renderRepoLoading(inspectorContent);

  try {
    const commits = await getRepoCommits(owner, repo);
    renderRepoDetails(inspectorContent, owner, repo, commits, () => {
      handleInspectUser(owner);
    });
  } catch {
    renderRepoError(inspectorContent, 'Impossible de charger les commits', () => {
      handleInspectUser(owner);
    });
  }
}


