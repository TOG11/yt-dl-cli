#!/usr/bin/env node
const BETA_PROGRAMME = true;
const {version} = require('./package.json');

const fs = require('fs')
var home = require("os").homedir();
var Videos = home + '/Videos';
var Documents = home + "/Documents";
const http = require('http');
const childProcess = require('child_process');
if (!moduleAvailable("ansi-colors"))
childProcess.exec("npm i ansi-colors -g");
const colors = require('ansi-colors');
function moduleAvailable(name) {
  try {
      require.resolve(name);
      return true;
  } catch(e){}
  return false;
}

//CLI
var ytdlVer = JSON.parse(fs.readFileSync("./package.json")).dependencies["ytdl-core"];
if(!JSON.stringify(ytdlVer).includes("^4.11.2")) {
childProcess.exec("cd "+__dirname+" & npm i ytdl-core@4.11.2");
console.log(colors.greenBright("\n[TYTD] Installed YTDL-Core@4.11.2 for "+version))
}
if (fs.existsSync('./new.update')) {
  var info = JSON.parse(fs.readFileSync('./new.update'))
  console.log(colors.yellowBright("[TYTD@HandOver] Thank you for updating! New version: "+info.version+" Old version: "+info.old+"\n"+info.version+" Released on: "+info.latestedReleaseDate+" Updated via the Pathos 4 API\n\n"))
  fs.unlinkSync('./new.update');
  fs.unlinkSync('./TYTD_TEMP_UPDATE_SCRIPT.js');
}

if (!fs.existsSync(Videos+"/TYTD")) {
console.log("YT-DL-CLI, AKA TYTD (TOGi'S YOUTUBE DOWNLOADER(-CLI))\nMAINTAINED BY AIDEN C. DESJARLAIS ON NPM AND GITHUB\n\nTHANK YOU FOR INSTALLING!!! Version "+version)
console.log("\n\nPlease wait as we Initialize the Directory & Dependency Automatic Setup...")
fs.mkdirSync(Videos+"/TYTD");
}

if (!fs.existsSync(Documents+"/TYTD")) 
fs.mkdirSync(Documents+"/TYTD");

if (!fs.existsSync(Documents+"/TYTD/MP3")) 
fs.mkdirSync(Documents+"/TYTD/MP3");

if (!fs.existsSync(Documents+"/TYTD/MP4")) 
fs.mkdirSync(Documents+"/TYTD/MP4");

if (!moduleAvailable("open"))
InstallModules();
else
YT_DL_CLI()

function InstallModules() {
  childProcess.exec("cd "+__dirname+" & npm i open & npm i ytdl-getinfo & npm i request & npm i ytdl-core & npm i ansi-colors & npm i cli-progress & npm i uuid & npm i yargs & npm i extract-zip")
}

//dependencys
function YT_DL_CLI() {
  const extract = require('extract-zip')
const yargs = require("yargs");
const { getInfo } = require('ytdl-getinfo')
const cliProgress = require('cli-progress');
const request = require('request');
const ytdl = require('ytdl-core');
const { v4: uuidv4 } = require('uuid');
var fileIdentifier = uuidv4();
const open = require('open');
  console.log(colors.yellow("[TYTD@pathos4_beta] WARNING: YOU ARE ON THE 4.8.9-pathos4_beta BRANCH, THIS BRANCH IS STILL BEING UPDATED DAILY!\n\nPLEASE MAKE SURE TO UPDATE THE BRANCH DAILY BY USING 'yt --branch pathos4_beta' !!!!!!"))

const options = yargs
 .usage(colors.blueBright("\n[TYTD]\n\nUsage: (--audio) (--openfolder) (--open) (--update) --url <video url> --videostats <video url>"))
 .option("update", { describe: "Check for an update from the API, if there is one, install it.", type: "boolean", demandOption: false })
 .option("forceupdate", { describe: "Force an update, even if its the same version.", type: "boolean", demandOption: false })
 .option("about", { describe: "About the CLI", type: "boolean", demandOption: false })
 .option("addcommand", { describe: "Add a command for yt-dl-cli (DEFAULT: 'yt')", type: "string", demandOption: false })
 .option("remcommand", { describe: "Remove a command for yt-dl-cli", type: "string", demandOption: false })
 .option("commands", { describe: "Shows all start commands", type: "boolean", demandOption: false })
 .option("videostats", { describe: "Shows available statistics of a YouTube video via URL.", type: "string", demandOption: false })
 .option("thumbnail", { describe: "Gets a youtube videos thumbnail", type: "string", demandOption: false })
 .option("refreshmodules", { describe: "Refresh the NPM Modules if theres any errors.", type: "boolean", demandOption: false })
 .option("status", { describe: "Get the Pathos 4 API status", type: "boolean", demandOption: false })
 .option("branch", { describe: "choose the branch of YT-DL-CLI to use", type: "string", demandOption: false })
 .option("branches", { describe: "A list of the available the branches of YT-DL-CLI to use", type: "boolean", demandOption: false })
 .option("audio", { describe: "Audio only", type: "boolean", demandOption: false })
 .option("open", { describe: "Open audio/video when done", type: "boolean", demandOption: false })
 .option("openfolder", { describe: "Open audio/video folder when done (DEFAULT: TRUE)", type: "boolean", demandOption: false })
 .option("url", { describe: "Youtube video URL", type: "string", demandOption: false })
 .argv;

 console.log(colors.italic(colors.cyan("\n[TYTD] Validating ffmpeg installation...")))
 
if (fs.existsSync("./ffmpeg.zip") && !fs.existsSync(__dirname+"/ffmpeg.exe")) {
  console.log(colors.redBright("\n\n[TYTD] ffmpeg did not properly install on last run, attmepting to fix it..."))
  async function main() {
    try {
      await extract("./ffmpeg.zip", { dir: __dirname })
      console.log(colors.greenBright("\n\n[TYTD] ffmpeg installed, continuing process."))
      RUN();
    } catch (err) {
      console.log(colors.redBright("\n\n[TYTD] ffmpeg install error, please manually install by going to https://github.com/GyanD/codexffmpeg/releases and going to latest, follow a guide if you want to. ERROR: "+err))
      return;
    }
  }
  main();
} else
 if (!fs.existsSync(__dirname+"/ffmpeg.exe")) {
  console.log(colors.redBright("\n[TYTD] ffmpeg installation not found,\n attempting to automatically install it via http://24.77.93.173:5667/PATHOS/4/packages/ffmpeg/latest-download...\n"+colors.green("(This may take awhile.)")))


  
  const file = fs.createWriteStream("./ffmpeg.zip");
  http.get("http://24.77.93.173:5667/PATHOS/4/packages/ffmpeg/latest-download", function(response) {
     response.pipe(file);
  
     // after download completes close filestream
     file.on("finish", () => {
         file.close();
         console.log(colors.green("\n[TYTD] ffmpeg installation completed, Extracting ffmpeg.exe from ffmpeg.zip ..."))

         async function main() {
          try {
            await extract("./ffmpeg.zip", { dir: __dirname })
            console.log(colors.greenBright("\n[TYTD] ffmpeg installed, continuing process."))
            RUN();
          } catch (err) {
            console.log(colors.redBright("\n\n\n[TYTD] ffmpeg install error, please manually install by going to https://github.com/GyanD/codexffmpeg/releases and going to latest, then put the exe in bin in the dir of this index. follow a guide if you want to. "+err))
            return;
          }
        }
        main();

     });
  }).on('error', function(e) {
    console.error(e);
  });






 } else
 RUN()


function FetchPathos4Status() {
  request('http://24.77.93.173:5667/PATHOS/4/info', { json: true }, (err, body) => {
    if (err) {
      console.log(err);
      return;
    }
      console.log(colors.green("\n[Pathos4@"+body.body.server_name+"]\nBackend is operating on status "+body.body.status+" with warning "+body.body.warning+"\nDetailed Status: "+body.body.status_detailed+"\nServer specs "+body.body.specs+"\nOperator: "+body.body.operator+"\nAlpha Drive Status: "+body.body.storage.alpha+"\nGamma Drive Status: "+body.body.storage.gamma+"\nDelta Drive Status: "+body.body.storage.delta+"\nServer Location: "+body.body.location));
});
}


//start
function RUN() {
 if (options.status) {
  FetchPathos4Status()
} else if (options.branch) {
    let latestBranchDone;
    let updaterDone;
    let isBranchAvailable;
    request('http://24.77.93.173:5667/PATHOS/4/branches', { json: true }, (err, body) => {
      if (err) {
        console.log(err);
        return;
      }
      if(body.body.public_branches[options.branch]) {
      isBranchAvailable = true
      SwitchBranch();
      }
      else {
        console.log(colors.yellow("\n[TYTD] Selected branch '"+options.branch+"' is not available/existant, [Received]: "+JSON.stringify(body.body)));
      }
  });
  function SwitchBranch() {
  if (isBranchAvailable) {
    request('http://24.77.93.173:5667/PATHOS/4/versions-info', { json: true }, (err, body) => {
      if (err) { return console.log(err); }
              console.log(colors.greenBright("\n[TYTD] Selected Branch ("+options.branch+") is Available, Updating to "+body.body[options.branch]+"...\n"+colors.cyanBright("(This can take awhile.)")));
  
            var latestCLI = fs.createWriteStream(__dirname+"/yt-dl-cli_"+body.body[options.branch]+"-temp.js");
  
            http.get("http://24.77.93.173:5667/PATHOS/4/branches/getindex?v="+options.branch, function(response) {
              response.pipe(latestCLI);
  
              latestCLI.on("finish", () => { 
                latestBranchDone = true;
                if(!updaterDone)
                console.log(colors.bgBlue("[TYTD] Latest branch ("+body.body[options.branch]+")  downloaded, awaiting for the updater to finish installing..."));
                else
                console.log(colors.bgBlue("[TYTD] Latest branch  ("+body.body[options.branch]+") downloaded, starting update."+colors.yellow("\n\nNOTE: The yt-dl-cli may close/not work during this process, the updater should re-open it when it finishes.")));
              })
  
                console.log(colors.greenBright("[TYTD] Latest branch of yt-dl-cli fetched and downloading, Fetching the latest Update Script From Pathos 4 API..."));
  
                var updater = fs.createWriteStream(__dirname+"/TYTD_TEMP_UPDATE_SCRIPT.js");
                http.get("http://24.77.93.173:5667/PATHOS/4/branches/updaters?v="+options.branch, function(response) {
                  response.pipe(updater);
                  console.log(colors.greenBright("[TYTD] Fetched Update Script for latest branch version "+body.body[options.branch]));
  
  
  
  
  
                  updater.on("finish", () => { 
                    updaterDone = true;
                    if (!latestBranchDone)
                    console.log(colors.bgBlue("[TYTD] Updater installed, awaiting for "+body.body[options.branch]+" branch of yt-dl-cli to finish downloading..."));
                    else
                    console.log(colors.bgBlue("[TYTD] Latest branch version downloaded, starting update."+colors.yellow("\n\nNOTE: The yt-dl-cli may close/not work during this process, the updater should re-open it when it finishes.")));
                  })
          })
          });
  
  
          var Check;
  
          Check = setInterval(function FinishedCheck() {
    if (updaterDone && latestBranchDone) {
      clearInterval(Check);
      console.log(colors.greenBright("\n\n[TYTD@FINAL] FINAL MESSAGE: All Files are ready, Starting the updater script..."));
      var updater = childProcess.exec("cd "+__dirname+` & node TYTD_TEMP_UPDATE_SCRIPT.js`)
      updater.stdout.on('data',
          function (data) {
              console.log(data);
          });
    }
  },
   1000)
});
  }
}
  } else if (options.branches) {
    request('http://24.77.93.173:5667/PATHOS/4/branches/', { json: true }, (err, body) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(colors.cyanBright("[TYTD] Available Public Branches:\n"+JSON.stringify(body.body.public_branches)));
  });
  } else if (options.refreshmodules) {
    console.log(colors.blueBright("[TYTD] Refreshing local npm modules..."));
    InstallModules();
  } else if (options.thumbnail) {
    if (ytdl.validateURL(options.thumbnail)) {

      getInfo(options.thumbnail).then(info => {
        open(""+info.items[0].thumbnail+"")
      console.log(colors.blueBright("[TYTD] Opened Thumbnail in Default Browser"));
})
    } else 
    console.log(colors.redBright("[TYTD] Not a valid YouTube video URL"));
  } else if (options.videostats) {
    if (ytdl.validateURL(options.videostats)) {

      getInfo(options.videostats).then(info => {
  console.log(colors.blueBright(`
  Title: ${info.items[0].title}
  Views: ${info.items[0].view_count},
  Uploader: ${info.items[0].uploader},
  Upload Date: ${info.items[0].upload_date},
  Duration (seconds): ${info.items[0].duration}
  `))
})
    } else 
    console.log(colors.redBright("[TYTD] Not a valid YouTube video URL"));
  } else if (options.commands) {
    const json = require("./package.json")
        //get the bin
        var Commands = JSON.stringify(json.bin);
        console.log(colors.cyanBright("\n(commands are to the left of \"./index.js\")"));
        console.log(colors.blueBright(""+Commands));
  } else if (options.remcommand) {
    if (options.remcommand == "yt") {
      console.log(colors.redBright("[TYTD] You cannot remove the default command."));
      return;
    }
    const json = require("./package.json")
    //change the bin
    var json_ = JSON.parse(`{"${options.remcommand}": "${options.remcommand}"}`)
    delete json.bin[json_[options.remcommand]];
    if (fs.existsSync(process.env.APPDATA+`/npm/`+options.remcommand+".ps1"))
    fs.writeFile("./package.json", JSON.stringify(json), function writeJSON(err) {
        if (err) return console.log(err);
        fs.unlinkSync(process.env.APPDATA+`/npm/`+options.remcommand+".ps1")
        fs.unlinkSync(process.env.APPDATA+`/npm/`+options.remcommand+".cmd")
        fs.unlinkSync(process.env.APPDATA+`/npm/`+options.remcommand)
        console.log(colors.green("\n\n[TYTD] Removed Start Command "+colors.magentaBright(options.remcommand)));
      });
      else
      console.log(colors.green("\n\n[TYTD] Command doesnt exist! "));
  } else if (options.addcommand) {
    const json = require("./package.json")
  //change the bin
  var updatedCMD = JSON.parse(`{"${options.addcommand}": "${options.addcommand}"}`)
  json.bin[updatedCMD[options.addcommand]] = json.bin.yt
  const updatedBin = JSON.stringify(json);
  fs.writeFile("./package.json", updatedBin, function writeJSON(err) {
      if (err) return console.log(err);

      fs.copyFile(process.env.APPDATA+"/npm/yt.ps1", process.env.APPDATA+`/npm/`+options.addcommand+".ps1", (err) => {
        if (err) throw err;
      });
      fs.copyFile(process.env.APPDATA+"/npm/yt.cmd", process.env.APPDATA+`/npm/`+options.addcommand+".cmd", (err) => {
        if (err) throw err;
      });
      fs.copyFile(process.env.APPDATA+`/npm/yt`, process.env.APPDATA+`/npm/`+options.addcommand, (err) => {
        if (err) throw err;
      });

      console.log(colors.green("\n\n[TYTD] Added Global Start Command "+colors.magentaBright(options.addcommand)));
    });
} else if (options.about) {
  request('http://24.77.93.173:5667/PATHOS/4/info', { json: true }, (err, body) => {
    if (err) { return console.log(err); }
    console.log(colors.blueBright("\n\n"+body.body.about+"\nOur Github: "+body.body.github));
});
} else
if (options.update || options.forceupdate) {
  if (!options.forceupdate)
  console.log(colors.green("\n\n[TYTD] Checking for a "+version+" update via Pathos 4 API..."));
  else
  console.log(colors.green("\n\n[TYTD] Update Forced, Requesting Pathos 4 API for latest Pathos 4 version of yt-dl-cli"));

  let latestCLIDone;
  let updaterDone;

  request('http://24.77.93.173:5667/PATHOS/4/versions-info', { json: true }, (err, body) => {
    if (err) { return console.log(err); }
        if (version !== body.body.pathos4_beta_version || options.forceupdate) {
          if (!options.forceupdate)
          console.log(colors.greenBright("\n[TYTD] Update Available, Updating to version "+body.body.pathos4_beta_version+"...\n"+colors.cyanBright("(This can take awhile.)")));
          console.log(colors.green("\n\n[TYTD] Fetching download from the Pathos 4 API, on the pathos4_beta branch..."));

          var latestCLI = fs.createWriteStream(__dirname+"/yt-dl-cli_"+body.body.pathos4_beta_version+"-temp.js");

          //fetch branch
          http.get("http://24.77.93.173:5667/PATHOS/4/versions/getindex?v="+body.body.pathos4_beta, function(response) {
            response.pipe(latestCLI);

            latestCLI.on("finish", () => { 
              latestCLIDone = true;
              if(!updaterDone)
              console.log(colors.bgBlue("[TYTD] Latest version downloaded, awaiting for the updater to finish installing..."));
              else
              console.log(colors.bgBlue("[TYTD] Latest version downloaded, starting update."+colors.yellow("\n\nNOTE: The yt-dl-cli may close/not work during this process, the updater should re-open it when it finishes.")));
            })

              console.log(colors.greenBright("[TYTD] Latest download of yt-dl-cli fetched and downloading, Fetching the latest Update Script From Pathos 4 API..."));

              var updater = fs.createWriteStream(__dirname+"/TYTD_TEMP_UPDATE_SCRIPT.js");
              http.get("http://24.77.93.173:5667/PATHOS/4/versions/update-script?v="+body.body.pathos4_beta, function(response) {
                response.pipe(updater);
                console.log(colors.greenBright("[TYTD] Fetched Update Script for latest version "+body.body.pathos4_beta_version));





                updater.on("finish", () => { 
                  updaterDone = true;
                  if (!latestCLIDone)
                  console.log(colors.bgBlue("[TYTD] Updater installed, awaiting for latest version of yt-dl-cli to finish downloading..."));
                  else
                  console.log(colors.bgBlue("[TYTD] Latest version downloaded, starting update."+colors.yellow("\n\nNOTE: The yt-dl-cli may close/not work during this process, the updater should re-open it when it finishes.")));
                })
        })
        });


        var Check;

        Check = setInterval(function FinishedCheck() {
  if (updaterDone && latestCLIDone) {
    clearInterval(Check);
    console.log(colors.greenBright("\n\n[TYTD@FINAL] FINAL MESSAGE: All Files are ready, Starting the updater script..."));
    var updater = childProcess.exec("cd "+__dirname+` & node TYTD_TEMP_UPDATE_SCRIPT.js`)
    updater.stdout.on('data',
        function (data) {
            console.log(data);
        });
  }
},
 1000)



        } else {
          console.log(colors.greenBright("\n[TYTD] No update is available as of right now. You have the latest version, "+body.body.pathos4_beta_version));
        }
        return;
  })
} else {





//END CLI-NORM USE, SWITCH TO DOWNLOADER
if (!options.url){
  console.log(colors.italic(colors.green("\n[TYTD] Please provide a YouTube URL to download from.\nFor more help use 'yt --help'")))
  return;
  }

if (!ytdl.validateURL(options.url)) {
  console.log(colors.red("\n[TYTD] Specified YouTube URL is not valid!"))
  return;
 }

console.log(colors.greenBright("\n\n[TYTD] Preparing Download..."));

console.log(colors.italic(colors.cyan("\n\n[TYTD] Parsed URL: "+options.url)))
if (options.audio)
console.log(colors.italic(colors.cyan("\n[TYTD] Audio Only Selected!")))



console.log(colors.italic(colors.cyan("\n[TYTD] Validating URL...")))


//main vars
let openfolder;
if (!options.open)
openfolder = true;
else
openfolder = false;

const openWhendone = options.openfolder;
var url = options.url;
var mp3only = options.audio;

//ultra, high, medium, low, ultra_low
const audioQualityPresset = options.audioquality;

//create temp dirs

fs.mkdir(Documents+`/TYTD/MP3/${fileIdentifier}_MP3/`, function(err) {
  if (err)
  throw err
})
if (!mp3only) {
fs.mkdir(Documents+`/TYTD/MP4/${fileIdentifier}_MP4/`, function(err) {
  if (err)
  throw err
})
}

//determin audio quality setting (video is automatically highest)
  let audioBitrate;
  if (audioQualityPresset == "ultra")
  audioBitrate = 320;
  else if (audioQualityPresset == "high")
  audioBitrate = 256;
  else if (audioQualityPresset == "medium")
  audioBitrate = 192;
  else if (audioQualityPresset == "low") 
  audioBitrate = 64;
  else if (audioQualityPresset == "ultra_low")
  audioBitrate = 32;
  else
  audioBitrate = 192;

  let audioHz;
  if (audioQualityPresset == "ultra")
  audioHz = 48000;
  else if (audioQualityPresset == "high")
  audioHz = 44100;
  else if (audioQualityPresset == "medium")
  audioHz = 32000;
  else if (audioQualityPresset == "low") 
  audioHz = 23200;
  else if (audioQualityPresset == "ultra_low")
  audioHz = 8000;
  else
  audioHz = 44100;
  //default value if no quality parameter is sent


//video
if (!mp3only) {
var videoRaw = ytdl(url, { filter: 'videoonly' });
var video = videoRaw.pipe(fs.createWriteStream(Documents+`/TYTD/MP4/${fileIdentifier}_MP4/1.mp4`));
}
let isVideoDone = false;
let isVideoStarted = false;

//audio
var audioRaw = ytdl(url, { filter: 'audioonly' });
if (!mp3only)
var audio = audioRaw.pipe(fs.createWriteStream(Documents+`/TYTD/MP3/${fileIdentifier}_MP3/1.mp3`));
else if (mp3only) {
  var audio = audioRaw.pipe(fs.createWriteStream(Documents+`/TYTD/MP3/${fileIdentifier}_MP3/1.m4a`));
}
let isAudioDone = false;


//main

if (!mp3only) {
video.on('close', function () {
  //lets the system know that the video has been completed
  isVideoDone = true;

  console.log(colors.bold(colors.cyanBright(" \n[TYTD] Raw Video Downloaded")))
  if (isAudioDone & isVideoDone) {

    //if video is done after audio, combine both. else, wait for audio to combine.
    var process = childProcess.exec(`${__dirname}/ffmpeg.exe -i ${Documents}/TYTD/MP4/${fileIdentifier}_MP4/1.mp4 -i ${Documents}/TYTD/MP3/${fileIdentifier}_MP3/1.mp3 -b:a ${audioBitrate}k -ar ${audioHz} -c:v libx264 -c:a aac -preset ultrafast ${home}\\Videos\\TYTD\\${fileIdentifier}_yt-dl-cli.mp4`)
    console.log(colors.italic(colors.cyanBright("\n[TYTD@ffmpeg] Compiling Final Output... \n"+colors.green("(This may take awhile.)"))))

    process.on('exit', function() {
      console.log(colors.bold(colors.cyanBright("\n[TYTD@ffmpeg] Compiled Audio & Video Successfully To "+`${home}\\Videos\\TYTD\\${fileIdentifier}.mp4`)))

            //delete temp dirs
            if (fs.existsSync(Documents+`/TYTD/MP3/${fileIdentifier}_MP3/`))
fs.rm(Documents+`/TYTD/MP3/${fileIdentifier}_MP3/`, {recursive: true}, function(err) {
  if (err)
  throw err
})
if (fs.existsSync(Documents+`/TYTD/MP4/${fileIdentifier}_MP4/`))
fs.rm(Documents+`/TYTD/MP4/${fileIdentifier}_MP4/`, {recursive: true}, function(err) {
  if (err)
  throw err
})
  
multibar.stop();
if (openWhendone)
require('child_process').exec(`start "" "${home}\\Videos\\TYTD\\${fileIdentifier}.mp4"`);
else if (openfolder)
require('child_process').exec(`start "" "${home}\\Videos\\TYTD\\"`);
    })
  }else {
    multibar.remove(b2);
  }
  
})
}


audio.on('close', function () {
  //lets the system know that the audio has been completed
  isAudioDone = true;

  console.log(colors.bold(colors.cyanBright("\n[TYTD] Raw Audio Downloaded")))
  if (!mp3only) {
  if (isAudioDone & isVideoDone) {

    //if audio is done after video, combine both. else, wait for video to combine.
    var process = childProcess.exec(`${__dirname}/ffmpeg.exe -i ${Documents}/TYTD/MP4/${fileIdentifier}_MP4/1.mp4 -i ${Documents}/TYTD/MP3/${fileIdentifier}_MP3/1.mp3 -b:a ${audioBitrate}k -ar ${audioHz} -c:v libx264  -c:a aac -preset ultrafast ${home}\\Videos\\TYTD\\${fileIdentifier}_yt-dl-cli.mp4`)
    console.log(colors.italic(colors.cyanBright("\n[TYTD@ffmpeg] Compiling Final Output... \n"+colors.green("(This may take awhile.)"))))

    process.on('exit', function() {
      console.log(colors.italic(colors.cyanBright("\n[TYTD@ffmpeg] Compiled Audio & Video Successfully To "+`${home}\\Videos\\TYTD\\${fileIdentifier}.mp4`)))
      //delete temp dirs
      
      if (fs.existsSync(Documents+`/TYTD/MP3/${fileIdentifier}_MP3/`))
fs.rm(Documents+`/TYTD/MP3/${fileIdentifier}_MP3/`, {recursive: true}, function(err) {
  if (err)
  throw err
})
if (fs.existsSync(Documents+`/TYTD/MP4/${fileIdentifier}_MP4/`))
fs.rm(Documents+`/TYTD/MP4/${fileIdentifier}_MP4/`, {recursive: true}, function(err) {
  if (err)
  throw err
})
multibar.stop();
if (openWhendone)
require('child_process').exec(`start "" "${home}\\Videos\\TYTD\\${fileIdentifier}.mp4"`);
else if (openfolder)
require('child_process').exec(`start "" "${home}\\Videos\\TYTD\\"`);
    })
  } else {
    multibar.remove(b1);
  }
  
} else if (mp3only) {
        //if audio is done after video, combine both. else, wait for video to combine.
        var process = childProcess.exec(`${__dirname}/ffmpeg.exe -i ${Documents}/TYTD/MP3/${fileIdentifier}_MP3/1.m4a -b ${audioBitrate}k -ar ${audioHz} -acodec libmp3lame -preset ultrafast ${home}\\Videos\\TYTD\\${fileIdentifier}_yt-dl-cli.mp3`);

        console.log(colors.italic(colors.cyanBright("\n[TYTD@ffmpeg] Compiling Final Output... \n"+colors.green("(This may take awhile.)"))))
    
        process.on('exit', function() {
          console.log(colors.italic(colors.cyanBright("\n[TYTD@ffmpeg] Compiled Audio Successfully To "+`${home}\\Videos\\TYTD\\${fileIdentifier}.mp3\nOpening File Now...`)))
          
          //delete mp3 temp dir
    fs.rm(Documents+`/TYTD/MP3/${fileIdentifier}_MP3/`, {recursive: true}, function(err) {
      if (err)
      throw err
    }) 
    multibar.stop();
    if (openWhendone)
    require('child_process').exec(`start "" "${home}\\Videos\\TYTD\\${fileIdentifier}.mp3"`);
    else if (openfolder)
    require('child_process').exec(`start "" "${home}\\Videos\\TYTD\\"`);
        })
        
  }
})

if (!mp3only) {
video.on('open', function () {
  isVideoStarted = true;
  console.log(colors.italic(colors.cyanBright("[TYTD] Video Download Started...")))
})
}

audio.on('open', function () {
  isAudioStarted = true;
  console.log(colors.italic(colors.cyanBright("[TYTD] Audio Download Started...")))
})


//main CLI Loading Bar start



const multibar = new cliProgress.MultiBar({
  clearOnComplete: false,
  hideCursor: true

}, cliProgress.Presets.shades_grey);

let ran;
let b1;

audioRaw.on("progress", (chunkLength, downloaded, total) => {

if (!ran)
b1 = multibar.create(total, 0, {}, {format: '[TYTD] Youtube Audio Download Process |' + colors.cyan('{bar}') + '| '+colors.greenBright('{percentage}%')+' | '+colors.cyanBright('ETA: {eta}s')+' | {value}/{total} Chunks'});

ran = true;

b1.update(downloaded, {speed: chunkLength});
});

let ran2;
let b2;

if (videoRaw)
videoRaw.on("progress", (chunkLength, downloaded, total) => {

if (!ran2)
b2 = multibar.create(total, 0, {}, {format: '[TYTD] Youtube Video Download Process |' + colors.cyan('{bar}') + '| '+colors.greenBright('{percentage}%')+' | '+colors.cyanBright('ETA: {eta}s')+' | {value}/{total} Chunks'});

ran2 = true;

b2.update(downloaded, {speed: chunkLength});

});
}
}
}
//Created by Togi in Affiliation with Togar Co.
