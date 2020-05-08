import * as Immutable from 'immutable'
import {
  getLabelConfigForLinks,
  getLabelConfigForNodes,
  getNodesFromGraphNodes
} from '../../../src/content/utils/graphConfig';
import {
  makeClientCommunityNode,
  makeClientPageNode
} from '../../helpers/nodesMakers';
import { INode } from '../../../src/models/node';
import {
  IGraphLink,
  IGraphNode
} from '../../../src/_customized_react-d3-graph/types';

describe('graphConfig manages graph configurations correctly', () => {
  describe('getLabelConfigForNodes return the correct label', () => {
    it('returns empty string for single pages', () => {
      const pageId = 'www.one.page';
      const node = makeClientPageNode(pageId);
      const actual = getLabelConfigForNodes(Immutable.Map<string, INode>([[node.id, node]]))({id: pageId});

      expect(actual).toEqual('');
    });
    it('returns community id in case of communities', () => {
      const pageId = 'www.one.page';
      const communityId = '0.2';
      const node = makeClientCommunityNode(communityId, Immutable.List([pageId, pageId + 'a', pageId + 'b']));
      const nodeTwo = makeClientPageNode('another.com');
      const nodes = Immutable.Map<string, INode>([[node.id, node], [nodeTwo.id, nodeTwo]]);

      const actual = getLabelConfigForNodes(nodes)({id: communityId} as IGraphNode);

      expect(actual).toEqual('3 onions');
    });
  });

  describe('getCorrectLinkSum computes the correct link sum', () => {
    it('returns the number of links in > x/y > format', () => {
      const pageOne = makeClientPageNode('Onepage.page');
      const pageTwo = makeClientPageNode('Twopage.page');
      const nodes = Immutable.Map<string, INode>([[pageOne.id, pageOne], [pageTwo.id, pageTwo]]);

      const actual = getLabelConfigForLinks(nodes)({source: pageOne.id, target: 'targetOne.page'} as IGraphLink);

      expect(actual).toEqual('> 1/2 >');
    });
  });

  describe('getNodesFromGraphNodes converts IGraph nodes to custom nodes', () => {
    it('returns client nodes', () => {
      const nodeId = '0.2';
      const graphNodes: IGraphNode[] = [{id: nodeId}, {id: nodeId + '4'}];
      const pageOne = makeClientPageNode(nodeId);
      const pageTwo = makeClientPageNode(nodeId + '4');
      const expectedNodes = Immutable.Map<string, INode>([[pageOne.id, pageOne], [pageTwo.id, pageTwo]]);
      const nodes = Immutable.Map<string, INode>([[pageOne.id, pageOne], [pageTwo.id, pageTwo]]);

      const actual = getNodesFromGraphNodes(nodes, graphNodes);

      expect(actual).toEqual(expectedNodes);
    });
  });
});
