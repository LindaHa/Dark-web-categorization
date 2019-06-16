import * as React from 'react';
import * as PropTypes from 'prop-types';
import { IPage } from '../../models/page';

export interface INodeInfoDataProps {
  readonly selectedNode: IPage;
}

export interface INodeInfoCallbackProps {
}

type NodeInfoProps = INodeInfoCallbackProps & INodeInfoDataProps;

export class NodeInfo extends React.PureComponent<NodeInfoProps> {
  static displayName = 'NodeInfo';
  static propTypes: PropTypesShape<NodeInfoProps> = {
    selectedNode: PropTypes.object.isRequired,
  };

  render() {
    const {selectedNode} = this.props;
    return (
      <div>
        <div>
          <div>Url</div>
          <div>{selectedNode.url}</div>
        </div>
        <div>
          <div>Categories</div>
          <div>{selectedNode.categories}</div>
        </div>
      </div>
    );
  }
}
