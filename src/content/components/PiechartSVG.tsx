import * as PropTypes from 'prop-types';
import * as React from 'react';
import PieChart, { PieChartData } from 'react-minimal-pie-chart';
import {
  CategoryColours,
  graphHighlightSector
} from '../../_shared/constants/styles';
import { INode } from '../../models/node';

interface IPieChartSVGProps {
  readonly node: INode;
}

interface IIPieChartSVGStateProps {
  readonly data: PieChartData[];
}

export class PieChartSVG extends React.PureComponent<IPieChartSVGProps, IIPieChartSVGStateProps> {
  static displayName = 'PieChartSVG';
  static propTypes = {
    node: PropTypes.object.isRequired,
  };

  constructor(props: IPieChartSVGProps) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount(): void {
    const { node } = this.props;
    const categories = node.categories;
    const data: PieChartData[] = [];
    categories.forEach((val: number, cat: Uuid) => {
      const chartObject = ({
        key: cat,
        title: `${cat} - ${val} pages`,
        value: val,
        color: CategoryColours[cat]
      });
      data.push(chartObject);
    });

    this.setState(() => ({ data }));
  }

  private _onMouseOut = (_event: React.MouseEvent, propsData: PieChartData[], index: number) => {
    const category = propsData[index].key!;
    const originalColour = CategoryColours[category];
    const data = propsData.map((entry, i) => {
      return i === index
        ? { ...entry, color: originalColour }
        : entry;
    });

    this.setState(() => ({ data }));
  };

  private _onMouseOver = (_event: React.MouseEvent, propsData: PieChartData[], index: number) => {
    const data = propsData.map((entry, i) => {
      return i === index
        ? { ...entry, color: graphHighlightSector }
        : entry;
    });

    this.setState(() => ({ data }));
  };

  render() {
    return (
      <PieChart
        data={this.state.data}
        onMouseOver={this._onMouseOver}
        onMouseOut={this._onMouseOut}
      />
    );
  }
}
