const draggable = {
  beforeMount(el: HTMLElement) {
    el.style.cursor = 'move';
    el.style.position = 'fixed';

    el.addEventListener('mousedown', (e: MouseEvent) => {
      const { width, height } = el.getBoundingClientRect();
      const left = el.offsetLeft;
      const top = el.offsetTop;
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      document.onmousemove = (event: MouseEvent) => {
        const curX = event.clientX - mouseX;
        const curY = event.clientY - mouseY;

        el.style.left = `${left + curX}px`;
        el.style.top = `${top + curY}px`;
        return false;
      };

      document.onmouseup = () => {
        document.onmousedown = null;
        document.onmouseup = null;
      };
    });
  }
};

export default draggable;
