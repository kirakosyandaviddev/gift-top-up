import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import {HomePage} from '../pages/HomePage/HomePage';
import {WelcomePage} from '../pages/WelcomePage/WelcomePage';
import {RoulettePage} from '../pages/RoulettePage/RoulettePage';
import {GiftsPage} from '../pages/GiftsPage/GiftsPage';
import {BalancePage} from '../pages/BalancePage/BalancePage';
import {NotFoundPage} from '../pages/NotFoundPage/NotFoundPage';
import {GiftTopUpPage} from '../pages/GiftTopUpPage/GiftTopUpPage';

import {useNewTransaction} from '../hooks/subscriptions/useNewTransaction';
import {useUpdatePrice} from '../hooks/subscriptions/useUpdatePrice';
import {useNewPrice} from '../hooks/subscriptions/useNewPrice';
import {useUpdateAvgGift} from '../hooks/subscriptions/useUpdateAvgGift';
import {useGetInfo} from '../hooks/data/queries/useGetInfo';
import {useGetFullGifts} from '../hooks/data/queries/useGetFullGifts';
import {useGetFullGiftsProfile} from '../hooks/data/queries/useGetFullGiftsProfile';
import {useGetFullTransactions} from '../hooks/data/queries/useGetFullTransactions';
import {useGetPrices} from '../hooks/data/queries/useGetPrices';
import {useFullscreen} from '../hooks/useFullscreen';
import {useNewGift} from '../hooks/subscriptions/useNewGift';

import {Layout} from '../components/Layout';
import {useUpdateGift} from '../hooks/subscriptions/useUpdateGift';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {index: true, element: <WelcomePage />},
      {path: 'main', element: <HomePage />},
      {path: 'roulette', element: <RoulettePage />},
      {path: 'gifts', element: <GiftsPage />},
      {path: 'balance', element: <BalancePage />},
      {path: 'gift-top-up', element: <GiftTopUpPage />},
    ],
  },
  {path: '*', element: <NotFoundPage />},
]);

export const Router = () => {
  useFullscreen();
  // Move queries & subscriptions to the Additional Layer
  useGetInfo();
  useGetPrices();
  useGetFullGifts();
  useGetFullGiftsProfile();
  useGetFullTransactions();

  useNewTransaction();
  useUpdatePrice();
  useNewPrice();
  useUpdateAvgGift();
  useUpdateGift();
  useNewGift();

  return <RouterProvider router={router} />;
};
