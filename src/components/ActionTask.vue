<script setup>
  import {onBeforeUpdate, onMounted, ref} from 'vue'
  import {useTasksStore} from '@/store/tasks'

  const useTasks = useTasksStore()

  const filters = ref([
    { key: 'all', title: 'Все', link: '?filter=all', active: true },
    { key: 'pending', title: 'Активные', link: '?filter=pending', active: false },
    { key: 'completed', title: 'Завершенные', link: '?filter=completed', active: false },
    { key: 'search', title: 'Поиск по задачи', link: '?filter=search', active: false },
  ])

  const phrases = ref({
    input: 'Добавить новую задачу',
    button: 'Добавить',
  })

  const input = ref(null)
  const inputValue = ref('')

  const onChangeFilter = (filter) => {
    filters.value.map(item => item.active = item === filter || item.key === 'all' && filter.key === 'search')

    if (filter.key === 'all') {
      useTasks.checkedTasks = useTasks.tasks
    }

    if (filter.key === 'pending') {
      useTasks.checkedTasks = useTasks.tasks.filter(task => !task.checked)
    }

    if (filter.key === 'completed') {
      useTasks.checkedTasks = useTasks.tasks.filter(task => task.checked)
    }

    if (filter.key === 'search') {
      phrases.value.input = 'Поиск задачи'
      phrases.value.button = 'Найти'

      useTasks.checkedTasks = useTasks.tasks
    } else {
      phrases.value.input = 'Добавить новую задачу'
      phrases.value.button = 'Добавить'
    }
  }

  const onSubmit = () => {
    const input = inputValue.value.trim()

    if (input.length < 3) {
      alert('Количество введенных символов меньше 3-х')
      return
    }

    const filterSearch = filters.value.find(filter => filter.key === 'search' && filter.active)

    if (filterSearch) {
      useTasks.checkedTasks = useTasks.tasks.filter(task => task.desc.toLowerCase().includes(input.toLowerCase()))
      return
    }

    const lastId = useTasks.tasks.length > 0 ? useTasks.tasks[useTasks.tasks.length - 1].id + 1 : 1
    const newTask = {
      id: lastId,
      desc: input,
      checked: false,
    }

    useTasks.add(newTask)

    inputValue.value = ''
  }

  const onRemoveAll = () => {
    const answer = confirm('Вы точно хотите удалить все задачи?')

    if (!answer) {
      return
    }

    useTasks.removeAll()
  }

  onMounted(() => {
    input.value.focus()
  })

  onBeforeUpdate(() => {
    input.value.focus()
  })
</script>

<template>
  <div class="action-task">
    <form class="action-task__form" action="" method="post" @submit.prevent="onSubmit">
      <div class="action-task__enter">
        <p class="action-task__input-wrap">
          <input
              class="action-task__input"
              type="text"
              name="task"
              v-model="inputValue"
              :placeholder="phrases.input"
              ref="input"
          />
          <font-awesome-icon class="action-task__icon" :icon="['far', 'clock']"/>
        </p>
        <button class="button button--primary action-task__add" type="submit" :aria-label="phrases.button">
          {{ phrases.button }}
        </button>
        <button
            class="button button--remove action-task__remove"
            type="button"
            aria-label="Удалить все"
            @click="onRemoveAll"
        >
          Удалить все
        </button>
      </div>

      <p class="action-task__filter">
        <RouterLink
            v-for="item in filters"
            :key="item.key"
            :class="['action-task__toggle', { 'action-task__toggle--active': item.active }]"
            :to="item.link"
            tabindex="0"
            @click.prevent="onChangeFilter(item)"
        >{{ item.title }}
        </RouterLink>
      </p>
    </form>
  </div>
</template>

<style scoped lang="scss">
  @import '../assets/variables';

  .action-task {
    padding: 40px 40px 20px;

    background-color: var(--blue-light-color);
    border-radius: 20px;
  }

  .action-task__form {
  }

  .action-task__enter {
    display: flex;
    column-gap: 15px;
    margin-bottom: 20px;
  }

  .action-task__input-wrap {
    position: relative;

    flex-grow: 1;
    margin: 0;
  }

  .action-task__input {
    width: 100%;
    padding: 12px 20px 12px 45px;

    border: 1px solid var(--gray-color);
    border-radius: 10px;
    outline: none;

    &::placeholder {
      color: var(--gray-color);
    }

    &:focus {
      border-color: var(--blue-color);
    }
  }

  .action-task__icon {
    position: absolute;
    top: 50%;
    left: 15px;

    color: var(--gray-color);

    transform: translateY(-50%);
  }

  .action-task__input:focus + .action-task__icon {
    color: var(--blue-color);
  }

  .action-task__add {
  }

  .action-task__remove {
  }

  .action-task__filter {
    display: flex;
    column-gap: 20px;
    margin: 0;
    padding-bottom: 20px;
    overflow-x: auto;
  }

  .action-task__toggle {
    position: relative;

    color: var(--black-color);
    text-decoration: none;
    white-space: nowrap;

    transition: $transition;

    cursor: pointer;

    &:hover,
    &:focus,
    &--active {
      color: var(--blue-color);
    }

    &::before {
      position: absolute;
      bottom: 0;

      width: 100%;
      height: 2px;
      content: '';

      background-color: var(--blue-color);

      opacity: 0;

      transition: $transition;
    }
  }

  .action-task__toggle--active {
    &::before {
      opacity: 1;
    }
  }

  @media screen and (max-width: 768px) {
    .action-task {
      padding: 20px;
      margin-left: -20px;
      margin-right: -20px;

      border-radius: 0;
    }

    .action-task__enter {
      column-gap: 10px;
    }

    .action-task__input {
      padding-left: 10px;
    }

    .action-task__icon {
      display: none;
    }

    .action-task__add,
    .action-task__remove {
      position: relative;

      padding: 20px;

      font-size: 0;

      &::before,
      &::after {
        position: absolute;
        left: 50%;

        width: 10px;
        height: 2px;
        content: '';

        background-color: var(--white-color);

        transform: translateX(-50%);
      }

      &::after {
        transform: translateX(-50%) rotate(90deg);
      }
    }

    .action-task__remove {
      &::before {
        background-color: var(--red-color);
      }

      &::after {
        display: none;
      }
    }
  }
</style>
