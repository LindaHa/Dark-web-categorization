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

export enum GroupBy {
  Category = 'category',
  Language = 'language',
  Links = 'links',
}

export class Sidebar extends React.PureComponent<ISidebarDataProps> {
  static displayName = 'Sidebar';
  static propTypes: PropTypesShape<ISidebarDataProps> = {
    groupBy: PropTypes.string.isRequired,
  };

  render() {
    const { groupBy } = this.props;
    return (
      <div className="canvas__sidebar">
        <div className="sidebar sidebar__content">
          <div>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Links"
                aria-label="Group by"
                aria-describedby="group-by-dropdown"
                readOnly
              />
              <InputGroup.Append>
                <DropdownButton id="group-by-dropdown" title={groupBy}>
                  <Dropdown.Item href="#/action-1">Category</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Links</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Language</Dropdown.Item>
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
