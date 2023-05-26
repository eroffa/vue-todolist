import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default {
  getTasks() {
    return apiClient.get('/tasks')
  },

  deleteTask(id) {
    return apiClient.delete(`/tasks/${id}`)
  },

  addTask(data) {
    return apiClient.post(`/tasks`, data)
  }
}
