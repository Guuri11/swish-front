import React, { PropsWithChildren } from 'react';
import './Background.css';

export default function Background({ children }: PropsWithChildren) {
  return (
    <div id="background-shape">
      {children}
    </div>
  );
}
