"use client"
import React from 'react'
import { styles } from "../styles/styles";
import { useSession } from "next-auth/react";
import TransactionFeeSection from '../components/settings/TransactionFeeSection';
import CouponCodeSection from '../components/settings/CouponCodeSection';

export const SettingsPage = () => {

    const { data: session } = useSession();
    
    return (
        <main className={styles.mainPageStyle}>

            <div className='flex flex-col gap-5 w-full lg:flex-row'>
                <TransactionFeeSection session={session} />

                <CouponCodeSection session={session} />
            </div>
        </main>
    )
}