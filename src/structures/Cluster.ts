import { BaseCluster } from "kurasuta"
import { SClient } from "."
import { production, token } from "../config"
import ClientWatcher from "./ClientWatcher"

export default class Cluster extends BaseCluster {
  public client!: SClient

  async launch() {
    const client = await this.client._init()
    await client.login(token)

    !production && new ClientWatcher(client)
  }
}
