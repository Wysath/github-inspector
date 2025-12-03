export function UserCard(user) {
  return `
    <div class="user-card">
      <img src="${user.avatar_url}" alt="${user.login}" />
      <div class="user-info">
        <h3>${user.login}</h3>
        <button class="inspect-btn" data-username="${user.login}">Inspecter</button>
        <a href="${user.html_url}" target="_blank">Voir le profil</a>
      </div>
    </div>
  `;
}
