import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentProps,
  DialogProps,
  DialogTitle,
  styled,
} from '@mui/material';
import { MouseEvent, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

export interface IConfirmInfoModalProps extends DialogProps {
  modalTitle: ReactNode;
  modalContent?: ReactNode;
  showCancelButton?: boolean;
  showConfirmButton?: boolean;
  onClickCancelButton?: (
    e?: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => void;
  onClickConfirmButton?: (
    e?: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => void;
  confirmButtonLabel?: string;
  cancelButtonLabel?: string;
  modalIcon?: ReactNode;
  contentSx?: DialogContentProps['sx'];
}

const DialogStyled = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    boxShadow: `0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12)`,
    borderRadius: theme.spacing(4),
    padding: theme.spacing(8),
  },
  '& .MuiDialogTitle-root': {
    padding: 0,
    marginBottom: theme.spacing(8),
    lineHeight: theme.spacing(11.5),
  },
  '& .MuiDialogContent-root': {
    padding: 0,
    marginBottom: theme.spacing(8),
  },
  '& .MuiDialogActions-root': {
    padding: 0,
    '& .MuiButtonBase-root': {
      marginLeft: theme.spacing(4),
      '&:first-of-type': {
        marginLeft: 0,
      },
    },
  },
  '& .modalIcon': {
    textAlign: 'center',
  },
}));

/**
 * Design: https://www.figma.com/file/auOrjtXed3LT7ZsD83as5F/Oda-Admin-01?node-id=927%3A14647&t=TBxTmKoJcPYnsUBP-4
 */
const ConfirmInfoModal = (props: IConfirmInfoModalProps) => {
  const { t } = useTranslation();
  const {
    modalTitle,
    modalContent,
    showCancelButton = true,
    showConfirmButton = true,
    cancelButtonLabel = t('cancel'),
    confirmButtonLabel = t('confirm'),
    onClickCancelButton,
    onClickConfirmButton,
    modalIcon,
    contentSx,
    ...restProps
  } = props;

  const handleClickCancelButton = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    if (typeof onClickCancelButton === 'function') {
      onClickCancelButton(e);
    }
  };

  const handleClickConfirmButton = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    if (typeof onClickConfirmButton === 'function') {
      onClickConfirmButton(e);
    }
  };

  return (
    <DialogStyled {...restProps}>
      {modalIcon && <Box className="modalIcon">{modalIcon}</Box>}

      <DialogTitle>{modalTitle}</DialogTitle>

      {modalContent && (
        <DialogContent sx={contentSx}>{modalContent}</DialogContent>
      )}

      {(showCancelButton || showConfirmButton) && (
        <DialogActions>
          {showCancelButton && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClickCancelButton}
            >
              {cancelButtonLabel}
            </Button>
          )}

          {showConfirmButton && (
            <Button variant="contained" onClick={handleClickConfirmButton}>
              {confirmButtonLabel}
            </Button>
          )}
        </DialogActions>
      )}
    </DialogStyled>
  );
};

export default ConfirmInfoModal;
