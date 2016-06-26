module.exports = {
  sseReceived: (event) => ({
    type: "sse/received",
    payload: event
  }),
  sseStateChange: (state) => ({
    type: "sse/state/change",
    payload: state
  })
}
