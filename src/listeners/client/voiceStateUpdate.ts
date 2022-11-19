import { Node } from "dbly-linked-list"
import { CategoryChannel, GuildCreateChannelOptions, VoiceState } from "discord.js"
import { SGuild, SListener } from "../../structures"
import { Station } from "../../typings"

export default class extends SListener {
  constructor() {
    super(__filename)
  }

  async exec(oldState: VoiceState, newState: VoiceState) {
    const guild = newState.guild as SGuild
    const category = guild.channels.cache.get("941920609741447228") as CategoryChannel

    const DEFAULT_VOICE_CONNFIG: GuildCreateChannelOptions = {
      type: "voice",
      parent: category,
      permissionOverwrites: [
        {
          id: guild.roles.everyone,
          deny: ["VIEW_CHANNEL"],
        },
      ],
    }

    if (oldState.channel === newState.channel) return
    if (newState.channel?.parent == category) return

    // при выходе из канала запускать возрождение на Невском проспекте
    // переход из станции в главные голосовые каналы не учитывается
    if (!newState.channel) {
      let lastStation: Station,
        member = newState.member
      guild.metro.lines.forEach(line =>
        line.forEach((node: Node) => {
          let data = node.getData() as Station
          if (newState.member?.roles.cache.has(data.role)) {
            lastStation = data
          }
        }),
      )
      setTimeout(async () => {
        // если человек не вернулся в канал станции - возрождение
        if (member?.voice.channelID != lastStation?.channel || !lastStation) {
          await guild.metro.removeOldRoles(oldState)
          await member?.roles.add(["942749725944332318", "942704013172957185"])
        }
      }, 5000)
      return
    }

    // переход между ветками
    if (newState.channel?.parent !== oldState.channel?.parent) {
      guild.metro.migrate(oldState, newState)
    }

    if (newState.channel?.members.size === 1) {
      // если пользователь первым зашел в канал, то запускается интервал создания вагонов
      let stationData: Node
      let channel_start = newState.channel

      let create_interval = setInterval(async () => {
        if (channel_start.members.size < 1) {
          clearInterval(create_interval)
          return
        }

        //определение пути
        guild.metro.lines.forEach(line =>
          line.forEach((node: Node) => {
            let data = node.getData() as Station
            if (data.channel === newState.channelID) {
              stationData = node
            }
          }),
        )
        if (stationData.hasPrev() && !guild.metro.comingVan(stationData.getData<Station>().name, false)) {
          const upChannel = await guild.channels.create(`↑ Вагон ${(category.children.size + 1).toString().padStart(3, "0")}`, DEFAULT_VOICE_CONNFIG)
          guild.metro.subscribeToTrack(upChannel, stationData, guild, false)
        }

        if (stationData.hasNext() && !guild.metro.comingVan(stationData.getData<Station>().name, true)) {
          const dnChannel = await guild.channels.create(`↓ Вагон ${(category.children.size + 1).toString().padStart(3, "0")}`, DEFAULT_VOICE_CONNFIG)
          guild.metro.subscribeToTrack(dnChannel, stationData, guild, true)
        }
      }, 15000)
    }
  }
}
