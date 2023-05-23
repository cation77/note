import { DirectiveBinding } from 'vue';

interface IElement extends HTMLImageElement {
  $data_src: string;
  $io: IntersectionObserver;
}

const lazyImg = {
  beforeMount(el: IElement, binding: DirectiveBinding) {
    el.$data_src = binding.value;
  },
  mounted(el: IElement) {
    const io = new IntersectionObserver((entries) => {
      const realSrc = el.$data_src;
      entries[0].isIntersecting && realSrc && (el.src = realSrc);
    });

    el.$io = io;
    io.observe(el);
  },
  updated(el: IElement, binding: DirectiveBinding) {
    el.$data_src = binding.value;
  },
  unmounted(el: IElement) {
    el.$io.disconnect();
  }
};

export default lazyImg;
