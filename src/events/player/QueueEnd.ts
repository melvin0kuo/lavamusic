import type { TextChannel } from 'discord.js';
import type { Player, Track, TrackStartEvent } from 'lavalink-client';
import { Event, type Lavamusic } from '../../structures/index';
import { updateSetup } from '../../utils/SetupSystem';

import { autoPlayFunction } from '../../utils/functions/player';

export default class QueueEnd extends Event {
	constructor(client: Lavamusic, file: string) {
		super(client, file, {
			name: 'queueEnd',
		});
	}

	public async run(player: Player, _track: Track | null, _payload: TrackStartEvent): Promise<void> {
		const guild = this.client.guilds.cache.get(player.guildId);
		if (!guild) return;
		const locale = await this.client.db.getLanguage(player.guildId);
		await updateSetup(this.client, guild, locale);

		const messageId = player.get<string | undefined>('messageId');
		if (!messageId) return;

		const channel = guild.channels.cache.get(player.textChannelId!) as TextChannel;
		if (!channel) return;

		const message = await channel.messages.fetch(messageId).catch(() => {
			null;
		});
		if (!message) return;

		if (message.editable) {
			await message.edit({ components: [] }).catch(() => {
				null;
			});
		}
		// 停止進度條自動更新
		const timer = player.get('progressTimer');
		if (timer) clearInterval(timer as NodeJS.Timeout);
		player.set('progressTimer', null);

		// autoplay 類似曲目功能
		const autoplay = player.get('autoplay');
		const lastTrack = player.queue.previous?.[player.queue.previous.length - 1];
		if (autoplay && lastTrack) {
			await autoPlayFunction(player, lastTrack);
			// 若有新曲目已加入 queue，則自動播放
			if (player.queue.tracks.length > 0 && !player.playing && !player.paused) {
				player.play();
			}
		}
	}
}

/**
 * Project: lavamusic
 * Author: Appu
 * Main Contributor: LucasB25
 * Company: Coders
 * Copyright (c) 2024. All rights reserved.
 * This code is the property of Coder and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/YQsGbTwPBx
 */
