# Dissistant
<br>


---
### About
Dissistant is a Discord assistant.
It can
- [ ]  Take voice commands in VC, and speak back
- [ ]  Recognize peoples faces in videos/images
- [ ]  Recognize objects in videos/images
- [ ]  Play music in VC
- [ ]  Moderate the server
- [ ]  Hold simple conversation
- [ ]  Answer questions
- [ ]  Save reminders for you
- [ ]  Alert you of Reddit, YouTube, Twitter, and Twitch posts
- [ ]  Play simple games
- [ ]  And more!
<br>


---
### How Does it Work?
Node is used for the front end with Discord.JS being the Discord library. An updated PyTalk Node module is used to start and interface with Python threads. All AI is running in Python. 
<br>


---
### Todo
- [ ] Docker Support
<br>


---
### Requirements
- Node.JS ^17.9.0
- Python 3.7
	- PyTorch does not work on Python 3.9 currently, and all other libraries support Python 3.7
- ~5GB of space for TensorFlow, PyTorch, AI models, etc
- 4 threads, 8GB RAM, and a nVidia GPU is recommended, 3GB of VRAM
	- nVidia GPU's with CUDA are currently the best for AI
	- 2GB of VRAM is the minimum, but even then, 800p images are pushing the limits
<br>


---
### Packages
pip
- PyTorch
	- Install with the instructions on the [PyTorch website](https://pytorch.org/get-started/locally/)
	- For NVIDIA, use CUDA 11.3, or 10.2 for GTX700 or older | [CUDA Support](https://developer.nvidia.com/cuda-gpus)
	- For AMD, [if your GPU supports it](https://community.amd.com/t5/knowledge-base/amd-rocm-hardware-and-software-support-document/ta-p/489937) try using ROCm, otherwise, use CPU 
	- Otherwise, use CPU
- OpenCV
- DLib
- Face Recognition
- Custom PyTalk `https://github.com/Killian-Townsend/pytalk`

npm
- All packages are included in `package.json`
- Just run `npm install`
<br>


---
### Setup 

<br>
---
### OS Support
Linux, specifically Debian-based distros<br>
For Windows, use WSL2 or something
Mac, wait until Docker idk
<br>


---
### Potential Issues
HTTP Server Cannot Start
- Change the port in `index.js` at line `15`

CUDA Out of Memory Error
- You don't have enough VRAM to process the image/video
	- Try turning down the scaling resolution, it's currently too high
	- 800p is about the max for 2GB, 1000 for 3GB, but your mileage may vary