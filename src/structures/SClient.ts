import { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler } from "discord-akairo"
import { TextChannel, Guild } from "discord.js"
import { Connection, createConnection } from "typeorm"
import { defaults, options } from "../config"

export default class SClient extends AkairoClient {
  public prefix: string
  public connection!: Connection
  public console?: TextChannel
  public guild!: Guild

  constructor() {
    super(options.client)
    this.prefix = defaults.prefix
  }

  public commandHandler = new CommandHandler(this, options.commandHandler)
  public inhibitorHandler = new InhibitorHandler(this, options.inhibitorHandler)
  public listenerHandler = new ListenerHandler(this, options.listenerHandler)

  public async _init() {
    // this.connection = await createConnection(options.database)
    this.commandHandler.useInhibitorHandler(this.inhibitorHandler).useListenerHandler(this.listenerHandler)

    this.listenerHandler.setEmitters({
      commandHandler: this.commandHandler,
      inhibitorHandler: this.inhibitorHandler,
      listenerHandler: this.listenerHandler,
    })

    this.inhibitorHandler.loadAll()
    this.listenerHandler.loadAll()
    this.commandHandler.loadAll()

    return this
  }
}
