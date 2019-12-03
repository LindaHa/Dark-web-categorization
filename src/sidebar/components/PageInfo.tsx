import * as React from 'react';
import * as PropTypes from 'prop-types';
import { INode } from '../../models/node';
import { download } from '../../_shared/utils/download';

export interface IPageInfoDataProps {
  readonly selectedNode: INode;
}

export interface IPageInfoCallbackProps {
  readonly fetchDetails: () => Promise<Action>;
}

type PageInfoProps = IPageInfoCallbackProps & IPageInfoDataProps;

export class PageInfo extends React.PureComponent<PageInfoProps> {
  static displayName = 'PageInfo';
  static propTypes: PropTypesShape<PageInfoProps> = {
    selectedNode: PropTypes.object.isRequired,

    fetchDetails: PropTypes.func.isRequired,
  };

  private _onDetailLinkClick = () => {
    const { fetchDetails, selectedNode } = this.props;
    if (!selectedNode) {
      return;
    }
    fetchDetails().then((action: Action) => {
      const filename = `page_details_for_node-${selectedNode.id}.txt`;
      download(filename, action.payload.details.toString());
    });
  };

  render() {
    const { selectedNode: { firstMembers } } = this.props;
    const individualPage = firstMembers.first(null);
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
            <div
              className="sidebar__info-group-detail-item"
              onClick={this._onDetailLinkClick}
            >
              Get all links
            </div>
          </div>
        }
      </div>
    );
  }
}
