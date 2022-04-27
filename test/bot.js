const Discord = require('discord.js')
const token = "OTYzODUxNTU3NDg3NjQ4ODI4.YlcGtg.R9fEOPvJ4T0aibniqgu8YJWER8s"
const client = new Discord.Client({
	intents: ["GUILDS"], })

client.once('ready', () => {
	console.log('Client ready') })

client.on('message', (message) => {
	console.log(message.author.name)
	console.log(message.content) })

client.login(token)
	.then(console.log('Client logged in'))
