import { Box } from '@mui/material';
import { shuffle } from 'lodash';
import * as React from 'react';
// import audioPlayer, { AUDIO_KEYS } from './AudioPlayer__tmp';
// import audioPlayer, { AUDIO_KEYS } from './AudioPlayer';
import Level from './Level';
import StackedCards from './StackedCards';
import { IMAGES } from './assets/images';
import { AUDIO_KEYS } from './audioKeys';
import audioPlayer from './audioPlayer';
import { allSounds, consonantsReduced, vowels } from './shared';

export interface IGameProps {}

interface Dictionary<T> {
  [key: string]: T;
}

export default function GameContainer(props: IGameProps) {
  const [level, setLevel] = React.useState(1);
  const [matched, setMatched] = React.useState<string[]>([]);
  const levelDict: Dictionary<string[]> = {
    1: consonantsReduced,
    2: shuffle(consonantsReduced),
    3: vowels,
    4: shuffle(allSounds),
  };
  const stackedCards = matched.map(
    (s) => `${s.toUpperCase()}${s.toLowerCase()}`
  );
  let sounds = levelDict[level];
  if (!sounds) {
    sounds = allSounds;
  }

  // TODO: Could move to seperate component...
  const stars = [];
  for (let i = 1; i < level; i++) {
    stars.push(
      <img
        className="star"
        key={i}
        src={IMAGES.GoldStarImg.src}
        alt="gold star"
      />
    );
  }

  return (
    <Box
      className="game"
      sx={{
        backgroundImage: `url(${IMAGES.WoodImg.src})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '2rem',
      }}
    >
      <Level
        sounds={sounds}
        onMatchHandler={(cardValue: string) => {
          audioPlayer.play(AUDIO_KEYS.CORRECT);
          return setMatched(matched.concat(...cardValue));
        }}
        onCompletedHandler={() => setLevel(level + 1)}
      />
      <Box
        className="status-bar"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '2rem',
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        <div className="stars d-flex flex-wrap justify-content-center align-items-center mr-5">
          {stars}
        </div>
        <StackedCards cardValues={stackedCards} />
      </Box>
    </Box>
  );
}
