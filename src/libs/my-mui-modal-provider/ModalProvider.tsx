import { ReactNode, useCallback, useMemo, useReducer } from 'react';
import ModalContext, { IModalContextState } from './ModalContext';
import reducer, { ActionType, initialState } from './reducer';
import {
  DestroyModalFn,
  DestroyModalsByRootIdFn,
  HideModalFn,
  RenderModalFn,
  ShowModalFn,
  UpdateModalFn,
} from './types';
import { generateUid } from './utils';

export interface IModalProviderProps {
  children: ReactNode;
}

const ModalProvider = (props: IModalProviderProps) => {
  const { children } = props;
  const [contextValueState, dispatch] = useReducer(reducer, initialState);

  const destroyModal = useCallback<DestroyModalFn>(
    (id) => {
      if (!id) {
        return;
      }

      dispatch({
        type: ActionType.Destroy,
        payload: {
          id,
        },
      });
    },
    [dispatch]
  );

  const destroyModalsByRootId = useCallback<DestroyModalsByRootIdFn>(
    (rootId) => {
      if (!rootId) {
        return;
      }

      dispatch({
        type: ActionType.DestroyByRootId,
        payload: {
          rootId,
        },
      });
    },
    [dispatch]
  );

  const hideModal = useCallback<HideModalFn>(
    (id: string) => {
      if (!id) {
        return;
      }

      dispatch({
        type: ActionType.Hide,
        payload: {
          id,
        },
      });
    },
    [dispatch, destroyModal, contextValueState]
  );

  const updateModal = useCallback<UpdateModalFn>(
    (id, modalProps) => {
      const { open: _, ...restProps } = modalProps;
      if (!id) {
        return;
      }

      dispatch({
        type: ActionType.Update,
        payload: {
          id,
          props: restProps,
        },
      });
    },
    [dispatch]
  );

  const renderModal = useCallback<RenderModalFn>(
    (ModalCompnent, modalProps, options) => {
      let id = generateUid(8);

      if (options?.rootId) {
        id = `${options.rootId}.${id}`;
      }

      dispatch({
        type: ActionType.Render,
        payload: {
          id,
          component: ModalCompnent,
          props: modalProps,
          options,
        },
      });

      const showCurrentModal = () => {
        dispatch({
          type: ActionType.Show,
          payload: {
            id,
          },
        });
      };

      return {
        id,
        show: showCurrentModal,
        hide: () => hideModal(id),
        update: (newProps) => updateModal(id, newProps),
        destroy: () => destroyModal(id),
      };
    },
    [dispatch, hideModal, updateModal, destroyModal]
  );

  const showModal = useCallback<ShowModalFn>(
    (ModalCompnent, modalProps, options) => {
      const instModal = renderModal(ModalCompnent, modalProps, options);

      dispatch({
        type: ActionType.Show,
        payload: {
          id: instModal.id,
        },
      });

      return instModal;
    },
    [dispatch, hideModal, updateModal, destroyModal]
  );

  const modalContextValue = useMemo<IModalContextState>(() => {
    return {
      state: contextValueState,
      renderModal,
      showModal,
      hideModal,
      updateModal,
      destroyModal,
      destroyModalsByRootId,
    };
  }, [
    contextValueState,
    renderModal,
    showModal,
    hideModal,
    updateModal,
    destroyModal,
    destroyModalsByRootId,
  ]);

  const renderState = () => {
    return Object.keys(contextValueState).map((id) => {
      const { component: ModalComponent, props: modalProps } =
        contextValueState[id];

      const handleClose = (...args: any[]) => {
        hideModal(id);

        if (modalProps && modalProps.onClose) {
          modalProps.onClose(...args);
        }
      };

      return <ModalComponent {...modalProps} key={id} onClose={handleClose} />;
    });
  };

  return (
    <ModalContext.Provider value={modalContextValue}>
      {children}
      {renderState()}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
