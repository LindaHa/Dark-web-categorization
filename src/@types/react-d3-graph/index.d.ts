declare module 'react-d3-graph' {
  class Graph extends React.Component<{
    readonly id: string; // name is mandatory, if no name is defined rd3g will throw an error
    data: any;
    config: any;
    onClickNode?: Function;
    onDoubleClickNode?: Function;
    onRightClickNode?: Function;
    onClickGraph?: Function;
    onClickLink?: Function;
    onRightClickLink?: Function;
    onMouseOverNode?: Function;
    onMouseOutNode?: Function;
    onMouseOverLink?: Function;
    onMouseOutLink?: Function;
  }, any> {
  }

  export interface IGraphNode {
    readonly id: Uuid;
    readonly x?: number;
    readonly y?: number;
  }

  interface IBaseLink {
    readonly source: Uuid;
    readonly target: Uuid;
  }

  export interface IGraphLink extends IBaseLink {
    readonly fontColor?: string;
    readonly fontSize?: number;
    readonly labelProperty?: string | ((link: IBaseLink) => string);
    readonly mouseCursor ?: string;
    readonly renderLabel?: boolean;
  }
}
