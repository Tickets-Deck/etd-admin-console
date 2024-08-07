import { Dispatch, FunctionComponent, ReactElement, SetStateAction } from "react";
import ModalWrapper from "./ModalWrapper";
import { CloseIcon } from "../SVGs/SVGicons";
import Link from "next/link";
import { ApplicationRoutes } from "@/app/constants/applicationRoutes";

interface OfflineAlertProps {
    visibility: boolean
    setVisibility: Dispatch<SetStateAction<boolean>>
}

const OfflineAlert: FunctionComponent<OfflineAlertProps> = ({ visibility, setVisibility }): ReactElement => {
    
    return (
        <ModalWrapper
            visibility={visibility}
            setVisibility={setVisibility} styles={{ backgroundColor: 'transparent', color: '#fff', width: "fit-content" }}
            disallowOverlayFunction
            disallowRemovalTrigger>
            <div className="w-[20rem] max-w-[20rem] p-6 rounded-2xl bg-container-grey">
                <div className="flex flex-row items-start justify-between mb-2">
                    <div className="flex flex-col items-start">
                        <h3 className="text-base font-semibold mb-1">Offline</h3>
                    </div>
                    <span
                        className="w-8 h-8 min-w-8 min-h-8 rounded-full grid place-items-center cursor-pointer hover:bg-white/10"
                        onClick={() => setVisibility(false)}>
                        <CloseIcon stroke="#fff" width="20" height="20" />
                    </span>
                </div>

                <div className="flex flex-col">
                    <p className="font-normal text-sm leading-5 text-white/70">It appears as though you are offline. Please check your internet connectivity for efficient experience.</p>
                </div>

                <div className="flex justify-end mt-4 gap-2">
                    <button
                        className="p-2 px-4 rounded-full outline-none border-none cursor-pointer mt-1 bg-white text-dark-grey text-center text-sm hover:opacity-80"
                        onClick={() => setVisibility(false)}>
                        Okay, Got it.
                    </button>
                </div>
            </div>
        </ModalWrapper>
    );
}

export default OfflineAlert;