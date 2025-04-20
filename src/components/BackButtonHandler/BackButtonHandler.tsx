import {useCallback, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

import {useWebApp} from '../../hooks/useWebApp';
import {ROUTES} from '../../consts/routes';

export const BackButtonHandler = () => {
  const WebApp = useWebApp();
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useEffect(() => {
    if (!WebApp?.BackButton) return;

    if (![ROUTES.WELCOME, ROUTES.HOME].includes(location.pathname)) {
      WebApp.BackButton.show();
      WebApp.BackButton.onClick(handleBack);
    } else {
      WebApp.BackButton.hide();
    }

    return () => {
      WebApp.BackButton.offClick(handleBack);
    };
  }, [location.pathname, navigate, handleBack]);

  return null;
};
