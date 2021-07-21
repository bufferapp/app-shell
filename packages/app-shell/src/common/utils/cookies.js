export const DATES = {
  inMonthsFromNow(months) {
    const now = new Date()
    return new Date(now.setMonth(now.getMonth() + months));
  },
  inDaysFromNow(days) {
    const now = new Date()
    return new Date(now.setHours(now.getHours() + (days * 24)));
  }
}

export function setCookie({ key, value, expires }) {
  document.cookie = `appshell_${key}=${value};path=/;expires=${expires.toUTCString()}`
}

export function getCookie({ key }) {
  const regex = new RegExp(`appshell_${key}=(\\w+)`, "g")
  const cookie = document.cookie.match(regex) || [null]
  const [k, value] = cookie[0]?.split("=") || [null, false] // eslint-disable-line no-unused-vars
  return value
}
