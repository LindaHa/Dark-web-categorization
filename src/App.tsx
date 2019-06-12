import * as React from 'react';
import { Header } from './Header';
import { Sidebar } from './sidebar/containers/Sidebar';
import { Content } from './Content';

export class App extends React.PureComponent<any> {
  static displayName = 'App';

  render() {
    return (
      <div className="app">
        <div className="app__view">
          <Header/>
          <div className="app__canvas">
            <div className="canvas">
              <Content/>
              <Sidebar/>
            </div>
          </div>
          <div/>
        </div>
      </div>
    );
  }
}
