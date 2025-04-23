import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import {HomePage} from '../pages/HomePage/HomePage';
import {WelcomePage} from '../pages/WelcomePage/WelcomePage';
import {RoulettePage} from '../pages/RoulettePage/RoulettePage';
import {GiftsPage} from '../pages/GiftsPage/GiftsPage';
import {BalancePage} from '../pages/BalancePage/BalancePage';
import {NotFoundPage} from '../pages/NotFoundPage/NotFoundPage';
import {GiftTopUpPage} from '../pages/GiftTopUpPage/GiftTopUpPage';

import {useGetInfo} from '../hooks/data/queries/useGetInfo';
import {useFullscreen} from '../hooks/useFullscreen';
import {useUpdateBalance} from '../hooks/subscriptions/useUpdateBalance';
import {useUpdateInfo} from '../hooks/subscriptions/useUpdateInfo';

import {Layout} from '../components/Layout';

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

  // subscriptions
  useUpdateInfo();
  useUpdateBalance();

  return <RouterProvider router={router} />;
};
