<template>
  <section class="layout">
    <the-nav-bar-top />
    <div class="wrapper row">
      <div class="col-xl-2 col-lg-3 col-sm-4">
        <the-nav-bar-left />
      </div>
      <div class="page-container col-xl-10 col-lg-9 col-sm-8 overflow-auto h-100">
        <main class="main-content">
          <keep-alive>
            <transition name="fade" mode="out-in">
              <router-view />
            </transition>
          </keep-alive>
        </main>
        <div v-if="isLoading" class="spinner">
          <fade-loader color="#035efc"></fade-loader>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FadeLoader from 'vue-spinner/src/FadeLoader.vue';
import TheNavBarTop from '@/components/TheNavBarTop.vue';
import TheNavBarLeft from '@/components/TheNavBarLeft.vue';
import { globalsModule } from '@/store/modules/globals.module';

@Component({
  components: { TheNavBarTop, TheNavBarLeft, FadeLoader },
})
export default class Layout extends Vue {
  get isLoading(): boolean {
    return globalsModule.loading;
  }
}
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
  width: 100%;
}

.wrapper {
  height: calc(100% - 56px);
  width: 100%;
}

.row {
  margin-right: 0px;
  margin-left: 0px;
}

.spinner {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  background: rgba(255, 255, 255, 0.6);
}

.v-spinner {
  top: 50%;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #eee;
}

::-webkit-scrollbar-thumb {
  border-radius: 1rem;
  background-color: #00d2ff;
  background-image: linear-gradient(to top, #00d2ff 0%, #3a7bd5 100%);
}

@media (max-width: 992px) {
  .page-container {
    height: calc(100% - 321px) !important;
  }
}
</style>
