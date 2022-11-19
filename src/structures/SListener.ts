import { ListenerOptions, Listener } from "discord-akairo"
import { basename } from "path"
import { SClient } from "."

export default class SListener extends Listener {
  client!: SClient

  constructor(filepath: string, emitter: string = "client", type?: string) {
    const event = basename(filepath).slice(0, -3)
    const options: ListenerOptions = { event, emitter, type }
    super(event, options)
  }
}
