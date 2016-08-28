import xFetch from './xFetch';

module.exports = {
  lampsGet: function () {
    return xFetch("/api/app/type/lamp");
  },
  lampsOneGet: function (nwk, ep) {
    return xFetch(`/api/device/nwk/${nwk}/ep/${ep}`);
  },
  lampsOneSetName: function (nwk, ep, name) {
    return xFetch(
      `/api/device/nwk/${nwk}/ep/${ep}`,
      { method: 'put', body: JSON.stringify({name})}
    )
  },
  lampsOneSetPayload: function (nwk, ep, payload) {
    return xFetch(
      `/api/device/nwk/${nwk}/ep/${ep}`,
      { method: 'put', body: JSON.stringify({payload})}
    )
  },
};
