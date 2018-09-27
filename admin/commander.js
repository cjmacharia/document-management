#!/usr/bin/env node
const { prompt } = require('inquirer');
const program = require('commander');
const mongoose = require('mongoose');
const createAdmin   = require('./admin').createAdmin;
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
	.action(() => {
		prompt(requirements).then(answers => {
			createAdmin(answers);
		}).catch(err => {
			console.log(err);
		});
	});

// Assert that a VALID command is provided 
program.parse(process.argv);