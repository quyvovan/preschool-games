import { Box, useTheme } from '@mui/material';
import { PUBLIC_IMAGES_URL } from '@/constants';

export const SplashScreen = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100px',
          height: '100px',
          lineHeight: theme.spacing(1),
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            '@keyframes logo': {
              // jump effect
              '0%': { transform: `translateY(0%)` },
              '50%': { transform: `translateY(-13%)` },
              '100%': { transform: `translateY(0)` },
            },
            position: 'relative',
            zIndex: 2,
            '.logo-img': {
              width: '100px',
              height: '100px',
              animation: `logo 2s ease infinite`,
            },
          }}
        >
          <img
            className="logo-img"
            src={`${PUBLIC_IMAGES_URL}/icon_loading_black.gif`}
            alt=""
          />
        </Box>
      </Box>
    </Box>
  );
};
