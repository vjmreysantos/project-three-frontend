import axios from 'axios'
import { getToken } from './auth'
const baseUrl = '/api'

export function getHeaders() {
  return {
    headers: { Authorization: `Bearer ${getToken()}` },
  }
}

// EVENTS

export function getAllEvents() {
  return axios.get(`${baseUrl}/events`)
}

export function getSingleEvent(id) {
  return axios.get(`${baseUrl}/events/${id}`)
}

export function attendEvent(id) {
  axios.post(`${baseUrl}/events/${id}`, getHeaders())
  window.alert('You\'re attending!')
}

// ONLINE EVENTS

export function getAllOnlineEvents() {
  return axios.get(`${baseUrl}/online-events`)
}
