import * as React from 'react';
import { Graph } from '../containers/Graph';
import * as PropTypes from 'prop-types';
import { ContentPlaceholder } from '../../_shared/components/ContentPlaceholder';

export interface IContentCallbackProps {
  getNodes: () => Promise<Action>;
}

export interface IContentDataProps {
  areNodesReady: boolean;
  isError: boolean;
}

type ContentProps = IContentCallbackProps & IContentDataProps;

export interface ISize {
  readonly width: number;
  readonly height: number;
}

interface IContentDataState {
  readonly size: ISize;
}

export class Content extends React.PureComponent<ContentProps, IContentDataState> {
  static displayName = 'Content';
  static propTypes = {
    getNodes: PropTypes.func.isRequired,

    areNodesReady: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
  };

  constructor(props: ContentProps) {
    super(props);

    this.state = {
      size: {
        width: 700,
        height: 500,
      }
    };
  }

  _getWidth = (ref: HTMLElement): void => {
    const width = ref.offsetWidth;
    const height = ref.offsetHeight;
    this.setState(() => ({ size: { width, height } }));
  };

  componentDidMount(): void {
    this.props.getNodes();
  }

  render() {
    const { areNodesReady, isError } = this.props;
    return (
      <section
        className="canvas__content"
        ref={this._getWidth}
      >
        {areNodesReady ? <Graph size={this.state.size}/> : <ContentPlaceholder isError={isError}/>}
      </section>
    );
  }
}
