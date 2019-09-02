import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Spinner } from './Spinner';


interface IContentPlaceholder {
  readonly isError: boolean;
}

export const ContentPlaceholder: React.SFC<IContentPlaceholder> = (props: IContentPlaceholder) => (
  props.isError ?
    <div> Something went wrong :(</div> :
    <Spinner />
);

ContentPlaceholder.displayName = 'ContentPlaceholder';
ContentPlaceholder.propTypes = {
  isError: PropTypes.bool.isRequired
};
