export type GiftStatusType = 'sent' | 'swap' | 'awaiting';

export type BackdropType = {
  name: string;
  rarityPermille: number;
  centerColor: number;
  edgeColor: number;
  patternColor: number;
  textColor: number;
};

export type PatternType = {
  name: string;
  rarityPermille: number;
};

export type ModelType = {
  name: string;
  rarityPermille: number;
};

export type GiftType = {
  id: string;
  num: number;
  slug: string;
  ton: number;
  title: string;
  model: ModelType;
  pattern: PatternType;
  backdrop: BackdropType;
  historyTon: any[];
  status: GiftStatusType;
  createdAt: Date;
  updatedAt: Date;
};
