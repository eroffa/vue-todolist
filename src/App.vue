<script setup="">
import { computed, onMounted, ref, watch } from 'vue'
import BaseHeader from '@/components/BaseHeader.vue'
import ActionTask from '@/components/ActionTask.vue'
import ListTask from '@/components/ListTask.vue'
import BasePagination from '@/components/BasePagination.vue'
import TaskService from '@/services/TaskService'
import { useTaskStore } from '@/stores/tasks'

const { tasks, updateTask, updateTasks } = useTaskStore()

const filterTasks = ref([])

const onFilterActive = () => {
  return (filterTasks.value = tasks.filter((task) => !task.checked))
}

const onFilterCompleted = () => {
  filterTasks.value = tasks.filter((task) => task.checked)
}

const onFilterAll = () => {
  return (filterTasks.value = tasks)
}

watch(tasks, () => {
  filterTasks.value = tasks
})

const onRemoveTask = async (id) => {
  try {
    await TaskService.deleteTask(id)
    updateTask(id)
  } catch (e) {
    console.error(e.method)
  }
}

const onRemoveTasks = async () => {
  const answer = confirm('Вы точно хотите удалить все задачи?')
  if (!answer) {
    return
  }

  const ids = tasks.map((task) => task.id)
  await ids.forEach((id) => {
    onRemoveTask(id)
  })
}

const onAddTask = (task) => {
  tasks.push(task)
}

onMounted(async () => {
  try {
    const response = await TaskService.getTasks()
    updateTasks(response.data)
  } catch (e) {
    console.error(e.method)
  }
})
</script>

<template>
  <div class="container">
    <BaseHeader />

    <main>
      <ActionTask
        :tasks="filterTasks"
        @add-task="onAddTask"
        @removeTasks="onRemoveTasks"
        @filterActive="onFilterActive"
        @filterCompleted="onFilterCompleted"
        @filterAll="onFilterAll"
      />
      <ListTask :tasks="filterTasks" @removeTask="onRemoveTask" />
      <BasePagination />
    </main>

    <footer class="footer">Учебный проект 2023</footer>
  </div>
</template>

<style lang="scss">
@import './assets/main.scss';

.footer {
  padding: 60px 0;

  color: var(--gray-color);
  font-size: 14px;
  text-align: center;
}
</style>
