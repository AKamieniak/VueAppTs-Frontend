import { IAuthResponse } from '@/interfaces/auth-response.interface';
import { ILogin } from '@/interfaces/login.interface';
import { ApiService } from './api.service';

class LoginService extends ApiService {
  async login(credentials: ILogin): Promise<IAuthResponse> {
    try {
      const response = await this.http.post<IAuthResponse>(`/authentication/login`, credentials);

      return response.data;
    } catch (error) {
      this.handleError(error);

      throw error;
    }
  }
}

export const loginService = new LoginService();
