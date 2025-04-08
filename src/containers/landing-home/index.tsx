import { Box, Container } from '@mui/material';
import Link from 'next/link';

export const LandingMainPageContainer = () => {
  return (
    <Box>
      <Box
        className="section-profile-cover section-shaped my-0"
        sx={{
          position: 'relative',
          overflow: 'hidden',
          height: '580px',
          backgroundSize: 'cover',
          backgroundPosition: '50%',
        }}
      >
        <Box
          className="shape shape-style-1 shape-default alpha-4"
          sx={{
            position: 'absolute',
            top: 0,
            zIndex: '-1',
            width: '100%',
            height: '100%',
            background:
              'linear-gradient(150deg,#7795f8 15%,#6772e5 70%,#555abf 94%)',
            '& span': {
              position: 'absolute',
              height: '120px',
              width: '120px',
              borderRadius: '50%',
            },
            '& :first-of-type': {
              left: '-4%',
              bottom: 'auto',
              background: 'hsla(0, 0%, 100%, .1)',
            },
            '& :nth-of-type(2)': {
              right: '4%',
              top: '10%',
              background: 'hsla(0, 0%, 100%, .1)',
            },
            '& :nth-of-type(3)': {
              top: '280px',
              right: '5.66666%',
              background: 'hsla(0, 0%, 100%, .3)',
            },
            '& :nth-of-type(4)': {
              top: '320px',
              right: '7%',
              background: 'hsla(0, 0%, 100%, .15)',
            },
            '& :nth-of-type(5)': {
              top: '38%',
              left: '1%',
              right: 'auto',
              background: 'hsla(0, 0%, 100%, .05)',
            },
            '& :nth-of-type(6)': {
              width: '200px',
              height: '200px',
              top: '44%',
              left: '10%',
              right: 'auto',
              background: 'hsla(0, 0%, 100%, .15)',
            },
            '& :nth-of-type(7)': {
              bottom: '50%',
              right: '36%',
              background: 'hsla(0, 0%, 100%, .04)',
            },
          }}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </Box>
        <Box
          className="separator separator-bottom separator-skew"
          sx={{
            position: 'absolute',
            pointerEvents: 'none',
            top: 'auto',
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '80px',
            zIndex: 1,
            transform: 'translateZ(0)',
            overflow: 'hidden',
            '& svg': {
              bottom: 0,
              position: 'absolute',
              pointerEvents: 'none',
              overflow: 'hidden',
              verticalAlign: 'middle',
              fill: '#FFFFFF',
            },
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="fill-white"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </Box>
      </Box>
      <Box>
        <Container>
          <Box
            sx={{
              marginTop: '-130px',
            }}
          >
            My profile
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
