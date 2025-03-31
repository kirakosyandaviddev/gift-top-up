import {Gift} from './Gift';

export type User = {
  id: string;
  telegramId: number;
  firstName: string;
  lastName: string;
  username: string;
  languageCode: string;
  isPremium: boolean;
  photoUrl: string;
  balance: number;
  historyDeposit: any[];
  isWeb: boolean;
  gifts: Gift[];
  isMember: boolean;
  createdAt: string;
  updatedAt: string;
};
