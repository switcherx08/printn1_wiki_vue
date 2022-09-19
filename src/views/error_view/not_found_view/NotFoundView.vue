<template>
  <div class="error-inner text-center">
    <div class="error-inner__number">404</div>
    <img class="error-inner__image" src="/images/errors/svg/not_found_image.svg" alt="Страница не найдена">
    <h3 class="error-inner__title">Мы не смогли найти эту страницу</h3>
    <p class="error-inner__text">
      Похоже, мы не смогли найти эту страницу. Пожалуйста, повторите попытку или обратитесь к администратору, если проблема не устранена.
    </p>
    <div class="button-wrap">
      <router-link :to="{name: 'dashboard'}" class="error-inner__back button is-medium is-primary">
        <span> На главную </span>
      </router-link>
    </div>
  </div>
</template>
