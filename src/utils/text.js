/**
 * @param {string} text 
 */
export function apenasNumeros(text) {
  return String(text).trim().replace(/\D/g, '');
}