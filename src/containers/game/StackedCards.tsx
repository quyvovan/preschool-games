import { Box } from '@mui/material';
import * as React from 'react';
import styled from 'styled-components';
// import audioPlayer from './AudioPlayer__tmp';
import FlipCard from './FlipCard';

// import './StackedCards.css';

// vmin
const _defaultDiff = 2;
const _cardWidth = 160;
const _narrowingAmount = 2;

// TODO: Get rid of styled components
function generateStackingCSS(children: any[]): string {
  let cssString = '';
  const n = children.length;
  for (let i = 1; i <= n; i++) {
    cssString += `.stacked-card:nth-last-child(${i}) {
    position: absolute;
    top: ${_defaultDiff * (n - i)}px;
    width: ${_cardWidth - _narrowingAmount * i}px;
    min-width: 140px;
    max-width: 200px;
  }`;
  }
  return cssString;
}
const StackedCardConainerStyled = styled.div`
  position: relative;
  width: 20vmin;
  height: 25vmin;
  ${(props: any) => generateStackingCSS(props.children)}
`;

export interface IStackedCardsProps {
  cardValues: string[];
}

const CARD_STACK_LIMIT = 10;
export default function StackedCards(props: IStackedCardsProps) {
  return (
    <Box
      className="stacked-card-container d-flex justify-content-center align-items-center"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="display-3 text-dark m-3">{props.cardValues.length}</div>
      <StackedCardConainerStyled>
        {props.cardValues.slice(-CARD_STACK_LIMIT).map((cv, i) => (
          <FlipCard
            className="stacked-card"
            key={`${i}${cv}`}
            value={cv}
            state="flipped"
            clickHandler={() => null}
          />
        ))}
      </StackedCardConainerStyled>
    </Box>
  );
}
