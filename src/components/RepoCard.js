export function RepoCard(repo) {
  return `
    <div class="repo-card">
      <div class="repo-header">
        <h4><a href="${repo.html_url}" target="_blank">${repo.name}</a></h4>
        <button class="view-commits-btn" data-owner="${repo.owner.login}" data-repo="${repo.name}">Voir les commits</button>
      </div>
      <p>${repo.description || 'Pas de description'}</p>
      <div class="repo-stats">
        ${repo.language ? `<span>● ${repo.language}</span>` : ''}
        <span>⭐ ${repo.stargazers_count}</span>
        <span>🍴 ${repo.forks_count}</span>
      </div>
    </div>
  `;
}
