const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
let token = context.params.event.token;
let id = context.params.event.message.id;
let channel = context.params.event.channel_id;
let user = context.params.event.member.user.id;
let actioncomplete = null;
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
const Player1 = await lib.utils.kv['@0.1.16'].get({
  key: `${id}_Player1`,
  defaultValue: '0000000000000000'
});
const Player2 = await lib.utils.kv['@0.1.16'].get({
  key: `${id}_Player2`,
  defaultValue: '0000000000000000'
});
// ---------- Player 1 Data ----------
let Player1Join= await lib.utils.kv['@0.1.16'].get({
  key: `${id}_Player1JoinStatus`,
  defaultValue: `🔴`
});
let Player1Button = await lib.utils.kv['@0.1.16'].get({
  key: `${id}_Player1JoinButton`,
  defaultValue: 4
});
let Player1User = await lib.utils.kv['@0.1.16'].get({
  key: `${id}_Player1`,
  defaultValue: `Press Join 1 to join as player 1`
});

// ---------- Player 2 Data ----------

let Player2Join = await lib.utils.kv['@0.1.16'].get({
  key: `${id}_Player2JoinStatus`,
  defaultValue: `🔴`
});
let Player2Button = await lib.utils.kv['@0.1.16'].get({
  key: `${id}_Player2JoinButton`,
  defaultValue: 4
});
let Player2User = await lib.utils.kv['@0.1.16'].get({
  key: `${id}_Player2`,
  defaultValue: `Press Join 2 to join as player 2`
});

// ---------- Continue with code ----------

if (Player1.includes(user)) {
Player1Join = `🔴`;
Player1Button = 4;
Player1User = `Press Join 1 to join as player 1`;
await lib.utils.kv['@0.1.16'].clear({
  key: `${id}_Player1JoinStatus`
});
await lib.utils.kv['@0.1.16'].clear({
  key: `${id}_Player1JoinButton`
});
await lib.utils.kv['@0.1.16'].clear({
  key: `${id}_Player-1`
});
await lib.utils.kv['@0.1.16'].clear({
  key: `${id}_Player1`
});
let actioncomplete = true;
}

if (Player2.includes(user)) {
Player2Join = `🔴`;
Player2Button = 4;
Player2User = `Press Join 2 to join as player 2`;
await lib.utils.kv['@0.1.16'].clear({
  key: `${id}_Player2JoinStatus`
});
await lib.utils.kv['@0.1.16'].clear({
  key: `${id}_Player2JoinButton`
});
await lib.utils.kv['@0.1.16'].clear({
  key: `${id}_Player-2`
});
await lib.utils.kv['@0.1.16'].clear({
  key: `${id}_Player2`
});
let actioncomplete = true;
}

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
          "style": Player1Button,
          "label": `Join 1`,
          "custom_id": `join-player-1`,
          "disabled": false,
          "type": 2
        },
        {
          "style": Player2Button,
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
          "name": `Player 1 - ${Player1Join}`,
          "value": `${Player1User}`,
          "inline": true
        },
        {
          "name": `Player 2 - ${Player2Join}`,
          "value": `${Player2User}`,
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
