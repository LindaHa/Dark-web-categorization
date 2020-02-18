import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  IFilterOptions,
  ISearchBarCallbackProps,
  SearchBar as SearchBarComponent
} from '../components/SearchBar';
import { filterNodes } from '../../content/actionCreators/requests/fetchFilteredNodes';

const mapDispatchToProps = (dispatch: Dispatch): ISearchBarCallbackProps => ({
  onSearch: (searchPhrase: string, options: IFilterOptions) => dispatch(filterNodes(searchPhrase, options)),
});

export const SearchBar = connect(null, mapDispatchToProps)(SearchBarComponent);
