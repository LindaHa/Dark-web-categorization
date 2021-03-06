import * as React from 'react';
import { ContentWithGraph } from '../containers/ContentWithGraph';
import * as PropTypes from 'prop-types';
import { ContentPlaceholder } from '../../_shared/components/ContentPlaceholder';
import { Legend } from './Legend';

export interface IContentCallbackProps {
  getNodes: () => Promise<Action>;
}

export interface IContentDataProps {
  isFetchingNodes: boolean;
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

    isFetchingNodes: PropTypes.bool.isRequired,
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
    const { isFetchingNodes, isError } = this.props;
    const areNodesReady = !isFetchingNodes && !isError;
    return (
      <section
        className="canvas__content"
        ref={this._getWidth}
      >
        <Legend/>
        {areNodesReady ? <ContentWithGraph size={this.state.size}/> : <ContentPlaceholder isError={isError}/>}
      </section>
    );
  }
}
