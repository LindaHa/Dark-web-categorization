import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Spinner } from './Spinner';
import { ErrorDisplay } from '../containers/ErrorDisplay';


interface IContentPlaceholder {
  readonly isError: boolean;
}

export const ContentPlaceholder: React.SFC<IContentPlaceholder> = (props: IContentPlaceholder) => (
  props.isError ?
    <ErrorDisplay/> :
    <Spinner />
);

ContentPlaceholder.displayName = 'ContentPlaceholder';
ContentPlaceholder.propTypes = {
  isError: PropTypes.bool.isRequired
};
