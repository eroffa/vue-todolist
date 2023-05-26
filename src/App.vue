<script setup="">
  import BaseHeader from './components/BaseHeader.vue'
  import ActionTask from './components/ActionTask.vue'
  import ListTask from './components/ListTask.vue'
  import BasePagination from './components/BasePagination.vue'
</script>

<template>
  <div class="container">
    <BaseHeader/>

    <main>
      <ActionTask/>
      <ListTask/>
      <BasePagination/>
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
