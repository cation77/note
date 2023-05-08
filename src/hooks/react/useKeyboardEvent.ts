import { useCallback, KeyboardEventHandler } from 'react';
import {
  Enter,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight
} from '../utils/keycode';

type CallbackEventType =
  | 'onPressEnter'
  | 'onArrowUp'
  | 'onArrowDown'
  | 'onArrowLeft'
  | 'onArrowRight';

export default function useKeyboardEvent(props: {
  onKeyDown?: KeyboardEventHandler;
}) {
  const getEventListeners = useCallback(
    (callbacks: { [key in CallbackEventType]?: (e) => void }) => {
      return {
        onkeyDown: (e) => {
          const keyCode = e.keyCode || e.which;

          if (keyCode === Enter.code) {
            callbacks.onPressEnter?.(e);
          }
          if (keyCode === ArrowUp.code) {
            callbacks.onArrowUp?.(e);
          }
          if (keyCode === ArrowDown.code) {
            callbacks.onArrowDown?.(e);
          }
          if (keyCode === ArrowLeft.code) {
            callbacks.onArrowLeft?.(e);
          }
          if (keyCode === ArrowRight.code) {
            callbacks.onArrowRight?.(e);
          }
          props?.onKeyDown?.(e);
        }
      };
    },
    []
  );
  return getEventListeners;
}
