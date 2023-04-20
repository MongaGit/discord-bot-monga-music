const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
const Player = require('../../../../helper/player.js');
const send = require('../../../../tools/send.js')
const message = context.params.event;
const keyDetails = await lib.utils.kv['@0.1.16'].get({
  key: `${process.env.key}_${message.guild_id}`,
});

if (message.content.startsWith('!setup')) {
  let channelId = message.content.match(/\d+/g);
  if (!channelId)
    return lib.discord.channels['@0.2.0'].messages.create({
      content: `Mencione o canal que voce deseja configurar o Monga Music Bot.`,
      channel_id: message.channel_id,
    });
  else channelId = channelId[0];

  const msg = await lib.discord.channels['@0.2.0'].messages.create({
    content: `**[ Song List]**\nEntre em um canal de voz e insira os nomes ou url (sem 'https://') das musicas para criar uma playlist..`,
    channel_id: channelId,
    embed: {
      title: `Vibing Alone 😎`,
      url: `https://top.gg/bot/1098425312536186910?s=085a06e053746`,
      description: `Esse bot foi criado pe equipe Monga.`,
      color: 0xD43790,
      image: {
        url: 'https://c.tenor.com/Wgo-XGZmUNAAAAAC/music-listening-to-music.gif',
      },
      thumbnail: {
        url: 'https://raw.githubusercontent.com/MongaGit/.github/main/profile/images/images.png?size=1024',
      },
    },
  });

  await Player.reset({keyDetails: {channelId, messageId: msg.id}});

  await lib.utils.kv['@0.1.16'].set({
    key: `${process.env.key}_${message.guild_id}`,
    value: {channelId, messageId: msg.id},
  });

  await lib.discord.channels['@0.2.0'].messages.create({
    content: `Configurado :)`,
    channel_id: message.channel_id,
  });
} else if (keyDetails && keyDetails.channelId === message.channel_id) {
  const voice_channel = await lib.utils.kv['@0.1.16'].get({
    key: `voice_${process.env.key}_${message.guild_id}_${message.author.id}`,
  });

  await lib.discord.channels['@0.2.0'].messages.destroy({
    message_id: message.id, // required
    channel_id: message.channel_id, // required
  });

  if (!voice_channel)
    return send("Entre em um canal de voz primeiro!", { channel_id: context.params.event.channel_id })

  await Player.play(message.content, {
    channel_id: voice_channel.channelId,
    guild_id: message.guild_id,
    keyDetails,
  }).catch(async (err) => {
    console.log(err)
    await send("Não encontrei, tente outro ou chame o N0bru.", { channel_id: context.params.event.channel_id })
  });
}







