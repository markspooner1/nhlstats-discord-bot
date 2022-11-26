const { Events, InteractionResponse, HTTPError } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
const https = require('https');
const fs = require('fs');
let rawdata = fs.readFileSync('events/teamsList.json');
let team = JSON.parse(rawdata);


module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		const command = interaction.client.commands.get(interaction.commandName);
		if(command.data.name === "team"){
			https.get(`https://statsapi.web.nhl.com/api/v1/teams/${team[interaction.options.getString('team')]}/stats`, (resp) => {
  			let data = '';
			resp.on('data', (chunk) => {
				data += chunk;
			});
			resp.on('end', () => {
				const standings = JSON.parse(data).stats[1].splits[0].stat.wins;
				const record = `${JSON.parse(data).stats[0].splits[0].stat.wins}-${JSON.parse(data).stats[0].splits[0].stat.losses}-${JSON.parse(data).stats[0].splits[0].stat.ot}`
				interaction.reply(`
				League Standings: ${standings}\nRecord: ${record}`
				);
			});
			}).on("error", (err) => {
			console.log("Error: " + err.message);
			});
		}else if(command.data.name === "roster"){
			console.log(`https://statsapi.web.nhl.com/api/v1/teams/${team[interaction.options.getString('roster')]}?expand=team.roster`);
			https.get(`https://statsapi.web.nhl.com/api/v1/teams/${team[interaction.options.getString('roster')]}?expand=team.roster`, (resp) => {
  			let data = '';
			resp.on('data', (chunk) => {
				data += chunk;
			});
			resp.on('end', () => {
				const theroster = JSON.parse(data).teams[0].roster.roster;
				let processRoster = "Full Roster\n";
				theroster
				theroster.sort((a,b) => (a.jerseyNumber> b.jerseyNumber) ? 1 : ((b.jerseyNumber > a.jerseyNumber) ? -1 : 0))
				theroster.forEach(element => {
					processRoster += `${element.person.fullName} - #${element.jerseyNumber} - ${element.position.name}\n`;
				});
				interaction.reply(processRoster);
			});
			}).on("error", (err) => {
				console.log("Error: " + err.message);
			});
		}
	}
};