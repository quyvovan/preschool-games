import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { equals } from 'rambda';
import React, { memo, useCallback } from 'react';

interface IBack {
  title?: string;
  onClickBack?: () => void;
}

const Back = ({ title, onClickBack }: IBack) => {
  const router = useRouter();

  const onClick = useCallback(
    () => (onClickBack ? onClickBack?.() : router.back()),
    [onClickBack]
  );

  return (
    <Button onClick={onClick} sx={{ padding: 0, minHeight: 'auto' }}>
      <Stack direction="row" alignItems="center">
        <ArrowBackIosIcon color="secondary" />
        {!!title && <Typography>{title}</Typography>}
      </Stack>
    </Button>
  );
};

export default memo(Back, equals);
