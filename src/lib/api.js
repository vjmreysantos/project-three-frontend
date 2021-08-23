import axios from 'axios'

export function getAllEvents() {
  return axios.get('/api/events')
}

export function getSingleEvent(id) {
  return axios.get(`/api/events/${id}`)
}