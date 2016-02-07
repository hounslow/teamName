var express = require('express');
var controller = require("../controllers/userControllers");
var router = express.Router;
();
/*
 * User Routes below (Matt edit) list, create, reads for express
 */
function list(req, res) {
    res.send("respond a resource");
}
exports.list = list;
;
function create(req, res) {
    controller.createUser(req, res);
}
exports.create = create;
;
function read(req, res) {
    controller.retrieveUser(req, res);
}
exports.read = read;
;
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
module.exports = router;
