#!/usr/bin/env node
const { prompt } = require('inquirer');
const program = require('commander');
const mongoose = require('mongoose');
const { createAdmin }   = require('./admin');
const util = require('../utils/user-util');

const requirements = [
	{
		type: 'value',
		name: '_id',
		default: `${new mongoose.Types.ObjectId()}`,
	},
	{
		type: 'input',
		name: 'name',
		default: 'collo',
		message: 'enter your name'
	},
	{
		type: 'input',
		name: 'email',
		default: 'cjmash@cj.com',
		message: 'enter your email here'
	},
	{
		type: 'input',
		name: 'role',
		default: 'admin',
		message: 'enter the admin role'
	},
	{
		type: 'password',
		name: 'password',
		default: 'admin',
		message: 'enter the password'
	}
		
];

program
	.version('0.0.1')
	.description('contact management system');
program
	.command('createAdmin')
	.alias('a')
	.description('Add an admin user')
	.action(async (req, res) => {
		let answers = await prompt(requirements);
		await util.validate(answers);
		const pass = await util.hashPassword(req, res, answers.password);
		createAdmin({
			_id: answers._id,
			name: answers.name,
			email: answers.email,
			role: answers.role,
			password: pass

		});
	});

program.parse(process.argv);