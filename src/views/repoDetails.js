import { CommitCard } from '../components/CommitCard.js';
import { Loading } from '../components/Loading.js';
import { ErrorState } from '../components/Error.js';

export function renderRepoDetails(container, owner, repoName, commits, onBack) {
  container.className = 'repo-container';
  container.innerHTML = `
    <div class="repo-details-header">
      <button id="back-to-repos-btn" class="secondary-btn">← Liste des dépôts</button>
      <div class="repo-title-group">
        <h2>${repoName}</h2>
        <span class="repo-owner-badge">par ${owner}</span>
      </div>
    </div>
    
    <div class="repo-content">
      <h3 class="section-title">Derniers commits <span class="badge">${commits.length}</span></h3>
      <div class="commits-list">
        ${commits.map(CommitCard).join('')}
      </div>
    </div>
  `;

  document.getElementById('back-to-repos-btn').addEventListener('click', onBack);
}

export function renderRepoLoading(container) {
  container.innerHTML = Loading();
}

export function renderRepoError(container, message, onBack) {
  container.innerHTML = `
    <button id="back-to-profile-error">← Retour au profil</button>
    ${ErrorState(message)}
  `;
  document.getElementById('back-to-profile-error').addEventListener('click', onBack);
}
