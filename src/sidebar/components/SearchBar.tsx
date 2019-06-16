import {
  FormControl,
  InputGroup
} from 'react-bootstrap';
import * as React from 'react';

export const SearchBar: React.SFC = () => (
  <InputGroup className="mb-3">
    <FormControl
      placeholder="e.g. kttn.onion"
      aria-label="Search"
      aria-describedby="search-icon"
    />
    <InputGroup.Append>
      <InputGroup.Text id="search-icon">
        <i className="fas fa-search"/>
      </InputGroup.Text>
    </InputGroup.Append>
  </InputGroup>
);

SearchBar.displayName = 'SearchBar';
