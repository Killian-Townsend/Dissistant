import configparser as cfgp
from os.path import exists

def getConfig():
	config = cfgp.ConfigParser()
	if not exists('../../config.ini'):
		# Write new config
		config['TTS'] = { 'rate': '120',
						  'volume': '1.0',
						  'voice': '0' }
		config['STT'] = { 'model': 'facebook/wav2vec2-base-960h' }
		config['Discord'] = { 'owner_id': '0',
							  'token': '0' }
		with open('../../config.ini', 'w') as configfile:
			config.write(configfile)

	# Load Config
	config = None
	config = cfgp.ConfigParser()
	config = config.read('../config.ini')
	# Return
	return config

