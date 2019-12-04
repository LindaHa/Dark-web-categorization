import * as PropTypes from 'prop-types';
import * as React from 'react';
import { IconSpinner } from '../../_shared/components/Spinner';

interface IDetailsLinkProps {
  readonly isFetchingDetails: boolean;
  readonly onClick: () => void;
  readonly text: string;
}

const getClassNames = (isFetching: boolean): string => {
  if (isFetching) {
    return 'sidebar__info-group-detail-item sidebar__info-group-detail-item--is-loading';
  }
  return 'sidebar__info-group-detail-item';
};

export const DetailsLink: React.SFC<IDetailsLinkProps> = (props: IDetailsLinkProps) => (
  <div
    className={getClassNames(props.isFetchingDetails)}
    onClick={props.onClick}
  >
    {props.text + ' '}
    {props.isFetchingDetails ? <IconSpinner/> : <i className="fas fa-file-download"/>}
  </div>
);

DetailsLink.displayName = 'DetailsLink';
DetailsLink.propTypes = {
  isFetchingDetails: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
