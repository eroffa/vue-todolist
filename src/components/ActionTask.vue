<script setup>

</script>

<template>
  <div class="action-task">
    <form class="action-task__form" action="" method="post">
      <div class="action-task__enter">
        <p class="action-task__input-wrap">
          <input class="action-task__input" type="text" name="task" value="" placeholder="Добавить новую задачу">
          <font-awesome-icon class="action-task__icon" :icon="['far', 'clock']" />
        </p>
        <button class="button button--primary action-task__add" type="submit" aria-label="Добавить">Добавить</button>
        <button class="button button--remove action-task__remove" type="button" aria-label="Удалить все">Удалить все</button>
      </div>

      <p class="action-task__filter">
        <a class="action-task__toggle action-task__toggle--active" href="?filter=all">Все</a>
        <a class="action-task__toggle" href="?filter=active">Активные</a>
        <a class="action-task__toggle" href="?filter=completed">Завершенные</a>
        <a class="action-task__toggle" href="?filter=search">Поиск по задачи</a>
      </p>
    </form>
  </div>
</template>

<style scoped lang="scss">
  @import "../assets/variables";

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

    &:hover,
    &:focus,
    &--active {
      color: var(--blue-color);

      outline: none;
    }
  }

  .action-task__toggle--active {
    &::before {
      position: absolute;
      bottom: 0;

      width: 100%;
      height: 2px;
      content: "";

      background-color: var(--blue-color);
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
        content: "";

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
