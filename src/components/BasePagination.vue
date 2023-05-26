<script setup></script>

<template>
  <ul class="pagination">
    <li class="pagination__item pagination__item--active">
      <a class="pagination__link" href="#">1</a>
    </li>
    <li class="pagination__item">
      <a class="pagination__link" href="#">2</a>
    </li>
    <li class="pagination__item">
      <a class="pagination__link" href="#">3</a>
    </li>
  </ul>
</template>

<style scoped lang="scss">
@import '../assets/variables';

.pagination {
  display: flex;
  justify-content: center;
  column-gap: 15px;
  width: 100%;
  margin: 0;
  padding: 0;

  list-style: none;
}

.pagination__item {
}

.pagination__link {
  display: block;
  padding: 7px 15px;

  color: var(--black-color);
  text-decoration: none;

  background-color: var(--blue-light-color);
  border-radius: 10px;
  border: 1px solid var(--gray-light-color);

  transition: $transition;

  &:hover,
  &:focus {
    color: var(--white-color);

    background-color: var(--blue-color);
  }
}

.pagination__item--active .pagination__link {
  color: var(--white-color);

  background-color: var(--blue-color);
  border-color: transparent;
}
</style>
