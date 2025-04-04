import { ReactNode } from 'react';
import GameContainer from '@/containers/game';
import UnAuthLayout from '@/layouts/UnAuthLayout';

const GamePage = () => {
  return <GameContainer />;
};

// GamePage.getLayout = (page: ReactNode) => <UnAuthLayout>{page}</UnAuthLayout>;

export default GamePage;
