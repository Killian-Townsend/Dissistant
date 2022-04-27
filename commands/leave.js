module.exports = {
	name: 'leave',
	description: 'leave vc',
	execute(app, message, args) {

		let user = message.member

		let connection = app.dis.vc.getVoiceConnection(message.guild.id);

		if(!connection) {
			message.channel.send("I'm not in VC");
			return; }

		connection.destroy();

		return;

	},
};
