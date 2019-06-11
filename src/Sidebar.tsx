import * as React from 'react';

export class Sidebar extends React.PureComponent<any> {
  static displayName = 'Sidebar';

  render() {
    return (
      <div className="canvas__sidebar">
        <div className="canvas__sidebar-content"/>
      </div>
    );
  }
}
