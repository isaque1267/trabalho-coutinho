document.addEventListener("DOMContentLoaded", function() {
  let i = parseInt(localStorage.getItem('semalerta'));
  let paragrafo = document.querySelector('.mentira');

  if (i === 2 && paragrafo) {
    paragrafo.classList.remove('mentira');
    paragrafo.classList.add('mentira-ativa');
  }
});
