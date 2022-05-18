import torch
import librosa
import numpy as np
import soundfile as sf
from scipy.io import wavfile
from transformers import *
import configparser as cfgp
import util.cfg_util as cfg_util

# Config
config = cfg_util.getConfig()['STT']

# Objects
tokenizer = None
model = None

# Var


# Init
processor = Wav2Vec2Processor.from_pretrained(config['model'])
tokenizer = Wav2Vec2Tokenizer.from_pretrained(config['model'])
model = Wav2Vec2ForCTC.from_pretrained(config['model'])