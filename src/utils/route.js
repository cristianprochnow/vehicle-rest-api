/**
 * @returns {string}
 */
export function baseUrl() {
  return '/veiculos';
}

/**
 * @param {string} path 
 */
export function route(path) {
  return `${baseUrl()}${path}`;
}