import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import classNames from 'classnames';
import {useTonConnectModal, useTonWallet} from '@tonconnect/ui-react';

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
  const wallet = useTonWallet();
  const {open: openModal} = useTonConnectModal();

  const [termsAccepted, setTermsAccepted] = useState(false);
  console.log('data------------------', data);

  useEffect(() => {
    if (!WebApp?.isFullscreen) {
      WebApp?.requestFullscreen();
    }
    WebApp.expand();
  }, []);

  useEffect(() => {
    if (wallet) {
      navigate(ROUTES.HOME);
    }
  }, [wallet]);

  const handleConnectWallet = () => {
    openModal();
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
      </div>
    </div>
  );
};
