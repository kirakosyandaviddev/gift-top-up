export type GiftStatus = 'sent' | 'swap' | 'awaiting';

export type Backdrop = {
  name: string;
  rarityPermille: number;
  centerColor: number;
  edgeColor: number;
  patternColor: number;
  textColor: number;
};

export type Pattern = {
  name: string;
  rarityPermille: number;
};

export type Model = {
  name: string;
  rarityPermille: number;
  photoUrl: string;
  animationUrl: string;
};

export type Gift = {
  id: string;
  num: number;
  slug: string;
  ton: number;
  min: number;
  avg: number;
  title: string;
  animationUrl: string;
  model: Model;
  pattern: Pattern;
  backdrop: Backdrop;
  photoUrl: string;
  historyTon: any[];
  status?: GiftStatus;
  createdAt: Date;
  updatedAt: Date;
};
