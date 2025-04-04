import CloseIcon from '@mui/icons-material/Close';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import {
  Avatar,
  Box,
  Button,
  ClickAwayListener,
  Popper,
  Stack,
  useTheme,
} from '@mui/material';
import { difference, isEmpty } from 'rambda';
import { MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IPopperFilterButtonProps } from './types';

export const PopperFilterButton = (props: IPopperFilterButtonProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const {
    onClickClearFilterIcon,
    buttonSx,
    filteredCount = 0,
    onOpenPopper,
    onClosePopper,
    popperContent,
    onClickPopperClearButton,
    onClickPopperConfirmButton,
    apiRef,
    dataFilters,
    setDataFilters,
    hideClearFilter = false,
    noClearButton = false,
    onClickPopperSaveAsDefaultButton,
    noShowFilteredCount = false,
    defaultDataFilters,
  } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [openPopper, setOpenPopper] = useState(false);
  const [openedDataFilters, setOpenedDataFilters] = useState();

  const closePopper = useCallback(() => {
    onClosePopper?.();
    setAnchorEl(null);
    setOpenPopper(false);
  }, [onClosePopper]);

  const handleClickButton = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    if (openPopper) {
      closePopper();
    } else {
      onOpenPopper?.();
      setOpenedDataFilters(dataFilters);
      setAnchorEl(e.currentTarget);
      setOpenPopper(true);
    }
  };

  const handleClickAway = () => {
    if (openPopper) {
      setDataFilters?.(openedDataFilters);
      closePopper();
    }
  };

  const handleClickClearFilter = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation();
    onClickClearFilterIcon?.();
  };

  const noChangeWithDefault = useMemo(() => {
    if (defaultDataFilters && dataFilters) {
      return isEmpty(difference([defaultDataFilters], [dataFilters]));
    }
    return true;
  }, [defaultDataFilters, dataFilters]);

  const noChangeWithOpenedData = useMemo(() => {
    if (openedDataFilters && dataFilters) {
      return isEmpty(difference([openedDataFilters], [dataFilters]));
    }

    return true;
  }, [openedDataFilters, dataFilters]);

  useEffect(() => {
    if (apiRef?.current) {
      apiRef.current = {
        closePopper,
      };
    }
  }, [apiRef, closePopper]);

  return (
    <ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={handleClickAway}
    >
      <Box>
        <Button
          variant="outlined"
          color={filteredCount > 0 ? undefined : 'secondary'}
          sx={{
            px: 4,
            ...buttonSx,
          }}
          onClick={handleClickButton}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <FilterListOutlinedIcon />

            <Box>{t('filter')}</Box>

            {!noShowFilteredCount && filteredCount > 0 && (
              <>
                <Avatar
                  sx={{
                    width: theme.spacing(5),
                    height: theme.spacing(5),
                    color: theme.palette.common.white,
                    backgroundColor: theme.palette.primary.main,
                    fontSize: theme.spacing(3),
                    fontWeight: 500,
                  }}
                >
                  {filteredCount}
                </Avatar>

                {!hideClearFilter && (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    onClick={handleClickClearFilter}
                  >
                    <CloseIcon
                      sx={{
                        fontSize: theme.spacing(6),
                      }}
                    />
                  </Box>
                )}
              </>
            )}
          </Stack>
        </Button>

        <Popper
          id="popper-filter"
          anchorEl={anchorEl}
          open={openPopper}
          placement="bottom-start"
          sx={{
            py: 4,
            zIndex: theme.zIndex.modal,
          }}
        >
          <Box
            sx={{
              width: theme.spacing(130),
              borderRadius: theme.spacing(1),
              bgcolor: theme.palette.common.white,
              p: 4,
              boxShadow:
                '0px 2px 2px -3px rgba(58, 53, 65, 0.1),0px 2px 3px 1px rgba(58, 53, 65, 0.1),0px 3px 2px 2px rgba(58, 53, 65, 0.1)',
            }}
          >
            {popperContent}

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mt={4}
            >
              {onClickPopperSaveAsDefaultButton && (
                <Button
                  color="primary"
                  variant="text"
                  onClick={onClickPopperSaveAsDefaultButton}
                  disabled={noChangeWithDefault}
                  sx={{ p: 2 }}
                >
                  {t('dashboard_page.save_as_default')}
                </Button>
              )}
              <Stack direction="row" gap={4} justifyContent="flex-end" flex={1}>
                {noClearButton ? (
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={onClickPopperClearButton}
                  >
                    {t('cancel')}
                  </Button>
                ) : (
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={onClickPopperClearButton}
                    disabled={noChangeWithDefault}
                  >
                    {t('clear')}
                  </Button>
                )}

                <Button
                  color="primary"
                  variant="contained"
                  onClick={onClickPopperConfirmButton}
                  disabled={noChangeWithOpenedData}
                >
                  {t('apply')}
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Popper>
      </Box>
    </ClickAwayListener>
  );
};
