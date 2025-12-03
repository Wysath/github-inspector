export const Breadcrumbs = (items = []) => {
  if (items.length === 0) return '';
  
  const links = items.map((item, index) => {
    const isLast = index === items.length - 1;
    if (isLast) {
      return `<span class="breadcrumb-item active">${item.label}</span>`;
    }
    return `<a href="#" class="breadcrumb-item" data-action="${item.action}" data-payload="${item.payload || ''}">${item.label}</a> <span class="separator">/</span>`;
  }).join('');

  return `
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      ${links}
    </nav>
  `;
};
