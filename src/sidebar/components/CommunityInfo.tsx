import * as React from 'react';
import * as PropTypes from 'prop-types';
import { INode } from '../../models/node';
import { getUrlsFromMembers } from '../../content/utils/getComponentInfo';
import { download } from '../../_shared/utils/download';
import {
  DetailsLink,
  DetailsMode,
} from './DetailsLink';
import { ICommunityDetailsOptions } from './CommunityDetailsOptions';
import { removeEmptyPropertiesFromDetails } from '../utils/detailsHelpers';

export interface ICommunityInfoDataProps {
  readonly selectedNode: INode;
  readonly isFetchingDetails: boolean;
}

export interface ICommunityInfoCallbackProps {
  readonly fetchDetails: (options: ICommunityDetailsOptions) => Promise<Action>;
}

type CommunityInfoProps = ICommunityInfoCallbackProps & ICommunityInfoDataProps;

export class CommunityInfo extends React.PureComponent<CommunityInfoProps> {
  static displayName = 'CommunityInfo';
  static propTypes: PropTypesShape<CommunityInfoProps> = {
    selectedNode: PropTypes.object.isRequired,
    isFetchingDetails: PropTypes.bool.isRequired,

    fetchDetails: PropTypes.func.isRequired,
  };

  private _onDetailLinkClick = (options: ICommunityDetailsOptions): void => {
    const { fetchDetails, selectedNode } = this.props;
    fetchDetails(options).then((action: Action) => {
      const filename = `community_details_for_node-${selectedNode.id}.txt`;
      const resultWithoutNulls = action.payload.details.toJS()
        .map((details: ICommunityDetailsOptions) => removeEmptyPropertiesFromDetails(details));
      download(filename, JSON.stringify(resultWithoutNulls));
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
            Number of members
          </div>
          <div className="sidebar__info-group-value-item">
            {selectedNode.membersCount}
          </div>
          <div className="sidebar__info-group-label-item">
            First urls
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
            <DetailsLink
              isFetchingDetails={isFetchingDetails}
              onLinkClick={this._onDetailLinkClick}
              mode={DetailsMode.Community}
            />
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
