import {GiftType} from './GiftType';

export type UserType = {
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
  gifts: GiftType[];
  isMember: boolean;
  createdAt: string;
  updatedAt: string;
};
