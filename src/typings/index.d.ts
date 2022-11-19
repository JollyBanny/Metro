import LinkedList from "dbly-linked-list"
import { AkairoHandlerOptions, AkairoOptions, CommandHandlerOptions } from "discord-akairo"
import { ClientOptions, GuildMember, Message, Snowflake, TextChannel } from "discord.js"
import { SharderOptions } from "kurasuta"
import { ConnectionOptions } from "typeorm"
import { EGuildMember } from "../entity"

export type Defaults = {
  prefix: string
  consoleChannelID: Snowflake
  mainGuild: Snowflake
}

export type Van = {
  diretion: boolean
  station: string
}

export type LineCategory = {
  category: string
  role: string
}

export type Station = {
  channel: string
  role: string
  name: string
}

export type Options = {
  shardingManager: SharderOptions
  client: AkairoOptions & ClientOptions
  commandHandler: CommandHandlerOptions
  inhibitorHandler: AkairoHandlerOptions
  listenerHandler: AkairoHandlerOptions
  database: ConnectionOptions
}

export type GuildOptions = {}

export type GuildMemberOptions = {}

export interface GuildMessage extends Message {
  channel: TextChannel
  readonly member: GuildMember
}

declare module "discord.js" {
  interface Guild {
    options: GuildOptions
  }

  interface GuildMember {
    options: GuildMemberOptions

    _fetch(): Promise<this>
    _check(data: EGuildMember): Promise<this>
  }
}
