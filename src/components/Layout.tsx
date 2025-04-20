import {FC} from 'react';
import {Outlet} from 'react-router-dom';

import {BackButtonHandler} from './BackButtonHandler/BackButtonHandler';

export const Layout: FC = () => {
  return (
    <>
      <BackButtonHandler />
      <Outlet />
    </>
  );
};
