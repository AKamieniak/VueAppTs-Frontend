<template>
  <section class="navBarTop">
    <b-navbar toggleable="lg" type="dark">
      <b-navbar-brand href="#" class="home">
        <b-icon-house-fill></b-icon-house-fill> {{ $t('company') | uppercaseFirstLetter }}
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item :to="{ name: 'profile-page' }" right>
            <b-icon-people-circle></b-icon-people-circle> {{ $t('profile') | uppercaseFirstLetter }}
          </b-nav-item>
          <b-nav-item :to="{ name: 'settings-page' }" right>
            <b-icon-gear></b-icon-gear> {{ $t('settings') | uppercaseFirstLetter }}
          </b-nav-item>
          <b-nav-item @click="logout" @keyup.enter="logout" right>
            <b-icon-power></b-icon-power> {{ $t('logout') | uppercaseFirstLetter }}
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { userModule } from '@/store/modules/user.module';

@Component({})
export default class TheNavBarTop extends Vue {
  logout(): void {
    userModule.dispose();
    this.$router.push('/login');
  }
}
</script>

<style lang="scss" scoped>
.navbar-brand:hover {
  cursor: default;
}

.navbar {
  background-color: #035efc !important;
}

.navbar-dark .navbar-nav .nav-link {
  color: white;

  &:hover {
    color: #e1e1e3;
  }
}
</style>
