import * as React from 'react';
import * as PropTypes from 'prop-types';
import { INode } from '../../models/node';
import { getUrlsFromMembers } from '../../content/utils/getComponentInfo';

export interface ICommunityInfoDataProps {
  readonly selectedNode?: INode;
}

export interface ICommunityInfoCallbackProps {
}

type CommunityInfoProps = ICommunityInfoCallbackProps & ICommunityInfoDataProps;

export class CommunityInfo extends React.PureComponent<CommunityInfoProps> {
  static displayName = 'CommunityInfo';
  static propTypes: PropTypesShape<CommunityInfoProps> = {
    selectedNode: PropTypes.object,
  };

  render() {
    const { selectedNode } = this.props;
    const members = selectedNode && selectedNode.firstMembers;
    const categories = selectedNode && selectedNode.categories;
    const urls = getUrlsFromMembers(members);
    const areCategoriesNotEmpty = categories && !categories.isEmpty();

    return (
      <div>
        <div className="sidebar__info-group">
          <div className="sidebar__info-group-label-item">
            Urls
          </div>
          <div className="sidebar__info-group-value-item">
            {urls.map((url: string, index: string) =>
              <div
                key={index}
                className="sidebar__info-group-value-item"
              >
                {url}
              </div>
            )}
          </div>

        </div>
        {
          areCategoriesNotEmpty &&
            <div className="sidebar__info-group">
              <div className="sidebar__info-group-label-item">Categories</div>
              {categories!.map((category: string, index: string) =>
                <div
                  key={index}
                  className="sidebar__info-group-value-item"
                >
                  {category}
                </div>
              )}
            </div>
        }
      </div>
    );
  }
}
