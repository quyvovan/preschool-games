import { useRef } from 'react';
import { IPopperFilterButtonApi } from './types';

export const useApiRef = () => {
  const apiRef = useRef<IPopperFilterButtonApi>({
    closePopper: () => undefined,
  });

  return {
    apiRef,
  };
};
