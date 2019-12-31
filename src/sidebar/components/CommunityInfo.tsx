import * as React from 'react';
import * as PropTypes from 'prop-types';
import { INode } from '../../models/node';
import { getUrlsFromMembers } from '../../content/utils/getComponentInfo';
import {
  DetailsLink,
  DetailsMode,
} from './DetailsLink';
import { INodeDetailsOptions } from './CommunityDetailsOptions';

export interface ICommunityInfoDataProps {
  readonly selectedNode: INode;
  readonly isFetchingDetails: boolean;
}

export interface ICommunityInfoCallbackProps {
  readonly fetchDetails: (options: INodeDetailsOptions) => Promise<Action>;
}

type CommunityInfoProps = ICommunityInfoCallbackProps & ICommunityInfoDataProps;

export class CommunityInfo extends React.PureComponent<CommunityInfoProps> {
  static displayName = 'CommunityInfo';
  static propTypes: PropTypesShape<CommunityInfoProps> = {
    selectedNode: PropTypes.object.isRequired,
    isFetchingDetails: PropTypes.bool.isRequired,

    fetchDetails: PropTypes.func.isRequired,
  };

  render() {
    const { selectedNode, isFetchingDetails, fetchDetails } = this.props;
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
              mode={DetailsMode.Community}
              selectedNode={selectedNode}
              fetchDetails={fetchDetails}
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
