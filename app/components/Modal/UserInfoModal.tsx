import { FunctionComponent, ReactElement, Dispatch, SetStateAction, useEffect, useRef, useState, useCallback } from "react";
import ModalWrapper from "./ModalWrapper";
import { CloseIcon } from "../SVGs/SVGicons";
import { toast } from "sonner";
import { CouponCodeRequest } from "@/app/models/ICoupon";
import Button from "../ui/button";
import { User } from "@/app/models/IUser";
import moment from "moment";
import { NairaPrice } from "@/app/constants/priceFormatter";

interface UserInfoModalProps {
    visibility: boolean
    setVisibility: Dispatch<SetStateAction<boolean>>
    user: User | undefined
}

const UserInfoModal: FunctionComponent<UserInfoModalProps> = (
    { visibility, setVisibility, user }): ReactElement => {

    return (
        <ModalWrapper visibility={visibility} setVisibility={setVisibility} styles={{ backgroundColor: 'transparent', color: '#fff', width: "fit-content" }}>
            <div className="w-full max-w-full md:w-[400px] md:max-w-[400px] p-6 rounded-2xl bg-light-grey text-container-grey">
                <div className="flex flex-row justify-between items-center mb-2">
                    <div className="flex flex-col items-start">
                        <h3 className="font-medium">
                            User Info
                        </h3>
                    </div>
                    <span
                        className="ml-auto w-8 h-8 min-w-8 min-h-8 rounded-full grid place-items-center cursor-pointer bg-dark-grey/5 hover:bg-white/10"
                        onClick={() => setVisibility(false)}>
                        <CloseIcon stroke="#111" />
                    </span>
                </div>
                <div className="flex flex-col gap-2 mb-3">
                    <div className="flex flex-row w-full justify-between">
                        <p className="text-sm">
                            First name
                        </p>
                        <p className="text-sm">
                            {user?.firstName}
                        </p>
                    </div>
                    <div className="flex flex-row w-full justify-between">
                        <p className="text-sm">
                            Last name
                        </p>
                        <p className="text-sm">
                            {user?.lastName}
                        </p>
                    </div>
                    <div className="flex flex-row w-full justify-between">
                        <p className="text-sm">
                            Email
                        </p>
                        <p className="text-sm">
                            {user?.email}
                        </p>
                    </div>
                    <div className="flex flex-row w-full justify-between">
                        <p className="text-sm">
                            Email verified
                        </p>
                        <p className="text-sm">
                            {user?.emailVerified ? 'Yes' : 'No'}
                        </p>
                    </div>
                    <div className="flex flex-row w-full justify-between">
                        <p className="text-sm">
                            Tickets bought
                        </p>
                        <p className="text-sm">
                            {user?.ticketsBought}
                        </p>
                    </div>
                    <div className="flex flex-row w-full justify-between">
                        <p className="text-sm">
                            Tickets sold
                        </p>
                        <p className="text-sm">
                            {user?.ticketsSold}
                        </p>
                    </div>
                    {/* <div className="flex flex-row w-full justify-between">
                        <p className="text-sm">
                            Total revenue
                        </p>
                        <p className="text-sm">
                            {NairaPrice.format(Number(user?.totalRevenue))}
                        </p>
                    </div> */}
                    <div className="flex flex-row w-full justify-between">
                        <p className="text-sm">
                            Date registered
                        </p>
                        <p className="text-sm">
                            {moment(user?.createdAt).format("ddd, MMM D, YYYY")}
                        </p>
                    </div>

                    {/* <div>
                        <Button className="!p-1 !px-3">Close</Button>
                    </div> */}
                </div>

            </div>
        </ModalWrapper>
    );
}

export default UserInfoModal;