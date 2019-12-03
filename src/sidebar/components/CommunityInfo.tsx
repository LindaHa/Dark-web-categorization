import * as React from 'react';
import * as PropTypes from 'prop-types';
import { INode } from '../../models/node';
import { getUrlsFromMembers } from '../../content/utils/getComponentInfo';
import { download } from '../../_shared/utils/download';
import { getIcon } from '../../content/utils/getDetailsIcon';

export interface ICommunityInfoDataProps {
  readonly selectedNode: INode;
  readonly isFetchingDetails: boolean;
}

export interface ICommunityInfoCallbackProps {
  readonly fetchDetails: () => Promise<Action>;
}

type CommunityInfoProps = ICommunityInfoCallbackProps & ICommunityInfoDataProps;

export class CommunityInfo extends React.PureComponent<CommunityInfoProps> {
  static displayName = 'CommunityInfo';
  static propTypes: PropTypesShape<CommunityInfoProps> = {
    selectedNode: PropTypes.object.isRequired,
    isFetchingDetails: PropTypes.bool.isRequired,

    fetchDetails: PropTypes.func.isRequired,
  };

  private _onDetailLinkClick = () => {
    const { fetchDetails, selectedNode } = this.props;
    fetchDetails().then((action: Action) => {
      const filename = `community_details_for_node-${selectedNode.id}.txt`;
      download(filename, action.payload.details.toString());
    });
  };

  render() {
    const { selectedNode, isFetchingDetails } = this.props;
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
            <div
              className="sidebar__info-group-detail-item"
              onClick={this._onDetailLinkClick}
            >
              Get all members
              {getIcon(isFetchingDetails)}
            </div>
          </div>

        </div>
        {
          areCategoriesNotEmpty &&
          <div className="sidebar__info-group">
            <div className="sidebar__info-group-label-item">Categories</div>
            {categories!.map((relevance: number, category: string) =>
              <div
                key={category}
                className="sidebar__info-group-value-item"
              >
                {category} : {relevance} pages
              </div>
            ).toSet()}
          </div>
        }
      </div>
    );
  }
}
