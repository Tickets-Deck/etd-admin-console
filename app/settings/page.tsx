import { FunctionComponent, ReactElement } from "react";
import { SettingsPage } from "./SettingsPage";

interface UsersProps {

}

const Users: FunctionComponent<UsersProps> = (): ReactElement => {
    return (
        <SettingsPage />
    );
}

export default Users;