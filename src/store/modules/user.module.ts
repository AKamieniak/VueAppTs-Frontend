import { IAuthResponse } from '@/interfaces/auth-response.interface';
import { ILogin } from '@/interfaces/login.interface';
import { IUserSettings } from '@/interfaces/user-settings.interface';
import { IUser } from '@/interfaces/user.interface';
import { cookieService } from '@/services/cookie.service';
import { loginService } from '@/services/login.service';
import { userService } from '@/services/user.service';
import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import store from '..';
import { IUserState } from '../states/user-state.interface';
import { globalsModule } from './globals.module';

@Module({ dynamic: true, store, name: 'user' })
class UserModule extends VuexModule implements IUserState {
  user: IUser | null = null;
  token: string = '';

  get getUser(): IUser | null {
    if (this.user) {
      return this.user;
    }

    const user: IUser | null = cookieService.getCookie<IUser>(cookieService.keys.USER);

    if (user) {
      store.commit('setUser', user);
    }

    return user;
  }

  get getToken(): string | null {
    if (this.token) {
      return this.token;
    }

    const token = cookieService.getCookie<string>(cookieService.keys.TOKEN);

    if (token) {
      store.commit('setToken', token);
    }

    return token;
  }

  @Mutation
  setUser(user: IUser | null): void {
    this.user = user;
  }

  @Mutation
  setToken(token: string): void {
    this.token = token;
  }

  @Mutation
  setUserCookie(user: IUser): void {
    cookieService.addCookie(cookieService.keys.USER, user);
  }

  @Mutation
  setTokenCookie(tokenData: any): void {
    const { authToken, expireIn } = tokenData;

    cookieService.addCookie(cookieService.keys.TOKEN, authToken, { seconds: expireIn });
  }

  @Mutation
  delateUserCookie(): void {
    cookieService.delateCookie(cookieService.keys.USER);
  }

  @Mutation
  deleteTokenCookie(): void {
    cookieService.delateCookie(cookieService.keys.TOKEN);
  }

  @Action
  dispose(): void {
    this.delateUserCookie();
    this.deleteTokenCookie();
    this.setUser(null);
    this.setToken('');
  }

  @Action({ rawError: true })
  async login(credentials: ILogin): Promise<void> {
    globalsModule.setLoading(true);

    await loginService.login(credentials).then((response: IAuthResponse) => {
      const { accessToken, expiresIn, tokenType, user } = response;
      const authToken = `${tokenType} ${accessToken}`;

      this.setTokenCookie({ authToken, expiresIn });
      this.setToken(authToken);
      this.setUserCookie(user);
      this.setUser(user);

      globalsModule.setLanguage(user.defaultLanguage);
      globalsModule.setLoading(false);
    });
  }

  @Action
  async updateSettings(settings: any): Promise<void> {
    globalsModule.setLoading(true);

    const { defaultLanguage } = settings;

    if (defaultLanguage) {
      const userSettings: IUserSettings = {
        id: this.user?.id,
        defaultLanguage,
      };

      await userService.updateSettings(userSettings).then((response: IUser) => {
        this.setUser(response);
        globalsModule.setLanguage(response.defaultLanguage);
      });
    }

    globalsModule.setLoading(false);
  }
}

export const userModule = getModule(UserModule);
