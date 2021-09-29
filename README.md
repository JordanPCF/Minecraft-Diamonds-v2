# Minecraft-Diamonds-v2

## The App
#### Gif of Functionality
![Screenrecording](https://github.com/JordanPCF/Minecraft-Diamonds-v2/blob/main/assets/site_screencap.gif "App Functionality")

#### Map View: 

Select your coordinate location on the map to record your mining data and track where you have searched for diamonds.
![map](https://github.com/JordanPCF/Minecraft-Diamonds-v2/blob/main/assets/map_screenshot.png)

#### User Data Collection

Interactive 3D map to record diamond locations (and the corresponding above-ground features) and update the Amazon DynamoDB database. Minecraft worlds are rendered in 16 x 16 vertical 'chunks'. The borders of these chunks are relevant to the spawning of correlated features such as clay/gravel patches and diamond ore. 4 such chunks are shown here.
![world](https://github.com/JordanPCF/Minecraft-Diamonds-v2/blob/main/assets/3d_user_data_entry_screenshot.png)

#### Data Dashboard
Based on the biome the user is currently exploring, they can predict how far from a gravel or clay patch's center diamonds are likely to be found. The depth of the diamond ore is believed to be related to the area of the above-ground patch and informs the user on how deep to mine. Clay and gravel patches are often cut off by other land features or near the edge of a rendering chunk's border. It is unclear if the correlation pattern will apply in these cases, so they are all displayed separately here. 
![dashboard](https://github.com/JordanPCF/Minecraft-Diamonds-v2/blob/main/assets/data_dashboard_screenshot.png)

## Motivation

[![og](https://github.com/JordanPCF/Minecraft-Diamonds-v2/blob/main/assets/og_video_screenshot.png)](https://www.youtube.com/watch?v=5Icj5TNmBUI&t=160s&ab_channel=MatthewBolan)

In his YouTube video, Matthew Bolan explains how the limitations of Java's random number generator can be exploited to better find diamonds, a coveted resource in Minecraft. He walks through how each world is generated, and the correlation between certain feature's representation in bits. The result--by venturing to certain biomes and locating the center of clay and gravel patches above ground, one can calculate the 'offset' in the x and z direction to travel before mining straight down to diamonds. 

Bolan warns that this likely only works for the PC version of the game and not Bedrock (for xbox which I play). But because the Bedrock RNG is even worse (only 32 vs 48 bits of state), I decided it was worth creating and exploring a dataset of the diamonds in my world. 
