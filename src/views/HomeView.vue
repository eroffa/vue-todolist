<script setup="">
  import { onMounted } from 'vue'
  import BaseHeader from '@/components/BaseHeader.vue'
  import ActionTask from '@/components/ActionTask.vue'
  import ListTask from '@/components/ListTask.vue'
  import BasePagination from '@/components/BasePagination.vue'
  import { useTasksStore } from '@/store/tasks'

  const useTasks = useTasksStore()

  const updateTask = (task) => {
    useTasks.update(task)
  }

  onMounted(() => {
    useTasks.load()
  })
</script>

<template>
  <div class="container">
    <BaseHeader />

    <main>
      <ActionTask />
      <ListTask :tasks="useTasks.checkedTasks" @checkTask="updateTask" />
      <BasePagination v-if="useTasks.checkedTasks.length > 0" />
    </main>

    <footer class="footer">Учебный проект 2023</footer>
  </div>
</template>

<style lang="scss">
  @import '../assets/main.scss';

  .footer {
    padding: 60px 0;

    color: var(--gray-color);
    font-size: 14px;
    text-align: center;
  }
</style>
