import {ref, watch} from 'vue'
import { defineStore } from 'pinia'
import TaskService from '@/services/TaskService'

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref([])
  const checkedTasks = ref([])

  watch(tasks, () => {
    checkedTasks.value = tasks.value
  })

  const load = async () => {
    try {
      const response = await TaskService.loadTasks()
      tasks.value = response.data
    } catch (e) {
      console.error(e.message)
    }
  }

  const update = async ({ task, event }) => {
    try {
      task.checked = event.target.checked
      await TaskService.updateTask(task)
    } catch (e) {
      console.error(e.message)
    }
  }

  const add = async (task) => {
    try {
      tasks.value.push(task)
      await TaskService.addTask(task)
    } catch (e) {
      console.error(e.message)
    }
  }

  const remove = async (task) => {
    try {
      await TaskService.removeTask(task)
      tasks.value = tasks.value.filter(item => item !== task)
    } catch (e) {
      console.error(e.message)
    }
  }

  const removeAll = async () => {
    try {
      for (const task of tasks.value) {
        await TaskService.removeTask(task)
      }
      tasks.value = []
    } catch (e) {
      console.error(e.message)
    }
  }

  return {
    tasks,
    checkedTasks,
    load,
    update,
    add,
    remove,
    removeAll,
  }
})
