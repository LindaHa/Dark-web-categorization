import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Button,
  FormControl,
  InputGroup
} from 'react-bootstrap';

interface IZoomOutOptionsDataProps {
  readonly lvlNum: string;
}

interface IZoomOutOptionsCallbackProps {
  readonly onZoomOut: () => void;
}

type ZoomOutOptionsProps = IZoomOutOptionsCallbackProps & IZoomOutOptionsDataProps;

export const ZoomOutOptions: React.SFC<ZoomOutOptionsProps> = (props: ZoomOutOptionsProps) => (
  <InputGroup className="mb-3">
    <FormControl
      placeholder={'Level no. ' + props.lvlNum}
      aria-label="Level number"
      aria-describedby="zoom-out-options"
      readOnly
    />
    <InputGroup.Append>
      <Button
        type="submit"
        id="zoom-out-icon"
        onClick={this._onSearch}
      >
        <i className="fa fa-search-minus "/>
      </Button>
    </InputGroup.Append>
  </InputGroup>
);


ZoomOutOptions.displayName = 'ZoomOutOptions';
ZoomOutOptions.propTypes = {
  lvlNum: PropTypes.string.isRequired,
  onZoomOut: PropTypes.func.isRequired,
};
