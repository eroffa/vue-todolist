<script setup>
  import {useTasksStore} from '@/store/tasks'

  const useTasks = useTasksStore()

  const props = defineProps({
    tasks: {
      type: Array,
      required: true,
    },
  })

  const emit = defineEmits(['checkTask'])

  const onCheck = (task, event) => {
    emit('checkTask', { task, event })
  }

  const onRemove = (task) => {
    const answer = confirm('Вы точно хотите удалить эту задачу?')

    if (!answer) {
      return
    }

    useTasks.remove(task)
  }
</script>

<template>
  <ul v-if="props.tasks.length > 0" class="list-task">
    <li class="list-task__item">
      <form class="list-task__form" action="" method="post">
        <p v-for="task in props.tasks" :key="task.id" class="list-task__input-wrap">
          <input
              :id="task.id"
              class="sr-only list-task__checkbox"
              type="checkbox"
              name="task-1"
              :value="task.desc"
              :checked="task.checked"
              @change="onCheck(task, $event)"
          />
          <label class="list-task__desc" :for="task.id">{{ task.desc }}</label>
          <font-awesome-icon class="list-task__icon" :icon="['fa', 'check']"/>

          <button class="button button--remove list-task__button" type="submit" @click.prevent="onRemove(task)">Удалить
          </button>
        </p>
      </form>
    </li>
  </ul>
  <p v-else class="list-task list-task--center">Список задач пуст</p>
</template>

<style scoped lang="scss">
  @import '../assets/variables';

  .list-task {
    margin: 0;
    padding: 40px;

    list-style: none;

    &--center {
      padding-bottom: 70px;

      color: var(--gray-color);
      text-align: center;
    }
  }

  .list-task__item {
    display: flex;
  }

  .list-task__form {
    width: 100%;
  }

  .list-task__input-wrap {
    position: relative;

    display: flex;
    justify-content: space-between;
    margin: 0;
    padding: 30px 0;

    border-bottom: 1px solid var(--gray-light-color);

    &:last-child {
      border-bottom: none;
    }
  }

  .list-task__checkbox {
  }

  .list-task__desc {
    position: relative;

    flex-grow: 1;
    display: inline-block;
    padding: 0 30px 0 60px;

    cursor: pointer;

    &::before,
    &::after {
      position: absolute;
      top: 0;
      left: 0;

      width: 30px;
      height: 30px;
      content: '';
    }

    &::before {
      background-color: transparent;
      border: 1px solid var(--gray-light-color);
      border-radius: 5px;
    }
  }

  .list-task__checkbox:focus + .list-task__desc,
  .list-task__checkbox:checked + .list-task__desc {
    &::before {
      border-color: var(--blue-color);
    }
  }

  .list-task__checkbox:checked + .list-task__desc {
    color: var(--blue-color);
    text-decoration: line-through;
  }

  .list-task__icon {
    position: absolute;
    top: 35px;
    left: 5px;

    width: 20px;
    height: 20px;

    color: var(--blue-color);

    opacity: 0;

    transition: $transition;

    pointer-events: none;
  }

  .list-task__checkbox:checked ~ .list-task__icon {
    opacity: 1;
  }

  .list-task__button {
    align-self: flex-start;
    flex-shrink: 0;
    padding: 8px 25px 6px;

    background-color: var(--white-color);

    opacity: 0;
  }

  .list-task__input-wrap:hover .list-task__button,
  .list-task__input-wrap:focus-within .list-task__button,
  .list-task__desc:focus-within .list-task__button {
    opacity: 1;
  }

  @media screen and (max-width: 768px) {
    .list-task {
      padding: 0;
    }

    .list-task__button {
      position: absolute;
      right: 0;

      padding: 8px;
    }

    .list-task__desc {
      padding: 0 10px 0 40px;
    }
  }
</style>
