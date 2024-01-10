const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Category = require('../models/category');

function catchAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e))
    }
}




    






module.exports = router;