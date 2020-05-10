<template>
  <section class="aboutPage">
    <h1 class="mb-5">{{ $t('aboutPage') | uppercaseFirstLetter }}</h1>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class AboutPage extends Vue {}
</script>

<style lang="scss" scoped>
.aboutPage {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #035efc;
  padding: 10px;
}
</style>
