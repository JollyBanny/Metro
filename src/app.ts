import { ShardingManager } from "kurasuta"
import { join } from "path"
import { options } from "./config"

const manager = new ShardingManager(join(__dirname, "structures", "Cluster"), options.shardingManager)
manager.setMaxListeners(0).spawn()
