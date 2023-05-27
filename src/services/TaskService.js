import axios from 'axios'

const apiClient = axios.create({
  // baseURL: 'http://localhost:3000',
  baseURL: 'https://my-json-server.typicode.com/eroffa/vue-todolist',
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default {
  loadTasks() {
    return apiClient.get('/tasks')
  },

  updateTask(task) {
    return apiClient.put(`/tasks/${task.id}`, task)
  },

  addTask(task) {
    return apiClient.post(`/tasks`, task)
  },

  removeTask(task) {
    return apiClient.delete(`/tasks/${task.id}`)
  },
}
