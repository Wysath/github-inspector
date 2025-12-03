import { RepoCard } from '../components/RepoCard.js';
import { Loading } from '../components/Loading.js';
import { ErrorState } from '../components/Error.js';

export function renderUserSidebar(container, user, onBack) {
  container.innerHTML = `
    <div class="user-sidebar-card">
      <img src="${user.avatar_url}" alt="${user.login}" class="sidebar-avatar" />
      <div class="sidebar-info">
        <h2>${user.name || user.login}</h2>
        <p class="sidebar-login">@${user.login}</p>
        <p class="bio">${user.bio || 'Aucune bio disponible'}</p>
        
        <div class="sidebar-stats">
          <div class="stat-item">
            <span class="stat-value">${user.followers}</span>
            <span class="stat-label">abonnés</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">${user.following}</span>
            <span class="stat-label">abonnements</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">${user.public_repos}</span>
            <span class="stat-label">repos</span>
          </div>
        </div>
        
        <a href="${user.html_url}" target="_blank" class="github-link-btn">Voir sur GitHub</a>
        <button id="back-btn" class="back-btn-sidebar">← Nouvelle recherche</button>
      </div>
    </div>
  `;

  document.getElementById('back-btn').addEventListener('click', onBack);
}

export function renderRepoList(container, repos) {
  container.innerHTML = `
    <div class="repos-section">
      <h3 class="section-title">Repositories Publics <span class="badge">${repos.length}</span></h3>
      <div class="repos-list">
        ${repos.map(RepoCard).join('')}
      </div>
    </div>
  `;
}

export function attachRepoListListeners(container, onInspectRepo) {
  const viewCommitsButtons = container.querySelectorAll('.view-commits-btn');

  viewCommitsButtons.forEach(button => {
    button.addEventListener('click', () => {
      const owner = button.dataset.owner;
      const repo = button.dataset.repo;
      onInspectRepo(owner, repo);
    });
  });
}

export function renderProfileLoading(container) {
  container.innerHTML = Loading();
}

export function renderProfileError(container, message, onBack) {
  container.innerHTML = `
    <div class="error-container">
      ${ErrorState(message)}
      <button id="back-btn-error" class="secondary-btn">← Retour</button>
    </div>
  `;
  document.getElementById('back-btn-error').addEventListener('click', onBack);
}
