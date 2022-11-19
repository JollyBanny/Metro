import LinkedList, { Node } from "dbly-linked-list"
import { Collection, GuildChannel, GuildMember, RoleResolvable, Snowflake, VoiceChannel, VoiceState } from "discord.js"
import { SGuild } from ".."
import { LineCategory, Station, Van } from "../../typings"

export default class Metro {
  private vans: Collection<Snowflake, Van>
  public line_categories: LineCategory[]
  public lines: LinkedList[]

  constructor() {
    this.vans = new Collection()
    this.line_categories = []
    this.lines = []
  }

  private getNewRoles(channel: VoiceChannel) {
    let roles: RoleResolvable[] = []

    this.lines.forEach(line => {
      line.forEach((node: Node) => {
        let data = node.getData() as Station
        if (channel.id === data.channel) roles.push(data.role)
      })
    })
    this.line_categories.forEach(category => {
      if (channel.parentID === category.category) roles.push(category.role)
    })

    return roles
  }

  private getOldRoles(member: GuildMember) {
    let roles: RoleResolvable[] = []

    member.roles.cache.forEach(role => {
      this.lines.forEach(line => {
        line.forEach((node: Node) => {
          let data = node.getData() as Station
          if (role.id === data.role) roles.push(role.id)
        })
      })
      this.line_categories.forEach(category => {
        if (role.id === category.role) roles.push(role.id)
      })
    })

    return roles
  }

  public async removeOldRoles(oldState: VoiceState) {
    let roles = this.getOldRoles(oldState.member!)
    await oldState.member?.roles.remove(roles)
  }

  public async addNewRoles(newState: VoiceState) {
    let roles = this.getNewRoles(newState.channel!)
    await newState.member?.roles.add(roles)
  }

  public async migrate(oldState: VoiceState, newState: VoiceState) {
    let oldRoles = this.getOldRoles(oldState.member!)
    let newRoles = this.getNewRoles(newState.channel!)

    await oldState.member?.roles.remove(oldRoles)
    await oldState.member?.roles.add(newRoles)
  }

  private addVan(vanID: Snowflake, station: string, direction: boolean) {
    this.vans.set(vanID, { station: station, diretion: direction })
  }

  private deleteVan(vanID: Snowflake) {
    this.vans.delete(vanID)
  }

  private updateVanInfo(vanID: Snowflake, station: string, direction: boolean) {
    this.vans.set(vanID, { station: station, diretion: direction })
  }

  public comingVan(station: string, direction: boolean) {
    return this.vans.some(van => van.diretion === direction && van.station === station)
  }

  public async subscribeToTrack(newChannel: GuildChannel, stationData: Node, guild: SGuild, direction: boolean) {
    let { role: stationRole, name: stationName } = stationData.getData() as Station
    this.addVan(newChannel.id, stationName, direction)

    // интервал для перемещения между станциями
    let move_interval = setInterval(() => {
      if (newChannel) {
        newChannel.overwritePermissions([
          {
            id: stationRole,
            allow: ["VIEW_CHANNEL"],
          },
          {
            id: guild.roles.everyone,
            deny: ["VIEW_CHANNEL"],
          },
        ])
        newChannel.members.forEach(member => {
          member.roles.add(stationRole)
        })
      }

      // таймаут для закрытия дверей
      setTimeout(async () => {
        // если есть следуюящая станция - получение информации о новой станции
        // иначе перенос пользователей в канал
        if (stationData[direction ? "hasNext" : "hasPrev"]()) {
          stationData = stationData[direction ? "next" : "prev"]!
          this.updateVanInfo(newChannel.id, stationData.getData<Station>().name, direction)
        } else {
          clearInterval(move_interval)
          this.deleteVan(newChannel.id)
          newChannel.members.forEach(async member => {
            await member.voice.setChannel(stationData.getData<Station>().channel)
          })
          setTimeout(() => newChannel?.delete(), 500)
          return
        }

        // если канал пустой - удаление канала
        // иначе обновление прав у канала и пользователей
        if (newChannel.members.size < 1) {
          clearInterval(move_interval)
          this.deleteVan(newChannel.id)
          setTimeout(() => newChannel?.delete(), 500)
          return
        } else {
          newChannel.overwritePermissions([
            {
              id: guild.roles.everyone,
              deny: ["VIEW_CHANNEL"],
            },
          ])
          newChannel.members.forEach(member => {
            stationRole && member.roles.remove(stationRole)
          })
        }
        stationRole = stationData?.getData<Station>().role
      }, 5000)
    }, 7000)
  }
}
