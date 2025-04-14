import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useRef,
  useEffect,
} from 'react';
import classNames from 'classnames';
import {gsap} from 'gsap';

import s from './Tabs.module.css';

const TabsContext = createContext<
  {activeTab: string; setActiveTab: (tab: string) => void} | undefined
>(undefined);

export const Tabs = ({
  defaultTab,
  children,
}: {
  defaultTab: string;
  children: ReactNode;
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabsContext.Provider value={{activeTab, setActiveTab}}>
      <div className={s.container}>{children}</div>
    </TabsContext.Provider>
  );
};

export const List = ({children}: {children: ReactNode}) => {
  return <div className={s.list}>{children}</div>;
};

export const Tab = ({tab, children}: {tab: string; children: ReactNode}) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Tabs.Tab must be used within Tabs');

  const {activeTab, setActiveTab} = context;

  const bubbleRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (activeTab === tab && bubbleRef.current) {
      // GSAP animation on tab activation
      gsap.to(bubbleRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
      });
    } else if (bubbleRef.current) {
      // Hide the bubble when tab is not active
      gsap.to(bubbleRef.current, {
        opacity: 0,
        scale: 0.5,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  }, [activeTab, tab]);

  return (
    <button
      className={classNames(s.button, {[s.active]: activeTab === tab})}
      onClick={() => setActiveTab(tab)}
    >
      <span
        ref={bubbleRef}
        className={s.buttonBubble}
        style={{borderRadius: 9999}}
      />
      {children}
    </button>
  );
};

export const Panel = ({tab, children}: {tab: string; children: ReactNode}) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Tabs.Panel must be used within Tabs');

  return context.activeTab === tab ? (
    <div className={s.panel}>{children}</div>
  ) : null;
};

Tabs.List = List;
Tabs.Tab = Tab;
Tabs.Panel = Panel;
