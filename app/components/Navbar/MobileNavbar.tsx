import { ReactElement, FunctionComponent, Dispatch, SetStateAction } from "react"
import { motion } from "framer-motion"
import { liVariant, mobileMenuVariant, overlayVariant, ulVariant } from "@/app/animations/navbarAnimations";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ApplicationRoutes } from "@/app/constants/applicationRoutes";
import { Icons } from "../ui/icons";

interface MobileNavbarOverlayProps {
    navbarIsVisible: boolean;
    setNavbarIsVisible: Dispatch<SetStateAction<boolean>>
}

const MobileNavbarOverlay: FunctionComponent<MobileNavbarOverlayProps> = ({ navbarIsVisible, setNavbarIsVisible }): ReactElement => {

    const pathname = usePathname();

    const navLinks = [
        {
            link: ApplicationRoutes.Home,
            text: "Home"
        },
        {
            link: ApplicationRoutes.Users,
            text: "Users"
        },
        {
            link: ApplicationRoutes.Events,
            text: "Events"
        },
        {
            link: ApplicationRoutes.Payments,
            text: "Payments"
        },
    ];

    return (
        <motion.div variants={mobileMenuVariant({ direction: "fromRight" })} className="fixed top-0 right-0 p-5 w-screen h-screen flex flex-col items-end z-[999] bg-white">
            <div className="flex flex-row justify-between mb-6">
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 grid place-items-center bg-light-grey rounded-lg"
                    onClick={() => setNavbarIsVisible(false)}>
                    <Icons.CloseIcon />
                </motion.button>
            </div>

            <motion.div variants={ulVariant} className="flex flex-col gap-5 w-full h-full">
                {
                    navLinks.map((navLink, index) => (
                        <Link key={index} href={navLink.link} className="text-black p-2 rounded-lg focus:bg-light-grey" onClick={() => setNavbarIsVisible(false)}>
                            <motion.span variants={liVariant} className={pathname == navLink.link ? '' : ''} key={index}>
                                {/* {navLink.icon} */}
                                {navLink.text}
                            </motion.span>
                        </Link>
                    ))
                }
            </motion.div>
        </motion.div>
    );
}

export default MobileNavbarOverlay;