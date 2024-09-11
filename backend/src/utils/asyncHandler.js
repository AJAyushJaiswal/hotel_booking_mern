const asyncHandler = (requestHandler) => async (req, res, next) => {
    return Promise.resolve(requestHandler(req, res)).catch(next);
}

export {asyncHandler}
