import * as React from 'react';
import { render } from 'react-dom';

export function start(update: any, App: any) {
  let rElement: any;
  const rootElement = document.getElementById('root');
  let lastRender = 0;
  window.requestAnimationFrame(loop);

  function draw() {
    // Draw the state of the world
    if (rElement) {
      rElement = React.cloneElement(rElement);
    } else {
      rElement = React.createElement(App);
    }
    render(rElement, rootElement);
  }

  function loop(timestamp: any) {
    const progress = timestamp - lastRender;

    update(progress);
    draw();

    lastRender = timestamp;
    window.requestAnimationFrame(loop);
  }
}
