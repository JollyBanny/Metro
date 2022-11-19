import { MessageEmbed, MessageEmbedOptions } from "discord.js"
import { Colors } from "../../constants"

export default class Embed extends MessageEmbed {
  constructor(data?: MessageEmbed | MessageEmbedOptions) {
    super(data)
  }

  public red(header?: string, icon?: string) {
    return this.setAuthor(header, icon).setColor(Colors.Red)
  }

  public yellow(header?: string, icon?: string) {
    return this.setAuthor(header, icon).setColor(Colors.Yellow)
  }

  public green(header?: string, icon?: string) {
    return this.setAuthor(header, icon).setColor(Colors.Green)
  }
}
