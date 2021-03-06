import * as PropTypes from 'prop-types';
import * as React from 'react';
import {
  CategoryColours,
  graphHighlightSector
} from '../../_shared/constants/styles';
import { MINIMUM_NODE_SIZE } from '../constants/graphConstants';

interface IPageVisualSVGProps {
  readonly category: string;
}

interface IPageVisualSVGStateProps {
  readonly colour: string;
}

export class PageVisualSVG extends React.PureComponent<IPageVisualSVGProps, IPageVisualSVGStateProps> {
  static displayName = 'PageVisualSVG';
  static propTypes = {
    category: PropTypes.string.isRequired,
  };

  constructor(props: IPageVisualSVGProps) {
    super(props);

    this.state = {
      colour: CategoryColours['Other'],
    };
  }

  componentDidMount(): void {
    const { category } = this.props;
    this.setState(() => ({ colour: CategoryColours[category] }));
  }

  private _onMouseOut = (_event: React.MouseEvent) => {
    const { category } = this.props;
    const originalColour = CategoryColours[category];

    this.setState(() => ({ colour: originalColour }));
  };

  private _onMouseOver = (_event: React.MouseEvent) => {
    this.setState(() => ({ colour: graphHighlightSector }));
  };

  render() {
    return (
      <i
        style={{ color: this.state.colour, fontSize: MINIMUM_NODE_SIZE }}
        className="fas fa-square"
        onMouseEnter={this._onMouseOver}
        onMouseLeave={this._onMouseOut}
      />
    );
  }
}
