"use client"
import { FunctionComponent, ReactElement, useEffect, useState } from "react";
import Button from "../ui/button";
import { Session } from "next-auth";
import { useCreateCouponCode, useDeleteCouponCode, useFetchCouponCodes } from "@/app/api/apiClient";
import { CouponCodeRequest, CouponCodeResponse } from "@/app/models/ICoupon";
import { catchError } from "@/app/constants/catchError";
import moment from "moment";
import CouponCodeCreationModal from "../Modal/CouponCreationModal";
import { ApplicationError } from "@/app/constants/applicationError";
import { toast } from "sonner";

interface CouponCodeSectionProps {
    session: Session | null
}

const CouponCodeSection: FunctionComponent<CouponCodeSectionProps> = ({ session }): ReactElement => {

    const fetchCouponCodes = useFetchCouponCodes();
    const createCouponCode = useCreateCouponCode();
    const deleteCouponCode = useDeleteCouponCode();

    const user = session?.user;

    const [isFetchingCouponCodes, setIsFetchingCouponCodes] = useState(true);
    const [isCreatingCouponCode, setIsCreatingCouponCode] = useState(false);
    const [isDeletingCouponCode, setIsDeletingCouponCode] = useState(false);
    const [couponCodeCreationModalVisibility, setCouponCodeCreationModalVisibility] = useState(false);
    const [selectedCouponCode, setSelectedCouponCode] = useState<CouponCodeResponse>();

    const [couponCodes, setCouponCodes] = useState<CouponCodeResponse[]>();

    const [couponCodeReq, setCouponCodeReq] = useState<CouponCodeRequest>();

    const handleFetchCouponCodes = async () => {
        await fetchCouponCodes(user?.id as string)
            .then((response) => {
                setCouponCodes(response.data);
            })
            .catch((error) => {
                catchError(error);
            })
            .finally(() => {
                setIsFetchingCouponCodes(false);
            });
    };

    const handleCreateCouponCode = async () => {
        // show loader
        setIsCreatingCouponCode(true);

        // create transaction fee
        await createCouponCode(user?.id as string, couponCodeReq as CouponCodeRequest)
            .then(async (response) => {
                // fetch the coupon codes
                await handleFetchCouponCodes();

                // hide loader
                setIsCreatingCouponCode(false);

                // close modal
                setCouponCodeCreationModalVisibility(false);
            })
            .catch((error) => {
                if (error?.response?.data?.errorCode == ApplicationError.CouponCodeAlreadyExists.Code) {
                    toast.error("Coupon code already exists");
                    setIsCreatingCouponCode(false);
                    return;
                }
                if (error?.response?.data?.errorCode == ApplicationError.CouponCodeTooLong.Code) {
                    toast.error("Coupon code is too long");
                    setIsCreatingCouponCode(false);
                    return;
                }
                if (error?.response?.data?.errorCode == ApplicationError.EventWithIdNotFound.Code) {
                    toast.error("Event with specified Event Code was not found. Please check the Event Code and try again.");
                    setIsCreatingCouponCode(false);
                    return;
                }
                toast.error("Failed to create coupon code. Please try again.");

                // hide loader
                setIsCreatingCouponCode(false);
            })
    };

    const handleDeleteCouponCode = async (couponCodeId: string) => {

        // show loader
        setIsDeletingCouponCode(true);

        // delete transaction fee
        await deleteCouponCode(user?.id as string, couponCodeId)
            .then(async (response) => {
                // fetch the coupon codes
                await handleFetchCouponCodes();
            })
            .catch((error) => {
                catchError(error);
            })
            .finally(() => {
                // hide loader
                setIsDeletingCouponCode(false);
            });
    };

    useEffect(() => {
        handleFetchCouponCodes();
    }, [user]);

    useEffect(() => {
        if (couponCodes) {
            const generalFee = couponCodes.find(fee => fee.events.length == 0);
        }
    }, [couponCodes]);

    return (
        <>
            <CouponCodeCreationModal
                visibility={couponCodeCreationModalVisibility}
                setVisibility={setCouponCodeCreationModalVisibility}
                couponCodeDetails={couponCodeReq}
                setCouponCodeDetails={setCouponCodeReq}
                handleCreateCouponCode={handleCreateCouponCode}
                isCreatingCouponCode={isCreatingCouponCode}
            />
            <div className='w-full'>
                <div className="flex flex-col items-start w-full mb-4 mt-6 md:flex-row md:justify-between">
                    <h3 className="text-2xl text-dark-grey font-medium">Coupons</h3>

                    <div className="flex flex-row items-center gap-4 mt-4">
                        <Button
                            onClick={() => setCouponCodeCreationModalVisibility(true)}
                            className="bg-primary text-white">
                            Create Coupon
                        </Button>
                    </div>
                </div>

                <div className="bg-white text-dark-grey w-full rounded-2xl p-5">
                    <p className="text-dark-grey/50 mb-5">Coupons are codes that can be used to get discounts on tickets</p>
                    {/* <div className='my-3 flex flex-row items-end gap-4'>
                            <div className='flex flex-col items-start'>
                                <h2>General Coupon:</h2>
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
                        </div> */}
                    <div className="w-full flex flex-col gap-4 overflow-x-auto rounded-lg max-h-80 overflow-y-auto hideScrollBar">
                        <table className="">
                            <tbody>
                                <tr>
                                    <th className="text-sm font-semibold text-dark-grey whitespace-nowrap p-3 text-left bg-light-grey">Code</th>
                                    <th className="text-sm font-semibold text-dark-grey whitespace-nowrap p-3 text-left bg-light-grey">Discount</th>
                                    <th className="text-sm font-semibold text-dark-grey whitespace-nowrap p-3 text-left bg-light-grey">Event(s)</th>
                                    <th className="text-sm font-semibold text-dark-grey whitespace-nowrap p-3 text-left bg-light-grey">Expiry date</th>
                                    <th className="text-sm font-semibold text-dark-grey whitespace-nowrap p-3 text-left bg-light-grey">Usage left</th>
                                    <th className="text-sm font-semibold text-dark-grey whitespace-nowrap p-3 text-left bg-light-grey">Actions</th>
                                </tr>
                                {
                                    couponCodes?.map((couponCode, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className="p-3 text-sm border-r-[1px] border-dark-grey/10">{couponCode.code}</td>
                                                <td className="p-3 text-sm border-r-[1px] border-dark-grey/10">{couponCode.discount}%</td>
                                                <td className="p-3 text-sm border-r-[1px] border-dark-grey/10">{couponCode.events.map(event => event.title).join(', ')}</td>
                                                <td className="p-3 text-sm border-r-[1px] border-dark-grey/10">{moment(couponCode.validUntil).utc().format('MMM Do, YYYY')} at {moment(couponCode.validUntil).utc().format('h:mm a')}</td>
                                                <td className="p-3 text-sm border-r-[1px] border-dark-grey/10">{couponCode.maxUsage}</td>
                                                <td className="p-3 text-sm border-r-[1px] border-dark-grey/10 flex flex-row gap-1">
                                                    <Button
                                                        minBtn
                                                        disabled={isDeletingCouponCode && couponCode.id === selectedCouponCode?.id}
                                                        className="!bg-failed !text-white disabled:pointer-events-none disabled:opacity-50"
                                                        onClick={() => {
                                                            setSelectedCouponCode(couponCode);
                                                            handleDeleteCouponCode(couponCode.id);
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
            </div>
        </>
    );
}

export default CouponCodeSection;