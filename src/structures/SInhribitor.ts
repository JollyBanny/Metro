import { Inhibitor, InhibitorOptions } from "discord-akairo"
import { basename } from "path"
import { SClient } from "."

export default class SInhibitor extends Inhibitor {
  client!: SClient

  constructor(filepath: string, type?: string, priority?: number) {
    const reason = basename(filepath).slice(0, -3)
    const options: InhibitorOptions = { reason, type, priority }
    super(reason, options)
  }
}
