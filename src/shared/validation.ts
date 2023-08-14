'use strict'

export function isValidDateString (date: string) {
  return !isNaN(Date.parse(date))
}
