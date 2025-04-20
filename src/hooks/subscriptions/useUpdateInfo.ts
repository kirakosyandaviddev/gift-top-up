import {useEffect} from 'react';
import {useQueryClient} from '@tanstack/react-query';

import {wsClient} from '../../libs/wsClient';
import {QUERY_KEYS} from '../../consts/queryKeys';
import {GetInfoResponseType} from '../data/queries/useGetInfo';
import {User} from '../../etities/types/User';
import {Gift} from '../../etities/types/Gift';
import {Transaction} from '../../etities/types/Transaction';
import {Price} from '../../etities/types/Price';
import {GetFullGiftsProfileResponseType} from '../data/queries/useGetFullGiftsProfile';
import {GetFullTransactionsResponseType} from '../data/queries/useGetFullTransactions';
import {GetPricesResponseType} from '../data/queries/useGetPrices';
import {GetFullGiftsResponseType} from '../data/queries/useGetFullGifts';

type UpdateInfo = {
  user?: User;
  address?: string;
  play?: number;
  nfts?: Gift[];
  transactions?: Transaction[];
  prices?: Price[];
  gifts?: Gift[];
};

const prepareInfo = (
  cacheData: GetInfoResponseType,
  data: UpdateInfo,
): GetInfoResponseType => {
  return {
    ...cacheData,
    data: {
      ...cacheData.data,
      user: data.user || cacheData.data.user,
      address: data.address || cacheData.data.address,
      play: data.play || cacheData.data.play,
    },
  };
};

const prepareGiftsProfile = (
  cacheData: GetFullGiftsProfileResponseType,
  data: UpdateInfo,
): GetFullGiftsProfileResponseType => {
  return {
    ...cacheData,
    data: data.nfts || cacheData?.data,
  };
};

const prepareTransactions = (
  cacheData: GetFullTransactionsResponseType,
  data: UpdateInfo,
): GetFullTransactionsResponseType => {
  return {
    ...cacheData,
    data: data.transactions || cacheData?.data,
  };
};

const preparePrices = (
  cacheData: GetPricesResponseType,
  data: UpdateInfo,
): GetPricesResponseType => {
  return {
    ...cacheData,
    data: data.prices || cacheData?.data,
  };
};

const prepareGifts = (
  cacheData: GetFullGiftsResponseType,
  data: UpdateInfo,
): GetFullGiftsResponseType => {
  return {
    ...cacheData,
    data: data.gifts || cacheData?.data,
  };
};

export const useUpdateInfo = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const onUpdateInfo = (data: UpdateInfo) => {
      console.log('onUpdateInfo fires::: ', data);

      queryClient.setQueryData(
        [QUERY_KEYS.GET_INFO],
        (cacheData: GetInfoResponseType) => {
          if (!cacheData) return cacheData;
          return prepareInfo(cacheData, data);
        },
      );

      queryClient.setQueryData(
        [QUERY_KEYS.GET_FULL_GIFTS_PROFILE],
        (cacheData: GetFullGiftsProfileResponseType) => {
          return prepareGiftsProfile(cacheData, data);
        },
      );

      queryClient.setQueryData(
        [QUERY_KEYS.GET_FULL_TRANSACTIONS],
        (cacheData: GetFullTransactionsResponseType) => {
          return prepareTransactions(cacheData, data);
        },
      );

      queryClient.setQueryData(
        [QUERY_KEYS.GET_PRICES],
        (cacheData: GetPricesResponseType) => {
          return preparePrices(cacheData, data);
        },
      );

      queryClient.setQueryData(
        [QUERY_KEYS.GET_FULL_GIFTS],
        (cacheData: GetFullGiftsResponseType) => {
          return prepareGifts(cacheData, data);
        },
      );
    };

    wsClient.on('updateInfo', onUpdateInfo);

    return () => {
      wsClient.off('updateInfo', onUpdateInfo);
    };
  }, []);
};
