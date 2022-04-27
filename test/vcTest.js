const token = 'OTYzODUxNTU3NDg3NjQ4ODI4.YlcGtg.R9fEOPvJ4T0aibniqgu8YJWER8s'
const Discord = require('discord.js')
const { joinVoiceChannel } = require('@discordjs/voice')

const client = new Discord.Client({
	intents: ['GUILDS', 'GUILD_VOICE_STATES', 'GUILD_MESSAGES']})

client.once('ready', () => {
	console.log('Ready') })

client.on('messageCreate', (message) => {
	console.log(message.member.voice.channel.id)
	if(!message.content === '?join') return
	try {
		let uvc = message.member.voice
		let connection = joinVoiceChannel({
			channelId: uvc.channel.id,
			guildId: message.guild.id,
			adapterCreator: message.guild.voiceAdapterCreator, })
	} catch (err) {
		message.reply(
			'Error\
			n'+
			'```'+
			err+
			'\n```')
		console.error(err)
	}
})
client.login(token)
	.then(console.log('Logged in'))
