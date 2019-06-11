import * as React from 'react';
import {
  FormControl,
  InputGroup,
} from 'react-bootstrap';

export class Sidebar extends React.PureComponent<any> {
  static displayName = 'Sidebar';

  render() {
    return (
      <div className="canvas__sidebar">
        <div className="sidebar sidebar__content">
          <div>
            <InputGroup className="mb-3 testest">
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
