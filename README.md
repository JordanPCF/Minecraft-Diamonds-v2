# Minecraft-Diamonds-v2

## The App
![Screenrecording](https://github.com/JordanPCF/Minecraft-Diamonds-v2/blob/main/assets/site_screencap.gif "App Functionality")

## Motivation
[![og](https://github.com/JordanPCF/Minecraft-Diamonds-v2/blob/main/assets/og_video_screenshot.png)](https://www.youtube.com/watch?v=5Icj5TNmBUI&t=160s&ab_channel=MatthewBolan)

In his YouTube video, Matthew Bolan explains how the limitations of Java's random number generator can be exploited to better find diamonds, a coveted resource in Minecraft. He walks through how each world is generated, and the correlation between certain feature's representation in bits. The result--by venturing to certain biomes and locating the center of clay and gravel patches above ground, one can calculate the 'offset' in the x and z direction to travel before mining straight down to diamonds. 

Bolan warns that this likely only works for the PC version of the game and not Bedrock (for xbox which I play). But because the Bedrock RNG is even worse (only 32 vs 48 bits of state), I decided it was worth creating and exploring a dataset of the diamonds in my world. 
