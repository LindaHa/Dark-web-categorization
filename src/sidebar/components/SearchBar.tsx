import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Button,
  FormControl,
  InputGroup
} from 'react-bootstrap';

interface ISearchBarProps {
  readonly onSearch: (searchPhrase: string) => void;
}

interface ISearchBarStateProps {
  readonly searchPhrase: string;
}

export class SearchBar extends React.PureComponent<ISearchBarProps, ISearchBarStateProps> {
  static displayName = 'SearchBar';
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
  };

  constructor(props: ISearchBarProps) {
    super(props);

    this.state = {
      searchPhrase: '',
    };
  }

  _handleChange = (event: any) => {
    const {value} = event.link;
    if (value) {
      this.setState(() => ({searchPhrase: value}));
    }
  };

  _onSearch = () => {
    const {props: {onSearch}, state: {searchPhrase}} = this;
    if (searchPhrase) {
      onSearch(searchPhrase);
    }
  };

  render() {
    return (
      <InputGroup className="mb-3">
        <FormControl
          onChange={this._handleChange}
          aria-label="Search"
          aria-describedby="search-icon"
          placeholder="e.g. kttn.onion"
        />
        <InputGroup.Append>
          <Button
            type="submit"
            id="search-icon"
            onClick={this._onSearch}
          >
            <i className="fas fa-search"/>
          </Button>
        </InputGroup.Append>
      </InputGroup>
    );
  }
}
