import {useEffect} from 'react';
import {useQueryClient} from '@tanstack/react-query';

import {wsClient} from '../../libs/wsClient';
import {QUERY_KEYS} from '../../consts/queryKeys';
import {GetFullGiftsProfileResponseType} from './../data/queries/useGetFullGiftsProfile';
import {Gift} from '../../etities/types/Gift';

type NewNFT = {nft: Gift};

const prepareGiftsProfile = (
  cacheData: GetFullGiftsProfileResponseType,
  data: NewNFT,
): GetFullGiftsProfileResponseType => {
  return {
    ...cacheData,
    data: [data.nft, ...cacheData.data],
  };
};

export const useNewNFT = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const onNewNFT = (data: NewNFT) => {
      console.log('onNewNFT fires::: ', data);

      queryClient.setQueryData(
        [QUERY_KEYS.GET_FULL_GIFTS_PROFILE],
        (cacheData: GetFullGiftsProfileResponseType) => {
          if (!cacheData) return cacheData;
          return prepareGiftsProfile(cacheData, data);
        },
      );
    };

    wsClient.on('newNFT', onNewNFT);

    return () => {
      wsClient.off('newNFT', onNewNFT);
    };
  }, []);
};
