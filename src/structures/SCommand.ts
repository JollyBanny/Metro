import { Command, CommandOptions } from "discord-akairo"
import { SClient } from "."

export default class SCommand extends Command {
  client!: SClient

  constructor(options: CommandOptions) {
    super(options.aliases![0], options)
  }
}
