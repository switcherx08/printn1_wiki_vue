<template>
  <div class="pages-nav-item flex flex-col">
    <div class="pages-nav-item__box flex">
      <div class="pages-nav-item__icon mr-3">
        <IconArrowBottom />
      </div>
      <div class="pages-nav-item__name w-full mr-3">
        Страницы
      </div>
      <div class="pages-nav-item__buttons">
        <button type="button" class="pages-nav-item__button">
          <IconPlus />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import IconPlus from "../../icons/IconPlus.vue";
import IconArrowBottom from "@/components/icons/IconArrowBottom.vue";
export default {
  name: "PagesNavigationItemChild",
  components: {IconArrowBottom, IconPlus}
}
</script>

<style lang="scss">
.pages-nav-item {
  &__box {
    position: relative;
    align-items: center;
    height: 40px;
  }

  &__box:after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: -4px;
    right: -4px;
    border-radius: var(--radius);
    background-color: transparent;
    z-index: -1;
    cursor: pointer;
  }

  &__box:hover:after {
    background-color: var(--background-grey);
  }

  &__icon {
    display: flex;
    align-items: center;
    width: 18px;
    height: 18px;
    color: var(--title-grey);
    cursor: pointer;
  }

  &__buttons {
    display: flex;
    align-items: center;
  }

  &__button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 28px;
    height: 28px;
    margin-right: 4px;
    border-radius: var(--radius);
    cursor: pointer;
  }

  &__button:hover {
    background-color: var(--border-color);
  }

  &__button svg {
    width: 20px;
    height: 20px;
    fill: var(--light-text)
  }

  &__button:hover svg {
    fill: var(--title-grey)
  }

  &__name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
  }
}
</style>
