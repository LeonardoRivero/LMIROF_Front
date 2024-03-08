import { Dispatch, SetStateAction, createContext, useState } from "react";

interface NotificationContextProps {
  show: boolean;
  hide: boolean;
}

const initialState: NotificationContextProps = {
  show: false,
  hide: true,
};

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const NotificationContext = createContext<
  [NotificationContextProps, Dispatch<SetStateAction<NotificationContextProps>>]
>([{} as NotificationContextProps, {} as Dispatch<SetStateAction<NotificationContextProps>>]);

export default function notificationContextProvider({ children }: Props) {
  const [context, useContext] = useState<NotificationContextProps>(initialState);
  return <NotificationContext.Provider value={[context, useContext]}> {children}</NotificationContext.Provider>;
}
