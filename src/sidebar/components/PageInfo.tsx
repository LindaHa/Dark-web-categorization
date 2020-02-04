import * as React from 'react';
import * as PropTypes from 'prop-types';
import { INode } from '../../models/node';
import { DetailsMode } from './DetailsLink';
import { PageDetailsOptions } from './PageDetailsOptions';
import { DetailsLink } from '../containers/DetailsLink';

export interface IPageInfoDataProps {
  readonly selectedNode: INode;
}

export interface IPageInfoCallbackProps {
}

type PageInfoProps = IPageInfoCallbackProps & IPageInfoDataProps;

export class PageInfo extends React.PureComponent<PageInfoProps> {
  static displayName = 'PageInfo';
  static propTypes: PropTypesShape<PageInfoProps> = {
    selectedNode: PropTypes.object.isRequired,
  };

  render() {
    const { selectedNode } = this.props;
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
            <div className="sidebar__info-group-label-item">
              Category
            </div>
            {categories.map((_relevance: number, category: string) =>
              <div
                key={category}
                className="sidebar__info-group-value-item"
              >
                {category}
              </div>
            ).toSet()}
          </div>
        }

        {
          areLinksNotEmpty &&
          <div className="sidebar__info-group">
            <div className="sidebar__info-group-label-item">Linked pages</div>
            <div className="sidebar__info-group-value-items">
              {pageLinks.map((link: string) =>
                <div
                  key={link}
                  className="sidebar__info-group-value-item"
                >
                  {link}
                </div>
              )}
            </div>
            <PageDetailsOptions/>
            <div className="sidebar__info-group-value-item sidebar__info-group-value-item--link">
              <DetailsLink mode={DetailsMode.Page}/>
            </div>
          </div>
        }
      </div>
    );
  }
}
