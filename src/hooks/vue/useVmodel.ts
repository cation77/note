import { ref, watch, getCurrentInstance, ExtractPropTypes } from 'vue';

export default function useVmodel(props, emit) {
  const proxy = ref(props.modelValue);
  watch(
    () => props.modelValue,
    (val) => emit('update:modelValue', val)
  );
  return proxy;
}

export function useVmodel1<T>(
  props: ExtractPropTypes<T>,
  key = 'modelValue',
  emit
) {
  const vm = getCurrentInstance();
  const _emit = emit || vm?.emit;
  const event = `update:${key}`;
  const proxy = ref(props[key]);
  watch(
    () => props[key],
    (val) => _emit(event, val)
  );
  return proxy;
}
