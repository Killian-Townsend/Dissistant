from datetime import datetime


def timestamp():
	now = datetime.now()
	h  = (f"0{now.hour}")[1:3]
	m  = (f"0{now.minute}")[1:3]
	s  = (f"0{now.second}")[1:3]
	ms = (f"0{round(now.microsecond/1000)}")[1:3]
	return f"{h}:{m}:{s}:{ms}"

def log(inp):
	ts = timestamp()
	print(f"[{ts}]   {inp}")
	return
