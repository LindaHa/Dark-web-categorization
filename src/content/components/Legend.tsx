import * as React from 'react';
import { CategoryColours } from '../../_shared/constants/styles';

export interface ILegendCallbackProps {
}

export interface ILegendDataProps {
}

type LegendProps = ILegendCallbackProps & ILegendDataProps;

interface ILegendDataState {
  readonly show: boolean;
}

export class Legend extends React.PureComponent<LegendProps, ILegendDataState> {
  static displayName = 'Legend';
  static propTypes = {};

  constructor(props: LegendProps) {
    super(props);

    this.state = {
      show: true,
    };
  }

  private _ToggleShow = (): void => {
    const { show } = this.state;
    const bla = !show;

    this.setState(() => ({ show: bla }));
  };

  render() {
    const { show } = this.state;
    return (
      <div className="content__category-color-legend">
        <div
          className="btn btn-primary category-color-legend__button"
          id="colour-legend"
          onClick={() => this._ToggleShow()}
        >
          <i className="far fa-question-circle"/>
        </div>
        <div hidden={!show} className="category-color-legend__overlay-holder">
          <div className="category-color-legend__overlay-wrapper">
            <div className="category-color-legend__overlay--absolute">
              <div className="category-color-legend__overlay--relative">
                {
                  Object.keys(CategoryColours).map((key: string) => (
                    <div className="category-color-legend__item">
                      {key}
                      <div
                        className="category-color-legend__tile"
                        style={{ backgroundColor: CategoryColours[key] }}
                      />
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
