import axios from 'axios'

const baseUrl = '/api'

export function getAllEvents() {
  return axios.get('/api/events')
}

export function getSingleEvent(id) {
  return axios.get(`/api/events/${id}`)
}

export function getAllOnlineEvents() {
  return axios.get(`${baseUrl}/online-events`)
}

export function getAllGroups() {
  return axios.get(`${baseUrl}/groups`)
}

export function getSingleGroup(groupId) {
  return axios.get(`${baseUrl}/groups/${groupId}`)
}

