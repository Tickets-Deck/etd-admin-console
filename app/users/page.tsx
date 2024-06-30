import { FunctionComponent, ReactElement } from "react";
import Button from "../components/ui/button";
import { styles } from "../styles/styles";

interface UsersProps {

}

const Users: FunctionComponent<UsersProps> = (): ReactElement => {
    return (
        <main className={styles.mainPageStyle}>
            <div className="flex flex-col items-start w-full mb-10">
                <h3 className="text-2xl font-medium">Users</h3>
            </div>

            <div className="bg-white w-full rounded-2xl p-5">
                <div className="flex flex-row items-center justify-between mb-5">
                    <h3 className="text-xl font-medium">All Users</h3>
                    <Button>
                        Filter
                    </Button>
                </div>

                <div className="mb-5">
                    <p className="text-dark-grey/50">Search bar comes here</p>
                </div>

                <div className="w-full flex flex-col gap-4 overflow-x-auto rounded-lg max-h-80 overflow-y-auto hideScrollBar">
                    <table className="">
                        <tbody>
                            <tr>
                                <th className="text-sm font-semibold text-dark-grey whitespace-nowrap p-3 text-left bg-light-grey">First name</th>
                                <th className="text-sm font-semibold text-dark-grey whitespace-nowrap p-3 text-left bg-light-grey">Last name</th>
                                <th className="text-sm font-semibold text-dark-grey whitespace-nowrap p-3 text-left bg-light-grey">Email</th>
                                <th className="text-sm font-semibold text-dark-grey whitespace-nowrap p-3 text-left bg-light-grey">Role</th>
                                <th className="text-sm font-semibold text-dark-grey whitespace-nowrap p-3 text-left bg-light-grey">Actions</th>
                            </tr>
                            {
                                [...Array(10)].map((_, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="p-3 text-sm border-r-[1px] border-dark-grey/10">John</td>
                                            <td className="p-3 text-sm border-r-[1px] border-dark-grey/10">Doe</td>
                                            <td className="p-3 text-sm border-r-[1px] border-dark-grey/10">simlexafol@gmail.com</td>
                                            <td className="p-3 text-sm border-r-[1px] border-dark-grey/10">Admin</td>
                                            <td className="p-3 text-sm border-r-[1px] border-dark-grey/10 flex flex-row gap-1">
                                                <Button minBtn className="!bg-light-grey !text-dark-grey whitespace-nowrap">View details</Button>
                                                {/* <Button minBtn className="bg-transparent text-red-500">Delete</Button> */}
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            {/* <tr>
                                <td className="p-2 py-3 text-sm border-r-[1px] border-dark-grey/10">John</td>
                                <td className="p-2 py-3 text-sm border-r-[1px] border-dark-grey/10">Doe</td>
                                <td className="p-2 py-3 text-sm border-r-[1px] border-dark-grey/10">simlexafol@gmail.com</td>
                                <td className="p-2 py-3 text-sm border-r-[1px] border-dark-grey/10">Admin</td>
                                <td className="p-2 py-3 text-sm border-r-[1px] border-dark-grey/10 flex flex-row gap-1">
                                    <Button minBtn className="!bg-light-grey text-dark-grey whitespace-nowrap">View details</Button>
                                    {/* <Button minBtn className="bg-transparent text-red-500">Delete</Button> 
                                </td>
                            </tr>
                            <tr>
                                <td className="p-2 py-3 text-sm border-r-[1px] border-dark-grey/10">John</td>
                                <td className="p-2 py-3 text-sm border-r-[1px] border-dark-grey/10">Doe</td>
                                <td className="p-2 py-3 text-sm border-r-[1px] border-dark-grey/10">simlexafol@gmail.com</td>
                                <td className="p-2 py-3 text-sm border-r-[1px] border-dark-grey/10">Admin</td>
                                <td className="p-2 py-3 text-sm border-r-[1px] border-dark-grey/10 flex flex-row gap-1">
                                    <Button minBtn className="!bg-light-grey text-dark-grey whitespace-nowrap">View details</Button>
                                </td>
                            </tr>
                            <tr>
                                <td className="p-2 py-3 text-sm border-r-[1px] border-dark-grey/10">John</td>
                                <td className="p-2 py-3 text-sm border-r-[1px] border-dark-grey/10">Doe</td>
                                <td className="p-2 py-3 text-sm border-r-[1px] border-dark-grey/10">simlexafol@gmail.com</td>
                                <td className="p-2 py-3 text-sm border-r-[1px] border-dark-grey/10">Admin</td>
                                <td className="p-2 py-3 text-sm border-r-[1px] border-dark-grey/10 flex flex-row gap-1">
                                    <Button minBtn className="!bg-light-grey text-dark-grey whitespace-nowrap">View details</Button>
                                </td>
                            </tr> */}
                        </tbody>
                    </table>
                </div>
            </div>
        </main >
    );
}

export default Users;