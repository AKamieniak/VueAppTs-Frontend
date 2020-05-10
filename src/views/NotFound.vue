<template>
  <section class="not-found">
    <main>
      <h1>{{ $t('notFound') | uppercaseFirstLetter }}</h1>
      <p>
        <i18n path="notFoundMessage" for="home">
          <router-link :to="{ name: 'home-page' }" class="text-light">{{ $t('homePage') }}</router-link>
        </i18n>
      </p>
    </main>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class NotFound extends Vue {}
</script>

<style lang="scss" scoped>
.not-found {
  background-color: #035efc;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1,
p {
  text-align: center;
  color: white;
}
</style>
