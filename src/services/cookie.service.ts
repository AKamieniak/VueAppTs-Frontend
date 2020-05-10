import { IDateTime, isIDateTime } from '../interfaces/datetime.interface';

class CookieService {
  keys = {
    USER: 'user_info',
    TOKEN: 'auth_token',
  };

  addCookie(cookieName: string, value: any, expire: IDateTime | number = 0): void {
    const expiresIn = isIDateTime(expire) ? this.getMilliseconds(expire) : expire;

    const cookie = this.prepareCookie(cookieName, value, expiresIn);

    document.cookie = cookie;
  }

  getCookie<T>(cookieName: string): T | null {
    const name = cookieName + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');

    let strObj = '';

    for (const iterator of ca) {
      let c = iterator;
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        strObj = c.substring(name.length, c.length);
        break;
      }
    }

    if (!strObj) {
      return null;
    }

    const obj: T = JSON.parse(strObj);

    return obj;
  }

  delateCookie(cookieName: string): void {
    this.addCookie(cookieName, '', -1);
  }

  dispose(): void {
    this.delateCookie(this.keys.TOKEN);

    this.delateCookie(this.keys.USER);
  }

  private prepareCookie(cookieName: string, value: any, expire: number): string {
    if (expire !== 0) {
      return this.prepareExpiringCookie(cookieName, value, expire);
    } else {
      return this.prepareSimpleCookie(cookieName, value);
    }
  }

  private prepareSimpleCookie(cookieName: string, value: any): string {
    return `${cookieName}=${JSON.stringify(value)};`;
  }

  private prepareExpiringCookie(cookieName: string, value: any, expire: number) {
    const date = new Date();

    date.setTime(date.getTime() + expire);

    const expires = 'expires=' + date.toUTCString();

    return `${cookieName}=${JSON.stringify(value)};${expires};path=/`;
  }

  private getMilliseconds(dateTime: IDateTime): number {
    let ms = 0;

    if (dateTime.days) {
      ms += dateTime.days * 24 * 60 * 60 * 1000;
    }
    if (dateTime.hours) {
      ms += dateTime.hours * 60 * 60 * 1000;
    }
    if (dateTime.minutes) {
      ms += dateTime.minutes * 60 * 1000;
    }
    if (dateTime.seconds) {
      ms += dateTime.seconds * 1000;
    }

    return ms;
  }
}

export const cookieService = new CookieService();
