"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/commands/config/Prefix.ts
var Prefix_exports = {};
__export(Prefix_exports, {
  default: () => Prefix
});
module.exports = __toCommonJS(Prefix_exports);

// src/structures/Command.ts
var Command = class {
  static {
    __name(this, "Command");
  }
  client;
  name;
  name_localizations;
  description;
  description_localizations;
  aliases;
  cooldown;
  args;
  vote;
  player;
  permissions;
  slashCommand;
  options;
  category;
  constructor(client, options2) {
    this.client = client;
    this.name = options2.name;
    this.name_localizations = options2.name_localizations ?? {};
    this.description = {
      content: options2.description?.content ?? "No description provided",
      usage: options2.description?.usage ?? "No usage provided",
      examples: options2.description?.examples ?? [
        "No examples provided"
      ]
    };
    this.description_localizations = options2.description_localizations ?? {};
    this.aliases = options2.aliases ?? [];
    this.cooldown = options2.cooldown ?? 3;
    this.args = options2.args ?? false;
    this.vote = options2.vote ?? false;
    this.player = {
      voice: options2.player?.voice ?? false,
      dj: options2.player?.dj ?? false,
      active: options2.player?.active ?? false,
      djPerm: options2.player?.djPerm ?? null
    };
    this.permissions = {
      dev: options2.permissions?.dev ?? false,
      client: options2.permissions?.client ?? [
        "SendMessages",
        "ViewChannel",
        "EmbedLinks"
      ],
      user: options2.permissions?.user ?? []
    };
    this.slashCommand = options2.slashCommand ?? false;
    this.options = options2.options ?? [];
    this.category = options2.category ?? "general";
  }
  async run(_client, _message, _args) {
    return await Promise.resolve();
  }
};

// src/structures/Context.ts
var import_discord2 = require("discord.js");

// src/env.ts
var import_node_path = __toESM(require("path"));
var import_dotenv = require("dotenv");
var import_zod = require("zod");
(0, import_dotenv.config)({
  path: import_node_path.default.join(__dirname, "../.env")
});
var LavalinkNodeSchema = import_zod.z.object({
  id: import_zod.z.string(),
  host: import_zod.z.string(),
  port: import_zod.z.number(),
  authorization: import_zod.z.string(),
  secure: import_zod.z.preprocess((val) => val === "true" || val === "false" ? val === "true" : val, import_zod.z.boolean().optional()),
  sessionId: import_zod.z.string().optional(),
  regions: import_zod.z.string().array().optional(),
  retryAmount: import_zod.z.number().optional(),
  retryDelay: import_zod.z.number().optional(),
  requestSignalTimeoutMS: import_zod.z.number().optional(),
  closeOnError: import_zod.z.boolean().optional(),
  heartBeatInterval: import_zod.z.number().optional(),
  enablePingOnStatsCheck: import_zod.z.boolean().optional()
});
var envSchema = import_zod.z.object({
  TOKEN: import_zod.z.string(),
  CLIENT_ID: import_zod.z.string(),
  DEFAULT_LANGUAGE: import_zod.z.string().default("EnglishUS"),
  PREFIX: import_zod.z.string().default("!"),
  OWNER_IDS: import_zod.z.preprocess((val) => typeof val === "string" ? JSON.parse(val) : val, import_zod.z.string().array().optional()),
  GUILD_ID: import_zod.z.string().optional(),
  TOPGG: import_zod.z.string().optional(),
  KEEP_ALIVE: import_zod.z.preprocess((val) => val === "true", import_zod.z.boolean().default(false)),
  LOG_CHANNEL_ID: import_zod.z.string().optional(),
  LOG_COMMANDS_ID: import_zod.z.string().optional(),
  BOT_STATUS: import_zod.z.preprocess((val) => {
    if (typeof val === "string") {
      return val.toLowerCase();
    }
    return val;
  }, import_zod.z.enum([
    "online",
    "idle",
    "dnd",
    "invisible"
  ]).default("online")),
  BOT_ACTIVITY: import_zod.z.string().default("Lavamusic"),
  BOT_ACTIVITY_TYPE: import_zod.z.preprocess((val) => {
    if (typeof val === "string") {
      return Number.parseInt(val, 10);
    }
    return val;
  }, import_zod.z.number().default(0)),
  DATABASE_URL: import_zod.z.string().optional(),
  SEARCH_ENGINE: import_zod.z.preprocess((val) => {
    if (typeof val === "string") {
      return val.toLowerCase();
    }
    return val;
  }, import_zod.z.enum([
    "youtube",
    "youtubemusic",
    "soundcloud",
    "spotify",
    "apple",
    "deezer",
    "yandex",
    "jiosaavn"
  ]).default("youtube")),
  NODES: import_zod.z.preprocess((val) => typeof val === "string" ? JSON.parse(val) : val, import_zod.z.array(LavalinkNodeSchema)),
  GENIUS_API: import_zod.z.string().optional()
});
var env = envSchema.parse(process.env);
for (const key in env) {
  if (!(key in env)) {
    throw new Error(`Missing env variable: ${key}. Please check the .env file and try again.`);
  }
}

// src/structures/I18n.ts
var import_i18n = __toESM(require("i18n"));
var import_discord = require("discord.js");

// src/structures/Logger.ts
var import_signale = __toESM(require("signale"));
var { Signale } = import_signale.default;
var options = {
  disabled: false,
  interactive: false,
  logLevel: "info",
  scope: "Lavamusic",
  types: {
    info: {
      badge: "\u2139",
      color: "blue",
      label: "info"
    },
    warn: {
      badge: "\u26A0",
      color: "yellow",
      label: "warn"
    },
    error: {
      badge: "\u2716",
      color: "red",
      label: "error"
    },
    debug: {
      badge: "\u{1F41B}",
      color: "magenta",
      label: "debug"
    },
    success: {
      badge: "\u2714",
      color: "green",
      label: "success"
    },
    log: {
      badge: "\u{1F4DD}",
      color: "white",
      label: "log"
    },
    pause: {
      badge: "\u23F8",
      color: "yellow",
      label: "pause"
    },
    start: {
      badge: "\u25B6",
      color: "green",
      label: "start"
    }
  }
};
var Logger = class extends Signale {
  static {
    __name(this, "Logger");
  }
  constructor() {
    super(options);
  }
};

// src/structures/I18n.ts
var logger = new Logger();

// src/structures/Lavamusic.ts
var import_node_fs2 = __toESM(require("fs"));
var import_node_path3 = __toESM(require("path"));
var import_sdk = require("@top-gg/sdk");
var import_discord4 = require("discord.js");
var import_discord5 = require("discord.js");

// src/database/server.ts
var import_client = require("@prisma/client");

// src/plugin/index.ts
var import_node_fs = __toESM(require("fs"));
var import_node_path2 = __toESM(require("path"));
var pluginsFolder = import_node_path2.default.join(process.cwd(), "dist", "plugin", "plugins");

// src/utils/Utils.ts
var import_discord3 = require("discord.js");

// src/structures/LavalinkClient.ts
var import_lavalink_client = require("lavalink-client");

// src/commands/config/Prefix.ts
var Prefix = class extends Command {
  static {
    __name(this, "Prefix");
  }
  constructor(client) {
    super(client, {
      name: "prefix",
      description: {
        content: "cmd.prefix.description",
        examples: [
          "prefix set !",
          "prefix reset"
        ],
        usage: "prefix"
      },
      category: "general",
      aliases: [
        "pf"
      ],
      cooldown: 3,
      args: true,
      vote: false,
      player: {
        voice: false,
        dj: false,
        active: false,
        djPerm: null
      },
      permissions: {
        dev: false,
        client: [
          "SendMessages",
          "ReadMessageHistory",
          "ViewChannel",
          "EmbedLinks"
        ],
        user: [
          "ManageGuild"
        ]
      },
      slashCommand: true,
      options: [
        {
          name: "set",
          description: "cmd.prefix.options.set",
          type: 1,
          options: [
            {
              name: "prefix",
              description: "cmd.prefix.options.prefix",
              type: 3,
              required: true
            }
          ]
        },
        {
          name: "reset",
          description: "cmd.prefix.options.reset",
          type: 1
        }
      ]
    });
  }
  async run(client, ctx, args) {
    const embed = client.embed().setColor(this.client.color.main);
    const guildId = ctx.guild.id;
    const guildData = await client.db.get(guildId);
    const isInteraction = ctx.isInteraction;
    let subCommand;
    let prefix;
    if (isInteraction) {
      subCommand = ctx.options.getSubCommand();
      prefix = ctx.options.get("prefix")?.value?.toString();
    } else {
      subCommand = args[0] || "";
      prefix = args[1] || "";
    }
    switch (subCommand) {
      case "set": {
        if (!prefix) {
          const currentPrefix = guildData ? guildData.prefix : client.env.PREFIX;
          embed.setDescription(ctx.locale("cmd.prefix.messages.current_prefix", {
            prefix: currentPrefix
          }));
          return await ctx.sendMessage({
            embeds: [
              embed
            ]
          });
        }
        if (prefix.length > 3) {
          embed.setDescription(ctx.locale("cmd.prefix.errors.prefix_too_long"));
          return await ctx.sendMessage({
            embeds: [
              embed
            ]
          });
        }
        await client.db.setPrefix(guildId, prefix);
        embed.setDescription(ctx.locale("cmd.prefix.messages.prefix_set", {
          prefix
        }));
        return await ctx.sendMessage({
          embeds: [
            embed
          ]
        });
      }
      case "reset": {
        const defaultPrefix = client.env.PREFIX;
        await client.db.setPrefix(guildId, defaultPrefix);
        embed.setDescription(ctx.locale("cmd.prefix.messages.prefix_reset", {
          prefix: defaultPrefix
        }));
        return await ctx.sendMessage({
          embeds: [
            embed
          ]
        });
      }
      default: {
        const currentPrefix = guildData ? guildData.prefix : client.env.PREFIX;
        embed.setDescription(ctx.locale("cmd.prefix.messages.current_prefix", {
          prefix: currentPrefix
        }));
        return await ctx.sendMessage({
          embeds: [
            embed
          ]
        });
      }
    }
  }
};
