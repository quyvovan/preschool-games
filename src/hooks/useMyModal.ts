import AlertModal, {
  IAlertModalProps,
} from '@/components/shared-components/modal/AlertModal';
import AlertWarningModal, {
  IAlertWarningModalProps,
} from '@/components/shared-components/modal/AlertWarningModal';
import ConfirmInfoModal, {
  IConfirmInfoModalProps,
} from '@/components/shared-components/modal/ConfirmInfoModal';
import ConfirmWarningModal, {
  IConfirmWarningModalProps,
} from '@/components/shared-components/modal/ConfirmWarningModal';
import ExportExcelProgressModal, {
  IExportExcelProgressModalProps,
} from '@/components/shared-components/modal/ExportExcelProgressModal';
import ProgressModal, {
  IProgressModalProps,
} from '@/components/shared-components/modal/ProgressModal';
import SimpleAlertModal, {
  ISimpleAlertModalProps,
} from '@/components/shared-components/modal/SimpleAlertModal';
import { IOptions, useModal } from '@/libs/my-mui-modal-provider';
import { useTranslation } from 'react-i18next';

export const useMyModal = () => {
  const { t } = useTranslation();
  const { showModal, ...restMethods } = useModal();

  const alert = (
    modalProps: Omit<IAlertModalProps, 'open'>,
    options?: IOptions
  ) => {
    return showModal(AlertModal, modalProps, options);
  };

  const simpleAlert = (
    modalProps: Omit<ISimpleAlertModalProps, 'open'>,
    options?: IOptions
  ) => {
    return showModal(SimpleAlertModal, modalProps, options);
  };

  const confirmInfo = (
    modalProps: Omit<IConfirmInfoModalProps, 'open'>,
    options?: IOptions
  ) => {
    return showModal(ConfirmInfoModal, modalProps, options);
  };

  const confirmWarning = (
    modalProps: Omit<IConfirmWarningModalProps, 'open'>,
    options?: IOptions
  ) => {
    return showModal(ConfirmWarningModal, modalProps, options);
  };

  const alertWarning = (
    modalProps: Omit<IAlertWarningModalProps, 'open'>,
    options?: IOptions
  ) => {
    return showModal(AlertWarningModal, modalProps, options);
  };

  const backConfirmWarning = (
    modalProps: Omit<IConfirmWarningModalProps, 'open'>,
    options?: IOptions
  ) => {
    const _modalProps = {
      modalTitle: t('dialog:for_your_awareness'),
      modalContent: t(
        'dialog:are_you_sure_to_cancel_this_process_then_backing_to_previous_page'
      ),
      cancelButtonLabel: t('question:no'),
      confirmButtonLabel: t('question:yes'),
    };
    return showModal(
      ConfirmWarningModal,
      { ..._modalProps, ...modalProps },
      options
    );
  };

  const progress = (
    modalProps: Omit<IProgressModalProps, 'open'>,
    options?: IOptions
  ) => {
    return showModal(ProgressModal, modalProps, options);
  };

  const exportExcelProgress = (
    modalProps: Omit<IExportExcelProgressModalProps, 'open'>,
    options?: IOptions
  ) => {
    return showModal(ExportExcelProgressModal, modalProps, options);
  };

  return {
    ...restMethods,
    showModal,
    alert,
    simpleAlert,
    confirmInfo,
    confirmWarning,
    alertWarning,
    backConfirmWarning,
    progress,
    exportExcelProgress,
  };
};
