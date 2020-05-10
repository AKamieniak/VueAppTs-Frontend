class EnvironmentService {
  get VUE_APP_ApiUrl(): string {
    return (process.env.VUE_APP_ApiUrl as string) || '';
  }

  get VUE_APP_I18N_LOCALE(): string {
    return process.env.VUE_APP_I18N_LOCALE || 'en';
  }

  get VUE_APP_I18N_FALLBACK_LOCALE(): string {
    return process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en';
  }
}

export const environment = new EnvironmentService();
