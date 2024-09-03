import { FunctionComponent, ReactElement, Dispatch, SetStateAction } from "react";
import ModalWrapper from "./ModalWrapper";
import { CloseIcon } from "../SVGs/SVGicons";
import { toast } from "sonner";
import { TransactionFeeRequest } from "@/app/models/ITransactionFee";

interface TransactionFeeCreationModalProps {
    visibility: boolean
    setVisibility: Dispatch<SetStateAction<boolean>>
    setFeeDetails: Dispatch<SetStateAction<TransactionFeeRequest | undefined>>
    feeDetails: TransactionFeeRequest | undefined
    handleCreateTransactionFee: () => Promise<void>
    isCreatingTransactionFee: boolean
}

const TransactionFeeCreationModal: FunctionComponent<TransactionFeeCreationModalProps> = (
    { visibility, setVisibility, feeDetails, setFeeDetails,
        handleCreateTransactionFee, isCreatingTransactionFee }): ReactElement => {

    const validateFields = () => {
        if (!feeDetails?.percentage) {
            toast.error("Please fill in the percentage field");
            return false
        }

        return true
    }

    return (
        <ModalWrapper visibility={visibility} setVisibility={setVisibility} styles={{ backgroundColor: 'transparent', color: '#fff', width: "fit-content" }}>
            <div className="w-full max-w-full md:w-[400px] md:max-w-[400px] p-6 rounded-2xl bg-light-grey text-container-grey">
                <div className="flex flex-row justify-between items-center mb-2">
                    <div className="flex flex-col items-start">
                        <h3 className="font-medium">
                            Set Transaction Fee
                        </h3>
                    </div>
                    <span
                        className="ml-auto w-8 h-8 min-w-8 min-h-8 rounded-full grid place-items-center cursor-pointer hover:bg-white/10"
                        onClick={() => setVisibility(false)}>
                        <CloseIcon stroke="#111" />
                    </span>
                </div>
                <div className="flex flex-col mb-3">
                    <p className="text-sm">
                        Kindly provide the transaction fee details below. You can specify the event code if the fee is event specific.
                    </p>
                    <span className="text-sm text-white/40">
                        Percentage is required, flat fee is optional.
                    </span>
                </div>

                <div className="flex flex-col gap-2">
                    <input
                        className="w-full p-2 border-[1px] border-solid border-grey/30 bg-grey/10 rounded-lg outline-none"
                        type="text"
                        placeholder="Percentage"
                        name={"percentage"}
                        value={feeDetails?.percentage || ""}
                        onChange={(e) => {
                            setFeeDetails({ ...feeDetails as TransactionFeeRequest, percentage: parseInt(e.target.value) })
                        }}
                    />
                    <input
                        className="w-full p-2 border-[1px] border-solid border-grey/30 bg-grey/10 rounded-lg outline-none"
                        type="text"
                        placeholder="Flat fee"
                        name={"flatFee"}
                        onChange={(e) => setFeeDetails({ ...feeDetails as TransactionFeeRequest, flatFee: parseInt(e.target.value) })}
                    />
                    <input
                        className="w-full p-2 border-[1px] border-solid border-grey/30 bg-grey/10 rounded-lg outline-none"
                        type="text"
                        placeholder="Event Code"
                        name={"eventId"}
                        onChange={(e) => setFeeDetails({ ...feeDetails as TransactionFeeRequest, eventId: e.target.value })}
                    />
                </div>

                <div className="flex justify-end mt-4 gap-2">
                    <button
                        className="text-sm bg-transparent text-container-grey px-4 py-2 rounded-full"
                        onClick={() => setVisibility(false)}>
                        Cancel
                    </button>
                    <button
                        disabled={!feeDetails?.percentage || isCreatingTransactionFee}
                        className="text-sm bg-white text-black/80 px-4 py-2 rounded-full hover:bg-white/80 transition-all"
                        onClick={() => {
                            if (!validateFields()) return;
                            handleCreateTransactionFee();
                        }}>
                        Create
                    </button>
                </div>
            </div>
        </ModalWrapper>
    );
}

export default TransactionFeeCreationModal;