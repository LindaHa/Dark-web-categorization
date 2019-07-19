import * as React from 'react';
import * as Immutable from 'immutable';
import * as PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'immutable-prop-types';
import { IPage } from '../../models/page';
import { IComponent } from '../../models/component';

export interface INodeInfoDataProps {
  readonly selectedNode: IPage | IComponent;
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
    const {selectedNode: {url, categories}, nodeLinks} = this.props;
    const areCategoriesNotEmpty = categories && !categories.isEmpty();
    const areLinkNotEmpty = nodeLinks && !nodeLinks.isEmpty();

    return (
      <div>
        <div className="sidebar__info-group">
          <div className="sidebar__info-group-label-item">
            Url
          </div>
          <div className="sidebar__info-group-value-item">
            {url}
          </div>

        </div>
        {
          areCategoriesNotEmpty &&
          <div className="sidebar__info-group">
            <div className="sidebar__info-group-label-item">Categories</div>
            {categories.map((category: string, index: string) =>
              <div
                key={index}
                className="sidebar__info-group-value-item"
              >
                {category}
              </div>
            )}
          </div>
        }

        {
          areLinkNotEmpty &&
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
        }
      </div>
    );
  }
}
