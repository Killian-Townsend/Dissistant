import torch
import librosa
import numpy as np
import soundfile as sf
from scipy.io import wavfile
from transformers import Wav2Vec2ForCTC, Wav2Vec2Tokenizer
import configparser as cfgp
import dissistant.util.cfg_util as cfg_util
import dissistant.util.logger as logger

# Config
config = cfg_util.getConfig()['stt']

# Objects
tokenizer = None
model = None

# Var


# Init
def init():
	tokenizer = Wav2Vec2Tokenizer.from_pretrained(config['model'])
	model = Wav2Vec2ForCTC.from_pretrained(config['model'])
