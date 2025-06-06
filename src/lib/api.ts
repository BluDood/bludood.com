import axios from 'axios'

import type {
  DiscordPresenceResponse,
  FilteredSpotifyCurrentPlayingResponse
} from '$types/API.js'
import type { BlogPost } from '$types/blog.js'

const HOST = 'api.bludood.com'

export const API_URL = `https://${HOST}`
export const WS_URL = `wss://${HOST}/ws`

export async function fetchSpotify(): Promise<FilteredSpotifyCurrentPlayingResponse | null> {
  const res = await axios.get(`${API_URL}/spotify`, {
    validateStatus: () => true
  })

  if (res.status !== 200) return null
  if (res.data.session === false) return null
  return res.data
}

export async function fetchDiscord(): Promise<DiscordPresenceResponse | null> {
  const res = await axios.get(`${API_URL}/discord`, {
    validateStatus: () => true
  })

  if (res.status !== 200) return null
  if (res.data.status === 'offline') return null
  return res.data
}

export async function fetchPosts(
  limit?: number
): Promise<BlogPost[] | null> {
  const res = await axios.get('https://blog.bludood.com/api/posts', {
    validateStatus: () => true
  })

  if (res.status !== 200) return null
  return limit ? res.data.slice(0, limit) : res.data
}
