import { Dispatch } from 'redux';
import { Action } from '../../helpers/types';
import { ICommunityServerModel } from '../../../src/models/node';
import { IState } from '../../../src/_shared/models/IState';
import { GroupBy } from '../../../src/sidebar/components/Sidebar';
import { fetchNodesFactory } from '../../../src/content/actionCreators/requests/fetchNodes';
import { makeServerCommunityNode } from '../../helpers/nodesMakers';

describe('Correctly resolves fetchNodes: ', () => {
  const secondNodeId = '0.24.2';
  const nodeId = '0.24.8';
  const nodes = [
    makeServerCommunityNode(nodeId, 'www.one.page'),
    makeServerCommunityNode(secondNodeId, 'www.two.page')
  ];

  const fetchSuccess = () => Promise.resolve({ json: ((): Promise<ICommunityServerModel[]> => Promise.resolve(nodes)) });
  const fetchFailImmediately = () => Promise.reject(new Error('Nodes could not be fetched'));
  const fetchFail = () => Promise.resolve({ json: (): Promise<Error> => Promise.reject(new Error('Nodes could not be fetched')) });
  let fakeDispatch: jest.Mock<Dispatch>;
  const fakeAction = (payload: string): Action => ({ type: 'UNKNOWN', payload });
  const fakeRequest = () => fakeAction('Nodes_GetAll_Request');
  const fakeReceived = () => fakeAction('Nodes_GetNodes_Success');
  const fakeFailed = () => fakeAction('Nodes_GetAll_Failure');
  const fakeIdGenerator = () => '98dbde18-639e-49a6-8e51-603ceb2ae92d';
  const fakeGetRoute = () => 'www.getNodesHere.now';
  const fakeGetState = (): IState => {
    return {
      groupBy: GroupBy,
    } as any as IState;
  };
  const testCases = [
    { name: ' succeeding', fetch: fetchSuccess },
    { name: ' immediately failing', fetch: fetchFailImmediately },
    { name: ' failing', fetch: fetchFail },
  ];
  const fetchNodes = (fetch: () => Promise<any>) => fetchNodesFactory({
    fetchBegin: fakeRequest,
    fetch,
    nodesSuccess: fakeReceived,
    error: fakeFailed,
    idGenerator: fakeIdGenerator,
    getRoute: fakeGetRoute,
  });

  beforeEach((done) => {
    fakeDispatch = jest.fn((action) => action);
    done();
  });

  testCases.forEach((testCase) => {
    it(`dispatches requestNodes with ${testCase.name} fetch`, () => {
      fetchNodes(testCase.fetch)()(fakeDispatch, fakeGetState);
      const actual = fakeDispatch.mock.calls[0];

      expect(actual[0]).toEqual(fakeRequest());
    });
  });

  it('dispatches nodesReceived', () =>
    fetchNodes(fetchSuccess)()(fakeDispatch, fakeGetState)
      .then(() => {
        const actual = fakeDispatch.mock.calls[1];

        expect(actual[0]).toEqual(fakeReceived());
        expect(fakeDispatch.mock.calls.length).toBe(2);
      })
  );

  it('fails with error immediately', () =>
    fetchNodes(fetchFailImmediately)()(fakeDispatch, fakeGetState)
      .then(() => {
        const actual = fakeDispatch.mock.calls[1];

        expect(actual[0]).toEqual(fakeFailed());
        expect(fakeDispatch.mock.calls.length).toBe(2);
      })
  );

  it('fails with error', () => fetchNodes(fetchFail)()(fakeDispatch, fakeGetState)
    .then(() => {
      const actual = fakeDispatch.mock.calls[1];

      expect(actual[0]).toEqual(fakeFailed());
      expect(fakeDispatch.mock.calls.length).toBe(2);
    })
  );
});
