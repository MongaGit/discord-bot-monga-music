const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

await lib.discord.channels['@0.3.0'].messages.create({
  "channel_id": `1096598565532479509`,
  "content": "",
  "tts": false,
  "components": [
    {
      "type": 1,
      "components": [
        {
          "style": 4,
          "label": `Join 1`,
          "custom_id": `join-player-1`,
          "disabled": false,
          "type": 2
        },
        {
          "style": 4,
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
          "name": `Player 1 - 🔴`,
          "value": `join as player 1`,
          "inline": true
        },
        {
          "name": `Player 2 - 🔴`,
          "value": `join as player 2`,
          "inline": true
        },
        {
          "name": `Player 3 - 🔴`,
          "value": `join as player 3`,
          "inline": true
        },
        {
          "name": `How to leave`,
          "value": `Press Leave Button`,
          "inline": true
        }
      ]
    }
  ]
});

