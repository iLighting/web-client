import xFetch from './xFetch';

module.exports = {
  lampsGet: function () {
    return xFetch("/api/lamps");
  },
  lampsOneGet: function (id) {
    return xFetch("/api/lamps/"+id);
  },
  lampsOneSetLevel: function (id, level) {
    return xFetch("/api/lamps/"+id, {
      method: "post",
      body: JSON.stringify({level})
    })
  }
}
