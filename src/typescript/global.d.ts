declare module 'telegram-webapp' {
  export interface TelegramWebApp {
    initData: string;
    initDataUnsafe: Record<string, any>;
    version: string;
    platform: string;
    colorScheme: 'light' | 'dark';
    themeParams: {
      bg_color?: string;
      text_color?: string;
      hint_color?: string;
      link_color?: string;
      button_color?: string;
      button_text_color?: string;
      secondary_bg_color?: string;
    };
    isExpanded: boolean;
    viewportHeight: number;
    viewportStableHeight: number;
    headerColor: string;
    backgroundColor: string;
    isClosingConfirmationEnabled: boolean;
    isFullscreen: boolean;
    BackButton: {
      isVisible: boolean;
      onClick(callback): void;
      offClick(callback): void;
      show(): void;
      hide(): void;
    };
    openLink: any;
    openTelegramLink(url: string): void;
    requestFullscreen(): void;
    expand(): void;
    close(): void;
    enableClosingConfirmation(): void;
    disableClosingConfirmation(): void;
    setHeaderColor(color: string): void;
    setBackgroundColor(color: string): void;
    requestViewport(): void;
    onEvent(eventType: string, callback: (...args: any[]) => void): void;
    offEvent(eventType: string, callback: (...args: any[]) => void): void;
    sendData(data: string): void;
    showPopup(
      params: {
        title?: string;
        message: string;
        buttons?: {
          id?: string;
          type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive';
          text?: string;
        }[];
      },
      callback?: (id: string) => void,
    );
  }
  export interface TelegramGlobal {
    WebApp: TelegramWebApp;
  }
  declare global {
    interface Window {
      Telegram: TelegramGlobal;
    }
  }
}
