"use client"
import React, { useEffect, useState } from 'react'
import { styles } from "../styles/styles";
import Button from '../components/ui/button';
import { useCreateTransactionFee, useDeleteTransactionFee, useFetchTransactionFees, useFetchUsers } from '../api/apiClient';
import { User } from '../models/IUser';
import { useSession } from "next-auth/react";
import { TransactionFeeRequest, TransactionFeeResponse } from '../models/ITransactionFee';
import TransactionFeeCreationModal from '../components/Modal/TransactionFeeCreationModal';

type Props = {}

export const SettingsPage = (props: Props) => {

    const fetchTransactionFees = useFetchTransactionFees();
    const createTransactionFee = useCreateTransactionFee();
    const deleteTransactionFee = useDeleteTransactionFee();

    const { data: session, status } = useSession();
    const user = session?.user;

    const [isFetchingFees, setIsFetchingFees] = useState(true);
    const [isCreatingTransactionFee, setIsCreatingTransactionFee] = useState(false);
    const [isDeletingTransactionFee, setIsDeletingTransactionFee] = useState(false);
    const [transactionFeeCreationModalVisibility, setTransactionFeeCreationModalVisibility] = useState(false);
    const [selectedTransactionFee, setSelectedTransactionFee] = useState<TransactionFeeResponse>();

    const [transactionFees, setTransactionFees] = useState<TransactionFeeResponse[]>();
    const [generalFee, setGeneralFee] = useState<TransactionFeeResponse>();

    const [transactionFeeReq, setTransactionFeeReq] = useState<TransactionFeeRequest>();

    const handleFetchTransactionFees = async () => {
        await fetchTransactionFees(user?.id as string)
            .then((response) => {
                console.log("🚀 ~ .then ~ response:", response.data);
                setTransactionFees(response.data);
            })
            .catch((error) => {
                // console.log("🚀 ~ .catch ~ error", error)
            })
            .finally(() => {
                setIsFetchingFees(false);
            });
    };

    const handleCreateTransactionFee = async () => {
        // show loader
        setIsFetchingFees(true);

        // create transaction fee
        await createTransactionFee(user?.id as string, transactionFeeReq as TransactionFeeRequest)
            .then(async (response) => {
                // console.log("🚀 ~ .then ~ response:", response.data);

                // fetch transaction fees
                await handleFetchTransactionFees();

                // hide loader
                setIsCreatingTransactionFee(false);

                // close modal
                setTransactionFeeCreationModalVisibility(false);
            })
            .catch((error) => {
                console.log("🚀 ~ .catch ~ error", error)
                // hide loader
                setIsCreatingTransactionFee(false);
            })
    };

    const handleDeleteTransactionFee = async (transactionFeeId: string) => {
        
        // show loader
        setIsDeletingTransactionFee(true);

        // delete transaction fee
        await deleteTransactionFee(user?.id as string, transactionFeeId)
            .then(async (response) => {
                console.log("🚀 ~ .then ~ response:", response.data);

                // fetch transaction fees
                await handleFetchTransactionFees();
            })
            .catch((error) => {
                console.log("🚀 ~ .catch ~ error", error)
            })
            .finally(() => {
                // hide loader
                setIsDeletingTransactionFee(false);
            });
    };

    useEffect(() => {
        handleFetchTransactionFees();
    }, [user]);

    useEffect(() => {
        if (transactionFees) {
            const generalFee = transactionFees.find(fee => fee.events.length == 0);
            setGeneralFee(generalFee);
        }
    }, [transactionFees])

    return (
        <main className={styles.mainPageStyle}>
            <div className="flex flex-col items-start w-full mb-4 mt-6 md:flex-row md:justify-between">
                <h3 className="text-2xl text-dark-grey font-medium">Transaction Fees</h3>

                <div className="flex flex-row items-center gap-4 mt-4">
                    <Button
                        onClick={() => setTransactionFeeCreationModalVisibility(true)}
                        className="bg-primary text-white">
                        Create Transaction Fee
                    </Button>
                </div>
            </div>

            <TransactionFeeCreationModal
                visibility={transactionFeeCreationModalVisibility}
                setVisibility={setTransactionFeeCreationModalVisibility}
                feeDetails={transactionFeeReq}
                setFeeDetails={setTransactionFeeReq}
                handleCreateTransactionFee={handleCreateTransactionFee}
                isCreatingTransactionFee={isCreatingTransactionFee}
            />

            <div className="bg-white text-dark-grey w-full rounded-2xl p-5">
                <p className="text-dark-grey/50">Transaction fees are charges applied to transactions on the platform</p>
                <div className='my-3 flex flex-row items-end gap-4'>
                    <div className='flex flex-col items-start'>
                        <h2>General Fee:</h2>
                        <div className='flex flex-row gap-4'>
                            <p>Flat Fee: {generalFee?.flatFee ?? 0}</p>
                            <p>Percentage: {generalFee?.percentage ?? 0}%</p>
                        </div>
                    </div>
                    <div>
                        <Button
                            minBtn
                            onClick={() => {
                                setTransactionFeeReq({ percentage: parseInt(generalFee?.percentage as string), flatFee: generalFee?.flatFee } as TransactionFeeRequest)
                                setTransactionFeeCreationModalVisibility(true)
                            }}
                            className="!bg-light-grey !text-primary">
                            Edit
                        </Button>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-4 overflow-x-auto rounded-lg max-h-80 overflow-y-auto hideScrollBar">
                    <table className="">
                        <tbody>
                            <tr>
                                <th className="text-sm font-semibold text-dark-grey whitespace-nowrap p-3 text-left bg-light-grey">Event name</th>
                                <th className="text-sm font-semibold text-dark-grey whitespace-nowrap p-3 text-left bg-light-grey">Percentage</th>
                                <th className="text-sm font-semibold text-dark-grey whitespace-nowrap p-3 text-left bg-light-grey">Flat fee</th>
                                {/* <th className="text-sm font-semibold text-dark-grey whitespace-nowrap p-3 text-left bg-light-grey">Role</th> */}
                                <th className="text-sm font-semibold text-dark-grey whitespace-nowrap p-3 text-left bg-light-grey">Actions</th>
                            </tr>
                            {
                                transactionFees?.map((transactionFee, index) => {
                                    if (transactionFee.events.length === 0) return;
                                    return (
                                        <tr key={index}>
                                            <td className="p-3 text-sm border-r-[1px] border-dark-grey/10">{transactionFee.events[0].title}</td>
                                            <td className="p-3 text-sm border-r-[1px] border-dark-grey/10">{transactionFee.percentage}%</td>
                                            <td className="p-3 text-sm border-r-[1px] border-dark-grey/10">&#8358;{Number(transactionFee.flatFee).toLocaleString()}</td>
                                            {/* <td className="p-3 text-sm border-r-[1px] border-dark-grey/10">Admin</td> */}
                                            <td className="p-3 text-sm border-r-[1px] border-dark-grey/10 flex flex-row gap-1">
                                                <Button
                                                    minBtn
                                                    disabled={isDeletingTransactionFee && transactionFee.id === selectedTransactionFee?.id}
                                                    className="!bg-failed !text-white disabled:pointer-events-none disabled:opacity-50"
                                                    onClick={() => {
                                                        setSelectedTransactionFee(transactionFee);
                                                        handleDeleteTransactionFee(transactionFee.id);
                                                    }}
                                                >
                                                    Delete
                                                </Button>
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
    )
}