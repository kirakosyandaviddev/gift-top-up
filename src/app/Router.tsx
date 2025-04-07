import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import {HomePage} from '../pages/HomePage/HomePage';
import {WelcomePage} from '../pages/WelcomePage/WelcomePage';
import {RoulettePage} from '../pages/RoulettePage/RoulettePage';
import {GiftsPage} from '../pages/GiftsPage/GiftsPage';
import {BalancePage} from '../pages/BalancePage/BalancePage';
import {NotFoundPage} from '../pages/NotFoundPage/NotFoundPage';
import {GiftTopUpPage} from '../pages/GiftTopUpPage/GiftTopUpPage';

import {useNewTransaction} from '../hooks/subscriptions/useNewTransaction';
import {useWalletTheme} from '../hooks/useWalletTheme';

import {Layout} from '../components/Layout';
import {useUpdatePrice} from '../hooks/subscriptions/useUpdatePrice';

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
  // Move subscriptions to the Additional Layer
  useWalletTheme();
  useNewTransaction();
  useUpdatePrice();

  return <RouterProvider router={router} />;
};
