import * as React from 'react';
import { Playground } from './playground';

export class Content extends React.PureComponent<any> {
  static displayName = 'Content';

  render() {
    return (
      <section className="canvas__content">
        <Playground/>
      </section>
    );
  }
}
