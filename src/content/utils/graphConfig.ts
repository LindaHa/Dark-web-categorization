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
    highlightFontSize: 16,
    fontSize: 13,
  },

  link: {
    color: primaryLinkColor,
    highlightColor: highlightLinkColor,
    strokeWidth: 1,
  },

  height: 700,
  width: 1000,
};
