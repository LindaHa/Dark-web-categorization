import * as React from 'react';
import * as PropTypes from 'prop-types';
import { INode } from '../../models/node';
import {
  DetailsLink,
  DetailsMode,
} from './DetailsLink';
import { PageDetailsOptions } from './PageDetailsOptions';
import { INodeDetailsOptions } from './CommunityDetailsOptions';

export interface IPageInfoDataProps {
  readonly selectedNode: INode;
  readonly isFetchingDetails: boolean;
}

export interface IPageInfoCallbackProps {
  readonly fetchDetails: (options: INodeDetailsOptions) => Promise<Action>;
}

type PageInfoProps = IPageInfoCallbackProps & IPageInfoDataProps;

export class PageInfo extends React.PureComponent<PageInfoProps> {
  static displayName = 'PageInfo';
  static propTypes: PropTypesShape<PageInfoProps> = {
    selectedNode: PropTypes.object.isRequired,
    isFetchingDetails: PropTypes.bool.isRequired,

    fetchDetails: PropTypes.func.isRequired,
  };

  render() {
    const { selectedNode, isFetchingDetails, fetchDetails } = this.props;
    const individualPage = selectedNode.firstMembers.first(null);
    if (!individualPage) {
      return (
        <div>
          <div className="sidebar__info-group"/>
        </div>
      );
    }
    const categories = individualPage.categories;
    const pageLinks = individualPage.links;
    const id = individualPage.id;
    const areCategoriesNotEmpty = categories && !categories.isEmpty();
    const areLinksNotEmpty = pageLinks && !pageLinks.isEmpty();

    return (
      <div>
        <div className="sidebar__info-group">
          <div className="sidebar__info-group-label-item">
            Url
          </div>
          <div className="sidebar__info-group-value-item">
            {id}
          </div>

        </div>
        {
          areCategoriesNotEmpty &&
          <div className="sidebar__info-group">
            <div className="sidebar__info-group-label-item">Categories</div>
            {categories.map((relevance: number, category: string) =>
              <div
                key={category}
                className="sidebar__info-group-value-item"
              >
                {category} : {relevance} pages
              </div>
            ).toSet()}
          </div>
        }

        {
          areLinksNotEmpty &&
          <div className="sidebar__info-group">
            <div className="sidebar__info-group-label-item">Linked pages</div>
            {pageLinks.map((link: string) =>
              <div
                key={link}
                className="sidebar__info-group-value-item"
              >
                {link}
              </div>
            )}
            <DetailsLink
              isFetchingDetails={isFetchingDetails}
              mode={DetailsMode.Page}
              fetchDetails={fetchDetails}
              selectedNode={selectedNode}
            />
            <PageDetailsOptions/>
          </div>
        }
      </div>
    );
  }
}
