<template>
  <section class="login">
    <main class="d-flex align-items-center justify-content-center">
      <div v-if="!isLoading" class="form">
        <h4>{{ $t('welcome') | uppercaseFirstLetter }}</h4>
        <b-form-group>
          <b-input-group class="mb-2">
            <b-input-group-prepend is-text>
              <b-icon icon="person-fill"></b-icon>
            </b-input-group-prepend>
            <b-form-input v-model="formData.username" type="text" :placeholder="$t('username') | uppercaseFirstLetter" trim></b-form-input>
          </b-input-group>

          <b-input-group class="mb-2">
            <b-input-group-prepend is-text>
              <b-icon icon="eye-slash-fill"></b-icon>
            </b-input-group-prepend>
            <b-form-input
              v-model="formData.password"
              @keyup.enter="login"
              type="password"
              :placeholder="$t('password') | uppercaseFirstLetter"
            ></b-form-input>
          </b-input-group>
        </b-form-group>

        <div class=" d-flex justify-content-center">
          <b-button @click="login" @keyup.enter="login" :disabled="!formValid" variant="outline-light" size="lg">
            {{ $t('login') | uppercaseFirstLetter }}
          </b-button>
        </div>
      </div>
      <div v-if="isLoading" class="spinner">
        <fade-loader color="white"></fade-loader>
      </div>
    </main>
    <div class="languages">
      <b-button @click="changeLanguage('pl')" @keyup.enter="changeLanguage('pl')" variant="outline-light" size="sm">PL</b-button>
      <b-button @click="changeLanguage('en')" @keyup.enter="changeLanguage('en')" variant="outline-light" size="sm">EN</b-button>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FadeLoader from 'vue-spinner/src/FadeLoader.vue';
import { ILogin } from '@/interfaces/login.interface';
import { userModule } from '@/store/modules/user.module';
import { globalsModule } from '@/store/modules/globals.module';

@Component({
  components: {
    FadeLoader,
  },
})
export default class Login extends Vue {
  formData: ILogin = {
    username: '',
    password: '',
  };

  get isLoading(): boolean {
    return globalsModule.loading;
  }

  get formValid(): boolean {
    return this.formData.username !== '' && this.formData.password !== '';
  }

  async login(): Promise<void> {
    await userModule
      .login(this.formData)
      .then(() => {
        const redirectPath = this.$route.query.redirect?.toString() || '/home';

        this.$router.push(redirectPath);
      })
      .catch(error => {
        globalsModule.setLoading(false);
        this.formData = {
          username: '',
          password: '',
        };
      });
  }

  changeLanguage(language: string): void {
    globalsModule.setLanguage(language);
  }
}
</script>

<style lang="scss" scoped>
.login {
  background-color: #035efc;
  height: 100%;
}

.login,
main {
  height: 100%;
}

.form {
  border: 2px solid white;
  border-radius: 5%;
  padding: 30px;
}

h4 {
  color: white;
  margin-bottom: 15px;
  text-align: center;
}

.languages {
  position: absolute;
  color: white;
  bottom: 0;
  right: 0;
  padding: 10px;

  button {
    margin-left: 5px;
  }
}
</style>
