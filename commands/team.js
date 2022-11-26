const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('team')
		.setDescription('input an NHL team to view its league stats')
		.addStringOption(option =>
            option.setName('team')
            .setDescription('ex: vancouver'))	
};