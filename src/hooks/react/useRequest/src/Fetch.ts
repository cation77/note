import { isFunction } from '../../../utils';
import type { MutableRefObject } from 'react';
import type {
  FetchState,
  Service,
  Options,
  PluginReturn,
  Subscribe
} from './type';

export default class Fetch<TData, TParams extends any[]> {
  pluginImpls: PluginReturn<TData, TParams>[];
  count = 0;
  state: FetchState<TData, TParams> = {
    loading: false,
    params: undefined,
    data: undefined,
    error: undefined
  };

  constructor(
    public serviceRef: MutableRefObject<Service<TData, TParams>>,
    public options: Options<TData, TParams>,
    public subscribe: Subscribe,
    public initState: Partial<FetchState<TData, TParams>> = {}
  ) {
    this.state = {
      ...this.state,
      loading: !options.manual,
      ...initState
    };
  }

  setState(s: Partial<FetchState<TData, TParams>> = {}) {
    this.state = {
      ...this.state,
      ...s
    };
    this.subscribe();
  }

  runPluginHandle(event: keyof PluginReturn<TData, TParams>, ...rest: any[]) {
    // @ts-ignore
    const r = this.pluginImpls.map((i) => i[event]?.(...rest)).filter(Boolean);
    return Object.assign({}, ...r);
  }

  async runAsync(...params: TParams): Promise<TData> {
    this.count += 1;
    const currentCount = this.count;
    const {
      stopNow = false,
      returnNow = false,
      ...state
    } = this.runPluginHandle('onBefore', params);

    if (stopNow) {
      return new Promise(() => {});
    }

    this.setState({ loading: true, params, ...state });

    if (returnNow) {
      return Promise.resolve(state.data);
    }

    this.options?.onBefore?.(params);

    try {
      let { servicePromise } = this.runPluginHandle(
        'onRequest',
        this.serviceRef.current,
        params
      );
      if (!servicePromise) {
        servicePromise = this.serviceRef.current(...params);
      }

      const res = await servicePromise;

      if (currentCount !== this.count) {
        return new Promise(() => {});
      }

      this.setState({
        data: res,
        error: undefined,
        loading: false
      });

      this.options.onSuccess?.(res, params);
      this.runPluginHandle('onSuccess', res, params);

      this.options.onFinally?.(params, res, undefined);

      if (currentCount === this.count) {
        this.runPluginHandle('onFinally', params, res, undefined);
      }

      return res;
    } catch (error) {
      if (currentCount !== this.count) {
        return new Promise(() => {});
      }

      this.setState({
        error,
        loading: false
      });

      this.options.onError?.(error, params);
      this.runPluginHandle('onError', error, params);

      this.options.onFinally?.(params, undefined, error);
      if (currentCount === this.count) {
        this.runPluginHandle('onFinally', params, undefined, error);
      }

      throw error;
    }
  }

  run(...params: TParams) {
    this.runAsync(...params).catch((error) => {
      if (!this.options.onError) {
        console.error(error);
      }
    });
  }

  cancel() {
    this.count += 1;
    this.setState({
      loading: false
    });
    this.runPluginHandle('onCancel');
  }

  refresh() {
    // @ts-ignore
    this.run(...(this.state.params || []));
  }

  refreshAsync() {
    // @ts-ignore
    return this.runAsync(...(this.state.params || []));
  }

  mutate(data?: TData | ((oldData?: TData) => TData | undefined)) {
    const targetData = isFunction(data) ? data(this.state.data) : data;
    this.runPluginHandle('onMutate', targetData);
    this.setState({
      data: targetData
    });
  }
}
