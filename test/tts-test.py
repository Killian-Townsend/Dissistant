import pyttsx3

engine = pyttsx3.init()

voices = [ "default", "english", "english-north", "english-us" ]

for voice in voices:
	print(f"doing voice {voice}")
	engine.setProperty('voice', voice)
	engine.save_to_file(f"Hello. Hi! My voice is {voice}!", f"/tmp/audio-{voice}.mp3")
	engine.runAndWait()
