import * as React from 'react';
import * as Immutable from 'immutable';
import * as PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'immutable-prop-types';
import { IPage } from '../../models/page';

export interface IPageInfoDataProps {
  readonly selectedPage: IPage;
  readonly pageLinks: Immutable.Set<string>;
}

interface IPageInfoCallbackProps {
}

type PageInfoProps = IPageInfoCallbackProps & IPageInfoDataProps;

export class PageInfo extends React.PureComponent<PageInfoProps> {
  static displayName = 'PageInfo';
  static propTypes: PropTypesShape<PageInfoProps> = {
    selectedPage: PropTypes.object.isRequired,
    pageLinks: ImmutablePropTypes.set,
  };

  render() {
    const {selectedPage: {url, categories}, pageLinks} = this.props;
    const areCategoriesNotEmpty = categories && !categories.isEmpty();
    const areLinkNotEmpty = pageLinks && !pageLinks.isEmpty();

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
