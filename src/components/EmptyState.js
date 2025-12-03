export function EmptyState(message) {
  return `
    <div class="empty-state">
      <div class="empty-icon">🔍</div>
      <p>${message}</p>
    </div>
  `;
}
