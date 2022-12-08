const playViewDom = document.querySelector('.play-view');
const playButtonDom = document.querySelector('.play-button');
const audioDom = document.querySelector('audio');

playButtonDom.addEventListener('click', () => {
  audioDom.play();
  playViewDom.style.display = 'none';
});
