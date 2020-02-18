import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Button,
  Form,
  FormControl,
  InputGroup
} from 'react-bootstrap';
import { FilterOptions } from '../../content/actionCreators/requests/fetchFilteredNodes';

export interface IFilterOptions {
  url: boolean;
  content: boolean;

  [key: string]: any;
}

interface ISearchBarDataProps {
}

export interface ISearchBarCallbackProps {
  readonly onSearch: (searchPhrase: string, options: IFilterOptions) => void;
}

type SearchBarProps = ISearchBarDataProps & ISearchBarCallbackProps;

interface ISearchBarStateProps {
  readonly searchPhrase: string;
  readonly filterOptions: IFilterOptions;
}

export class SearchBar extends React.PureComponent<SearchBarProps, ISearchBarStateProps> {
  static displayName = 'SearchBar';
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
  };

  constructor(props: SearchBarProps) {
    super(props);

    this.state = {
      searchPhrase: '',
      filterOptions: {
        url: true,
        content: false,
      },
    };
  }

  _handlePhraseChange = (event: any): void => {
    const { value } = event.target;
    if (value != null) {
      this.setState(() => ({ searchPhrase: value }));
    }
  };

  _handleToggle = (attribute: FilterOptions): void => {
    const filterOptions = { ...this.state.filterOptions };

    switch (attribute) {
      case FilterOptions.Content: {
        const currentOptions = filterOptions.content;
        filterOptions.content = !currentOptions;
        return this.setState(() => ({ filterOptions }));
      }

      case FilterOptions.Url: {
        const currentOptions = filterOptions.url;
        filterOptions.url = !currentOptions;
        return this.setState(() => ({ filterOptions }));
      }

      default: {
        return;
      }
    }
  };

  _onSearch = () => {
    const { props: { onSearch }, state: { searchPhrase, filterOptions } } = this;
    if (searchPhrase && (filterOptions.content || filterOptions.url)) {
      onSearch(searchPhrase, filterOptions);
    }
  };

  render() {
    const { filterOptions: { content, url }, searchPhrase } = this.state;
    const readyForFetching = (content || url) && !!searchPhrase;
    return (
      <div className="sidebar__action-group">
        <InputGroup>
          <FormControl
            onChange={this._handlePhraseChange}
            aria-label="Search"
            aria-describedby="search-icon"
            placeholder="e.g. kttn.onion"
          />
          <InputGroup.Append>
            <Button
              type="submit"
              id="search-icon"
              onClick={this._onSearch}
              disabled={!readyForFetching}
            >
              <i className="fas fa-search"/>
            </Button>
          </InputGroup.Append>
        </InputGroup>
        <div className="sidebar__info-group-value-item">
          <Form.Check
            type="checkbox" inline
            label={FilterOptions.Url} id="withUrl"
            checked={url}
            onChange={() => this._handleToggle(FilterOptions.Url)}
          />
          <Form.Check
            type="checkbox" inline
            label={FilterOptions.Content} id="withContent"
            checked={content}
            onChange={() => this._handleToggle(FilterOptions.Content)}
          />
        </div>
      </div>
    );
  }
}
