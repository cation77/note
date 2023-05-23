import { DirectiveBinding } from 'vue';

const ownPermission = ['user', 'order'];

function toolPermission(el: HTMLElement, permission: string) {
  if (permission && !ownPermission.includes(permission)) {
    el.parentNode && el.parentNode.removeChild(el);
  }
}

const permission = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    toolPermission(el, binding.value);
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    toolPermission(el, binding.value);
  }
};

export default permission;
