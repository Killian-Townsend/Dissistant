const { log } = require('./js/log.js');
log('Starting')
// Vars
const delimiter = "\n" // | *NIX - \n | Windows - \n\r | MacOS X - \n | MacOS 9< - \r |

// Error Handler
log('Setting Up Error Handling')
process.on('uncaughtException', err => {
	console.error(err);
	process.exit(1);
})


// Utils
log('Setting Up Utilities')
const nodemon = require('nodemon');
const fs = require('fs');
const colors = require('colors');
const ConfigParser = require("configparser")
const config = new ConfigParser();
config.read('./config.ini');
const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
const pytalk = require('pytalk');


// Discord.JS
log('Starting Discord Client');
const { Client, Intents } = require('discord.js');
const Voice = require('@discordjs/voice');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.once('ready', () => {
	log('Discord Client Started'); });

//////////// Start AI Engines
/// TTS
const tts = {};
tts.worker = pytalk.worker(__dirname+'/py/tts.py', {
	stdout: data => {log(`TTS : ${data}`)}});
tts.stop = tts.worker.methodSync('stop');
tts.save_audio = tts.worker.methodSync('save_audio');
tts.test = tts.worker.methodSync('test');
/// STT
//const stt = new PythonShell('./py/stt.py'); d
//stt.on('message', function(message) { log(message); });
/// NLP
/// OpenCV / Face Recognition

// Event Handlers
log('Initializing Event Handlers')
process.stdin.on('keypress', (str, key) => {
	if(key.name === 'q') exit(0);
});


// Exit
function exit(code) {
	log('Exiting')
	// // Close Python Threads
	log('Shutting Down Python Threads');
	// TTS
	log('Stopping TTS');
	tts.stop()
	log('TTS Stopped, Closing Process');
	tts.worker.unrefAll();
	tts.worker.close();
	log('TTS Closed');
	// // Close any File Handles

	// // Done
	log('Done');
	nodemon.emit('quit');
	process.exit(code);
}
process.on('exit', (code) => { exit(code); });
process.on('SIGINT', () => { exit(0); });


// Ready



//





// Discord Login
client.login(config.get("Discord", "token"))
	.then(() => { log('Discord Client Logged In'); });
