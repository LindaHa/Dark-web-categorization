export type Uuid = string;
export type Url = string;

export type Action = {
  type: string;
  payload?: any;
};

export interface IGraphNode {
  readonly id: string;
  readonly x?: number;
  readonly y?: number;
}

export interface IBaseLink {
  readonly source: string;
  readonly target: string;
}

export interface IGraphLink extends IBaseLink {
  readonly fontColor?: string;
  readonly fontSize?: number;
  readonly labelProperty?: string | ((link: IBaseLink) => string);
  readonly mouseCursor?: string;
  readonly renderLabel?: boolean;
}

