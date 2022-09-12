const jokeList = require("./database/jokes.json");
const adviceList = require("./database/advices.json");

exports.commands =
{
	joke:
	{
		syntax: `joke`,
		shortdesc: `Spits out a dad joke.`,
		desc: `I say one of my amazing **Certified Hood Classic** Dad jokes tm dad jokes (${jokeList.length} jokes currently available).`,
		run: (msg) =>
		{
			var string = "";
			var thisjoke = Math.floor(Math.random()*jokeList.length);
			thisjoke = jokeList[thisjoke].joke;
			for (var i = 0; i < thisjoke.length; i++)
				string += `${thisjoke[i]}${i==thisjoke.length?"":"\n"}`;
			return (string);
		}
	},
	advice:
	{
		syntax:`advice`,
		shortdesc:`I give ya life advice.`,
		desc:`Don't tell your mom but, my advice is WAAYYYY better.`,
		run:(msg) =>
		{
			var randselect = Math.floor(Math.random()*adviceList.length);
			return (adviceList[randselect]);
		}
	}
};