import { globalsModule } from '@/store/modules/globals.module';
import { userModule } from '@/store/modules/user.module';
import axios, { AxiosInstance } from 'axios';
import { environment } from './environment.service';

export abstract class ApiService {
  protected get http(): AxiosInstance {
    const instance = axios.create({
      baseURL: environment.VUE_APP_ApiUrl,
      headers: { Authorization: userModule.getToken },
    });

    return instance;
  }

  protected handleError(error: any): void {
    if (error.response) {
      const { message, title, statusCode } = error.response.data;

      globalsModule.setError({ message, title, statusCode });
    } else {
      globalsModule.setError({
        title: 'Network error',
        message: 'Check your internet connection',
        statusCode: 500,
      });
    }
  }
}
