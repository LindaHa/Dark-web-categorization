import { IconSpinner } from '../../_shared/components/Spinner';
import * as React from 'react';

export const getIcon = (isFetchingDetails: boolean) => {
  return isFetchingDetails ? <IconSpinner/> : <i className="fas fa-file-download"/>;
};
