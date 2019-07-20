import * as React from 'react';
import * as PropTypes from 'prop-types';
import { IComponent } from '../../models/component';
import {
  getCategoriesFromPages,
  getUrlsFromPages
} from '../../content/utils/getComponentInfo';

export interface IComponentInfoDataProps {
  readonly selectedComponent: IComponent;
}

export interface IComponentInfoCallbackProps {
}

type ComponentInfoProps = IComponentInfoCallbackProps & IComponentInfoDataProps;

export class ComponentInfo extends React.PureComponent<ComponentInfoProps> {
  static displayName = 'ComponentInfo';
  static propTypes: PropTypesShape<ComponentInfoProps> = {
    selectedComponent: PropTypes.object.isRequired,
  };

  render() {
    const {selectedComponent: { members}} = this.props;
    const categories = getCategoriesFromPages(members);
    const urls = getUrlsFromPages(members);
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
      </div>
    );
  }
}