const matations = {
  updatePayload (state, payload) {
    console.log(state, payload, '4455885248')
    Object.assign(state, payload)
  }
}

export default matations
