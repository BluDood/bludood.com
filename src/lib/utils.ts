import type { FilteredSpotifyCurrentPlayingResponse } from '$types/API.js'

export function browserTest() {
  let now = new Date().getTime()
  const finish = now + 200

  let i = 0
  while (now < finish) {
    i++
    now = new Date().getTime()
  }

  return i < 200000
}

export function getClosestCover(
  spotify: FilteredSpotifyCurrentPlayingResponse,
  size: number
) {
  const covers = spotify.covers
  const closest = covers.reduce((prev, curr) =>
    Math.abs(curr.width - size) < Math.abs(prev.width - size) ? curr : prev
  )

  return closest.url
}
