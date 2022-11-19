import { GuildMember } from "discord.js"
import { SClient } from ".."
import { EGuildMember } from "../../entity"

export default class SGuildMember extends GuildMember {
  public client!: SClient

  async _fetch() {
    let data = await EGuildMember.createQueryBuilder().where({ guildID: this.guild.id, userID: this.id }).getOne()

    if (!data) {
      data = new EGuildMember()
      data.guildID = this.guild.id
      data.userID = this.id
      await data.save()
    }
    this.options = {}

    await this._check(data)
    return this
  }

  async _check(data: EGuildMember) {
    return this
  }
}
