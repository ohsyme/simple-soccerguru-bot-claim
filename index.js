const settings = require('./Settings.json');
const AdBot = require('discord.js-selfbot-v13');



async function adbotLogin(client, token) {
    try {

        const AdBotClient = new AdBot.Client({ checkUpdate: false });

        await AdBotClient.login(settings.token)

        await AdBotClient.once('ready', () => {
            console.log(`Logged Into ${AdBotClient.user.username}`)
        })

        const channel = await AdBotClient.channels.cache.find(channel => channel.id === settings.channels)
        await channel.sendSlash("668075833780469772", "claim")

        await run()

    }catch(err){
        console.log(err)
    }
}

let firstLogin = true
async function run() {
    if(firstLogin === true){
      adbotLogin()
      firstLogin = false
      return
    }
    let anhour = 1*60*60*1000
    let random = randomIntFromInterval(0,60)*1000*60


    let c = (anhour+random)/(60*1000)
    console.log(`Minute: ${c}`)

    setTimeout(()=>{
        adbotLogin()
    },anhour+random)
}
run()


  
function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}