// React Imports
// ** MUI Imports
import NextLink from '@/components/shared-components/NextLink';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid, { GridProps } from '@mui/material/Grid';
import { styled, useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const GridContainerStyled = styled(Grid)<GridProps>(({ theme }) => ({
  [theme.breakpoints.down('xl')]: {
    position: 'relative',
    '& .MuiGrid-item': {
      width: '100%',
      '&:nth-of-type(2)': {
        paddingLeft: `${theme.spacing(1)} !important`,
      },
      '&:nth-of-type(3)': {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        right: 0,
        width: 'auto',
      },
    },
  },
  [theme.breakpoints.up('xl')]: {
    position: 'relative',
    '& .MuiGrid-item': {
      '&:nth-of-type(2)': {
        paddingLeft: `${theme.spacing(8)} !important`,
      },
    },
  },
}));

const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'left',
  '& .MuiTypography-root': {
    lineHeight: theme.spacing(5.5),
  },
}));

// Styled component

const FooterContent = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <GridContainerStyled container spacing={1}>
        <Grid item xs="auto">
          <Item>
            <Typography
              variant="body1"
              sx={{
                fontWeight: '600',
                display: 'inline-block',
                mr: theme.spacing(2),
              }}
            >
              {t('landing_page:customer_service')}:
            </Typography>
            <Typography variant="body1" sx={{ m: 0, display: 'inline-block' }}>
              {t('email')}:
              <NextLink
                href="mailto:cs@website.vn"
                variant="body1"
                color={theme.palette.customColors.colorCyan}
                sx={{
                  textDecoration: 'none',
                  fontWeight: '500',
                  ml: 2,
                }}
              >
                {t('cs@website.vn')}
              </NextLink>
              | {t('landing_page:hotline')}:
              <NextLink
                href="tel:0896677570"
                variant="body1"
                color={theme.palette.customColors.colorCyan}
                sx={{
                  textDecoration: 'none',
                  fontWeight: '500',
                  ml: 2,
                }}
              >
                {t('(+84) 89 6677 570')}
              </NextLink>
            </Typography>
          </Item>
        </Grid>
        <Grid item xs="auto">
          <Item>
            <Typography
              variant="body1"
              sx={{
                fontWeight: '600',
                display: 'inline-block',
                mr: theme.spacing(2),
              }}
            >
              {t('landing_page:service_hours')}:
            </Typography>
            <Typography variant="body1" sx={{ m: 0, display: 'inline-block' }}>
              {t('landing_page:weekdays')}: 8:30am to 5:30pm |{' '}
              {t('landing_page:saturday')}: 8:30am to 11:50am
            </Typography>
          </Item>
        </Grid>
        <Grid
          item
          xs="auto"
          sx={{
            ml: 'auto',
            pl: '0 !important',
            pr: theme.spacing(1),
          }}
        >
          <Item sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1" sx={{ fontSize: '.85rem' }}>
              COPYRIGHT © {currentYear}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontWeight: '600',
                fontSize: '.85rem',
                ml: theme.spacing(2),
              }}
            >
              <NextLink
                href="/"
                variant="body1"
                color={theme.palette.text.primary}
                sx={{
                  textDecoration: 'none',
                  fontWeight: '500',
                }}
              >
                {t('website.vn')}
              </NextLink>
            </Typography>
          </Item>
        </Grid>
      </GridContainerStyled>
    </Box>
  );
};

export default FooterContent;
