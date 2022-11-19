import chokidar from "chokidar"
import { basename } from "path"
import { Log, SClient } from "."

export default class ClientWatcher {
  constructor(client: SClient) {
    const handlers = [client.commandHandler, client.listenerHandler, client.inhibitorHandler]

    handlers.map(handler => {
      chokidar
        .watch(handler.directory)
        .on("add", path => {
          const name = basename(path).slice(0, -3)
          handler.load(name)
          Log.info(`${name} loaded`)
        })
        .on("unlink", path => {
          const name = basename(path).slice(0, -3)
          handler.remove(name)
          Log.info(`${name} deleted`)
        })
        .on("change", path => {
          const name = basename(path).slice(0, -3)
          try {
            handler.reload(name)
            Log.info(`${name} reloaded`)
          } catch (error) {
            if (error.code == "MODULE_NOT_FOUND") {
              handler.load(path)
              Log.info(`${name} reloaded`)
            } else console.log(error)
          }
        })
    })
  }
}
