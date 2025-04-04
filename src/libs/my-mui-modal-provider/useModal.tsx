import { useCallback, useContext, useEffect, useRef } from 'react';
import ModalContext from './ModalContext';
import { RenderModalFn, ShowModalFn } from './types';
import { generateUid } from './utils';

interface IUseModalOptions {
  enableAutoDestroy?: boolean;
}

const defaultOptions: IUseModalOptions = {
  enableAutoDestroy: true,
};

const useModal = (options: IUseModalOptions = defaultOptions) => {
  const {
    renderModal: contextRenderModal,
    showModal: contextShowModal,
    destroyModalsByRootId,
    ...restMethods
  } = useContext(ModalContext);
  const { enableAutoDestroy } = options;

  const id = useRef<string>(generateUid(6));

  const renderModal = useCallback<RenderModalFn>(
    (ModalComponent, modalProps, modalOptions) => {
      return contextRenderModal(ModalComponent, modalProps, {
        rootId: id.current,
        ...modalOptions,
      });
    },
    [contextRenderModal]
  );

  const showModal = useCallback<ShowModalFn>(
    (ModalComponent, modalProps, modalOptions) => {
      return contextShowModal(ModalComponent, modalProps, {
        rootId: id.current,
        ...modalOptions,
      });
    },
    [contextShowModal]
  );

  useEffect(() => {
    return () => {
      if (enableAutoDestroy) {
        destroyModalsByRootId(id.current);
      }
    };
  }, [enableAutoDestroy, destroyModalsByRootId]);

  return {
    ...restMethods,
    renderModal,
    showModal,
  };
};

export default useModal;
