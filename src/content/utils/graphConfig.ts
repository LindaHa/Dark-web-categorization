import {
  highlightLinkColor,
  highlightNodeColor,
  primaryFontColor,
  primaryLinkColor,
  primaryNodeColor
} from '../../_shared/constants/styles';

export const graphConfig = {
  collapsible: true,
  nodeHighlightBehavior: true,
  directed: true,

  node: {
    color: primaryNodeColor,
    size: 120,
    highlightStrokeColor: primaryNodeColor,
    highlightColor: highlightNodeColor,

    fontColor: primaryFontColor,
    highlightFontSize: 10,
  },

  link: {
    color: primaryLinkColor,
    highlightColor: highlightLinkColor,
    strokeWidth: 1,
  },

  height: 700,
  width: 400,
};
