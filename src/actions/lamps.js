module.exports = {
  lampsGet: () => ({
    type: "lamps/get"
  }),
  lampsGetSuccess: (data) => ({
    type: "lamps/get/success",
    payload: data
  }),
  lampsOneGet: (id) => ({
    type: "lamps/one/get",
    payload: id
  }),
  lampsOneGetSuccess: (id, data) => ({
    type: "lamps/one/get/success",
    payload: data,
    meta: id
  }),
  lampsOneSetLevel: (id, level) => ({
    type: "lamps/one/set/level",
    payload: {id, level}
  }),
  lampsOneSetLevelSuccess: (id, level) => ({
    type: "lamps/one/set/level/success",
    payload: {id, level}
  })
}
