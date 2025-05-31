<script lang="ts">
  import Fa from 'svelte-fa'
  import { onDestroy, onMount } from 'svelte'

  import { WS_URL, fetchPosts } from '$lib/api.js'
  import { features } from '$lib/features.js'
  import { getClosestCover } from '$lib/utils.js'

  import type {
    DiscordPresenceResponse,
    FilteredSpotifyCurrentPlayingResponse
  } from '$types/API.js'
  import type { BlogPost } from '$types/blog.js'

  import DiscordStatusGlyph from '$components/DiscordStatusGlyph.svelte'
  import AnimateHeight from '$components/AnimateHeight.svelte'
  import Twemoji from '$components/Twemoji.svelte'

  import {
    faGithub,
    faYoutube,
    faDiscord,
    faSpotify,
    faBluesky
  } from '@fortawesome/free-brands-svg-icons'
  import { faPause } from '@fortawesome/free-solid-svg-icons'

  let spotify: FilteredSpotifyCurrentPlayingResponse | null = null
  let discord: DiscordPresenceResponse | null = null
  let posts: BlogPost[] | null = null
  let ws: WebSocket | null = null

  onMount(() => {
    fetchPosts(3).then(data => {
      posts = data
    })

    ws = new WebSocket(WS_URL)

    ws.onmessage = event => {
      const data = JSON.parse(event.data)

      if (data.type === 'spotify') {
        spotify = data.data as FilteredSpotifyCurrentPlayingResponse
      } else if (data.type === 'discord') {
        discord = data.data as DiscordPresenceResponse
      }
    }

    ws.onerror = e => console.error(e)

    setInterval(() => {
      if (spotify?.playing) spotify.duration.current += 500
    }, 500)
  })

  onDestroy(() => ws?.close())
</script>

<svelte:head>
  <title>BluDood - Home</title>
  <meta name="description" content="BluDood - Home" />
</svelte:head>

<section>
  <div class="header">
    <img
      src="/assets/images/BluDood_128.png"
      alt="BluDood Avatar"
      aria-hidden="true"
      on:click={e => {
        e.currentTarget.animate(
          [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }],
          {
            duration: 5000,
            iterations: 1,
            easing: 'ease-in-out',
            composite: 'add'
          }
        )
      }}
    />
    <h1>BluDood</h1>
    <p aria-label="Fullstack developer from Norway">
      Full-stack developer from <Twemoji space emoji="🇳🇴" />
    </p>

    {#if $features.includes('birthday')}
      <p>It's my birthday today! 🎉</p>
    {/if}
    <div class="links">
      <a
        aria-label="Link to my GitHub profile"
        data-brand="github"
        href="https://github.com/BluDood"
      >
        <Fa icon={faGithub} />
      </a>
      <a
        aria-label="Link to my Discord server"
        data-brand="discord"
        href="https://discord.bludood.com"
      >
        <Fa icon={faDiscord} />
      </a>
      <a
        aria-label="Link to my YouTube channel"
        data-brand="youtube"
        href="https://youtube.com/@BluDood"
      >
        <Fa icon={faYoutube} />
      </a>
      <a
        aria-label="Link to my Bluesky profile"
        data-brand="bluesky"
        href="https://bsky.app/profile/bludood.com"
      >
        <Fa icon={faBluesky} />
      </a>
    </div>
  </div>
  <div class="content">
    {#if spotify || discord}
      <div class="status">
        {#if spotify && spotify.session}
          <AnimateHeight>
            <div class="spotify">
              <div class="icon">
                <Fa icon={faSpotify} />
              </div>
              <div class="paused" style:opacity={spotify.playing ? 0 : 1}>
                <Fa icon={faPause} />
              </div>
              <div class="progress">
                <div
                  class="bar"
                  style:width="{(spotify.duration.current /
                    spotify.duration.total) *
                    100}%"
                ></div>
              </div>
              <img
                src={getClosestCover(spotify, 50)}
                alt="Cover for currently playing track"
              />
              <div class="info">
                <a
                  class="trackName"
                  target="_blank"
                  href={spotify.trackURL}
                >
                  {spotify.name}
                </a>
                <span class="artists">
                  {#each spotify.artists as artist}
                    <a target="_blank" href={artist.url}>{artist.name}</a>
                  {/each}
                </span>
              </div>
            </div>
          </AnimateHeight>
        {/if}
        {#if discord}
          <AnimateHeight>
            <div class="discord">
              <div class="icon">
                <Fa icon={faDiscord} />
              </div>
              <div class="user">
                <div class="avatar">
                  <img src={`${discord.user.avatar}?size=64`} alt="" />
                  <div class="status">
                    <DiscordStatusGlyph status={discord.status} />
                  </div>
                </div>
                <span>{discord.user.globalName}</span>
              </div>
              {#if discord.activities.length !== 0}
                <div class="activity">
                  <img
                    src={discord.activities[0].assets.largeImage}
                    alt=""
                  />
                  <div class="text">
                    <span class="bold">
                      {discord.activities[0].name ?? ''}
                    </span>
                    <span>{discord.activities[0].details ?? ''}</span>
                    <span>{discord.activities[0].state ?? ''}</span>
                  </div>
                </div>
              {/if}
            </div>
          </AnimateHeight>
        {/if}
      </div>
    {/if}
    {#if posts}
      <AnimateHeight>
        <div class="blog">
          {#each posts as post}
            <a
              target="_blank"
              href={`https://blog.bludood.com/${post.id}`}
              class="post"
              aria-label={`Blog post: ${post.title}`}
            >
              <span class="title">{post.title}</span>
              <span class="date"
                >{new Date(post.created * 1000).toLocaleDateString()}</span
              >
              <span class="summary">{post.summary}</span>
            </a>
          {/each}
          <a class="post more" href="/blog"> Read more... </a>
        </div>
      </AnimateHeight>
    {/if}
  </div>
  <div class="status">
    <div class="cta">
      <h2>Looking for more?</h2>
      <div>
        <a href="/projects">Projects</a>
        <a href="/blog">Blog</a>
        <a href="/contact">Contact</a>
      </div>
    </div>
  </div>
</section>

<style>
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-top: 50px;
    margin-bottom: 30px;
    gap: 10px;
  }

  .header > img {
    height: 128px;
    width: 128px;
    border-radius: 50%;
    color: transparent;
    cursor: pointer;
    transition: box-shadow 500ms ease;
  }

  .header > img:hover {
    box-shadow: 0 0 50px 0 var(--accent);
  }

  .header h1 {
    font-size: 50px;
  }

  .header p {
    font-weight: 600;
    display: flex;
    align-items: center;
  }

  .header p img {
    height: 22px;
    width: 22px;
    margin-left: 10px;
    vertical-align: middle;
  }

  .header .links {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-top: 5px;
  }

  .header .links a {
    display: flex;
    color: inherit;
    font-size: 24px;
  }

  .header .links a[data-brand='github'] {
    color: vaR(--github);
  }

  .header .links a[data-brand='bluesky'] {
    color: var(--bluesky);
  }

  .header .links a[data-brand='youtube'] {
    position: relative;
    color: var(--youtube);
  }

  .header .links a[data-brand='youtube']::before {
    display: block;
    content: '';
    position: absolute;
    background: white;
    width: 15px;
    height: 10px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
  }

  .header .links a[data-brand='discord'] {
    color: var(--discord);
  }

  .content {
    display: flex;
    justify-content: center;
    gap: 10px;
  }

  .content .status {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .spotify {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    background: var(--background-sec);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    padding: 10px;
    border-radius: 10px;
    width: 300px;
  }

  .spotify .icon {
    position: absolute;
    top: 0;
    right: 0;
    margin: 10px;
    color: var(--spotify);
  }

  .spotify img {
    width: 50px;
    height: 50px;
    border-radius: 5px;
  }

  .spotify .paused {
    position: absolute;
    bottom: 0;
    right: 2px;
    margin: 10px;
    transition: opacity 200ms ease;
  }

  .spotify .info {
    display: flex;
    flex-direction: column;
  }

  .spotify .info .trackName {
    font-size: 18px;
    cursor: pointer;
    color: inherit;
    text-decoration: none;

    display: inline-block;
    width: calc(200px);
    white-space: nowrap;
    overflow: hidden !important;
    text-overflow: ellipsis;
  }

  .spotify .info .artists {
    line-height: 12px;
    width: 220px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .spotify .info .artists a {
    font-size: 12px;
    color: inherit;
    text-decoration: none;
  }

  .spotify .info .artists a::after {
    content: ',';
    margin-right: 5px;
  }

  .spotify .info .artists a:last-child::after {
    content: '';
  }

  .spotify .progress {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
  }

  .spotify .progress .bar {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: var(--accent);
    transition: width 200ms ease;
  }

  .discord {
    position: relative;
    display: flex;
    flex-direction: column;
    background: var(--background-sec);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    padding: 10px;
    border-radius: 10px;
    width: 300px;
  }

  .discord .icon {
    position: absolute;
    top: 0;
    right: 0;
    margin: 10px;
    color: var(--discord);
  }

  .discord .user {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .discord .user > span {
    font-size: 18px;
  }

  .discord .avatar {
    position: relative;
    height: 50px;
  }

  .discord .avatar img {
    height: 50px;
    width: 50px;
    border-radius: 50%;
  }

  .discord .avatar .status {
    position: absolute;
    bottom: 0;
    right: 0;
    height: 26px;
    width: 26px;
    background-color: var(--background-sec);
    border-radius: 50%;
    top: 28px;
    left: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .discord .activity {
    display: flex;
    width: 100%;
    gap: 10px;
    margin-top: 10px;
  }

  .discord .activity img {
    width: 72px;
    height: 72px;
    border-radius: 10px;
  }

  .discord .activity .text {
    display: flex;
    flex-direction: column;
    max-width: calc(100% - 80px);
    font-size: 14px;
  }

  .discord .activity span {
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .discord .activity span.bold {
    font-weight: bold;
  }

  .blog {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .blog .post {
    display: flex;
    flex-direction: column;
    background: var(--background-sec);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    padding: 15px;
    border-radius: 10px;
    cursor: pointer;
    color: inherit;
    text-decoration: none;
    width: 350px;
    border: 1px solid transparent;
    transition: border 200ms ease;
  }

  .blog .post:hover {
    border-color: var(--border-active);
  }

  .blog .post .title {
    font-weight: 700;
    font-size: 18px;
  }

  .blog .post .date {
    font-size: 14px;
  }

  .blog .post .summary {
    color: var(--text-sec);
    font-size: 14px;
  }

  .blog .more {
    text-align: center;
    font-weight: 700;
  }

  .cta {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px 0;
  }

  .cta h2 {
    font-size: 26px;
    padding-bottom: 20px;
  }

  .cta > div {
    display: flex;
    padding: 0 20px;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }

  .cta a {
    background: var(--background-sec);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    padding: 10px 25px;
    color: inherit;
    text-decoration: none;
    border-radius: 5px;
    border: 1px solid transparent;
    transition: border 200ms ease;
  }

  .cta a:hover {
    border-color: var(--border-active);
  }

  @media screen and (max-width: 750px) {
    .content {
      flex-direction: column;
      align-items: center;
    }

    .spotify,
    .discord {
      width: 350px;
    }

    .blog {
      margin-top: 10px;
    }
  }
</style>
