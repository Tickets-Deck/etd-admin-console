"use client"
import React, { useEffect, useState } from 'react'
import { styles } from "../styles/styles";
import Button from '../components/ui/button';
import { useCreateCouponCode, useCreateTransactionFee, useDeleteCouponCode, useDeleteTransactionFee, useFetchCouponCodes, useFetchTransactionFees, useFetchUsers } from '../api/apiClient';
import { User } from '../models/IUser';
import { useSession } from "next-auth/react";
import { TransactionFeeRequest, TransactionFeeResponse } from '../models/ITransactionFee';
import TransactionFeeCreationModal from '../components/Modal/TransactionFeeCreationModal';
import { catchError } from '../constants/catchError';
import TransactionFeeSection from '../components/settings/TransactionFeeSection';
import { CouponCodeRequest, CouponCodeResponse } from '../models/ICoupon';
import moment from 'moment';
import CouponCodeSection from '../components/settings/CouponCodeSection';

type Props = {}

export const SettingsPage = (props: Props) => {

    const { data: session, status } = useSession();
    
    return (
        <main className={styles.mainPageStyle}>

            <div className='flex flex-col gap-5 w-full lg:flex-row'>
                <TransactionFeeSection session={session} />

                <CouponCodeSection session={session} />
            </div>
        </main>
    )
}