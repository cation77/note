import { DirectiveBinding } from 'vue';

const longPress = {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    const cb = binding.value;
    if (typeof cb !== 'function') return;
    let timeout: ReturnType<typeof setInterval> | null = null;

    const cancel = () => {
      if (timeout !== null) {
        clearTimeout(timeout);
        timeout = null;
      }
    };

    el.addEventListener('mousedown', (e: MouseEvent) => {
      if (e.type === 'click' && e.button !== 0) return;
      e.preventDefault();
      if (timeout === null) {
        timeout = setTimeout(() => {
          cb();
          timeout = null;
        }, 2000);
      }
    });

    el.addEventListener('click', cancel);
    el.addEventListener('mouseout', cancel);
  },

  unmounted(el: HTMLElement) {
    el.removeEventListener('mousedown', () => {});
    el.removeEventListener('mouseout', () => {});
    el.removeEventListener('click', () => {});
  }
};

export default longPress;
