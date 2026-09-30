export function makePlaceholderImage(
  label: string,
  background: string,
  foreground = '#111111',
  width = 800,
  height = 1000
) {
  const markup = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="100%" height="100%" fill="${background}" />
      <rect x="0" y="0" width="100%" height="100%" fill="rgba(255,255,255,0.04)"/>
      <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-family="Arial, Helvetica, sans-serif" font-size="32" fill="${foreground}" font-weight="700" letter-spacing="2">${label}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(markup.trim())}`;
}
