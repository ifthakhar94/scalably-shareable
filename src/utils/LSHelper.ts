import secureLocalStorage from 'react-secure-storage';

class LSHelper {
  // if any param is set false, the function will ignore setting it in local storage
  static setAuthTokens(token: any = false, refreshToken: any = false) {
    // if (!this.isInWindow) {
    //   return;
    // }
    if (token) {
      secureLocalStorage.setItem('UserToken', token);
    }
    if (refreshToken) {
      secureLocalStorage.setItem('refreshToken', refreshToken);
    }
  }

  // if any param is set false, the function will ignore setting it in local storage
  static setAuthTokensWithAdditionalData(token: any = false, refreshToken: any = false, userData: any = false, ecomedia_id: any = false) {
    // if (!this.isInWindow) {
    //   return;
    // }
    this.setAuthTokens(token, refreshToken);

    if (userData) {
      secureLocalStorage.setItem('userData', userData);
    }
    if (ecomedia_id) {
      secureLocalStorage.setItem('ecomedia_id', ecomedia_id);
    }
  }

  static getAuthTokens() {
    const token = secureLocalStorage.getItem('UserToken') ?? '';
    const refreshToken = secureLocalStorage.getItem('refreshToken') ?? '';

    return { token, refreshToken };
  }

  // with User data = true will remove User data from local storage
  // with withOtherCredentials = true will remove "any other" credentials like ecomedia id , loginEmail etc.
  static removeAuthTokensWithOptionalData(withUserData = false, withOtherCredentials = false) {
    // if (!this.isInWindow) {
    //   return;
    // }
    secureLocalStorage.removeItem('UserToken');
    secureLocalStorage.removeItem('refreshToken');

    if (withUserData) {
      secureLocalStorage.removeItem('userData');
    }

    if (withOtherCredentials) {
      secureLocalStorage.removeItem('LoginEmail');
      secureLocalStorage.removeItem('ecomedia_id');
    }
  }

  static getLanguage() {
    const language = secureLocalStorage.getItem('language') ?? 'ja';

    return language;
  }

  static setLanguage(language: string = 'ja') {
    secureLocalStorage.setItem('language', language);
  }

  static isInWindow() {
    return typeof window !== 'undefined' && window.localStorage;
  }

  static getItem(itemKey: string) {
    const language = secureLocalStorage.getItem(itemKey) ?? '';

    return language;
  }

  static setItem(itemKey: string, itemVal: string) {
    secureLocalStorage.setItem(itemKey, itemVal);
  }
}

export default LSHelper;
