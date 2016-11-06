import fetch from 'dva/fetch';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  throw new Error(response.statusText);
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options={}) {
  const newOptions = {
    ...options,
    credentials: 'include'
  };
  if (options.header) {
    newOptions.header = {
      ...options.header
    }
  }
  return fetch(url, newOptions)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => {
      const { type, payload, err } = data;
      if (type !== 'ok') throw new Error(err);
      return payload;
    })
}
