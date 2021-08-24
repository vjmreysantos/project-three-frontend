import axios from 'axios'

export function getAllEvents() {
  return axios.get('/api/events')
}

export function getSingleEvent(id) {
  return axios.get(`/api/events/${id}`)
}

export function getAllOnlineEvents() {
  return axios.get('/api/online-events')
}
export function getSingleOnlineEvent(id) {
  return axios.get(`/api/online-events/${id}`)
}