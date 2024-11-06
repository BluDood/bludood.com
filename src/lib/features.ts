import { writable } from 'svelte/store'

export const features = writable(['background-animation'])

function isHolidays(date: Date = new Date()) {
  const month = date.getMonth()
  const day = date.getDate()

  return month === 11 && day >= 1 && day <= 29
}

function isNewYears(date: Date = new Date()) {
  const month = date.getMonth()
  const day = date.getDate()

  return (
    (month === 11 && day === 30) ||
    (month === 11 && day === 31) ||
    (month === 0 && day === 1)
  )
}

function isBirthday(date: Date = new Date()) {
  const month = date.getMonth()
  const day = date.getDate()

  return month === 5 && day === 9
}

if (typeof window !== 'undefined') {
  if (isHolidays()) features.update(f => [...f, 'holidays'])
  if (isNewYears()) features.update(f => [...f, 'new-years'])
  if (isBirthday()) features.update(f => [...f, 'birthday'])

  const debug = localStorage.getItem('features')

  if (debug) {
    features.update(f => [...f, ...JSON.parse(debug)])
  }
}
