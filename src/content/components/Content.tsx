import * as React from 'react';
import { Graph } from '../containers/Graph';
import * as PropTypes from 'prop-types';
import { Spinner } from '../../_shared/components/Spinner';

export interface IContentCallbackProps {
  getNodes: () => Promise<Action>;
}

export interface IContentDataProps {
  areNodesReady: boolean;
}

type ContentProps = IContentCallbackProps & IContentDataProps;

export class Content extends React.PureComponent<ContentProps> {
  static displayName = 'Content';
  static propTypes = {
    getNodes: PropTypes.func.isRequired,

    areNodesReady: PropTypes.bool.isRequired,
  };

  componentDidMount(): void {
    this.props.getNodes();
  }

  render() {
    const {areNodesReady} = this.props;
    return (
      <section className="canvas__content">
        {areNodesReady ? <Graph/> : <Spinner/>}
      </section>
    );
  }
}
