export const checkStatus = (response: Response) => {
  if (response.ok) {
    return response;
  }
  else if (response.status === 503) {
    throw new Error('There seems to be a problem with the database.');
  }
  throw new Error(response.statusText);
};
