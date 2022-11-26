const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roster')
		.setDescription('input an NHL team to view its roster')
		.addStringOption(option =>
            option.setName('roster')
            .setDescription('ex: vancouver'))	
};