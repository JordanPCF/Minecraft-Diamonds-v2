# Minecraft-Diamonds-v2

- [Minecraft-Diamonds-v2](#minecraft-diamonds-v2)
  * [Motivation](#motivation)
  * [The App](#the-app)
      - [Use](#use)
      - [Gif of Functionality](#gif-of-functionality)
      - [Map View](#map-view)
      - [User Data Collection](#user-data-collection)
      - [Data Dashboard](#data-dashboard)
  

## Motivation

[![og](https://github.com/JordanPCF/Minecraft-Diamonds-v2/blob/main/assets/og_video_screenshot.png)](https://www.youtube.com/watch?v=5Icj5TNmBUI&t=160s&ab_channel=MatthewBolan)

In his YouTube video, Matthew Bolan explains how the limitations of Java's random number generator can be exploited to better find diamonds, a coveted resource in Minecraft. He walks through how each world is generated, and the accidental correlation in Minecraft's code between certain features' representation in bits. __The result--in certain biomes, deep below clay and gravel patches, there are diamond blocks that are consistently N number of blocks over, in the z-direction, from the center of these patches. All one needs to do is determine that number N for one's specific world for different biomes and patch types.__ 

Bolan warns that this likely only works for Minecraft Java (only playable on PCs) and not Bedrock (playable on xbox, my console of choice). In the Java version, Bolan finds that most world seeds have a magic offset value of 6 for clay patches in swamps for instance, i.e. when you find a clay patch in a swamp, move +6 blocks in the z-direction from the center of the patch, and you will find diamonds directly beneath you. This is unlikely to be replicated in Bedrock worlds. __But because the Bedrock RNG is even 'worse' (only 32 vs 48 bits of state), I decided it was worth creating and exploring a dataset of the diamonds in my world to hopefully sleuth out the corresponding diamond-finding pattern in the Bedrock edition of Minecraft.__ 



## The App

#### Use
To determine the pattern for the Bedrock version:

1. (In Minecraft) Strip-mine for diamonds below swamps and riverbeds
2. Note the coordinates of the diamond blocks.
3. Return above ground and take note of clay or gravel patches within the same 'rendering chunk' (use [this file](https://github.com/JordanPCF/Minecraft-Diamonds-v2/blob/main/tests/chunkBoundaries.py) to calculate the borders of the chunk and see section [User Data Collection](#user-data-collection) for an explanation of these chunks).
4. With this app, record:
    - Coordinates of diamond blocks
    - Coordinates of the patch centers
    - Patch type (clay or gravel)
    - Biome (swamp or river)
    - Patch area
    - If the patch was cut off by another landscape feature
    - If the patch spans a border between two 16x16 rendering chunks
5. Check out the data dashboard as you accumulate data to look at the distribution, per biome/patch case, of the number of blocks in the z-direction you should travel from the center of a patch to find diamonds. 


#### Gif of Functionality
![Screenrecording](https://github.com/JordanPCF/Minecraft-Diamonds-v2/blob/main/assets/site_screencap.gif "App Functionality")

#### Map View 

Select your coordinate location on the map to record your mining data and track where you have searched for diamonds.
![map](https://github.com/JordanPCF/Minecraft-Diamonds-v2/blob/main/assets/map_screenshot2.png)

#### User Data Collection

Users add items to the Amazon DynamoDB database by drawing diamond blocks on this interactive 3D map. Minecraft worlds are rendered in 16 x 16 vertical 'chunks'. The borders of these chunks are relevant to the spawning of correlated features such as clay/gravel patches and diamond ore. The 32 x 32 3-D grid on this page represents four such chunks.

Users add diamond blocks at the x-z coordinates of known diamond ore and select the blocks to highlight them and enter data about their corresponding features.
![drawing](https://github.com/JordanPCF/Minecraft-Diamonds-v2/blob/main/assets/drawing_blocks2.png)
![world](https://github.com/JordanPCF/Minecraft-Diamonds-v2/blob/main/assets/3d_user_data_entry_screenshot.png)

#### Data Dashboard
Based on the biome the user is currently exploring, they can predict how far from a gravel or clay patch's center diamonds are likely to be found. The depth of the diamond ore is believed to be related to the area of the above-ground patch and informs the user on how deep to mine. Clay and gravel patches are often cut off by other land features or near the edge of a rendering chunk's border. It is unclear if the correlation pattern will apply in these cases, so they are all displayed separately here. 
![dashboard](https://github.com/JordanPCF/Minecraft-Diamonds-v2/blob/main/assets/data_dashboard_screenshot.png)

