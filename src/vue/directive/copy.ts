import { DirectiveBinding } from 'vue';

interface IElement extends HTMLElement {
  targetValue: string;
}

const copy = {
  beforeMount(el: IElement, binding: DirectiveBinding) {
    el.targetValue = binding.value;
    if (!el.targetValue) return;
    el.addEventListener('click', () => {
      const textarea = document.createElement('textarea');
      textarea.readOnly = true;
      textarea.style.display = 'none';
      textarea.value = el.targetValue;
      document.body.appendChild(textarea);
      textarea.select();
      const res = document.execCommand('Copy');
      document.removeChild(textarea);
    });
  },
  update(el: IElement, binding: DirectiveBinding) {
    el.targetValue = binding.value;
  },
  unmounted(el: HTMLElement) {
    el.removeEventListener('click', () => {});
  }
};

export default copy;
