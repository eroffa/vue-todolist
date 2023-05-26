import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref([])

  const updateTasks = (newTasks) => {
    tasks.value.push(...newTasks)
  }

  const updateTask = (id) => {
    tasks.value.filter((task) => task.id !== id)
  }

  return {
    tasks,
    updateTasks,
    updateTask,
  }
})
