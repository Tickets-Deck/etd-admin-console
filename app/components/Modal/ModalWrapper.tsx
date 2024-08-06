import { Dispatch, FunctionComponent, ReactElement, ReactNode, SetStateAction, useRef, CSSProperties } from "react";
// import modalStyle from "../../styles/ModalStyle.module.scss";
import useRemoveHtmlElementFromDOM from "../../hooks/useRemoveHtmlElementFromDOM";

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

    !disallowRemovalTrigger && useRemoveHtmlElementFromDOM(modalContainerRef, visibility, 350, "flex");

    return (
        <div className={`fixed w-full h-full top-0 left-0 z-[120] grid place-items-center ${visibility ? "" : "pointer-events-none"}`} ref={modalContainerRef}>
            <div
                className={visibility ? "bg-container-grey/40 absolute w-full h-full top-0 left-0" : "opacity-0"}
                onClick={() => disallowOverlayFunction ? {} : setVisibility(false)}>
            </div>
            <div
                className={`bg-primary-sub translate-y-0 z-[120] w-full m-auto ${visibility ? "" : " translate-y-12 opacity-0"}`}
                style={styles}>
                {children}
            </div>
        </div>
    );
}

export default ModalWrapper;