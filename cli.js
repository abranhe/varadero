#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');
const meow = require('meow');
const randomItem = require('random-item');
const opn = require('opn');
const feedback = require('@abranhe/feedback');

const cli = meow(`
	Usage

	  $ varadero

	Options

	  -f, --feedback  Send a feedback
	  -h, --help      Show help message and close
	  -v, --version   View package Version
`, {
	flags: {
		help: {
			type: 'boolean',
			alias: 'h'
		},
		version: {
			type: 'boolean',
			alias: 'v'
		},
		feedback: {
			type: 'boolean',
			alias: 'f'
		}
	}
});

const picsDir = path.join(__dirname, 'picts');
const pics = fs.readdirSync(picsDir).filter(x => !x.startsWith('.'));
let pic = randomItem(pics);

const lastPicPath = path.join(__dirname, '.last-pict');
if (fs.existsSync(lastPicPath) && fs.readFileSync(lastPicPath, 'utf8') === pic) {
	pic = randomItem(pics);
}
fs.writeFileSync(lastPicPath, pic);

opn(path.join(picsDir, pic), {wait: false}).catch(console.error);

if (cli.flags.feedback) {
	feedback.project('varadero');
	feedback.message(feedback.defaultMessage);
	feedback.web();
}
