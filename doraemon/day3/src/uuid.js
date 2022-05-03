export function randomId (len) {
  return Math.random().toString(36).substr(3, len)
}
