import {useRef, useEffect} from 'react';
import gsap from 'gsap';

const pricesData = [
  {
    id: '67f4e82210b4f25cf9eea960',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Plush Pepe.tgs',
    photoUrl: 'https://fragment.com/file/gifts/plushpepe/thumb.webp',
    title: 'Plush Pepe',
    price: 451,
    historyPrice: [],
    createdAt: '2025-04-08T09:10:58.533Z',
    updatedAt: '2025-04-18T15:04:25.831Z',
  },
  {
    id: '67f4f102dec52cec76d8a706',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Durov’s Cap.tgs',
    photoUrl: 'https://fragment.com/file/gifts/durovscap/thumb.webp',
    title: 'Durov’s Cap',
    price: 108.9,
    historyPrice: [],
    createdAt: '2025-04-08T09:48:50.791Z',
    updatedAt: '2025-04-18T09:44:52.427Z',
  },
  {
    id: '67f4e82610b4f25cf9eea990',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Precious Peach.tgs',
    photoUrl: 'https://fragment.com/file/gifts/preciouspeach/thumb.webp',
    title: 'Precious Peach',
    price: 59.39,
    historyPrice: [],
    createdAt: '2025-04-08T09:11:02.803Z',
    updatedAt: '2025-04-18T11:32:59.379Z',
  },
  {
    id: '67f4330418b933099d1fb9bf',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Ion Gem.tgs',
    photoUrl: 'https://fragment.com/file/gifts/iongem/thumb.webp',
    title: 'Ion Gem',
    price: 40.15,
    historyPrice: [],
    createdAt: '2025-04-07T20:18:12.559Z',
    updatedAt: '2025-04-18T15:07:26.158Z',
  },
  {
    id: '67f4e56a2a21724220d8956e',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Astral Shard.tgs',
    photoUrl: 'https://fragment.com/file/gifts/astralshard/thumb.webp',
    title: 'Astral Shard',
    price: 25.18,
    historyPrice: [],
    createdAt: '2025-04-08T08:59:22.299Z',
    updatedAt: '2025-04-18T14:30:01.105Z',
  },
  {
    id: '67f4e81e10b4f25cf9eea930',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Perfume Bottle.tgs',
    photoUrl: 'https://fragment.com/file/gifts/perfumebottle/thumb.webp',
    title: 'Perfume Bottle',
    price: 19.8,
    historyPrice: [],
    createdAt: '2025-04-08T09:10:54.285Z',
    updatedAt: '2025-04-18T14:06:45.779Z',
  },
  {
    id: '67f4330518b933099d1fb9c7',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Mini Oscar.tgs',
    photoUrl: 'https://fragment.com/file/gifts/minioscar/thumb.webp',
    title: 'Mini Oscar',
    price: 17.6,
    historyPrice: [],
    createdAt: '2025-04-07T20:18:13.497Z',
    updatedAt: '2025-04-18T11:36:42.013Z',
  },
  {
    id: '67f4e81110b4f25cf9eea8b0',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Magic Potion.tgs',
    photoUrl: 'https://fragment.com/file/gifts/magicpotion/thumb.webp',
    title: 'Magic Potion',
    price: 13.2,
    historyPrice: [],
    createdAt: '2025-04-08T09:10:41.448Z',
    updatedAt: '2025-04-18T14:06:36.376Z',
  },
  {
    id: '67f4e84910b4f25cf9eeaaf8',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Swiss Watch.tgs',
    photoUrl: 'https://fragment.com/file/gifts/swisswatch/thumb.webp',
    title: 'Swiss Watch',
    price: 11.99,
    historyPrice: [],
    createdAt: '2025-04-08T09:11:37.055Z',
    updatedAt: '2025-04-18T14:13:33.102Z',
  },
  {
    id: '67f4e83310b4f25cf9eeaa14',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Scared Cat.tgs',
    photoUrl: 'https://fragment.com/file/gifts/scaredcat/thumb.webp',
    title: 'Scared Cat',
    price: 11.8,
    historyPrice: [],
    createdAt: '2025-04-08T09:11:15.696Z',
    updatedAt: '2025-04-18T14:53:31.309Z',
  },
  {
    id: '67f4330518b933099d1fb9c5',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Loot Bag.tgs',
    photoUrl: 'https://fragment.com/file/gifts/lootbag/thumb.webp',
    title: 'Loot Bag',
    price: 10.29,
    historyPrice: [],
    createdAt: '2025-04-07T20:18:13.285Z',
    updatedAt: '2025-04-18T14:34:35.634Z',
  },
  {
    id: '67f4e85310b4f25cf9eeab66',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Vintage Cigar.tgs',
    photoUrl: 'https://fragment.com/file/gifts/vintagecigar/thumb.webp',
    title: 'Vintage Cigar',
    price: 10.12,
    historyPrice: [],
    createdAt: '2025-04-08T09:11:47.798Z',
    updatedAt: '2025-04-18T15:05:51.634Z',
  },
  {
    id: '67f4e83c10b4f25cf9eeaa68',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Signet Ring.tgs',
    photoUrl: 'https://fragment.com/file/gifts/signetring/thumb.webp',
    title: 'Signet Ring',
    price: 9.9,
    historyPrice: [],
    createdAt: '2025-04-08T09:11:24.220Z',
    updatedAt: '2025-04-18T15:10:39.811Z',
  },
  {
    id: '67f4e83710b4f25cf9eeaa3a',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Sharp Tongue.tgs',
    photoUrl: 'https://fragment.com/file/gifts/sharptongue/thumb.webp',
    title: 'Sharp Tongue',
    price: 8.14,
    historyPrice: [],
    createdAt: '2025-04-08T09:11:19.938Z',
    updatedAt: '2025-04-18T14:21:38.028Z',
  },
  {
    id: '67f4e7e610b4f25cf9eea700',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Genie Lamp.tgs',
    photoUrl: 'https://fragment.com/file/gifts/genielamp/thumb.webp',
    title: 'Genie Lamp',
    price: 8.02,
    historyPrice: [],
    createdAt: '2025-04-08T09:09:58.500Z',
    updatedAt: '2025-04-18T10:55:42.531Z',
  },
  {
    id: '67f4330318b933099d1fb9b9',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Kissed Frog.tgs',
    photoUrl: 'https://fragment.com/file/gifts/kissedfrog/thumb.webp',
    title: 'Kissed Frog',
    price: 7.59,
    historyPrice: [],
    createdAt: '2025-04-07T20:18:11.883Z',
    updatedAt: '2025-04-18T15:01:42.171Z',
  },
  {
    id: '67f4e81510b4f25cf9eea8da',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Neko Helmet.tgs',
    photoUrl: 'https://fragment.com/file/gifts/nekohelmet/thumb.webp',
    title: 'Neko Helmet',
    price: 7.14,
    historyPrice: [],
    createdAt: '2025-04-08T09:10:45.752Z',
    updatedAt: '2025-04-18T15:09:55.044Z',
  },
  {
    id: '67f4e64510b4f25cf9ee9aec',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Eternal Rose.tgs',
    photoUrl: 'https://fragment.com/file/gifts/eternalrose/thumb.webp',
    title: 'Eternal Rose',
    price: 5.5,
    historyPrice: [],
    createdAt: '2025-04-08T09:03:01.271Z',
    updatedAt: '2025-04-18T06:10:24.634Z',
  },
  {
    id: '67f4e63c10b4f25cf9ee9ae4',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Electric Skull.tgs',
    photoUrl: 'https://fragment.com/file/gifts/electricskull/thumb.webp',
    title: 'Electric Skull',
    price: 5.17,
    historyPrice: [],
    createdAt: '2025-04-08T09:02:52.749Z',
    updatedAt: '2025-04-18T14:41:33.133Z',
  },
  {
    id: '67f4330518b933099d1fb9c3',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Diamond Ring.tgs',
    photoUrl: 'https://fragment.com/file/gifts/diamondring/thumb.webp',
    title: 'Diamond Ring',
    price: 4.73,
    historyPrice: [],
    createdAt: '2025-04-07T20:18:13.052Z',
    updatedAt: '2025-04-18T15:01:57.890Z',
  },
  {
    id: '67f4e84f10b4f25cf9eeab3c',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Toy Bear.tgs',
    photoUrl: 'https://fragment.com/file/gifts/toybear/thumb.webp',
    title: 'Toy Bear',
    price: 4.35,
    historyPrice: [],
    createdAt: '2025-04-08T09:11:43.530Z',
    updatedAt: '2025-04-18T15:05:45.341Z',
  },
  {
    id: '67f4e85510b4f25cf9eeab7e',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Voodoo Doll.tgs',
    photoUrl: 'https://fragment.com/file/gifts/voodoodoll/thumb.webp',
    title: 'Voodoo Doll',
    price: 3.23,
    historyPrice: [],
    createdAt: '2025-04-08T09:11:49.923Z',
    updatedAt: '2025-04-18T14:49:33.916Z',
  },
  {
    id: '67f4330418b933099d1fb9c1',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Love Potion.tgs',
    photoUrl: 'https://fragment.com/file/gifts/lovepotion/thumb.webp',
    title: 'Love Potion',
    price: 3.07,
    historyPrice: [],
    createdAt: '2025-04-07T20:18:12.792Z',
    updatedAt: '2025-04-18T15:07:29.286Z',
  },
  {
    id: '67f4e5702a21724220d895a6',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Berry Box.tgs',
    photoUrl: 'https://fragment.com/file/gifts/berrybox/thumb.webp',
    title: 'Berry Box',
    price: 3.06,
    historyPrice: [],
    createdAt: '2025-04-08T08:59:28.608Z',
    updatedAt: '2025-04-18T13:30:57.763Z',
  },
  {
    id: '67f4e84d10b4f25cf9eeab28',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Top Hat.tgs',
    photoUrl: 'https://fragment.com/file/gifts/tophat/thumb.webp',
    title: 'Top Hat',
    price: 2.75,
    historyPrice: [],
    createdAt: '2025-04-08T09:11:41.366Z',
    updatedAt: '2025-04-18T14:22:41.895Z',
  },
  {
    id: '67f4e5742a21724220d895ca',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Bunny Muffin.tgs',
    photoUrl: 'https://fragment.com/file/gifts/bunnymuffin/thumb.webp',
    title: 'Bunny Muffin',
    price: 2.31,
    historyPrice: [],
    createdAt: '2025-04-08T08:59:32.820Z',
    updatedAt: '2025-04-18T15:08:29.946Z',
  },
  {
    id: '67f4e82b10b4f25cf9eea9ba',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Record Player.tgs',
    photoUrl: 'https://fragment.com/file/gifts/recordplayer/thumb.webp',
    title: 'Record Player',
    price: 2.2,
    historyPrice: [],
    createdAt: '2025-04-08T09:11:07.070Z',
    updatedAt: '2025-04-18T01:44:30.139Z',
  },
  {
    id: '67f4e57b2a21724220d895e0',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Crystal Ball.tgs',
    photoUrl: 'https://fragment.com/file/gifts/crystalball/thumb.webp',
    title: 'Crystal Ball',
    price: 2.09,
    historyPrice: [],
    createdAt: '2025-04-08T08:59:39.187Z',
    updatedAt: '2025-04-18T14:56:24.631Z',
  },
  {
    id: '67f4e7f710b4f25cf9eea7a6',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Jelly Bunny.tgs',
    photoUrl: 'https://fragment.com/file/gifts/jellybunny/thumb.webp',
    title: 'Jelly Bunny',
    price: 1.98,
    historyPrice: [],
    createdAt: '2025-04-08T09:10:15.671Z',
    updatedAt: '2025-04-18T15:09:33.172Z',
  },
  {
    id: '67f4e85110b4f25cf9eeab4e',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Trapped Heart.tgs',
    photoUrl: 'https://fragment.com/file/gifts/trappedheart/thumb.webp',
    title: 'Trapped Heart',
    price: 1.98,
    historyPrice: [],
    createdAt: '2025-04-08T09:11:45.648Z',
    updatedAt: '2025-04-18T14:22:48.051Z',
  },
  {
    id: '67f69a159fadce1c3d1a665f',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Skull Flower.tgs',
    photoUrl: 'https://fragment.com/file/gifts/skullflower/thumb.webp',
    title: 'Skull Flower',
    price: 1.98,
    historyPrice: [],
    createdAt: '2025-04-09T16:02:29.949Z',
    updatedAt: '2025-04-18T11:17:34.093Z',
  },
  {
    id: '67f4e83e10b4f25cf9eeaa7a',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Sleigh Bell.tgs',
    photoUrl: 'https://fragment.com/file/gifts/sleighbell/thumb.webp',
    title: 'Sleigh Bell',
    price: 1.95,
    historyPrice: [],
    createdAt: '2025-04-08T09:11:26.342Z',
    updatedAt: '2025-04-18T12:47:37.332Z',
  },
  {
    id: '67f4e80d10b4f25cf9eea882',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Mad Pumpkin.tgs',
    photoUrl: 'https://fragment.com/file/gifts/madpumpkin/thumb.webp',
    title: 'Mad Pumpkin',
    price: 1.89,
    historyPrice: [],
    createdAt: '2025-04-08T09:10:37.136Z',
    updatedAt: '2025-04-18T14:42:33.318Z',
  },
  {
    id: '67f4330618b933099d1fb9cb',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Hanging Star.tgs',
    photoUrl: 'https://fragment.com/file/gifts/hangingstar/thumb.webp',
    title: 'Hanging Star',
    price: 1.85,
    historyPrice: [],
    createdAt: '2025-04-07T20:18:14.034Z',
    updatedAt: '2025-04-18T14:29:48.509Z',
  },
  {
    id: '67f4e80410b4f25cf9eea828',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Love Candle.tgs',
    photoUrl: 'https://fragment.com/file/gifts/lovecandle/thumb.webp',
    title: 'Love Candle',
    price: 1.79,
    historyPrice: [],
    createdAt: '2025-04-08T09:10:28.497Z',
    updatedAt: '2025-04-18T15:03:56.773Z',
  },
  {
    id: '67f4330418b933099d1fb9bb',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Sakura Flower.tgs',
    photoUrl: 'https://fragment.com/file/gifts/sakuraflower/thumb.webp',
    title: 'Sakura Flower',
    price: 1.65,
    historyPrice: [],
    createdAt: '2025-04-07T20:18:12.123Z',
    updatedAt: '2025-04-18T15:01:45.308Z',
  },
  {
    id: '67f4e84010b4f25cf9eeaa92',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Snow Globe.tgs',
    photoUrl: 'https://fragment.com/file/gifts/snowglobe/thumb.webp',
    title: 'Snow Globe',
    price: 1.65,
    historyPrice: [],
    createdAt: '2025-04-08T09:11:28.478Z',
    updatedAt: '2025-04-18T14:43:27.306Z',
  },
  {
    id: '67f4e65210b4f25cf9ee9af4',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Flying Broom.tgs',
    photoUrl: 'https://fragment.com/file/gifts/flyingbroom/thumb.webp',
    title: 'Flying Broom',
    price: 1.49,
    historyPrice: [],
    createdAt: '2025-04-08T09:03:14.091Z',
    updatedAt: '2025-04-18T15:08:58.003Z',
  },
  {
    id: '67f4e64b10b4f25cf9ee9af0',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Evil Eye.tgs',
    photoUrl: 'https://fragment.com/file/gifts/evileye/thumb.webp',
    title: 'Evil Eye',
    price: 1.42,
    historyPrice: [],
    createdAt: '2025-04-08T09:03:07.684Z',
    updatedAt: '2025-04-18T13:26:43.178Z',
  },
  {
    id: '67f4e0a2e85ad470ea4cc4de',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Jack-in-the-Box.tgs',
    photoUrl: 'https://fragment.com/file/gifts/jackinthebox/thumb.webp',
    title: 'Jack-in-the-Box',
    price: 1.31,
    historyPrice: [],
    createdAt: '2025-04-08T08:38:58.004Z',
    updatedAt: '2025-04-18T15:07:51.455Z',
  },
  {
    id: '67f4e7ef10b4f25cf9eea750',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Hex Pot.tgs',
    photoUrl: 'https://fragment.com/file/gifts/hexpot/thumb.webp',
    title: 'Hex Pot',
    price: 1.31,
    historyPrice: [],
    createdAt: '2025-04-08T09:10:07.011Z',
    updatedAt: '2025-04-18T14:05:52.326Z',
  },
  {
    id: '67f4e64110b4f25cf9ee9ae8',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Eternal Candle.tgs',
    photoUrl: 'https://fragment.com/file/gifts/eternalcandle/thumb.webp',
    title: 'Eternal Candle',
    price: 1.26,
    historyPrice: [],
    createdAt: '2025-04-08T09:02:57.014Z',
    updatedAt: '2025-04-18T14:03:59.434Z',
  },
  {
    id: '67f4330418b933099d1fb9bd',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Star Notepad.tgs',
    photoUrl: 'https://fragment.com/file/gifts/starnotepad/thumb.webp',
    title: 'Star Notepad',
    price: 1.21,
    historyPrice: [],
    createdAt: '2025-04-07T20:18:12.343Z',
    updatedAt: '2025-04-18T14:34:23.088Z',
  },
  {
    id: '67f4e84610b4f25cf9eeaade',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Spy Agaric.tgs',
    photoUrl: 'https://fragment.com/file/gifts/spyagaric/thumb.webp',
    title: 'Spy Agaric',
    price: 1.21,
    historyPrice: [],
    createdAt: '2025-04-08T09:11:34.906Z',
    updatedAt: '2025-04-18T12:30:46.219Z',
  },
  {
    id: '67f4e5792a21724220d895de',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Cookie Heart.tgs',
    photoUrl: 'https://fragment.com/file/gifts/cookieheart/thumb.webp',
    title: 'Cookie Heart',
    price: 1.2,
    historyPrice: [],
    createdAt: '2025-04-08T08:59:37.066Z',
    updatedAt: '2025-04-18T14:41:23.721Z',
  },
  {
    id: '67f4e7ea10b4f25cf9eea726',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Ginger Cookie.tgs',
    photoUrl: 'https://fragment.com/file/gifts/gingercookie/thumb.webp',
    title: 'Ginger Cookie',
    price: 1.2,
    historyPrice: [],
    createdAt: '2025-04-08T09:10:02.769Z',
    updatedAt: '2025-04-18T15:03:38.112Z',
  },
  {
    id: '67f4e82f10b4f25cf9eea9e8',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Santa Hat.tgs',
    photoUrl: 'https://fragment.com/file/gifts/santahat/thumb.webp',
    title: 'Santa Hat',
    price: 1.16,
    historyPrice: [],
    createdAt: '2025-04-08T09:11:11.333Z',
    updatedAt: '2025-04-18T14:48:36.598Z',
  },
  {
    id: '67f4e7f310b4f25cf9eea77a',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Hypno Lollipop.tgs',
    photoUrl: 'https://fragment.com/file/gifts/hypnolollipop/thumb.webp',
    title: 'Hypno Lollipop',
    price: 1.04,
    historyPrice: [],
    createdAt: '2025-04-08T09:10:11.302Z',
    updatedAt: '2025-04-18T15:03:44.394Z',
  },
  {
    id: '67f4e84410b4f25cf9eeaac6',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Spiced Wine.tgs',
    photoUrl: 'https://fragment.com/file/gifts/spicedwine/thumb.webp',
    title: 'Spiced Wine',
    price: 1.02,
    historyPrice: [],
    createdAt: '2025-04-08T09:11:32.755Z',
    updatedAt: '2025-04-18T14:01:34.750Z',
  },
  {
    id: '67f4e84210b4f25cf9eeaaaa',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Snow Mittens.tgs',
    photoUrl: 'https://fragment.com/file/gifts/snowmittens/thumb.webp',
    title: 'Snow Mittens',
    price: 0.99,
    historyPrice: [],
    createdAt: '2025-04-08T09:11:30.606Z',
    updatedAt: '2025-04-18T14:43:30.281Z',
  },
  {
    id: '67f4e84b10b4f25cf9eeab10',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Tama Gadget.tgs',
    photoUrl: 'https://fragment.com/file/gifts/tamagadget/thumb.webp',
    title: 'Tama Gadget',
    price: 0.99,
    historyPrice: [],
    createdAt: '2025-04-08T09:11:39.197Z',
    updatedAt: '2025-04-18T14:53:59.687Z',
  },
  {
    id: '67f4e7fb10b4f25cf9eea7ce',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Jester Hat.tgs',
    photoUrl: 'https://fragment.com/file/gifts/jesterhat/thumb.webp',
    title: 'Jester Hat',
    price: 0.96,
    historyPrice: [],
    createdAt: '2025-04-08T09:10:19.927Z',
    updatedAt: '2025-04-18T10:41:27.682Z',
  },
  {
    id: '67f4e85a10b4f25cf9eeabae',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Witch Hat.tgs',
    photoUrl: 'https://fragment.com/file/gifts/witchhat/thumb.webp',
    title: 'Witch Hat',
    price: 0.91,
    historyPrice: [],
    createdAt: '2025-04-08T09:11:54.189Z',
    updatedAt: '2025-04-18T14:01:50.437Z',
  },
  {
    id: '67f4e5762a21724220d895dc',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Candy Cane.tgs',
    photoUrl: 'https://fragment.com/file/gifts/candycane/thumb.webp',
    title: 'Candy Cane',
    price: 0.9,
    historyPrice: [],
    createdAt: '2025-04-08T08:59:34.943Z',
    updatedAt: '2025-04-18T15:02:43.100Z',
  },
  {
    id: '67f4330518b933099d1fb9c9',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Homemade Cake.tgs',
    photoUrl: 'https://fragment.com/file/gifts/homemadecake/thumb.webp',
    title: 'Homemade Cake',
    price: 0.88,
    historyPrice: [],
    createdAt: '2025-04-07T20:18:13.810Z',
    updatedAt: '2025-04-18T14:34:42.109Z',
  },
  {
    id: '67f4e80010b4f25cf9eea7fa',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Jingle Bells.tgs',
    photoUrl: 'https://fragment.com/file/gifts/jinglebells/thumb.webp',
    title: 'Jingle Bells',
    price: 0.88,
    historyPrice: [],
    createdAt: '2025-04-08T09:10:24.187Z',
    updatedAt: '2025-04-18T14:52:30.986Z',
  },
  {
    id: '67f4e81a10b4f25cf9eea900',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Party Sparkler.tgs',
    photoUrl: 'https://fragment.com/file/gifts/partysparkler/thumb.webp',
    title: 'Party Sparkler',
    price: 0.87,
    historyPrice: [],
    createdAt: '2025-04-08T09:10:50.024Z',
    updatedAt: '2025-04-18T15:04:19.717Z',
  },
  {
    id: '67f4e85810b4f25cf9eeab96',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Winter Wreath.tgs',
    photoUrl: 'https://fragment.com/file/gifts/winterwreath/thumb.webp',
    title: 'Winter Wreath',
    price: 0.86,
    historyPrice: [],
    createdAt: '2025-04-08T09:11:52.043Z',
    updatedAt: '2025-04-18T14:33:36.540Z',
  },
  {
    id: '67f4e80810b4f25cf9eea852',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Lunar Snake.tgs',
    photoUrl: 'https://fragment.com/file/gifts/lunarsnake/thumb.webp',
    title: 'Lunar Snake',
    price: 0.75,
    historyPrice: [],
    createdAt: '2025-04-08T09:10:32.763Z',
    updatedAt: '2025-04-18T15:04:00.048Z',
  },
  {
    id: '67f4e26680131d5870b35b43',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/B-Day Candle.tgs',
    photoUrl: 'https://fragment.com/file/gifts/bdaycandle/thumb.webp',
    title: 'B-Day Candle',
    price: 0.61,
    historyPrice: [],
    createdAt: '2025-04-08T08:46:30.062Z',
    updatedAt: '2025-04-18T14:55:55.272Z',
  },
  {
    id: '67f454d118bc166b8903fcad',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Lol Pop.tgs',
    photoUrl: 'https://fragment.com/file/gifts/lolpop/thumb.webp',
    title: 'Lol Pop',
    price: 0.55,
    historyPrice: [],
    createdAt: '2025-04-07T22:42:25.961Z',
    updatedAt: '2025-04-07T22:50:50.532Z',
  },
  {
    id: '67f4e57d2a21724220d895e2',
    animationUrl:
      'https://s3.twcstorage.ru/11b30412-gift-games/default_animation_gift/Desk Calendar.tgs',
    photoUrl: 'https://fragment.com/file/gifts/deskcalendar/thumb.webp',
    title: 'Desk Calendar',
    price: 0.55,
    historyPrice: [],
    createdAt: '2025-04-08T08:59:41.396Z',
    updatedAt: '2025-04-08T08:59:41.396Z',
  },
];
export const Roulette = () => {
  const wheelRef = useRef(null);

  useEffect(() => {
    const targetId = '67f4330518b933099d1fb9c7';
    const targetIndex = pricesData.findIndex((item) => item.id === targetId);

    const totalItems = pricesData.length;
    const anglePerItem = 360 / totalItems;
    const targetAngle = targetIndex * anglePerItem;

    const offset = anglePerItem / 2;

    const spins = 3; // full 360° spins
    const finalRotation = -(spins * 360 + targetAngle + offset + 90);

    gsap.to(wheelRef.current, {
      rotate: finalRotation,
      duration: 8,
      ease: 'power3.out',
    });
  }, []);

  const itemSize = 180;
  const spacing = 24;
  const totalArcLengthPerItem = itemSize + spacing;
  const numItems = pricesData?.length || 0;
  const anglePerItem = (2 * Math.PI) / numItems;
  const radius = Math.ceil(totalArcLengthPerItem / anglePerItem);
  const wheelSize = radius * 2;
  console.log(radius);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: 400,
          height: 400,
          border: '4px solid #ccc',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          // overflow: ' hidden',
        }}
      >
        <div
          ref={wheelRef}
          style={{
            position: 'absolute',
            top: '560%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: `${wheelSize}px`,
            height: `${wheelSize}px`,
          }}
        >
          {!!pricesData?.length &&
            pricesData.map((price, index) => {
              const angle = (index / pricesData.length) * 2 * Math.PI;
              const x = radius * Math.cos(angle);
              const y = radius * Math.sin(angle);

              const deg = (angle * 180) / Math.PI + 90;

              const normalizedDeg = (deg + 360) % 360;
              const isTop = normalizedDeg >= 345 || normalizedDeg <= 15;

              return (
                <div
                  style={{
                    position: 'absolute',
                    width: `${itemSize}px`,
                    height: `${itemSize}px`,
                    left: `${x + radius}px`,
                    top: `${y + radius}px`,
                    transform: `translate(-50%, -50%) rotate(${isTop ? 0 : deg}deg)`, // No rotation at the top
                  }}
                  key={`${price.id}-${index}`}
                  id={price.id}
                >
                  <img
                    src={price.photoUrl}
                    width={180}
                    height={180}
                    draggable={false}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
