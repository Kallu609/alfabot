import CommandBase from 'bot/cmds/commandBase';
import fetch from 'node-fetch';
import Bot from 'shared/types/bot';

const API_KEY = process.env.GIPHY_TOKEN;

class RepsCommand extends CommandBase {
  constructor(bot: Bot) {
    super(bot);

    this.visible = false;
  }

  listen(): void {
    this.onText(/(reps|repesin|huutist?a?)/i, async msg => {
      if (!API_KEY) {
        return;
      }

      const searchTerm = 'laugh';
      const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${searchTerm}&rating=R`;
      const request = await fetch(url);
      const json = await request.json();
      const gifUrl = json.data.images.original.url;

      this.bot.sendDocument(msg.chat.id, gifUrl, {
        disable_notification: true,
      });
    });
  }
}

export default RepsCommand;
