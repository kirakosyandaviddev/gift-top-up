import {createContext, useContext, useState, ReactNode} from 'react';
import classNames from 'classnames';

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

  return (
    <button
      className={classNames(s.button, {[s.active]: activeTab === tab})}
      onClick={() => setActiveTab(tab)}
    >
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
