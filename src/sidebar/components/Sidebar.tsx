import * as React from 'react';
import * as PropTypes from 'prop-types';
import { SearchBar } from './SearchBar';
import { GroupBySelector } from './GroupBySelector';
import { NodeMode } from '../../models/stateModels';
import { ComponentInfo } from '../containers/ComponentInfo';
import { PageInfo } from '../containers/PageInfo';
import { ZoomOutOptions } from './ZoomOutOptions';

export interface ISidebarDataProps {
  readonly groupBy: GroupBy;
  readonly nodeMode: NodeMode;
  readonly selectedComponent: Uuid | null;
  readonly selectedNodeId: Uuid;
}

export interface ISidebarCallbackProps {
  readonly onFilterSearch: (searchPhrase: string) => void;
  readonly onGroupUpdate: (value: GroupBy) => void;
}

type SidebarProps = ISidebarCallbackProps & ISidebarDataProps;

export enum GroupBy {
  Category = 'Category',
  Language = 'Language',
  Links = 'Links',
}

export class Sidebar extends React.PureComponent<SidebarProps> {
  static displayName = 'Sidebar';
  static propTypes: PropTypesShape<SidebarProps> = {
    groupBy: PropTypes.string.isRequired,
    nodeMode: PropTypes.string.isRequired,
    selectedComponent: PropTypes.string.isRequired,
    selectedNodeId: PropTypes.string.isRequired,

    onFilterSearch: PropTypes.func.isRequired,
    onGroupUpdate: PropTypes.func.isRequired,
  };

  _updateGroupBy = (value: GroupBy) => () => {
    this.props.onGroupUpdate(value);
  };

  _filterNodes = (searchPhrase: string) => {
    this.props.onFilterSearch(searchPhrase);
  };

  _renderNodeInfo = () => {
    const { nodeMode } = this.props;
    switch (nodeMode) {
      case NodeMode.Components:
        return <ComponentInfo/>;

      case NodeMode.Pages:
        return <PageInfo/>;

      case NodeMode.Empty:
      default: {
        return null;
      }
    }
  };

  _getLevelNumber = (): string => {
    const selectedComponentId = this.props.selectedComponent;
    if (!selectedComponentId) {
      return '0';
    }
    const idParts = selectedComponentId.split('.');
    return '' + idParts.length;
  };

  render() {
    const { groupBy, selectedNodeId } = this.props;
    return (
      <div className="canvas__sidebar">
        <div className="sidebar sidebar__content">
          <div>
            <GroupBySelector
              groupBy={groupBy}
              onGroupByUpdate={this._updateGroupBy}
            />
            <SearchBar onSearch={this._filterNodes}/>
            <ZoomOutOptions
              lvlNum={this._getLevelNumber()}
              onZoomOut={() => console.log('zoom out')}
            />
            {selectedNodeId && this._renderNodeInfo()}
          </div>
        </div>
      </div>
    );
  }
}
