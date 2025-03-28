import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import classNames from 'classnames';
import {useGetConfigQuery} from '../../hooks/data/queries/useGetConfigQuery';
import {ROUTES} from '../../consts/routes';

import s from './WelcomePage.module.css';
import {Checkbox} from './components/Checkbox/Checkbox';

export const WelcomePage = () => {
  const navigate = useNavigate();
  const {data} = useGetConfigQuery();
  const [termsAccepted, setTermsAccepted] = useState(false);
  console.log('data------------------', data);

  // TODO: improve
  useEffect(() => {
    // @ts-ignore
    if (!window.Telegram.WebApp?.isFullscreen) {
      // @ts-ignore
      window.Telegram.WebApp?.requestFullscreen();
    }
  }, []);

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

        <div className={s.terms}>
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
          className={classNames(s.connectWallet, {[s.accepted]: termsAccepted})}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.9056 7.41348L10.6122 8.72566C11.6425 8.86783 12.3111 9.19586 12.8153 9.69887C14.2841 11.1642 14.2841 13.2199 12.8372 14.6633L10.0312 17.4626C8.57345 18.917 6.51281 18.917 5.04406 17.4626C3.56435 15.9865 3.57532 13.9306 5.0331 12.4873L6.51281 11.0111C6.23879 10.3768 6.17303 9.65513 6.24976 9.04278L3.84934 11.4375C1.73389 13.5371 1.72293 16.5223 3.86029 18.6436C5.98669 20.7759 8.96804 20.7651 11.0835 18.6546L14.021 15.713C16.1255 13.6135 16.1365 10.6393 14.0101 8.50697C13.5278 8.02583 12.903 7.66498 11.9056 7.41348ZM11.0944 14.5758L12.3769 13.2746C11.3465 13.1324 10.6779 12.8044 10.1847 12.3014C8.71594 10.8361 8.71594 8.78034 10.1628 7.33694L12.9688 4.5376C14.4265 3.08325 16.4872 3.07233 17.956 4.5376C19.4247 6.01381 19.4137 8.06958 17.9668 9.51298L16.4872 10.9892C16.7612 11.6234 16.827 12.3451 16.7503 12.9575L19.1506 10.5627C21.2661 8.45229 21.2771 5.478 19.1397 3.35663C17.0133 1.22432 14.021 1.23526 11.9165 3.3457L8.97901 6.28718C6.87453 8.38669 6.85261 11.361 8.98996 13.4933C9.47224 13.9744 10.097 14.3353 11.0944 14.5758Z"
              fill="white"
            />
          </svg>
          <span>Connect Wallet</span>
        </button>
      </div>
    </div>
  );
};
