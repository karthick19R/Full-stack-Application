import {jwtDecode} from 'jwt-decode'

export function getToken() {
  const match = document.cookie.match(/(^| )token=([^;]+)/)
  return match ? decodeURIComponent(match[2]) : null
}
export function decodeToken() {
  const token = getToken()
  if (!token) return null
  try {
    return jwtDecode(token)
  } catch (error) {
    console.log("Invalid token")
    return null
  }
}
