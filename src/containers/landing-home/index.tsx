import { Box } from '@mui/material';
import Link from 'next/link';

export const LandingMainPageContainer = () => {
  return (
    <Box>
      <Link href="/game-card">
        <h1>Go to Game 1</h1>
      </Link>
      <Link href="/game-loop-no-speech">
        <h1>Go to Game 2</h1>
      </Link>
    </Box>
  );
};
