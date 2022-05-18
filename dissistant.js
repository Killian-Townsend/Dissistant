const { log } = require('./lib/log.js');
log(' Start ', ' Starting')



///////////////////////////////////  Vars
const delimiter = "\n" // | *NIX - \n | Windows - \n\r | MacOS X - \n | MacOS 9< - \r |
const tmpdir = '/tmp';
let closing = false;
const app = {
	py: {},
	web: {},
	dis: {},
};
///////////////////////////////////



///////////////////////////////////  Error Handler
log(' Start ', 'Setting Up Error Handling')
process.on('uncaughtException', err => {
	console.error(err);
	process.exit(1); });
///////////////////////////////////



///////////////////////////////////  Utils
log(' Start ', 'Setting Up Utilities')
const nodemon = require('nodemon');
const fs = require('fs');
const path = require('path');
const colors = require('colors');
const ConfigParser = require("configparser")
app.config = new ConfigParser();
app.config.read('./config.ini');
if (app.config.get('Discord', 'token') === '0') {
  app.confing.set('Discord', 'token', process.env.token)}
const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
const pytalk = require('pytalk');
///////////////////////////////////



///////////////////////////////////  Web Panel
log(' Panel ', 'Setting up Web Panel')
//const AdminJS = require('adminjs');
//const AdminJSExpress = require('@adminjs/express');
//const express = require('express');
//app.web.app = express()
//app.web.adminjs = new AdminJS({
//	Databases: [],
//	rootPath: '/panel', });
//app.web.router = AdminJSExpress.buildRouter(app.web.adminjs);
//app.web.app.use(app.web.adminjs.options.rootPath, app.web.router);
//app.web.app.listen(parseInt(app.config.get('Panel', 'port')), () => {
//	log(' Panel ', `Web Panel Started on localhost:${app.config.get('Panel', 'port')}${app.web.adminjs.options.rootPath}`)});
///////////////////////////////////



///////////////////////////////////  Discord.JS
log('Discord', 'Starting Discord Client');
const Discord = require('discord.js');
app.dis = new Discord.Client({ intents: [
		'GUILDS',
		'GUILD_MEMBERS',
		'GUILD_MESSAGES',
		'GUILD_VOICE_STATES',
	], });
app.dis.vc = require('@discordjs/voice');
app.dis.commands = new Discord.Collection();
let commandFiles = fs.readdirSync('./commands')
	.filter(file => file.endsWith('.js'));
log('Discord', `Adding ${commandFiles.length} Commands`);
for (let file of commandFiles) {
	let command = require(`./commands/${file}`);
	app.dis.commands.set(command.name, command);
}
app.dis.once('ready', () => {
	log('Discord', 'Discord Client Started'); });
///////////////////////////////////



///////////////////////////////////  Start AI Engines
///////////////////////////  TTS
app.py.tts = {};
app.py.tts.worker = pytalk.worker(__dirname+'util/tts.py', {
	stdout: data => {log('  TTS  ', data)}});
app.py.tts.stop = app.py.tts.worker.methodSync('stop');
app.py.tts.save_audio = app.py.tts.worker.methodSync('save_audio');
/// STT
/// NLP
/// OpenCV / Face Recognition
///////////////////////////////////




///////////////////////////////////  Event Handlers
log('  App  ',  'Initializing Event Handlers')
process.stdin.on('keypress', (str, key) => {
	if(key.name === 'q') exit(0);
});
process.on('exit', (code) => { if(!closing) exit(code); });
process.on('SIGINT', () => { if(!closing) exit(0); });
///////////////////////////////////



///////////////////////////////////////////////  Ready



///////////////////////////////////  Discord Message
app.dis.on('messageCreate', (message) => {
	// Prefix
	let prefix = app.config.get('Discord', 'prefix');
	// Conditionals
	if(!message.content.startsWith(prefix)) return;
	//if(message.author.bot) return;
	if(message.channel.type === 'dm') return;
  let args = message.content.slice(prefix.length).trim().split(/ +/);
	let command = args.shift().toLowerCase();

	log(' Debug ', 'Args : '+args)
	log(' Debug ', 'Com  : '+command)
	log(' Debug ', 'User : '+ message.author.username+"#"+message.author.discriminator)
	log(' Debug ', 'MCon : '+message.content)
	log(' Debug ', 'Auth : '+JSON.stringify(message.member))
	log(' Debug ', 'UVC  : '+JSON.stringify(message.member.voice))
	if (!app.dis.commands.get(command)) {
		message.channel.send('Unknown Command');
		return; }
	try {    
		app.dis.commands.get(command).execute(app, message, args);
	} catch (err) {
		message.channel.send('Command Error');
		message.channel.send("\`\`\`\n"+err+'\n'+err.trace+"\n\`\`\`");
		console.error(err); }
});
///////////////////////////////////



///////////////////////////////////  Discord Login
app.dis.login(app.config.get("Discord", "token"))
	.then(() => { log('Discord', 'Discord Client Logged In'); });
///////////////////////////////////




///////////////////////////////////  Exit
function exit(code) {
	log(' Stop  ', 'Exiting')
	// // // Close Python Threads
	log(' Stop  ', 'Shutting Down Python Threads');
	// // TTS
	//log(' Stop  ', '	Stopping TTS');
	//tts.stop();
	log(' Stop  ', 'TTS Stopped, Closing Process');
	app.py.tts.worker.close();
	log(' Stop  ', 'TTS Closed');
	// // Close any File Handles

	// Flush tmp
	log(' Stop  ', 'Flushing ./tmp');
	fs.readdir('./tmp', (err, files) => {
		if (err) throw err;
		log(' Stop  ', `Removing ${files.length} file(s)`);
		for(let file of files) {
			fs.unlink(path.join('./tmp/', file), err => {
				if (err) throw err; });}});
	// // Done
	log(' Stop  ', 'Done');
	closing = true;
	process.exit(code);
}
///////////////////////////////////