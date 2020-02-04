import * as React from 'react';
import * as PropTypes from 'prop-types';
import { INode } from '../../models/node';
import { getUrlsFromMembers } from '../../content/utils/getComponentInfo';
import { DetailsMode } from './DetailsLink';
import { DetailsLink } from '../containers/DetailsLink';

export interface ICommunityInfoDataProps {
  readonly selectedNode: INode;
}

export interface ICommunityInfoCallbackProps {
}

type CommunityInfoProps = ICommunityInfoCallbackProps & ICommunityInfoDataProps;

export class CommunityInfo extends React.PureComponent<CommunityInfoProps> {
  static displayName = 'CommunityInfo';
  static propTypes: PropTypesShape<CommunityInfoProps> = {
    selectedNode: PropTypes.object.isRequired,
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
            Number of members
          </div>
          <div className="sidebar__info-group-value-item">
            {selectedNode.membersCount}
          </div>
        </div>
        <div className="sidebar__info-group">
          <div className="sidebar__info-group-label-item">
            First urls
          </div>
          <div className="sidebar__info-group-value-items">
            {urls.map((url: string, index: string) =>
              <div
                key={index}
                className="sidebar__info-group-value-item"
              >
                {url}
              </div>
            )}
          </div>
          <div className="sidebar__info-group-value-item sidebar__info-group-value-item--link">
            <DetailsLink mode={DetailsMode.Community}/>
          </div>
        </div>
        {
          areCategoriesNotEmpty &&
          <div className="sidebar__info-group">
              <div className="sidebar__info-group-label-item">
                Categories
              </div>
              <div className="sidebar__info-group-value-items sidebar__info-group-value-items--small">
                {categories!.map((relevance: number, category: string) =>
                  <div
                    key={category}
                    className="sidebar__info-group-value-item"
                  >
                    {category} : {relevance} pages
                  </div>
                ).toSet()}
              </div>
          </div>
        }
      </div>
    );
  }
}
