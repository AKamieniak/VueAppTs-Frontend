<template>
  <section class="nav-bar-left">
    <b-nav vertical class="bg-white">
      <div class="py-4 px-3 mb-4">
        <div class="d-flex align-items-center">
          <img :src="require(`@/assets/avatar.jpg`)" alt="..." width="65" class="mr-3 rounded-circle img-thumbnail shadow" />
          <div>
            <h4 class="text-primary m-0">{{ username }}</h4>
            <p class="font-weight-light text-primary mb-0">{{ status }}</p>
          </div>
        </div>
      </div>

      <router-link v-for="link in links" :key="link.id" :to="{ name: link.routeName }">
        <b-button
          variant="outline-primary"
          :class="{ active: selectedLink === link.name, 'mb-2 w-100 shadow': true }"
          @click="selectLink(link.name)"
          ><b-icon :icon="link.icon"></b-icon> {{ $t(link.name) }}
        </b-button>
      </router-link>
    </b-nav>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { userModule } from '../store/modules/user.module';
import { TranslateResult } from 'vue-i18n';

@Component({})
export default class TheNavBarLeft extends Vue {
  selectedLink: string = '';
  links: any[] = [
    { id: 1, name: 'homePage', routeName: 'home-page', icon: 'house' },
    { id: 2, name: 'aboutPage', routeName: 'about-page', icon: 'book' },
    { id: 3, name: 'galleryPage', routeName: 'gallery-page', icon: 'images' },
    { id: 4, name: 'savedPage', routeName: 'saved-page', icon: 'bookmarks' },
  ];

  @Watch('$route.meta') onRouteChange(meta: any): void {
    this.selectedLink = meta.pageName;
  }

  get username(): string {
    return userModule.user ? userModule.user.username : 'Username';
  }

  get status(): TranslateResult {
    return userModule.user ? (userModule.user.isActive ? this.$t('active') : this.$t('nonactive')) : '';
  }

  created(): void {
    this.selectedLink = this.$route.meta.pageName;
  }

  selectLink(link: string): void {
    this.selectedLink = link;
  }
}
</script>

<style lang="scss" scoped>
.nav-bar-left {
  width: 100%;
  height: 100%;
}

.btn:focus,
.btn:active {
  outline: none !important;
  box-shadow: none !important;
}
</style>
