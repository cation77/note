import { DirectiveBinding } from 'vue';

const imageIsExist = (url: string) => {
  return new Promise((resolve) => {
    let img: HTMLImageElement | null = new Image();
    img.src = url;
    img.onload = () => {
      if (img!.complete) {
        resolve(true);
        img = null;
      }
    };
    img.onerror = () => {
      resolve(false);
      img = null;
    };
  });
};

const realImg = {
  async beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    const imgUrl = binding.value;
    if (imgUrl) {
      const exist = await imageIsExist(imgUrl);
      exist && el.setAttribute('src', imgUrl);
    }
  }
};

export default realImg;
