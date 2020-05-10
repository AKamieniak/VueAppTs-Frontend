import i18n from '@/i18n';
import { IErrorResponse } from '@/interfaces/error-response.interface';
import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import store from '..';
import { IGlobalsState } from '../states/globals-state.interface';

@Module({ dynamic: true, store, name: 'globals' })
class GlobalsModule extends VuexModule implements IGlobalsState {
  loading: boolean = false;
  language: string = 'en';
  errors: IErrorResponse[] = [];

  get getErrors(): IErrorResponse[] {
    return this.errors;
  }

  @Mutation
  setLoading(state: boolean): void {
    this.loading = state;
  }

  @Mutation
  setLanguage(language: string): void {
    i18n.locale = language;
    localStorage.setItem('language', language);
    this.language = language;
  }

  @Mutation
  setError(error: IErrorResponse): void {
    this.errors.push(error);
  }

  @Mutation
  clearErrors(): void {
    this.errors = [];
  }

  @Action
  refreshLanguage(): void {
    let language = 'en';
    const localStorageLanguage = localStorage.getItem('language');

    if (localStorageLanguage) {
      language = localStorageLanguage;
    } else if (navigator.language) {
      language = navigator.language.substring(0, 2);
    }

    this.setLanguage(language);
  }
}

export const globalsModule = getModule(GlobalsModule);
