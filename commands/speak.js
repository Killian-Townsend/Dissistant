const Voice = require('@discordjs/voice')

module.exports = {
	name: 'speak',
	description: 'Speaks text in VC',
	async execute(app, message, args) {
		let user = message.member

		if(!user.voice.channel) {
			message.channel.send("You're not in VC");
			return; }

		let connection = Voice.joinVoiceChannel({
			channelId: user.voice.channel.id,
			guildId: message.guild.id,
			adapterCreator: message.guild.voiceAdapterCreator,
			selfDeak: false, });
		console.log('Connection Created');

		connection.on(Voice.VoiceConnectionStatus.Signalling, () => {
			console.log('Voice Signalling')});
		connection.on(Voice.VoiceConnectionStatus.Connecting, () => {
			console.log('Voice Connecting')});
		connection.on(Voice.VoiceConnectionStatus.Ready, () => {
			console.log('Voice Ready')});
		connection.on(Voice.VoiceConnectionStatus.Disconnected, () => {
			console.log('Voice Disconnected')});
		connection.on(Voice.VoiceConnectionStatus.Destroyed, () => {
			console.log('Voice Destroyed')});
		console.log('Setup event handlers')

		let player = Voice.createAudioPlayer({
			behaviors: {
				noSubscriber: Voice.NoSubscriberBehavior.Pause,},});
		console.log('created audio player')

		let resource = Voice.createAudioResource(await app.py.tts.save_audio(args.join(' ')));
		console.log('got audio resource')

		function exit(connection, player) {
			player.stop();
			connection.destroy(); }

		connection.subscribe(player);
		console.log('subscribed')
		player.play(resource);
		console.log('playing')

		player.on(Voice.AudioPlayerStatus.Idle, () => setTimeout( () => {
			console.log('stopping')
			app.py.tts.stop();
			exit(connection, player)}, 500));

	},
}

