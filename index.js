const fs = require('fs')
var colors = require('colors')

const {status_do_bot, log_removeu_o_bot, log_entrou_no_servidor, id_do_servidor} = require('./logs.json')

console.clear()

const Discord = require('discord.js'),
	client = new Discord.Client({
		autoReconnect: true,
		messageCacheMaxSize: 2024,
		fetchAllMembers: true,
		disabledEvents: ['typingStart', 'typingStop', 'guildMemberSpeaking'],
		messageCacheLifetime: 1680,
		messageSweepInterval: 1680,
	}),
	lofy = require('./lofy.json'),
	{Client, Util} = require('discord.js'),
	{green, bgRed} = require('chalk')

var token = lofy.token,
	prefixo = lofy.prefixo,
	dono = lofy.dono

;(process.title = 'Lofy Selfbot V4'),
	client.login(token).catch((c) => {
		console.log(''.red), console.log('     → Um token invalido foi usado'.red), console.log(('     → ' + c).red)
	}),
	console.clear(),
	client.on('message', (d) => {
		if (d.channel.type == 'dm') return
		if (d.author.bot) return
		if (!d.content.startsWith(prefixo)) return
		let aa = d.content.split(' ')[0]
		aa = aa.slice(prefixo.length)
		let ab = d.content.split(' ').slice(1)

		try {
			let ac = require('./comandos/' + aa + '.js')
			ac.run(client, d, ab)
		} catch (ad) {
			if (ad.code == 'MODULE_NOT_FOUND') return

			console.error(ad)
		}
	}),
	client.on('ready', () => {
		console.clear(),
			console.log(
				`

      ██╗      ██████╗ ███████╗██╗   ██╗    ███████╗███████╗██╗     ███████╗██████╗  ██████╗ ████████╗    ██╗   ██╗██╗  ██╗
      ██║     ██╔═══██╗██╔════╝╚██╗ ██╔╝    ██╔════╝██╔════╝██║     ██╔════╝██╔══██╗██╔═══██╗╚══██╔══╝    ██║   ██║██║  ██║
      ██║     ██║   ██║█████╗   ╚████╔╝     ███████╗█████╗  ██║     █████╗  ██████╔╝██║   ██║   ██║       ██║   ██║███████║
      ██║     ██║   ██║██╔══╝    ╚██╔╝      ╚════██║██╔══╝  ██║     ██╔══╝  ██╔══██╗██║   ██║   ██║       ╚██╗ ██╔╝╚════██║
      ███████╗╚██████╔╝██║        ██║       ███████║███████╗███████╗██║     ██████╔╝╚██████╔╝   ██║        ╚████╔╝      ██║
      ╚══════╝ ╚═════╝ ╚═╝        ╚═╝       ╚══════╝╚══════╝╚══════╝╚═╝     ╚═════╝  ╚═════╝    ╚═╝         ╚═══╝       ╚═╝

`.yellow,
			)

		console.log(''),
			console.log('    → Bot Foi Iniciado.'.blue),
			console.log(('    → Servidores Totais: ' + client.guilds.size + '.').magenta),
			console.log(('    → Usuários Totais: ' + client.users.size + '.').blue),
			console.log(('    → Nome: ' + client.user.username + '.').magenta),
			console.log(('    → Id: ' + client.user.id + '.').blue),
			console.log(''),
			client.user.setPresence({game: {name: lofy.Status, type: 'STREAMING'}})

		let am = [
			{name: 'Pack X', type: 'STREAMING'},
			{name: 'Pack X', type: 'STREAMING'},
		]

		function an() {
			let ao = am[Math.floor(Math.random() * am.length)]
			client.user.setPresence({
				game: ao,
			})
		}

		an(), setInterval(() => an(), 10000)

		const ap = new Discord.RichEmbed()
			.setAuthor(client.user.username, client.user.avatarURL)
			.setDescription('Bot Foi Iniciado\n      Servidores Totais: ' + client.guilds.size + '\n      Usuários Totais: ' + client.users.size)
			.setThumbnail(client.user.avatarURL)
			.setColor('LUMINOUS_VIVID_PINK')
		client.guilds.get(id_do_servidor).channels.get(status_do_bot).send(ap)
	}),
	client.on('guildCreate', (aq) => {
		var as = new Discord.RichEmbed()
			.setTitle(client.user.username)
			.setDescription('      → Entrei Em Um Novo Servidor:\n             → Nome: ' + aq.name + '\n             → ID: ' + aq.id + '\n             → Membros: ' + aq.memberCount + '\n             → Total De Servidores: ' + client.guilds.size + '\n             → Total De Membros: ' + client.users.size)
			.setThumbnail(aq.iconURL || 'https://loritta.website/assets/img/unknown.png')
			.setColor('LUMINOUS_VIVID_PINK')
			.setFooter(client.user.username, client.user.avatarURL)
			.setTimestamp()

		client.channels.get(log_entrou_no_servidor).send(as),
			console.log(''),
			console.log(('    → Log Entrada\n    → Entrei no servidor ' + aq.name + '\n    → Membros: ' + aq.memberCount + '\n    → Agora Eu Estou Em: ' + client.guilds.size + ' servidores\n    → Com Total De Membros: ' + client.users.size).grey)
	}),
	console.log(''),
	client.on('guildDelete', (at) => {
		var av = new Discord.RichEmbed()
			.setTitle(client.user.username)
			.setDescription('      → Fui Removido De Um Servidor:\n             → Nome: ' + at.name + '\n             → ID: ' + at.id + '\n             → Membros: ' + at.memberCount + '\n             → Total De Servidores: ' + client.guilds.size + '\n             → Total De Membros: ' + client.users.size)
			.setThumbnail(at.iconURL || 'https://loritta.website/assets/img/unknown.png')
			.setColor('LUMINOUS_VIVID_PINK')
			.setFooter(client.user.username, client.user.avatarURL)
			.setTimestamp()

		console.log(''),
			client.guilds.get(id_do_servidor).channels.get(log_removeu_o_bot).send(av),
			console.log(''),
			console.log(('    → Log Saida\n    → Sai do servidor ' + at.name + '\n    → Membros: ' + at.memberCount + '\n    → Agora Eu Estou Em: ' + client.guilds.size + ' servidores\n    → Com Total De Membros: ' + client.users.size).red)
	}),
	console.log('')