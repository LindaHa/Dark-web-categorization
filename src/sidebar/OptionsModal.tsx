import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Button,
  Modal
} from 'react-bootstrap';
import {
  CommunityDetailsOptions,
  INodeDetailsOptions
} from './components/CommunityDetailsOptions';
import { DetailsOptions } from './components/DetailsLink';
import { IconSpinner } from '../_shared/components/Spinner';

interface IOptionsModalProps {
  readonly isModalShown: boolean;
  readonly isFetchingDetails: boolean;
  readonly currentOptions: INodeDetailsOptions;

  readonly download: () => void;
  readonly handleToggle: (attribute: DetailsOptions) => void;
  readonly onHide: () => void;
}

export const OptionsModal: React.SFC<IOptionsModalProps> = (props: IOptionsModalProps) => {
  const { currentOptions, isFetchingDetails, isModalShown, download, onHide, handleToggle } = props;
  return (
    <Modal
      show={isModalShown}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Choose additional available details for members
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CommunityDetailsOptions
          currentOptions={currentOptions as INodeDetailsOptions}
          handleToggle={handleToggle}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={download}>
          {'Download '}
          {isFetchingDetails ? <IconSpinner/> : <i className="fas fa-file-download"/>}
        </Button>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

OptionsModal.displayName = 'OptionsModal';
OptionsModal.propTypes = {
  currentOptions: PropTypes.object.isRequired,
  isFetchingDetails: PropTypes.bool.isRequired,
  isModalShown: PropTypes.bool.isRequired,
  download: PropTypes.func.isRequired,
  handleToggle: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
};
