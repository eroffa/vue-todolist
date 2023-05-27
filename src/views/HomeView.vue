<script setup="">
  import {onMounted, watchEffect, ref} from 'vue'
  import BaseHeader from '@/components/BaseHeader.vue'
  import ActionTask from '@/components/ActionTask.vue'
  import ListTask from '@/components/ListTask.vue'
  import BasePagination from '@/components/BasePagination.vue'
  import { useTasksStore } from '@/store/tasks'

  const props = defineProps({
    page: {
      type: Number,
      default: 1,
    }
  })

  const useTasks = useTasksStore()

  const totalTasks = ref(0)

  const updateTask = (task) => {
    useTasks.update(task)
  }

  onMounted(async () => {
    watchEffect(async () => {
      const response = await useTasks.load(20, props.page)
      totalTasks.value = parseInt(response.headers['x-total-count'])
    })
  })
</script>

<template>
  <div class="container">
    <BaseHeader />

    <main>
      <ActionTask />
      <ListTask :tasks="useTasks.checkedTasks" @checkTask="updateTask" />
      <BasePagination :page="props.page" :total="totalTasks" />
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
