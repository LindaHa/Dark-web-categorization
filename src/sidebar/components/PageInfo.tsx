import * as React from 'react';
import * as PropTypes from 'prop-types';
import { IComponent } from '../../models/component';

export interface IPageInfoDataProps {
  readonly selectedNode: IComponent;
}

interface IPageInfoCallbackProps {
}

type PageInfoProps = IPageInfoCallbackProps & IPageInfoDataProps;

export class PageInfo extends React.PureComponent<PageInfoProps> {
  static displayName = 'PageInfo';
  static propTypes: PropTypesShape<PageInfoProps> = {
    selectedNode: PropTypes.object.isRequired,
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
          </div>
        }
      </div>
    );
  }
}
