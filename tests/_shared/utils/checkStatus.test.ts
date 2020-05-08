import { checkStatus } from '../../../src/_shared/utils/checkStatus';

describe('checkStatus behaves correctly according to the response', () => {
  it('returns the received response if ok is ok', () => {
    const responseSuccess = {
      ok: true,
      statusText: 'Everything ok',
    } as Response;

    const actual = checkStatus(responseSuccess);

    expect(actual).toEqual(responseSuccess);
  });

  it('returns an error message is ok is not ok', () => {
    const responseFailure = {
      ok: false,
      statusText: 'Error message',
    } as Response;

    expect(() => checkStatus(responseFailure)).toThrowError(Error);
  });
});
