export interface FilteredSpotifyCurrentPlayingResponse {
  session: true
  playing: boolean
  name: string
  trackURL: string
  artists: {
    name: string
    url: string
  }[]
  album: {
    name: string
    url: string
  }
  covers: {
    url: string
    width: number
    height: number
  }[]
  duration: {
    current: number
    total: number
  }
  device: {
    volume_percent: number
    supports_volume: boolean
  }
}

export interface NoSessionResponse {
  session: false
}

export interface DiscordPresenceResponse {
  user: {
    username: string
    globalName: string
    avatar: string
  }
  status: 'online' | 'mobile' | 'idle' | 'dnd' | 'offline'
  activities: DiscordActivity[]
}

export interface DiscordActivity {
  name: string
  details: string
  state: string
  assets: {
    largeText: string
    smallText: string
    largeImage: string
    smallImage: string
  }
  timestamps: {
    start: number | null
    end: number | null
  }
}
