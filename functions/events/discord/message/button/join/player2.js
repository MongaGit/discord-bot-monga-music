const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
let title = process.env.Title;
let desc = process.env.Description;
const axios = require('axios');
let channel = context.params.event.channel_id;
let id = context.params.event.message.id;
let user = context.params.event.member.user.id;
let token = context.params.event.token;
const playerstatus = await lib.utils.kv['@0.1.16'].get({
  key: `${id}_Player-2`,
  defaultValue: false
});
let action = process.env.game;
if (playerstatus === true){
  console.error(`User Already Here`)
  await lib.discord.interactions['@1.0.1'].followups.ephemeral.create({
    token: token,
    content: `There is already a user as player 2, please try again with a different player`
  });
};
if (playerstatus === false){
  // ---------- This line Starts Recieving Data ----------
  let PlayerStatus = `🟢`;
  let ButtonColor = 3;
  let Player = `<@${user}>`;
  // ---------- This is the line that Separates Recieving and Creating New Data ----------
  const OtherPlayerStatus = await lib.utils.kv['@0.1.16'].get({
    key: `${id}_Player1JoinStatus`,
    defaultValue: `🔴`
  });
  const OtherButtonColor = await lib.utils.kv['@0.1.16'].get({
    key: `${id}_Player1JoinButton`,
    defaultValue: 4
  });
  const OtherPlayer = await lib.utils.kv['@0.1.16'].get({
    key: `${id}_Player1`,
    defaultValue: `Press Join 1 to join as player 1`
  });
  console.log(Player)
  // ---------- Checking Data Here ----------
  if (Player === OtherPlayer) {
    await lib.discord.interactions['@1.0.1'].followups.ephemeral.create({
      token: token,
      content: `You are already a player on this game, you cannot be both`
    });
    return
  }
  // ---------- This is the line that Separates Creating New Data and Updating Message ----------
  
  await lib.discord.channels['@0.3.2'].messages.update({
    message_id: `${id}`,
    channel_id: `${channel}`,
    content: ``,
    "tts": false,
    "components": [
      {
        "type": 1,
        "components": [
          {
            "style": OtherButtonColor,
            "label": `Join 1`,
            "custom_id": `join-player-1`,
            "disabled": false,
            "type": 2
          },
          {
            "style": ButtonColor,
            "label": `Join 2`,
            "custom_id": `join-player-2`,
            "disabled": false,
            "type": 2
          },
          {
            "style": 4,
            "label": `Leave`,
            "custom_id": `leavegame`,
            "disabled": false,
            "type": 2
          }
        ]
      }
    ],
    "embeds": [
      {
        "type": "rich",
        "title": ``,
        "description": ``,
        "color": 0x00FFFF,
        "fields": [
          {
            "name": `Player 1 - ${OtherPlayerStatus}`,
            "value": `${OtherPlayer}`,
            "inline": true
          },
          {
            "name": `Player 2 - ${PlayerStatus}`,
            "value": `${Player}`,
            "inline": true
          },
          {
            "name": `How to leave`,
            "value": `Press the Red Leave Button Below to leave this game`,
            "inline": true
          }
        ]
      }
    ]
  });
  
  
  // ---------- This is the line that Separates Updating Message and Sending Data ----------
  await lib.utils.kv['@0.1.16'].set({
    key: `${id}_Player-2`,
    value: true
  });
  await lib.utils.kv['@0.1.16'].set({
    key: `${id}_Player2`,
    value: `${Player}`
  });
  await lib.utils.kv['@0.1.16'].set({
    key: `${id}_Player2JoinStatus`,
    value: `${PlayerStatus}`
  });
  await lib.utils.kv['@0.1.16'].set({
    key: `${id}_Player2JoinButton`,
    value: `${ButtonColor}`
  });
  
  if (PlayerStatus == `🟢`){
    if (OtherPlayerStatus == `🟢`){
        
        await axios
        .post(action)
        
  }};
  
};