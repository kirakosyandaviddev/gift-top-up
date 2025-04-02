import {Gift} from './Gift';

export type TransactionType =
  | 'spin'
  | 'deposit_ton'
  | 'deposit_gift'
  | 'deposit_partner';

export type Transaction =
  | {type: 'spin'; payload: Gift; value: number; createdAt: string}
  | {type: 'deposit_ton'; payload: string; value: number; createdAt: string}
  | {type: 'deposit_gift'; payload: Gift; value: number; createdAt: string}
  | {
      type: 'deposit_partner';
      payload: string;
      value: number;
      createdAt: string;
    };
