import { FunctionComponent, ReactElement, Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { CloseIcon } from "../SVGs/SVGicons";
import { toast } from "sonner";
import { TransactionFeeRequest } from "@/app/models/ITransactionFee";
import { useEventContext } from "@/app/contexts/EventContext";
import useOuterClick from "@/app/hooks/useOuterClick";
import Button from "../ui/button";

interface TransactionFeeCreationModalProps {
    visibility: boolean
    setVisibility: Dispatch<SetStateAction<boolean>>
    setFeeDetails: Dispatch<SetStateAction<TransactionFeeRequest | undefined>>
    feeDetails: TransactionFeeRequest | undefined
    handleCreateTransactionFee: () => Promise<void>
    isCreatingTransactionFee: boolean
    selectedEvent: string | undefined
    setSelectedEvent: Dispatch<SetStateAction<string | undefined>>
}

const TransactionFeeCreationModal: FunctionComponent<TransactionFeeCreationModalProps> = (
    { visibility, setVisibility, feeDetails, setFeeDetails, selectedEvent, setSelectedEvent,
        handleCreateTransactionFee, isCreatingTransactionFee }): ReactElement => {

    const { handleFetchEvents, events } = useEventContext();
    const [eventsDropdownIsVisible, setEventsDropdownIsVisible] = useState(false);

    const validateFields = () => {
        if (!feeDetails?.percentage) {
            toast.error("Please fill in the percentage field");
            return false
        }

        return true
    }

    useEffect(() => {
        if (visibility) {
            setFeeDetails({ percentage: 0, flatFee: 0, eventId: "" })
            setSelectedEvent(undefined)
        }
    }, [visibility])

    const eventsDropdownRef = useRef(null);

    useOuterClick(eventsDropdownRef, () => setEventsDropdownIsVisible(false));

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
                            const value = Number(e.target.value);
                            if (isNaN(value)) return;
                            if (value < 0 || value > 99) return;
                            // onFormValueChange(e, setNameErrorMsg)
                            setFeeDetails({ ...feeDetails as TransactionFeeRequest, percentage: parseInt(e.target.value) })
                        }}
                    />
                    <input
                        className="w-full p-2 border-[1px] border-solid border-grey/30 bg-grey/10 rounded-lg outline-none"
                        type="text"
                        placeholder="Flat fee"
                        name={"flatFee"}
                        value={feeDetails?.flatFee}
                        onChange={(e) => setFeeDetails({ ...feeDetails as TransactionFeeRequest, flatFee: parseInt(e.target.value) })}
                    />
                    <div className="relative" ref={eventsDropdownRef}>
                        <input
                            className="w-full p-2 border-[1px] border-solid border-grey/30 bg-grey/10 rounded-lg outline-none"
                            type="text"
                            placeholder="Select Event"
                            name={"eventId"}
                            onClick={() => setEventsDropdownIsVisible(true)}
                            value={selectedEvent ?? ""}
                            onChange={(e) => {
                                if (e.target.value.length <= 3) return;
                                handleFetchEvents(1, e.target.value);
                            }}
                        />
                        {
                            eventsDropdownIsVisible &&
                            <div className="absolute z-20 w-full bg-white flex flex-col max-h-48 overflow-y-auto rounded-lg">
                                {
                                    events?.map((event, index) => (
                                        <span
                                            onClick={() => {
                                                setFeeDetails({ ...feeDetails as TransactionFeeRequest, eventId: event.id });
                                                setSelectedEvent(event.title)
                                                handleFetchEvents()
                                                setEventsDropdownIsVisible(false);
                                            }}
                                            key={index}
                                            className="p-2 px-4 hover:bg-gray-300 cursor-pointer">
                                            {event.title}
                                        </span>
                                    ))
                                }
                            </div>
                        }
                    </div>
                </div>

                <div className="flex justify-end mt-4 gap-2">
                    <button
                        className="text-sm bg-transparent text-container-grey px-4 py-2 rounded-full"
                        onClick={() => setVisibility(false)}>
                        Cancel
                    </button>
                    <Button
                        isLoading={isCreatingTransactionFee}
                        disabled={!feeDetails?.percentage || isCreatingTransactionFee}
                        className="text-sm px-4 py-2 rounded-full relative transition-all"
                        onClick={() => {
                            if (!validateFields()) return;
                            handleCreateTransactionFee();
                        }}>
                        Create
                    </Button>
                </div>
            </div>
        </ModalWrapper>
    );
}

export default TransactionFeeCreationModal;