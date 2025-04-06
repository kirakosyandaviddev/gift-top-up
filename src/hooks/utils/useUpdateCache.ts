import {useQueryClient} from '@tanstack/react-query';

import {GetConfigResponseType} from './../../hooks/data/queries/useGetConfigQuery';
import {User} from '../../etities/types/User';
import {QUERY_KEYS} from '../../consts/queryKeys';

const prepareCache = (
  cacheData: GetConfigResponseType,
  user: User,
): GetConfigResponseType => {
  return {
    ...cacheData,
    data: {
      ...cacheData.data,
      user: {
        ...user,
      },
    },
  };
};

export const useUpdateCache = () => {
  const queryClient = useQueryClient();

  const update = (user: User) => {
    queryClient.setQueryData(
      [QUERY_KEYS.GET_CONFIG],
      (cacheData: GetConfigResponseType) => {
        if (!cacheData) return cacheData;

        return prepareCache(cacheData, user);
      },
    );
  };

  return update;
};
