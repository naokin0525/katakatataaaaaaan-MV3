function taaaaaaan(current, isEnter) {
  const prefix = isEnter ? 'tan' : 'kata';
  const size = isEnter
    ? rand(configs.enterKeyTaaaaaaanMinSize, configs.enterKeyTaaaaaaanMaxSize)
    : rand(configs.normalKeyKataKataMinSize, configs.normalKeyKataKataMaxSize);
  
  const caretPosition = Measurement.caretPos(current);
  const imgUrl = chrome.runtime.getURL(`images/${prefix}_${rand(1, 4)}.svg`);

  const img = document.createElement('img');
  img.src = imgUrl;
  img.width = size;
  img.style.position = 'absolute';
  img.style.top = `${caretPosition.top + rand(-10, 10)}px`;
  img.style.left = `${caretPosition.left + rand(-10, 10)}px`;
  img.style.zIndex = 99999;
  document.body.appendChild(img);

  const verticalMove = rand(-configs.animateVerticalMove, configs.animateVerticalMove);
  const horizontalMove = rand(-configs.animateHorizontalMove, configs.animateHorizontalMove);

  img.animate([
    { transform: `translate(${horizontalMove}px, ${verticalMove}px)`, opacity: 0 }
  ], { duration: 500 });

  setTimeout(() => img.remove(), 500);
}
