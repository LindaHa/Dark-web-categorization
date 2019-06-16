import * as React from 'react';
import * as Immutable from 'immutable';
import * as PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'immutable-prop-types';
import { IPage } from '../../models/page';

export interface INodeInfoDataProps {
  readonly selectedNode: IPage;
  readonly nodeLinks: Immutable.Set<string>;
}

export interface INodeInfoCallbackProps {
}

type NodeInfoProps = INodeInfoCallbackProps & INodeInfoDataProps;

export class NodeInfo extends React.PureComponent<NodeInfoProps> {
  static displayName = 'NodeInfo';
  static propTypes: PropTypesShape<NodeInfoProps> = {
    selectedNode: PropTypes.object.isRequired,
    nodeLinks: ImmutablePropTypes.set,
  };

  render() {
    const {selectedNode, nodeLinks} = this.props;
    return (
      <div>
        <div className="sidebar__info-group">
          <div className="sidebar__info-group-label-item">
            Url
          </div>
          <div className="sidebar__info-group-value-item">
            {selectedNode.url}
          </div>

        </div>
        <div className="sidebar__info-group">
          <div className="sidebar__info-group-label-item">Categories</div>
          {selectedNode.categories.map((category: string, index: string) =>
            <div
              key={index}
              className="sidebar__info-group-value-item"
            >
              {category}
            </div>
          )}
        </div>

        <div className="sidebar__info-group">
          <div className="sidebar__info-group-label-item">Linked pages</div>
          {nodeLinks.map((link: string) =>
            <div
              key={link}
              className="sidebar__info-group-value-item"
            >
              {link}
            </div>
          )}
        </div>
      </div>
    );
  }
}
