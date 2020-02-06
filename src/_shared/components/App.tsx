import * as React from 'react';
import { Header } from './Header';
import { Sidebar } from '../../sidebar/containers/Sidebar';
import { Content } from '../../content/containers/Content';

export class App extends React.PureComponent {
  static displayName = 'App';

  render() {
    return (
      <div className="app">
        <div className="app__view">
          <Header/>
          <div className="app__canvas">
            <div className="canvas">
              {/*
                // @ts-ignore */}
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
