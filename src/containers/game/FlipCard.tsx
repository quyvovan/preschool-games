import { Box } from '@mui/material';
import * as React from 'react';
import { IMAGES } from './assets/images';
import { isiOS } from './shared';

export type CardState = '' | 'flipped' | 'invisible';
export type Card = {
  value: string;
  state: CardState;
  className?: string;
};

export interface IFlipCardProps extends Card {
  clickHandler: (flippedCard: string) => void;
}

export default function FlipCard(props: IFlipCardProps) {
  if (isiOS()) {
    let content;
    if (props.state === 'flipped') {
      content = (
        <div className="card-ne--back d-flex justify-content-center flex-column">
          <p className="display-1 text-dark">{props.value}</p>
        </div>
      );
    } else {
      content = (
        <div className="card-ne--front">
          <img src={IMAGES.CardCoverImg.src} />
        </div>
      );
    }
    return (
      <div className={`scene-ne  ${props.className || ''}`}>
        <div
          className={`card-ne ${props.state}`}
          onClick={() => props.clickHandler(props.value)}
        >
          {content}
        </div>
      </div>
    );
  } else {
    return (
      <Box
        className={`scene scene--card  ${props.className || ''}`}
        sx={{
          flexGrow: 1,
        }}
      >
        <div
          className={`card ${props.state}`}
          onClick={() => props.clickHandler(props.value)}
        >
          <div className="card__face card__face--front">
            <img src={IMAGES.CardCoverImg.src} />
          </div>
          <Box
            className="card__face card__face--back flex-column"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <p className="display-1 text-dark">{props.value}</p>
          </Box>
        </div>
      </Box>
    );
  }
}
