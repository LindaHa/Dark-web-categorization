import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  DropdownButton,
  FormControl,
  InputGroup,
  Dropdown,
} from 'react-bootstrap';

export interface ISidebarDataProps {
  readonly groupBy: GroupBy;
}

export interface ISidebarCallbackProps {
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

    onGroupUpdate: PropTypes.func.isRequired,
  };

  _updateGroup = (value: GroupBy) => () => {
    this.props.onGroupUpdate(value);
  };

  render() {
    const {groupBy} = this.props;
    return (
      <div className="canvas__sidebar">
        <div className="sidebar sidebar__content">
          <div>
            <InputGroup className="mb-3">
              <FormControl
                placeholder={groupBy}
                aria-label="Group by"
                aria-describedby="group-by-dropdown"
                readOnly
              />
              <InputGroup.Append>
                <DropdownButton id="group-by-dropdown" title="Group By">
                  <Dropdown.Item
                    onSelect={this._updateGroup(GroupBy.Category)}
                    href="#/action-1">
                    Category
                  </Dropdown.Item>
                  <Dropdown.Item
                    onSelect={this._updateGroup(GroupBy.Links)}
                    href="#/action-2">
                    Links
                  </Dropdown.Item>
                  <Dropdown.Item
                    onSelect={this._updateGroup(GroupBy.Language)}
                    href="#/action-3">
                    Language
                  </Dropdown.Item>
                </DropdownButton>
              </InputGroup.Append>
            </InputGroup>

            <InputGroup className="mb-3">
              <FormControl
                placeholder="e.g. kitten.onion"
                aria-label="Search"
                aria-describedby="search-icon"
              />
              <InputGroup.Append>
                <InputGroup.Text id="search-icon">
                  <i className="fas fa-search"/>
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </div>
        </div>
      </div>
    );
  }
}
