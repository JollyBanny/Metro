import { SListener, Log, SGuild } from "../../structures"
import { defaults, lines } from "../../config"
import { TextChannel, Guild } from "discord.js"
import LinkedList from "dbly-linked-list"
import { metro } from "../../config"
import Metro from "../../structures/Discord/Metro"
import { LineCategory } from "../../typings"

export default class extends SListener {
  constructor() {
    super(__filename)
  }

  async exec() {
    const mainGuild = this.client.guilds.cache.get(defaults.mainGuild)
    mainGuild instanceof Guild ? (this.client.guild = mainGuild) : process.exit()

    const consoleChannel = this.client.channels.cache.get(defaults.consoleChannelID)
    consoleChannel instanceof TextChannel ? (this.client.console = consoleChannel) : Log.warn("Console channel not found")

    // this.client.guild.members.cache.map(async member => await member._fetch())

    // считывание схемы метро
    const guild = this.client.guild as SGuild

    let metroList = new Metro()
    for (const [key_b, branch] of Object.entries(metro)) {
      let list = new LinkedList()
      for (const station of branch["stations"]) {
        list.insert(station)
        // guild.roles.create({ data: { name: station.name, color: "#00d26a" } })
      }
      metroList.lines.push(list)
    }

    for (const line of lines) {
      metroList.line_categories.push(line)
    }

    guild.metro = metroList

    Log.info(`Bot ${this.client.user!.tag} loaded`)
  }
}
