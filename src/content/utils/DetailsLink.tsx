import * as PropTypes from 'prop-types';
import * as React from 'react';
import { IconSpinner } from '../../_shared/components/Spinner';

interface IDetailsLinkProps {
  readonly isFetchingDetails: boolean;
  readonly onClick: () => void;
  readonly text: string;
}

export const DetailsLink: React.SFC<IDetailsLinkProps> = (props: IDetailsLinkProps) => (
  <div
    className="sidebar__info-group-detail-item"
    onClick={props.onClick}
  >
    {props.text + ' '}
    {props.isFetchingDetails ? <i className="fas fa-file-download"/> : <IconSpinner/>}
  </div>
);

DetailsLink.displayName = 'DetailsLink';
DetailsLink.propTypes = {
  isFetchingDetails: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
