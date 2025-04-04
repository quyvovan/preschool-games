import { Box, Theme } from '@mui/material';
import { TableCellTypographyStyled } from '@/components/styled-components/table/TableCellTypographyStyled';
import { IVendorCommon, VendorStatusEnum } from '@/types';

interface IVendorNameCellProps {
  vendor: IVendorCommon;
}

const VendorNameCell = (props: IVendorNameCellProps) => {
  const { vendor } = props;

  if (vendor?.is_sync) {
    return (
      <TableCellTypographyStyled
        noWrap
        sx={{
          color: (theme: Theme) => theme.palette.customColors.colorCyan,
        }}
      >
        {vendor?.remote?.name}
      </TableCellTypographyStyled>
    );
  }

  if (vendor?.status?.id === VendorStatusEnum.LOCAL) {
    return (
      <TableCellTypographyStyled noWrap>
        {vendor?.name}
      </TableCellTypographyStyled>
    );
  }

  return (
    <Box sx={{ overflow: 'hidden' }}>
      <TableCellTypographyStyled noWrap>
        {vendor?.name}
      </TableCellTypographyStyled>
      <TableCellTypographyStyled
        noWrap
        sx={{
          color: (theme) => theme.palette.customColors.colorCyan,
          fontWeight: 400,
        }}
      >
        {vendor?.remote?.name}
      </TableCellTypographyStyled>
    </Box>
  );
};

export default VendorNameCell;
