<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { globalsModule } from './store/modules/globals.module';
import i18n from './i18n';
import { IErrorResponse } from './interfaces/error-response.interface';

@Component({})
export default class App extends Vue {
  get errors(): IErrorResponse[] {
    return globalsModule.errors;
  }

  @Watch('errors') onErrosChanged() {
    if (this.errors.length !== 0) {
      this.errors.forEach((error: IErrorResponse) => {
        this.$bvToast.toast([this.getToastCenteredMessage(error.message)], {
          title: `${error.statusCode}: ${error.title}`,
          toaster: 'b-toaster-top-right',
          variant: this.getToastVariant(error.statusCode),
          solid: true,
          appendToast: true,
        });
      });

      globalsModule.clearErrors();
    }
  }

  created() {
    globalsModule.refreshLanguage();
  }

  private getToastCenteredMessage(message: string): any {
    return this.$createElement('p', { class: ['text-center'] }, [message]);
  }

  private getToastVariant(statusCode: number): string {
    let variant = 'primary';

    if (statusCode < 400) {
      variant = 'info';
    } else if (statusCode >= 400 && statusCode <= 500) {
      variant = 'warning';
    } else if (statusCode >= 500) {
      variant = 'danger';
    }

    return variant;
  }
}
</script>

<style lang="scss">
@import 'node_modules/bootstrap/scss/bootstrap';
@import 'node_modules/bootstrap-vue/src/index.scss';

html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  line-height: 1;
}

#app {
  width: 100%;
  height: 100%;
}

.btn:focus {
  outline: none;
  box-shadow: none;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
