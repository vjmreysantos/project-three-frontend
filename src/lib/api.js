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
  return axios.post(`${baseUrl}/events/${id}`, null, getHeaders())
}

export function createEvent(formData) {
  return axios.post(`${baseUrl}/events/new-event`, formData, getHeaders())
}

export function deleteEvent(id) {
  return axios.delete(`${baseUrl}/events/${id}`, getHeaders())
}

export function createEventComment(id, formData) {
  return axios.post(`${baseUrl}/events/${id}/create-comment`, formData, getHeaders())
}
 
// ONLINE EVENTS

export function getAllOnlineEvents() {
  return axios.get(`${baseUrl}/online-events`)
}
export function getSingleOnlineEvent(id) {
  return axios.get(`${baseUrl}/online-events/${id}`)
}

export function attendOnlineEvent(id) {
  return axios.post(`${baseUrl}/online-events/${id}`, null, getHeaders())
}

export function createOnlineEvent(formData) {
  return axios.post(`${baseUrl}/online-events/new-online-event`, formData, getHeaders())
}

export function deleteOnlineEvent(id) {
  return axios.delete(`${baseUrl}/online-events/${id}`, getHeaders())
}

export function createOnlineEventComment(id, formData) {
  return axios.post(`${baseUrl}/online-events/${id}/create-comment`, formData, getHeaders())
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

export function deleteGroup(id) {
  return axios.delete(`${baseUrl}/groups/${id}`, getHeaders())
}

export function joinGroup(groupId) {
  return axios.post(`${baseUrl}/groups/${groupId}`, null, getHeaders())
}

export function createGroupComment(id, formData) {
  return axios.post(`${baseUrl}/groups/${id}/create-comment`, formData, getHeaders())
}

export function deleteGroupComment(id) {
  return axios.delete(`${baseUrl}/groups/${id}`, getHeaders())
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

