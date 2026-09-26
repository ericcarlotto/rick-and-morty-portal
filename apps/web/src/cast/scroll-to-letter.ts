export function scrollToLetterHash() {
  const id = window.location.hash.replace('#', '');
  if (!id.startsWith('letra-')) return;
  document.getElementById(id)?.scrollIntoView();
}
