# Dissistant
# The Discord Assistant

__version__ = '0.0.1-DEV'
__licence__ = 'MIT'
__author__ = __maintainer__ = 'KP9982'
__email__ = 'oasisscript87@gmail.commands'
__release__ = False

if not __release__:
	import os
	import subprocess

	try:
		__version__ = subprocess.check_output(
			[ 'git', 'describe', '--abbrev=7' ],
			cwd=os.path.dirname(os.path.abspath(__file__)),
			stderr=subprocess.DEVNULL,
			universal_newlines=True,
		).strip().lstrip('v').replace('-', '+', 1).replace('-', '.')

	except (OSError, subprocess.CalledProcessError):
		pass
