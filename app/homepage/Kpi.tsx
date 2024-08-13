import React from 'react'
import Link from "next/link";

type Kpi = {
    icon: JSX.Element;
    title: string;
    value: string;
    path: string;
    priceKpi?: boolean;
}

const Kpi = ({ path, icon, title, value, priceKpi }: Kpi) => {
    return (
        <Link href={path} className="bg-white w-full rounded-2xl p-5 flex flex-col focus:shadow-lg focus:shadow-gray-200">
            <span className="w-12 h-12 bg-primary/10 grid place-items-center rounded-lg mb-6">
                {icon}
            </span>
            <h3 className="font-semibold text-lg text-dark-grey/50">{title}</h3>
            <p className="font-semibold text-3xl text-primary font-MonaSansWide">
                {priceKpi && <>&#8358;</>}
                {value}
            </p>
        </Link>
    )
}

export default Kpi