import dotenv from "dotenv"
import { join } from "path"
import { OwnersID } from "./constants"
import { SClient } from "./structures"
import { Defaults, Options } from "./typings"

dotenv.config({ path: join(__dirname, ".env") })

export const production = process.env.NODE_ENV === "production"

export const token = process.env.DISCORD_TOKEN as string

export const defaults: Defaults = {
  prefix: process.env.DISCORD_PREFIX as string,
  consoleChannelID: "941918773932355587",
  mainGuild: "941918773932355584",
}

// export const metro = {
//   blue: {
//     station_1: { channel: "941918773932355588", role: "942749712711307314", name: "Парнас" }, // Парнас
//     station_2: { channel: "942369499800289301", role: "942749714397401169", name: "Проспект просвещения" }, // Проспект просвещения
//     station_3: { channel: "942369549242740739", role: "942749715995455508", name: "Озерки" }, // Озерки
//     station_4: { channel: "942369645581713408", role: "942749717543137291", name: "Удельная" }, // Удельная
//     station_5: { channel: "942369690930524180", role: "942749718851747851", name: "Пионерская" }, // Пионерская
//     station_6: { channel: "942369773356998656", role: "942749720936316928", name: "Черная речка" }, // Черная речка
//     station_7: { channel: "942369813567774740", role: "942749722479837234", name: "Петроградская" }, // Петроградская
//     station_8: { channel: "942369900620562452", role: "942749724237242388", name: "Горьковская" }, // Горьковская
//     station_9: { channel: "942370025023602688", role: "942749725944332318", name: "Невский проспект" }, // Невский проспект
//     station_10: { channel: "942370220675301446", role: "942749727651414016", name: "Сенная площадь" }, // Сенная площадь
//     station_11: { channel: "942370528948277308", role: "942749729438191626", name: "Тех. институт" }, // Тех. институт
//     station_12: { channel: "942370596157804545", role: "942749731006844978", name: "Фрунзенская" }, // Фрунзенская
//     station_13: { channel: "942370667771338852", role: "942749732193857537", name: "Московские ворота" }, // Московские ворота
//     station_14: { channel: "942370723144532038", role: "942749734102265867", name: "Электросила" }, // Электросила
//     station_15: { channel: "942370772649902120", role: "942749735717048322", name: "Парк победы" }, // Парк победы
//     station_16: { channel: "942370862072467497", role: "942749737352822824", name: "Московская" }, // Московская
//     station_17: { channel: "942370922583707668", role: "942749739185745940", name: "Звездная" }, // Звездная
//     station_18: { channel: "942370948751982653", role: "942749740603441183", name: "Купчино" }, // Купчино
//   },
// }
export const lines = [
  { category: "941918773932355586", role: "942704013172957185" }, // голубая ветка
  { category: "941919329551794206", role: "942753335600103475" }, // зеленая ветка
]
export const metro = {
  blue: {
    stations: [
      { channel: "941918773932355588", role: "942749712711307314", name: "Парнас" }, // Парнас
      { channel: "942369499800289301", role: "942749714397401169", name: "Проспект просвещения" }, // Проспект просвещения
      { channel: "942369549242740739", role: "942749715995455508", name: "Озерки" }, // Озерки
      { channel: "942369645581713408", role: "942749717543137291", name: "Удельная" }, // Удельная
      { channel: "942369690930524180", role: "942749718851747851", name: "Пионерская" }, // Пионерская
      { channel: "942369773356998656", role: "942749720936316928", name: "Черная речка" }, // Черная речка
      { channel: "942369813567774740", role: "942749722479837234", name: "Петроградская" }, // Петроградская
      { channel: "942369900620562452", role: "942749724237242388", name: "Горьковская" }, // Горьковская
      { channel: "942370025023602688", role: "942749725944332318", name: "Невский проспект" }, // Невский проспект
      { channel: "942370220675301446", role: "942749727651414016", name: "Сенная площадь" }, // Сенная площадь
      { channel: "942370528948277308", role: "942749729438191626", name: "Тех. институт" }, // Тех. институт
      { channel: "942370596157804545", role: "942749731006844978", name: "Фрунзенская" }, // Фрунзенская
      { channel: "942370667771338852", role: "942749732193857537", name: "Московские ворота" }, // Московские ворота
      { channel: "942370723144532038", role: "942749734102265867", name: "Электросила" }, // Электросила
      { channel: "942370772649902120", role: "942749735717048322", name: "Парк победы" }, // Парк победы
      { channel: "942370862072467497", role: "942749737352822824", name: "Московская" }, // Московская
      { channel: "942370922583707668", role: "942749739185745940", name: "Звездная" }, // Звездная
      { channel: "942370948751982653", role: "942749740603441183", name: "Купчино" }, // Купчино
    ],
  },
  green: {
    stations: [
      { channel: "942371324632920084", role: "943947870913048617", name: "Беговая" }, // Беговая
      { channel: "942371382614958100", role: "943947872519467028", name: "Зенит" }, // Зенит
      { channel: "942371455017033739", role: "943947874037801030", name: "Приморская" }, // Приморская
      { channel: "942371795711971398", role: "943947875451293716", name: "Гостиный двор" }, // Гостиный двор
      { channel: "942371837088792586", role: "943947876525031425", name: "Маяковская" }, // Маяковская
      { channel: "942371932907638874", role: "943947878320209982", name: "Площадь А. Невского II" }, // Площадь А. Невского II
      { channel: "942372057855983626", role: "943947880157306880", name: "Елизаровская" }, // Елизаровская
      { channel: "942372117549305866", role: "943947881344282626", name: "Ломоносовская" }, // Ломоносовская
      { channel: "942372158473129996", role: "943947883038793758", name: "Пролетраская" }, // Пролетраская
      { channel: "942372253885145118", role: "943947884536135720", name: "Обухово" }, // Обухово
      { channel: "942372305672224828", role: "943947885962223657", name: "Рыбацкое" }, // Рыбацкое
    ],
  },
}

export const options: Options = {
  shardingManager: {
    token,
    shardCount: "auto",
    development: !production,
    client: SClient,
    respawn: true,
  },

  client: {
    ownerID: [OwnersID.Name],
    disableMentions: "everyone",
    partials: ["CHANNEL", "MESSAGE", "REACTION"],
  },

  commandHandler: {
    directory: join(__dirname, "commands"),
    allowMention: true,
    automateCategories: true,
    blockBots: true,
    blockClient: true,
    defaultCooldown: production ? 3000 : 0,
    prefix: defaults.prefix,
  },

  inhibitorHandler: {
    directory: join(__dirname, "inhibitors"),
    automateCategories: true,
  },

  listenerHandler: {
    directory: join(__dirname, "listeners"),
    automateCategories: true,
  },

  database: {
    name: "default",
    type: process.env.DB_TYPE as any,
    host: process.env.DB_HOST as string,
    username: process.env.DB_USERNAME as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_DATABASE as string,
    port: process.env.DB_PORT as any,
    synchronize: true,
    logging: false,
    cache: false,
    entities: [join(__dirname, "entity/**/*{.ts,.js}")],
    migrations: [join(__dirname, "migration/**/*{.ts,.js}")],
    subscribers: [join(__dirname, "subscriber/**/*{.ts,.js}")],
  },
}
