import { Box, Theme } from '@mui/material';
import React from 'react';
import { TableCellTypographyStyled } from '@/components/styled-components/table/TableCellTypographyStyled';
import { IOrderSupplier, VendorStatusEnum } from '@/types';

const SupplierNameCell = ({ supplier }: { supplier: IOrderSupplier }) => {
  if (supplier?.is_sync) {
    return (
      <TableCellTypographyStyled
        noWrap
        title={supplier?.remote?.name}
        sx={{
          color: (theme: Theme) => theme.palette.customColors.colorCyan,
          py: 4,
        }}
      >
        {supplier?.remote?.name}
      </TableCellTypographyStyled>
    );
  }

  if (supplier?.status?.id === VendorStatusEnum.LOCAL) {
    return (
      <TableCellTypographyStyled title={supplier?.name} noWrap sx={{ py: 4 }}>
        {supplier?.name}
      </TableCellTypographyStyled>
    );
  }

  return (
    <Box sx={{ overflow: 'hidden', py: 4 }}>
      <TableCellTypographyStyled title={supplier?.name} noWrap>
        {supplier?.name}
      </TableCellTypographyStyled>
      <TableCellTypographyStyled
        noWrap
        title={supplier?.remote?.name}
        sx={{
          color: (theme) => theme.palette.customColors.colorCyan,
          fontWeight: 400,
        }}
      >
        {supplier?.remote?.name}
      </TableCellTypographyStyled>
    </Box>
  );
};

export default SupplierNameCell;
