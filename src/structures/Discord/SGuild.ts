import { Guild } from "discord.js"
import { SClient } from ".."
import Metro from "./Metro"

export default class SGuild extends Guild {
  public client!: SClient
  public metro!: Metro

  public options = {}
}
