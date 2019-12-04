import * as React from 'react';

export const Spinner: React.SFC = () => (
  <div className="spinner"/>
);
Spinner.displayName = 'Spinner';

export const IconSpinner: React.SFC = () => (
  <div className="spinner-icon__wrapper">
    <div className="spinner-icon__container">
      <div className="spinner-icon"/>
    </div>
  </div>
);
IconSpinner.displayName = 'IconSpinner';
