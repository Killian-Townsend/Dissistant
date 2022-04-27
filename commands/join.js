const { VoiceChannel, StageChannel, Collection, Snowflake } = require('discord.js')
const Voice = require('@discordjs/voice')

module.exports = {
	name: 'join',
	description: 'join vc',
	async execute(app, message, args) {

		let { voice } = message.member;

		if(!voice.channel) {
			message.reply("You're not in VC");
			return; }

		let connection = Voice.joinVoiceChannel({
			channelId: voice.channel.id,
			guildId: message.guild.id,
			adapterCreator: message.guild.voiceAdapterCreator,
			selfDeaf: false, });

		connection.on(Voice.VoiceConnectionStatus.Signalling, () => {
			console.log('Voice Signalling') })
		connection.on(Voice.VoiceConnectionStatus.Connecting, () => {
			console.log('Voice Connecting') })
		connection.on(Voice.VoiceConnectionStatus.Ready, () => {
			console.log('Voice Ready') })
		connection.on(Voice.VoiceConnectionStatus.Disconnected, () => {
			console.log('Voice Disconnected') })

		message.reply('Success');
		return;

	},
};
