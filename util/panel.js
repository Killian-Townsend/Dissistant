const { log } = require('../lib/log.js');
const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const express = require('express');
const ConfigParser = require('configparser');
const config = new ConfigParser();
config.read('../config.ini');
const app = express();
const adminjs = new AdminJS({
	databases: [],
	rootPath: '/panel', });
const router = AdminJSExpress.buildRouter(adminjs);
log('[Panel] : Starting Express Server');
app.use();
app.listen(parserInt(config.get('Panel', 'port')), () => {
	log(`[Panel] : Express Server Started at localhost:${config.get('Panel', 'port')}${adminjs.options.rootPath}`)});


module.exports = {};

