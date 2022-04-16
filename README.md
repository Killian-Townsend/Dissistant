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

npm
- All packages are included in `package.json`
- Just run `npm install`

<br>
---
### Setup 

<br>
---
### OS Specifics
Dissistant was written with Ubuntu 20.04 in mind
Non Debian-based distros may need slight tweaking 
Most things should work correctly on Mac OS X since OSX is very similar architecturally 
Windows is uncertain

Windows 
- Change delimiter in `index.js` to `\r\n`
- Changing some file paths may be needed

MacOS 9 and Older
- Change delimiter in `index.js` to `\r` 


<br>
---
### Potential Issues
HTTP Server Cannot Start
- Change the port in `index.js` at line `15`

CUDA Out of Memory Error
- You don't have enough VRAM to process the image/video
	- Try turning down the scaling resolution, it's currently too high
	- 800p is about the max for 2GB, 1000 for 3GB, but your mileage may vary
