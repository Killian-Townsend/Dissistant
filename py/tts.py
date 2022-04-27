import os
import sys
import pyttsx3
import configparser

from time import sleep

# Config
config = configparser.ConfigParser()
config.read('../config.ini')


print('Initializing TTS Engine')


""" Engine """
engine = pyttsx3.init()
""" Rate """
engine.setProperty('rate', config['TTS']['rate'])
rate = engine.getProperty('rate')
""" Volume """
engine.setProperty('volume', config['TTS']['volume'])
volume = engine.getProperty('volume')
""" Voice """
voices = engine.getProperty('voices')
engine.setProperty('voice', voices[int(config['TTS']['voice'])].id)
voice = voices[int(config['TTS']['voice'])].id

print('TTS Engine Initialized')


@pytalk_method('stop')
def stop():
    print('Halting All Tasks')
    engine.stop()


@pytalk_method('save_audio')
def save_audio(text):
    engine.save_to_file(text, '/tmp/tts.mp3')
    print('Audio Saved')
    engine.runAndWait()
    return '/tmp/tts.mp3'
