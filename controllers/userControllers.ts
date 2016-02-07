import express = require("express");
import mongoose = require("mongoose");
import Users = require("../models/Users");

import IUser = Users.IUser;
import repository = Users.repository;

export function createUser(req: express.Request, res: express.Response) {
	var userName = req.params.name;

	repository.create({ name: userName }, (error) => {

		if (error) {
			res.send(400);
		} else {
			res.send("useruserName: " + userName);
		}
	});
}

export function retrieveUser(req: express.Request, res: express.Response) {
	var userName = req.params.name;

	repository.findOne({ name: userName }, (error, user) => {
		if (error) {
			res.send(400);
		} else {
			res.send("user name" + user.name + " retrieved");
		}
	});
}