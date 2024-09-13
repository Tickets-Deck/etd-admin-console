"use client"
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import React, { ReactElement, FunctionComponent, useState, useEffect } from "react";
import { Icons } from "../components/ui/icons";
import CustomImage from "../components/ui/image";
import images from "@/public/images";
import Link from "next/link";
import { ApplicationRoutes } from "../constants/applicationRoutes";
import { motion } from "framer-motion";
import MobileNavbarOverlay from "../components/Navbar/MobileNavbar";

interface NavbarProps {
    session: Session | null
}

const Navbar: FunctionComponent<NavbarProps> = (): ReactElement => {
    const [navbarIsVisible, setNavbarIsVisible] = React.useState(false);
    const [userInfo, setUserInfo] = useState<Session>();
    const { status, data: session } = useSession();

    useEffect(() => {
        if (!session) return;
        setUserInfo(session);
    }, [session, status])

    return (
        <motion.nav
            initial="closed"
            animate={navbarIsVisible ? "opened" : "closed"}
            className="bg-white flex flex-col gap-4 items-center fixed top-0 left-0 w-full p-4 pt-0 z-50 shadow-lg shadow-gray-200">
            <Link href={ApplicationRoutes.Home} className="w-16 h-16 bg-primary-sub rounded-b-3xl grid place-items-center">
                <div className="w-9 h-9 relative">
                    <CustomImage src={images.logoPurple} alt="Logo" />
                </div>
            </Link>
            <div className="w-full flex flex-row justify-between items-center">
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setNavbarIsVisible(!navbarIsVisible)}
                    className="!p-0 rounded-lg w-10 h-10 grid place-items-center !bg-light-grey">
                    <Icons.Hamburger />
                </motion.button>
                <Link href={ApplicationRoutes.Home} className="flex flex-row items-center gap-2">
                    <span className="relative w-10 h-10 rounded-full overflow-hidden grid place-items-center border-[1px] border-black">
                        {/* <CustomImage src={images.avatar} alt="User" /> */}
                        <Icons.User className="w-5 h-5" />
                    </span>
                    <p className="font-medium text-sm text-dark-grey">{userInfo?.user.username ?? userInfo?.user.name}</p>
                    {/* <span><Icons.Dropdown /></span> */}
                </Link>
            </div>

            <MobileNavbarOverlay
                navbarIsVisible={navbarIsVisible}
                setNavbarIsVisible={setNavbarIsVisible}
            />
        </motion.nav>
    );
}

export default Navbar;