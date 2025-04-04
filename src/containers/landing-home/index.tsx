import { Box } from '@mui/material';
import Link from 'next/link';

export const LandingMainPageContainer = () => {
  return (
    <Box>
      <Link href="/game">
        <h1>Go to Game</h1>
      </Link>
    </Box>
  );
};
