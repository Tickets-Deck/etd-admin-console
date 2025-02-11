import { Dispatch, FunctionComponent, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { useOnline } from "../hooks/useOnline";
import { AdminUser } from "../models/IAdminUser";
import { useFetchAdminUser } from "../api/apiClient";
import { useSession } from "next-auth/react";
import { catchError } from "../constants/catchError";

// Define the type for the context data
export type ApplicationContextData = {
    adminUser: AdminUser | null;
    handleFetchAdminUser: () => void;
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

    const fetchAdminUser = useFetchAdminUser();
    const { data: session, status } = useSession();
    const user = session?.user;

    const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
    const [offlineStatusModalVisibility, setOfflineStatusModalVisibility] = useState(false);
    const [isFetchingAdminUser, setIsFetchingAdminUser] = useState(false);

    const isOnline = useOnline();

    const handleFetchAdminUser = async () => {
        // Show loader
        setIsFetchingAdminUser(true);

        // Fetch admin user
        await fetchAdminUser(user?.id as string, user?.token as string)
            .then((response) => {
                setAdminUser(response.data);
            })
            .catch((error) => {
                catchError(error);
            })
            .finally(() => {
                setIsFetchingAdminUser(false);
            });
    }

    useEffect(() => {
        if (!user) return;
        handleFetchAdminUser();
    }, [user]);

    useEffect(() => {
        if (!isOnline) {
            setOfflineStatusModalVisibility(true);
        } else {
            setOfflineStatusModalVisibility(false);
        }
    }, [isOnline])

    // Define the values you want to share
    const sharedData: ApplicationContextData = {
        adminUser,
        handleFetchAdminUser,
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

export const useApplicationContext = () => {
    const context = useContext(ApplicationContext);
    if (context === undefined) {
        throw new Error("useApplicationContext must be used within a AppProvider");
    }
    return context;
}