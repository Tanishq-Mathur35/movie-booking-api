const errorRes = {
    err: {},
    data: {},
    message: 'Something went wrong, cannot process the request',
    success: false
}

const successRes = {
    err: {},
    data: {},
    message: 'Successfully processed the request',
    success: true
}

module.exports = {
    successRes,
    errorRes
}
