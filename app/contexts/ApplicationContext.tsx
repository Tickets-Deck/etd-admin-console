import { Dispatch, FunctionComponent, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";
import { useOnline } from "../hooks/useOnline";

// Define the type for the context data
export type ApplicationContextData = {
    offlineStatusModalVisibility: boolean;
    hideOfflineStatusModalVisibility: Dispatch<SetStateAction<boolean>>
};

// Create a context with the specified data type
const ApplicationContext = createContext<ApplicationContextData | undefined>(undefined);

// Create a provider component that takes children as props
type AppProviderProps = {
    children: ReactNode;
};

const AppProvider: FunctionComponent<AppProviderProps> = ({ children }) => {

    const [offlineStatusModalVisibility, setOfflineStatusModalVisibility] = useState(false);

    const isOnline = useOnline();

    useEffect(() => {
        if (!isOnline) {
            setOfflineStatusModalVisibility(true);
        } else {
            setOfflineStatusModalVisibility(false);
        }
    }, [isOnline])

    // Define the values you want to share
    const sharedData: ApplicationContextData = {
        offlineStatusModalVisibility,
        hideOfflineStatusModalVisibility: setOfflineStatusModalVisibility
    };

    return (
        <ApplicationContext.Provider value={sharedData}>
            {children}
        </ApplicationContext.Provider>
    );
};

export { AppProvider, ApplicationContext };
