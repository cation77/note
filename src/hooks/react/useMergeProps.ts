import { useMemo } from 'react';
import omit from '../utils/omit';

export type MergePropsOptions = {
  _ignorePropsFromGlobal?: boolean;
};

export default function useMergeProps<PropsType>(
  componentProps: PropsType & MergePropsOptions,
  defaultProps: Partial<PropsType>,
  globalComponentConfig: Partial<PropsType>
): PropsType {
  const { _ignorePropsFromGlobal } = componentProps;
  const _defaultProps = useMemo(() => {
    return {
      ...defaultProps,
      ..._defaultProps(_ignorePropsFromGlobal ? {} : globalComponentConfig)
    };
  }, [defaultProps, globalComponentConfig, _ignorePropsFromGlobal]);

  const props = useMemo(() => {
    const mProps = omit(componentProps, [
      '_ignorePropsFromGlobal'
    ]) as PropsType;
    for (const propName in _defaultProps) {
      if (mProps[propName] === undefined) {
        mProps[propName] = _defaultProps[propName];
      }
    }
    return mProps;
  }, [_defaultProps, componentProps]);

  return props;
}
