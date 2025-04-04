export const useWebApp = () => {
  return window.Telegram?.WebApp;
};

window.open = window.Telegram.WebApp.openLink;
