import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Button,
  Modal
} from 'react-bootstrap';


export interface IErrorDisplayDataProps {
  readonly errorMessage: string;
}

export interface IErrorDisplayCallbackProps {
  readonly onClick: () => Promise<Action>;
}

type ErrorProps = IErrorDisplayDataProps & IErrorDisplayCallbackProps;

export const ErrorDisplay: React.SFC<ErrorProps> = (props: ErrorProps) => ((
  <Modal
    show={!!props.errorMessage}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header>
      <Modal.Title id="error-display">
        Something went wrong :(
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {props.errorMessage + ' Please reload.'}
    </Modal.Body>
    <Modal.Footer>
      <Button
        id="reload-btn"
        className="btn btn-primary category-color-legend__button"
        onClick={() => props.onClick()}
      >
        <i className="fas fa-redo"/>
      </Button>
    </Modal.Footer>
  </Modal>
));

ErrorDisplay.displayName = 'ErrorDisplay';
ErrorDisplay.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
