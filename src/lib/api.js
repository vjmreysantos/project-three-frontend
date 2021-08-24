import axios from 'axios'

const baseUrl = '/api'

export function getAllOnlineEvents() {
  return axios.get(`${baseUrl}/online-events`)
}
