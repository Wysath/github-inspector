import { formatDate } from '../utils/format.js';

export function CommitCard(commit) {
  const date = formatDate(commit.commit.author.date);
  const authorName = commit.commit.author.name;
  const authorAvatar = commit.author ? commit.author.avatar_url : 'https://github.com/identicons/jasonlong.png';
  const message = commit.commit.message.split('\n')[0];
  const sha = commit.sha.substring(0, 7);

  return `
    <div class="commit-card">
      <div class="commit-header">
        <p class="commit-message">${message}</p>
        <span class="commit-date">${date}</span>
      </div>
      <div class="commit-author">
        <img src="${authorAvatar}" alt="avatar" class="commit-avatar" />
        <span>${authorName}</span>
      </div>
      <a href="${commit.html_url}" target="_blank" class="commit-sha">${sha}</a>
    </div>
  `;
}
