const {
	AudioPlayer,
	AudioPlayerError,
	AudioPlayerStatus,
	AudioResource,
	createAudioPlayer,
	createAudioResource,
	entersState,
	StreamType,
	VoiceConnection,
	VoiceConnectionStatus,
	VoiceConnectionDisconnectReason,
} = require("@discordjs/voice")
const { StageChannel, VoiceChannel, } =require("discord.js")
const { Duplex, Readable, } = require("stream")

// Constructor
class StreamDispatcher {

	constructor(connection, channel, connectionTimeout=15000)
}

// Export
module.exports = { StreamDispatcher };
