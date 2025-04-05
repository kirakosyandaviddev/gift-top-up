import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import classNames from 'classnames';
import {TonConnectButton} from '@tonconnect/ui-react';

import {useGetConfigQuery} from '../../hooks/data/queries/useGetConfigQuery';
import {useWebApp} from '../../hooks/useWebApp';
import {ROUTES} from '../../consts/routes';
import {Checkbox} from './components/Checkbox/Checkbox';
import {ChainIcon22} from '../../components/icons/ChainIcon22';

import s from './WelcomePage.module.css';

export const WelcomePage = () => {
  const navigate = useNavigate();
  const {data} = useGetConfigQuery();
  const WebApp = useWebApp();
  // const {state, open: openModal, close: closeModal} = useTonConnectModal();

  const [termsAccepted, setTermsAccepted] = useState(false);
  console.log('data------------------', data);
  console.log('data------------------', WebApp?.version);

  useEffect(() => {
    if (!WebApp?.isFullscreen) {
      WebApp?.requestFullscreen();
    }
    WebApp.expand();
  }, []);

  // TODO: improve
  // useEffect(() => {
  //   if (state.status === 'opened') {
  //     WebApp.MainButton.hide();
  //   } else {
  //     WebApp.MainButton.show();
  //   }
  // }, [state]);

  // TODO: improve
  // useEffect(() => {
  //   const handleMainButton = () => {
  //     openModal();
  //   };

  //   WebApp.MainButton.setParams({
  //     text: 'Connect Wallet',
  //     is_visible: true,
  //   });

  //   WebApp.MainButton.onClick(handleMainButton);

  //   return () => {
  //     WebApp.MainButton.offClick(handleMainButton);
  //     closeModal();
  //   };
  // }, []);

  const handleConnectWallet = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <div className={s.titleContainer}>
          <h5 className={s.title}>
            Welcome to <br />
            Gifts Games
          </h5>
        </div>

        <div className={s.list}>
          <div className={classNames(s.terms, s.item)}>
            <Checkbox
              checked={termsAccepted}
              onChange={(e) => {
                setTermsAccepted(e.target.checked);
              }}
            />

            <a href="/" className={s.termsLink}>
              Terms of Service
            </a>
          </div>

          <button
            onClick={handleConnectWallet}
            disabled={!termsAccepted}
            className={classNames(s.connectWallet, s.item, {
              [s.accepted]: termsAccepted,
            })}
          >
            <ChainIcon22 />
            <span>Connect Wallet</span>
          </button>
        </div>

        <TonConnectButton />
      </div>
    </div>
  );
};
