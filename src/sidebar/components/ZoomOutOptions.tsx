import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Button,
  FormControl,
  InputGroup
} from 'react-bootstrap';

interface IZoomOutOptionsDataProps {
  readonly lvlNumber: number;
}

interface IZoomOutOptionsCallbackProps {
  readonly onZoomOut: () => void;
}

type ZoomOutOptionsProps = IZoomOutOptionsCallbackProps & IZoomOutOptionsDataProps;

export const ZoomOutOptions: React.SFC<ZoomOutOptionsProps> = (props: ZoomOutOptionsProps) => (
  <InputGroup className="mb-3">
    <FormControl
      className="sidebar__default-cursor"
      placeholder={'Level no. ' + props.lvlNumber}
      aria-label="Level number"
      aria-describedby="zoom-out-options"
      readOnly
    />
    {
      props.lvlNumber > 0 &&
      <InputGroup.Append>
        <Button
          type="submit"
          id="zoom-out-icon"
          onClick={props.onZoomOut}
        >
          <i className="fa fa-search-minus "/>
        </Button>
      </InputGroup.Append>
    }
  </InputGroup>
);


ZoomOutOptions.displayName = 'ZoomOutOptions';
ZoomOutOptions.propTypes = {
  lvlNumber: PropTypes.number.isRequired,
  onZoomOut: PropTypes.func.isRequired,
};
