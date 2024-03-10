import { provide, inject, ref, Ref } from 'vue';
export const loadingSymbol = Symbol.for('loading');

export const setLoadingState = (loadingState: boolean) => {
  const loading = ref<Boolean>(loadingState);
  provide(loadingSymbol, loading);
  return loading;
};

export const useLoadingState = () => {
  const loadingRef = inject<Ref<Boolean> | undefined>(loadingSymbol, undefined);
  return loadingRef;
};
