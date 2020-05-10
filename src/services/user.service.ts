import { IUserSettings } from '@/interfaces/user-settings.interface';
import { IUser } from '@/interfaces/user.interface';
import { ApiService } from './api.service';

class UserService extends ApiService {
  async updateSettings(userSettings: IUserSettings): Promise<IUser> {
    try {
      const response = await this.http.put<IUser>(`/user/settings`, userSettings);

      return response.data;
    } catch (error) {
      this.handleError(error);

      throw error;
    }
  }
}

export const userService = new UserService();
