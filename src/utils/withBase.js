export function withBase(path) {
  const base = import.meta.env.BASE_URL || '/';
  const normalized = path.startsWith('/') ? path.slice(1) : path;
  // When base is '/./' or './', output relative path to work under subdirectories
  if (base === './' || base === '/./') {
    return `./${normalized}`;
  }
  // Default: join with single slash
  return `${base.replace(/\/$/, '/')}${normalized}`;
}
