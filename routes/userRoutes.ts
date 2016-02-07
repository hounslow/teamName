import express = require('express');
import controller = require("../controllers/userControllers");
import router = express.Router();
/*
 * User Routes below (Matt edit) list, create, reads for express
 */
export function list(req: express.Request, res: express.Response){
	res.send("respond a resource");
};

export function create(req: express.Request, res: express.Response) {
	controller.createUser(req, res);
};

export function read(req: express.Request, res: express.Response){
	controller.retrieveUser(req, res);
};

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
