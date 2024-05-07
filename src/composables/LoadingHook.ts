import { provide, inject, ref, Ref } from "vue";

export const loadingSymbol = Symbol.for("loading");

export const setLoadingState = (loadingState: boolean) => {
  const loading = ref<boolean>(loadingState);
  provide(loadingSymbol, loading);
  return loading;
};

export const useLoadingState = () => {
  const loadingRef = inject<Ref<boolean> | undefined>(loadingSymbol, undefined);
  return loadingRef;
};
