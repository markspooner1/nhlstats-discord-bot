const { Events } = require('discord.js');

module.exports = {
    //which event this file is for
	name: Events.ClientReady,
    //only run once
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};