# YT-DL-CLI
#### A quick and easy CLI to download the highest quality YouTube videos, from 4k, you can download ANY quality, or just the audio. <br> Tired of those sketchy and slow youtube downloading websites? well, i have the solution, Have your own, at the click of a mouse you can install any youtube video you want, fast, easy, and simple.

# ONLY WINDOWS OS IS SUPPORTED AS OF RIGHT NOW
There are plans to add suport for Linux operating systems in the near future, so stay tuned!

## Getting Started (Windows)
To download this please install the latest LTS of Node.js by going to https://nodejs.org/en/
### Open any command prompt and insert the following,
 ```npm i node-yt-dl-cli -g```
### After its finished
Insert ```yt``` into the console, and press enter, you now have YT-DL-CLI installed! Read below for some basic examples and instructions/information!






# Basic Functions (3.6.5-latest)

  --help       ----------     Show help                                          [boolean]<br>
  --version     ----------    Show version number                                [boolean]<br>
  --update      ----------    Check for an update from the API, if there is one, install
                    it.                                                [boolean]<br>
  --forceupdate  ----------   Force an update, even if its the same version.     [boolean]<br>
  --branch     ----------     choose the branch of YT-DL-CLI to use               [string]<br>
  --branches   ----------     A list of the available the branches of YT-DL-CLI to use
                                                                       [boolean]<br>
  --audio    ----------       Audio only                                         [boolean]<br>
  --open      ----------      Open audio/video when done                         [boolean]<br>
  --openfolder  ----------    Open audio/video folder when done (DEFAULT: TRUE)  [boolean]<br>
  --url      ----------       Youtube video URL                                   [string]<br>
  <br>
  <br>
  ### Audio only eample, ```yt --audio --url https://www.youtube.com/watch?v=7XVcbDGioFA```
  ### Video & audio example, ```yt --url https://www.youtube.com/watch?v=7XVcbDGioFA```
  
  # Beta Functions (4.3.3-beta)

Options:<br>
  --help       ----------     Show help                                          [boolean]<br>
  --version    ----------     Show version number                                [boolean]<br>
  --update     ----------     Check for an update from the API, if there is one, install
                    it.                                                [boolean]<br>
  --forceupdate  ----------   Force an update, even if its the same version.     [boolean]<br>
  --about           About the CLI                                      [boolean]<br>
  --addcommand   ----------   Add a command for yt-dl-cli (DEFAULT: 'yt')         [string]<br>
  --remcommand   ----------   Remove a command for yt-dl-cli                      [string]<br>
  --commands      ----------  Shows all start commands                           [boolean]<br>
  --videostats   ----------   Shows available statistics of a YouTube video via URL.
                                                                        [string]<br>
  --thumbnail    ----------   Gets a youtube videos thumbnail                     [string]<br>
  --refreshmodules ---------- Refresh the NPM Modules if theres any errors.       [string]<br>
  --branch       ----------   choose the branch of YT-DL-CLI to use               [string]<br>
  --branches    ----------    A list of the available the branches of YT-DL-CLI to use
                                                                       [boolean]<br>
  --audio      ----------     Audio only                                         [boolean]<br>
  --open       ----------     Open audio/video when done                         [boolean]<br>
  --openfolder   ----------   Open audio/video folder when done (DEFAULT: TRUE)  [boolean]<br>
  --url       ----------      Youtube video URL                                   [string]<br>
  <br>
  <br>
  ## To switch to the beta branch of the CLI, use ```yt --branch beta_branch```
