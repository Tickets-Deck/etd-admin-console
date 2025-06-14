import { Dispatch, FunctionComponent, ReactElement, ReactNode, SetStateAction, useRef, CSSProperties, RefObject } from "react";
import useRemoveHtmlElementFromDOM from "@/hooks/useRemoveHtmlElementFromDOM";
import { motion } from "framer-motion"
import { modalCardVariant, modalOverlayVariant } from "@/animations/modal";

interface ModalWrapperProps {
    setVisibility: Dispatch<SetStateAction<boolean>>
    visibility: boolean
    children: ReactNode
    styles?: CSSProperties
    disallowOverlayFunction?: boolean
    disallowRemovalTrigger?: boolean
}

const ModalWrapper: FunctionComponent<ModalWrapperProps> = (
    { visibility, setVisibility, children, styles, disallowOverlayFunction, disallowRemovalTrigger }): ReactElement => {

    const modalContainerRef = useRef<HTMLDivElement>(null);

    !disallowRemovalTrigger && useRemoveHtmlElementFromDOM(modalContainerRef as RefObject<HTMLDivElement>, visibility, 350, "flex");

    return (
        <motion.div
            initial="closed"
            animate={visibility ? "opened" : "closed"}
            className={`fixed w-full h-full top-0 left-0 z-[120] grid place-items-center ${visibility ? "" : "pointer-events-none"}`} ref={modalContainerRef}>

            <motion.div
                variants={modalOverlayVariant}
                className={visibility ? "bg-container-grey/40 absolute w-full h-full top-0 left-0" : "opacity-0"}
                onClick={() => disallowOverlayFunction ? {} : setVisibility(false)} />

            <motion.div
                variants={modalCardVariant}
                className={`bg-primary-sub translate-y-0 z-[120] w-full m-auto ${visibility ? "" : " translate-y-12 opacity-0"}`}
                style={styles}>
                {children}
            </motion.div>
        </motion.div>
    );
}

export default ModalWrapper;