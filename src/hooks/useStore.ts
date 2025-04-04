import { equals } from 'rambda';
import { useDispatch, useSelector as useReduxSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();

export function useAppSelector<T>(
  selector: (state: RootState) => T,
  equalityFn = equals
): T {
  const state = useReduxSelector<RootState, RootState>((x) => x, equalityFn);
  return selector(state);
}
