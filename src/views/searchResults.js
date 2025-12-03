import { UserCard } from '../components/UserCard.js';
import { EmptyState } from '../components/EmptyState.js';
import { Loading } from '../components/Loading.js';
import { ErrorState } from '../components/Error.js';

export function renderSearchResults(container, users, totalCount) {
  if (users.length === 0) {
    container.innerHTML = EmptyState('Aucun utilisateur trouvé.');
    return;
  }

  container.innerHTML = `
    <p class="results-count">${totalCount} résultats trouvés</p>
    <div class="users-grid">
      ${users.map(UserCard).join('')}
    </div>
  `;
}

export function attachSearchResultsListeners(container, onInspect) {
  const inspectButtons = container.querySelectorAll('.inspect-btn');
  
  inspectButtons.forEach(button => {
    button.addEventListener('click', () => {
      const username = button.dataset.username;
      onInspect(username);
    });
  });
}

export function renderSearchLoading(container) {
  container.innerHTML = Loading();
}

export function renderSearchError(container, message) {
  container.innerHTML = ErrorState(message);
}
