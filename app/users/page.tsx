import { FunctionComponent, ReactElement } from "react";
import { UsersPage } from "./UsersPage";

interface UsersProps {

}

const Users: FunctionComponent<UsersProps> = (): ReactElement => {
    return (
        <UsersPage />
    );
}

export default Users;