<template>
  <section class="settingsPage">
    <h1 class="mb-5">{{ $t('settings') | uppercaseFirstLetter }}</h1>

    <h4 class="mb-3">{{ $t('language') | uppercaseFirstLetter }}</h4>
    <b-form-group>
      <b-form-radio-group v-model="formData.defaultLanguage" name="radio-sub-component">
        <b-form-radio value="en">English</b-form-radio>
        <b-form-radio value="pl">Polski</b-form-radio>
      </b-form-radio-group>
    </b-form-group>

    <p class="text-justify mt-5">{{ $t('saveChangesAdvertisement') }}</p>
    <b-button class="mt-10" @click="save" @keyup.enter="save" variant="outline-primary" size="lg">
      {{ $t('save') | uppercaseFirstLetter }}
    </b-button>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { userModule } from '../store/modules/user.module';

@Component({})
export default class SettingsPage extends Vue {
  formData = {
    defaultLanguage: '',
  };

  async save(): Promise<void> {
    await userModule.updateSettings(this.formData);
  }

  created(): void {
    this.formData.defaultLanguage = userModule.user ? userModule.user.defaultLanguage : 'en';
  }
}
</script>

<style lang="scss" scoped>
.settingsPage {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #035efc;
  padding: 10px;
}

.btn-lg {
  width: 40%;
}
</style>
