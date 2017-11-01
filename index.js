//External dependencies
var Tesseract = require("tesseract.js");
var Discord = require("discord.js");
request = require('request');
var fs = require("fs");
var Jimp = require("jimp");

var bot = new Discord.Client();

bot.on("message", (message)=>{
	if((message.content !== undefined) && (message.author.id !== bot.user.id) && message.content.startsWith("/test")){//message issued (and not issued by the bot itself)

		for(attachment of message.attachments.values()){
			request({
				url: attachment.url,
				encoding: null
			},
			function(error, response, body){

				Jimp.read(body)
					.then(function (image) {
						image
							.invert()
							.greyscale()
							.brightness(-0.3)
							.contrast(1);
						Tesseract.recognize(image.bitmap)
							.then(function(result){
								message.channel.send(result.text);
								image.write("testong2.png");
							})
					}).catch(function (err) {
						// handle an exception
					});






			});
		}
	}
});

bot.login("BOT TOKEN HERE")
	.then(function(){
		console.log("Login successful");
		console.log("Logged in as " + bot.user.tag);
		bot.user.setGame("@" + bot.user.username + " help");
	})
	.catch(function(error){
		console.error(error);
	});