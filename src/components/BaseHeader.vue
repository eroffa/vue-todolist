<script setup>

</script>

<template>
  <header class="header">
    <h1 class="header__title">Простой To-Do List</h1>
    <p class="header__desc">Чем бы полезным сегодня заняться?<br>Съесть слона по кусочкам!</p>
  </header>
</template>

<style scoped lang="scss">
  .header {
    padding: 40px 0;

    text-align: center;
  }

  .header__title {
    margin: 0 0 15px;

    font-weight: bold;
    font-size: 28px;
  }

  .header__desc {
    margin: 0;

    color: var(--gray-color);
  }
</style>
