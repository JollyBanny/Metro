import { Aliases } from "../../constants"
import { SCommand } from "../../structures"
import { GuildMessage } from "../../typings"

export default class extends SCommand {
  constructor() {
    super({
      aliases: Aliases.help,
      args: [
        {
          id: "category",
          match: "text",
          type: "lowercase",
        },
      ],
    })
  }

  async exec(message: GuildMessage, { category }: { category?: string }) {}
}
