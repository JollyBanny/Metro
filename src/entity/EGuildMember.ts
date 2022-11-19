import { Snowflake } from "discord.js"
import { BaseEntity, Entity, Index, PrimaryColumn } from "typeorm"

@Entity()
export default class GuildMember extends BaseEntity {
  @Index()
  @PrimaryColumn("char", { length: 18 })
  guildID!: Snowflake

  @Index()
  @PrimaryColumn("char", { length: 18 })
  userID!: Snowflake
}
