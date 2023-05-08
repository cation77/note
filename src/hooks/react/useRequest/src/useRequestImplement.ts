import type { Service, Options, Plugin } from './type';
import useLatest from '../../useLatest';

function useRequestImplement<TData, TParams extends any[]>(
  service: Service<TData, TParams>,
  options: Options<TData, TParams> = {},
  plugins: Plugin<TData, TParams>[] = []
) {
  const { manual = false, ...rest } = options;

  const fetchOptions = { manual, ...rest };

  const serviceRef = useLatest(service);
}

export default useRequestImplement;
