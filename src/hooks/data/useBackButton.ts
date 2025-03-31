import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import {ROUTES} from '../../consts/routes';
import {useWebApp} from '../useWebApp';

export const useBackButton = (route = ROUTES.HOME) => {
  const navigate = useNavigate();
  const WebApp = useWebApp();

  useEffect(() => {
    if (!WebApp.BackButton.isVisible) {
      WebApp.BackButton.show();
    }

    WebApp.BackButton.onClick(() => {
      navigate(route);
    });
  }, []);
};
