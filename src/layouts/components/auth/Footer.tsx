import Language from '@/components/shared-components/Language';
import NextLink from '@/components/shared-components/NextLink';
import { BoxProps, Container, Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { styled, useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  padding: 0,
  textAlign: 'left',
  '& .MuiTypography-root': {
    lineHeight: theme.spacing(5.5),
  },
}));

const LanguageStyled = styled(Box)<BoxProps>(({ theme }) => ({
  '& .MuiFormLabel-root': {
    display: 'none',
  },
  '& fieldset.MuiOutlinedInput-notchedOutline': {
    maxHeight: theme.spacing(9),
    top: 0,

    legend: {
      display: 'none',
    },
  },
  '& .MuiInputBase-root': {
    maxHeight: theme.spacing(9),
  },
  '& .MuiAutocomplete-input': {
    padding: '0 !important',
    height: 'auto',
    fontSize: theme.spacing(3.5),
    lineHeight: 1,
  },
}));

const Footer = () => {
  const { t } = useTranslation();

  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: theme.palette.common.white,
        padding: theme.spacing(4),
        flexGrow: 1,
        position: 'fixed',
        bottom: 0,
        zIndex: 10,
        [theme.breakpoints.down('md')]: {
          position: 'relative',
        },
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={1} sx={{ alignItems: 'center', m: 0 }}>
          <Grid container spacing={2} sx={{ m: 0 }}>
            <Grid
              item
              xs="auto"
              sx={{ pt: '0 !important', pl: '0 !important' }}
            >
              <Item>
                <Typography variant="body1" sx={{ fontWeight: '600' }}>
                  {t('landing_page:customer_service')}
                </Typography>
                <Typography variant="body1" sx={{ m: 0 }}>
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
                  {' | '}
                  {t('landing_page:hotline')}:
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
            <Grid
              item
              xs="auto"
              sx={{ pl: `${theme.spacing(16)} !important`, pt: '0 !important' }}
            >
              <Item>
                <Typography variant="body1" sx={{ fontWeight: '600' }}>
                  {t('landing_page:service_hours')}
                </Typography>
                <Typography variant="body1" sx={{ m: 0 }}>
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
                pt: '0 !important',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Box className="footer-divider-vertical">
                <NextLink
                  href="/"
                  variant="body1"
                  color={theme.palette.customColors.colorCyan}
                  sx={{
                    textDecoration: 'none',
                  }}
                >
                  {t('privacy_policy')}
                </NextLink>
                <Divider orientation="vertical" variant="middle" flexItem />
                <NextLink
                  href="/"
                  variant="body1"
                  color={theme.palette.customColors.colorCyan}
                  sx={{
                    textDecoration: 'none',
                    marginRight: theme.spacing(8),
                  }}
                >
                  {t('terms_of_service')}
                </NextLink>
                {/* Language  */}
                <LanguageStyled>
                  <Language
                    transformOriginVertical="bottom"
                    horizontal="left"
                    anchorOriginVertical="top"
                  />
                </LanguageStyled>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
