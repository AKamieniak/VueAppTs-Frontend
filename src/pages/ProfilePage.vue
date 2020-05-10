<template>
  <section class="profilePage">
    <h1 class="mb-5">{{ $t('profile') | uppercaseFirstLetter }}</h1>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class ProfilePage extends Vue {}
</script>

<style lang="scss" scoped>
.profilePage {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #035efc;
  padding: 10px;
}
</style>
