const overlay = document.querySelector('.overlay');

const cleatInputs = (selector) => {
  selector.forEach(item => {
    item.value = '';
  })
};

const stopScroll = () => {
  document.body.classList.add("disable-scroll");
};

const getScroll = () => {
  document.body.classList.remove("disable-scroll");
};

  // drag&drop
const dragStart = (ev) => {
  ev.dataTransfer.effectAllowed='move';
  ev.dataTransfer.setData("Text", ev.target.getAttribute('id'));
  ev.dataTransfer.setDragImage(ev.target,50,50);
  return true;
}

const dragEnter = (ev) =>  {
  ev.preventDefault();
  return true;
}

const dragOver = (ev) => {
  ev.preventDefault();
}

const dragDrop = (ev) => {
  const data = ev.dataTransfer.getData("Text");
  const el = document.querySelector(`#${data}`);
  el.style.left = ev.clientX + 'px';
  ev.stopPropagation();
  return false;
}



