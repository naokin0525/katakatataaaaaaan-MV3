/*
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

var configs;

function log(aMessage, ...aArgs)
{
	if (!configs || !configs.logging)
		return;

	console.log('katakatataaaaaaan-we: ' + aMessage, ...aArgs);
}

function debug(aMessage, ...aArgs)
{
	if (!configs || !configs.debug)
		return;

	log('[DEBUG] ' + aMessage, ...aArgs);
}

configs = new Configs({
	enterKeyTaaaaaaanMinSize  : 80,
	enterKeyTaaaaaaanMaxSize  : 100,
	normalKeyKataKataMinSize  : 10,
	normalKeyKataKataMaxSize  : 20,
	animateVerticalMove       : 40,
	animateHorizontalMove     : 40,
	logging                   : true,
	debug                     : false
});
