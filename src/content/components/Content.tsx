import * as React from 'react';
import { Graph } from '../containers/Graph';
import * as PropTypes from 'prop-types';

export interface IContentCallbackProps {
  getNodes: () => Promise<Action>;
}

export interface IContentDataProps {
  isFetching: boolean;
}

type ContentProps = IContentCallbackProps & IContentDataProps;

export class Content extends React.PureComponent<ContentProps> {
  static displayName = 'Content';
  static propTypes = {
    getNodes: PropTypes.func.isRequired,

    isFetching: PropTypes.bool.isRequired,
  };

  componentDidMount(): void {
    this.props.getNodes();
  }

  render() {
    const {isFetching} = this.props;
    return (
      <section className="canvas__content">
        {isFetching ? 'I am fetching' : <Graph/>}
      </section>
    );
  }
}
