import { DirectiveBinding } from 'vue';

const clickoutside = {
  beforeMount(el: Element, binding: DirectiveBinding) {
    document.addEventListener(
      'click',
      (e: Event) => {
        el.contains(e.target as HTMLElement) && binding.value();
      },
      false
    );
  },
  unmounted() {
    document.removeEventListener('click', () => {});
  }
};
