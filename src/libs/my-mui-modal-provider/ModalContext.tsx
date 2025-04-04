import { createContext } from 'react';
import {
  DestroyModalFn,
  DestroyModalsByRootIdFn,
  HideModalFn,
  IState,
  RenderModalFn,
  ShowModalFn,
  UpdateModalFn,
} from './types';

export interface IModalContextState {
  state: IState;
  renderModal: RenderModalFn;
  showModal: ShowModalFn;
  hideModal: HideModalFn;
  updateModal: UpdateModalFn;
  destroyModal: DestroyModalFn;
  destroyModalsByRootId: DestroyModalsByRootIdFn;
}

export const inititalContextState: IModalContextState = {
  state: {},
  renderModal: () => ({
    id: 'id',
    show: () => {},
    hide: () => {},
    update: () => {},
    destroy: () => {},
  }),
  showModal: () => ({
    id: 'id',
    show: () => {},
    hide: () => {},
    update: () => {},
    destroy: () => {},
  }),
  hideModal: () => {},
  updateModal: () => {},
  destroyModal: () => {},
  destroyModalsByRootId: () => {},
};

const ModalContext = createContext<IModalContextState>(inititalContextState);

export default ModalContext;
