declare module 'react-d3-graph' {
  class Graph extends React.Component<{
    readonly id: string; // id is mandatory, if no id is defined rd3g will throw an error
    data: any;
    config: any;
    onClickNode?: Function;
    onRightClickNode?: Function;
    onClickGraph?: Function;
    onClickLink?: Function;
    onRightClickLink?: Function;
    onMouseOverNode?: Function;
    onMouseOutNode?: Function;
    onMouseOverLink?: Function;
    onMouseOutLink?: Function;
  }, any> {}

  export interface IGraphNode {
    readonly id: Uuid;
  }
}
