import * as React from 'react';
import * as PropTypes from 'prop-types';
import { GroupBySelector } from './GroupBySelector';
import { CommunityInfo } from '../containers/CommunityInfo';
import { PageInfo } from '../containers/PageInfo';
import { ZoomOutOptions } from './ZoomOutOptions';
import { INode } from '../../models/node';
import { SearchBar } from '../containers/SearchBar';

export interface ISidebarDataProps {
  readonly currentLevel: number;
  readonly groupBy: GroupBy;
  readonly selectedNode?: INode;
  readonly selectedNodeId?: Uuid;
}

export interface ISidebarCallbackProps {
  readonly onGroupUpdate: (value: GroupBy) => void;
  readonly onGroupZoomOut: (groupId: Uuid) => void;
}

type SidebarProps = ISidebarCallbackProps & ISidebarDataProps;

export enum GroupBy {
  Category = 'Category',
  Link = 'Link',
}

export class Sidebar extends React.PureComponent<SidebarProps> {
  static displayName = 'Sidebar';
  static propTypes: PropTypesShape<SidebarProps> = {
    currentLevel: PropTypes.number.isRequired,
    groupBy: PropTypes.string.isRequired,
    selectedNode: PropTypes.object,
    selectedNodeId: PropTypes.string,

    onGroupUpdate: PropTypes.func.isRequired,
    onGroupZoomOut: PropTypes.func.isRequired,
  };

  _updateGroupBy = (value: GroupBy) => () => this.props.onGroupUpdate(value);

  _renderNodeInfo = () => {
    const { selectedNode } = this.props;
    if (!selectedNode) {
      return null;
    }
    const isIndividual = selectedNode.membersCount === 1 && !selectedNode.firstMembers.isEmpty();

    return isIndividual ? <PageInfo/> : <CommunityInfo/>;
  };

  _zoomOutGroup = () => {
    const { selectedNodeId, selectedNode } = this.props;
    if (!selectedNodeId) {
      return;
    }

    let upNodeIds: Url[] = [];

    if (selectedNodeId.includes(' ') || !selectedNode) {
      let baseId = '';
      if (selectedNodeId.includes(' ')) {
        const idAndUrl = selectedNodeId.split(' ');
        baseId = idAndUrl[0];
      }
      const idParts = (baseId || selectedNodeId).split('.');
      upNodeIds = idParts.slice(0, idParts.length - 1);
    } else {
      const idParts = selectedNodeId.split('.');
      upNodeIds = idParts.slice(0, idParts.length - 2);
    }
    const upNodeId = upNodeIds.join('.');

    this.props.onGroupZoomOut(upNodeId);
  };

  render() {
    const { groupBy, selectedNode, currentLevel } = this.props;
    return (
      <div className="canvas__sidebar">
        <div className="sidebar sidebar__content">
          <div>
            <GroupBySelector
              groupBy={groupBy}
              onGroupByUpdate={this._updateGroupBy}
            />{/*
                // @ts-ignore */}
            <SearchBar/>
            <ZoomOutOptions
              lvlNumber={currentLevel}
              onZoomOut={this._zoomOutGroup}
            />
            {selectedNode && this._renderNodeInfo()}
          </div>
        </div>
      </div>
    );
  }
}
