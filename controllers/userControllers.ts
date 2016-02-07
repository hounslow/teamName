import express = require("express");
import mongoose = require("mongoose");
import userModel = require("../models/Users");

import IUser = Users.IUser;
import repository = Users.repository;

export function createUser(req: express.Request, res: express.Response) {
	var userName = req.params.name;

	repository.create({n})
}