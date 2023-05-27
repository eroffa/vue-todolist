<script setup>
  const props = defineProps({
    page: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      required: true
    }
  })

  const pagination = () => {
    const pages = []

    for (let i = 1; i <= Math.ceil(props.total / 20); i++) {
      pages.push(i)
    }

    return pages
  }
</script>

<template>
  <ul v-if="pagination().length > 1" class="pagination">
    <li v-for="page in pagination()" :key="page" :class="['pagination__item', {'pagination__item--active': page === props.page }]">
      <RouterLink class="pagination__link" :to="{name: 'home', query: { page: page }}">{{ page }}</RouterLink>
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
