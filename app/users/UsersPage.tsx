"use client"
import React, { useEffect, useState } from 'react'
import { styles } from "../styles/styles";
import Button from '../components/ui/button';
import { useFetchUsers } from '../api/apiClient';
import { User } from '../models/IUser';
import { useSession } from "next-auth/react";
import UserInfoModal from '../components/Modal/UserInfoModal';
import Table from '../components/ui/table';
import { Pagination } from '../components/ui/pagination';
import { PaginationMetaProps } from '../types/pagination';

type Props = {}

export const UsersPage = (props: Props) => {
    const fetchUsers = useFetchUsers();
    const { data: session, status } = useSession();
    const user = session?.user;

    const [isLoading, setIsLoading] = React.useState(true);
    const [users, setUsers] = React.useState<User[]>();
    const [selectedUser, setSelectedUser] = useState<User>();
    const [showUserInfoModal, setShowUserInfoModal] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState<'customers' | 'organizers'>();
    const [[page, limit], setPaginationMeta] = useState([1, 10]);
    const [searchQuery, setSearchQuery] = useState<string>();
    const [usersMeta, setUsersMeta] = useState<PaginationMetaProps>();

    const handleFetchUsers = async (page: number = 1, _searchQuery?: string) => {
        setIsLoading(true);
        await fetchUsers(user?.token as string, page.toString(), limit.toString(), _searchQuery ?? searchQuery ?? '', selectedFilter)
            .then((response) => {
                setUsers(response.data.users);
                setUsersMeta(response.data.meta);
            })
            .catch((error) => {
                // console.log("🚀 ~ .catch ~ error", error)
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    // const handleFilterUsers = async () => {
    //     let _filteredUsers;

    //     switch (selectedFilter) {
    //         case "all":
    //             _filteredUsers = users?.filter(user => user);
    //             break;
    //         case "organizers":
    //             _filteredUsers = users?.filter(user => user._count.events > 0);
    //             break;
    //         case "customers":
    //             _filteredUsers = users?.filter(user => user._count.events == 0);
    //             break;

    //         default:
    //             _filteredUsers = users?.filter(user => user);
    //             break;
    //     }

    //     setFilteredUsers(_filteredUsers);
    // };

    useEffect(() => {
        handleFetchUsers();
    }, [user]);

    useEffect(() => {
        if (selectedFilter) {
            handleFetchUsers();
        };
    }, [selectedFilter]);

    return (
        <main className={styles.mainPageStyle}>
            <UserInfoModal
                visibility={showUserInfoModal}
                setVisibility={setShowUserInfoModal}
                user={selectedUser}
            />

            <div className="flex flex-row items-start justify-between w-full mb-4 mt-6">
                <div>
                    <h3 className="text-2xl text-dark-grey font-medium">Users</h3>
                    {usersMeta && <p>Results: {usersMeta?.total}</p>}
                </div>

                {
                    users &&
                    <div className='flex flex-row gap-3'>
                        <span className='text-xl p-2 px-3 rounded-xl bg-primary text-white'>{users?.length}</span>
                        <select
                            onChange={(e) => {
                                setSelectedFilter(e.target.value as 'customers' | 'organizers');
                            }}
                            className='text-dark-grey p-2 px-3 rounded-lg'>
                            <option className='p-2 bg-white' value="all">All users</option>
                            <option className='p-2 bg-white' value="organizers">Organizers</option>
                            <option className='p-2 bg-white' value="customers">Customers</option>
                        </select>
                    </div>
                }
            </div>

            <div className="bg-white text-dark-grey w-full rounded-xl p-0">
                {/* <div className="flex flex-row items-center justify-between mb-5">
                        console.log("🚀 ~ UsersPage ~ e.target.value:", e.target.value)
                        console.log("🚀 ~ UsersPage ~ e.target.value:", e.target.value)
                    <h3 className="text-xl font-medium">All Users</h3>
                    <Button>
                        Filter
                    </Button>
                </div> */}

                {/* <div className="mb-5">
                    <p className="text-dark-grey/50">Search bar comes here</p>
                </div> */}

                <div className='rounded-2xl overflow-x-auto bg-white'>
                    <Table
                        tableHeaderStyle="text-white"
                        tableHeaders={[
                            <div className="flex items-center">
                                <span className="ml-2">First name</span>
                            </div>,
                            <>Last name</>,
                            <>Email</>,
                            <>Phone number</>,
                            <>Event published</>,
                            <>Action</>,
                        ]}
                        tableRowsData={
                            users?.map((user, index) => [
                                <div className="flex items-center text-[#666666]">
                                    <span className="ml-2 text-sm w-48 text-wrap">{user.firstName}</span>
                                </div>,
                                <span className="text-[#666666] text-left">{user.lastName}</span>,
                                <span className="text-[#666666]">{user.email}</span>,
                                <span className="text-[#666666] whitespace-nowrap">{user.phone || 'Not available'}</span>,
                                <span className="text-[#666666] whitespace-nowrap">{user._count.events || 0}</span>,
                                <div className='flex flex-row gap-1'>
                                    <Button
                                        minBtn
                                        onClick={() => {
                                            setSelectedUser(user);
                                            setShowUserInfoModal(true)
                                        }}
                                        className="!bg-light-grey !text-dark-grey whitespace-nowrap">
                                        View details
                                    </Button>
                                    {user._count.events > 0 && <Button minBtn className="!bg-primary !text-white whitespace-nowrap">View events</Button>}
                                </div>
                            ]) ?? []
                        }
                        isLoading={isLoading}
                    ></Table>
                    <div className="flex justify-end mt-4 p-5">
                        {
                            usersMeta && usersMeta.totalPages > 1 &&
                            <Pagination
                                meta={{ ...usersMeta, page }}
                                onPageChange={(page) => handleFetchUsers(page)}
                            />
                        }
                    </div>
                </div>

                {/* <div className="w-full flex flex-col gap-4 overflow-x-auto rounded-lg max-h-80 overflow-y-auto hideScrollBar">
                    <table className="">
                        <tbody>
                            <tr>
                                <th className="text-sm font-semibold text-dark-grey whitespace-nowrap p-3 text-left bg-light-grey">First name</th>
                                <th className="text-sm font-semibold text-dark-grey whitespace-nowrap p-3 text-left bg-light-grey">Last name</th>
                                <th className="text-sm font-semibold text-dark-grey whitespace-nowrap p-3 text-left bg-light-grey">Email</th>
                                <th className="text-sm font-semibold text-dark-grey whitespace-nowrap p-3 text-left bg-light-grey">Phone number</th>
                                <th className="text-sm font-semibold text-dark-grey whitespace-nowrap p-3 text-left bg-light-grey">Events Published</th>
                                <th className="text-sm font-semibold text-dark-grey whitespace-nowrap p-3 text-left bg-light-grey">Actions</th>
                            </tr>
                            {
                                users?.map((user, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="p-3 text-sm border-r-[1px] border-dark-grey/10">{user.firstName}</td>
                                            <td className="p-3 text-sm border-r-[1px] border-dark-grey/10">{user.lastName}</td>
                                            <td className="p-3 text-sm border-r-[1px] border-dark-grey/10">{user.email}</td>
                                            <td className="p-3 text-sm border-r-[1px] border-dark-grey/10">{user.phone || 'Not available'}</td>
                                            <td className="p-3 text-sm border-r-[1px] border-dark-grey/10">{user._count.events}</td>
                                            <td className="p-3 text-sm border-r-[1px] border-dark-grey/10 flex flex-row gap-1">
                                                <Button
                                                    minBtn
                                                    onClick={() => {
                                                        setSelectedUser(user);
                                                        setShowUserInfoModal(true)
                                                    }}
                                                    className="!bg-light-grey !text-dark-grey whitespace-nowrap">
                                                    View details
                                                </Button>
                                                {user._count.events > 0 && <Button minBtn className="!bg-primary !text-white whitespace-nowrap">View events</Button>}
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div> */}
            </div>
        </main >
    )
}