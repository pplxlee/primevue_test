import { createI18n } from 'vue-i18n'

// 从localStorage获取保存的语言，如果没有则使用浏览器语言或默认语言
const getSavedLocale = () => {
  const savedLocale = localStorage.getItem('preferredLocale');
  if (savedLocale) {
    return savedLocale;
  }
  
  // 根据浏览器语言设置默认语言
  const browserLocale = navigator.language.split('-')[0];
  const availableLocales = ['en', 'zh'];
  if (availableLocales.includes(browserLocale)) {
    return browserLocale;
  }
  
  return 'en'; // 默认语言
};

// 加载语言包的函数
const loadLocaleMessages = async (locale) => {
  try {
    const messages = await import(`./locales/${locale}.json`);
    return messages.default;
  } catch (error) {
    console.warn(`Failed to load locale messages for ${locale}`, error);
    // 加载默认语言包
    const fallbackMessages = await import('./locales/en.json');
    return fallbackMessages.default;
  }
};

// 创建i18n实例
const i18n = createI18n({
  legacy: false,
  locale: getSavedLocale(),
  fallbackLocale: 'en',
  messages: {}, // 初始时没有消息，稍后会动态加载
  silentTranslationWarn: true
});

// 动态加载并设置语言
export const setI18nLanguage = async (locale) => {
  if (!i18n.global.availableLocales.includes(locale)) {
    const messages = await loadLocaleMessages(locale);
    i18n.global.setLocaleMessage(locale, messages);
  }
  
  i18n.global.locale.value = locale;
  localStorage.setItem('preferredLocale', locale);
};

// 初始化i18n语言
(async () => {
  await setI18nLanguage(i18n.global.locale.value);
})();

export default i18n;

// 导出一些常用的组合式API
export const installI18n = (app) => {
  app.use(i18n);
};