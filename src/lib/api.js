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
}

export function createEvent(formData) {
  return axios.post(`${baseUrl}/events/new-event`, formData, getHeaders())
}

export function deleteEvent(id) {
  return axios.delete(`${baseUrl}/events/${id}`, getHeaders())
}

// ONLINE EVENTS

export function getAllOnlineEvents() {
  return axios.get('/api/online-events')
}
export function getSingleOnlineEvent(id) {
  return axios.get(`/api/online-events/${id}`)
}

export function attendOnlineEvent(id) {
  axios.post(`${baseUrl}/online-events/${id}`, getHeaders())
  window.alert('You\'re attending!')
}

export function createOnlineEvent(formData) {
  return axios.post(`${baseUrl}/online-events/new-online-event`, formData, getHeaders())
}

// GROUPS

export function getAllGroups() {
  return axios.get(`${baseUrl}/groups`)
}

export function getSingleGroup(groupId) {
  return axios.get(`${baseUrl}/groups/${groupId}`)
}

export function createGroup(formData) {
  return axios.post(`${baseUrl}/groups/new-group`, formData, getHeaders())
}

export function joinGroup(groupId) {
  return axios.post(`${baseUrl}/group/${groupId}`, getHeaders())
}

// * Auth Requests

export function registerUser(formdata) {
  return axios.post(`${baseUrl}/register`, formdata)
}

export function loginUser(formdata) {
  return axios.post(`${baseUrl}/login`, formdata)
}

export function getProfile() {
  return axios.get(`${baseUrl}/profile`, getHeaders())
}