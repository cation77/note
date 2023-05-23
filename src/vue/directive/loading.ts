import { DirectiveBinding } from 'vue';

interface IElement extends HTMLElement {
  $instance: HTMLElement | null;
  $domInserted: boolean;
}

function toggleLoading(el: IElement, binding: DirectiveBinding) {
  if (binding.value && el.$instance) {
    insertDom(el, el.$instance, binding);
  } else {
    el.$instance?.parentNode &&
      el.$instance.parentNode.removeChild(el.$instance);
  }
}

function getStyle(el: HTMLElement, attr: string) {
  return window.getComputedStyle(el, null)[attr];
}

function insertDom(
  el: IElement,
  instance: HTMLElement,
  binding: DirectiveBinding
) {
  const styles = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    'z-index': 1000,
    'background-color': 'rgba(0, 0, 0, 0.3)',
    display: 'flex',
    'justify-content': 'center',
    'align-items': 'center',
    'flex-direction': 'column'
  };

  Object.keys(styles).forEach((property) => {
    instance.style[property] = styles[property];
  });

  if (!['fixed', 'absolute', 'relative'].includes(getStyle(el, 'position'))) {
    el.style.position = 'relative';
  }

  el.appendChild(instance);
  el.$domInserted = true;
}

const loading = {
  beforeMount(el: IElement, binding: DirectiveBinding) {
    el.$instance = document.createElement('div');
    el.$instance.innerText = 'loading...';
    binding.value && toggleLoading(el, binding);
  },
  updated(el: IElement, binding: DirectiveBinding) {
    binding.oldValue !== binding.value && toggleLoading(el, binding);
  },
  unmounted(el: IElement, binding: DirectiveBinding) {
    el.$domInserted && toggleLoading(el, { ...binding, value: false });
    el.$instance && (el.$instance = null);
  }
};

export default loading;
