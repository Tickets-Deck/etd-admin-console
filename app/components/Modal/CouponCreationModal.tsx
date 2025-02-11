import { FunctionComponent, ReactElement, Dispatch, SetStateAction, useEffect, useRef, useState, useCallback } from "react";
import ModalWrapper from "./ModalWrapper";
import { CalenderIcon, CloseIcon } from "../SVGs/SVGicons";
import { toast } from "sonner";
import { CouponCodeRequest } from "@/app/models/ICoupon";
import { ComboBox, DatePicker, IComboBox, IComboBoxOption, IComboBoxStyles } from '@fluentui/react';
import moment from "moment";
import Button from "../ui/button";
import useOuterClick from "@/app/hooks/useOuterClick";
import { useEventContext } from "@/app/contexts/EventContext";

interface CouponCodeCreationModalProps {
    visibility: boolean
    setVisibility: Dispatch<SetStateAction<boolean>>
    setCouponCodeDetails: Dispatch<SetStateAction<CouponCodeRequest | undefined>>
    couponCodeDetails: CouponCodeRequest | undefined
    handleCreateCouponCode: () => Promise<void>
    isCreatingCouponCode: boolean
    selectedEvent: string | undefined
    setSelectedEvent: Dispatch<SetStateAction<string | undefined>>
}

const CouponCodeCreationModal: FunctionComponent<CouponCodeCreationModalProps> = (
    { visibility, setVisibility, couponCodeDetails, setCouponCodeDetails,
        handleCreateCouponCode, isCreatingCouponCode, selectedEvent, setSelectedEvent }): ReactElement => {

    const { handleFetchEvents, events } = useEventContext();
    const [eventsDropdownIsVisible, setEventsDropdownIsVisible] = useState(false);

    const [startTime, setStartTime] = useState<string>();

    /**
     * 
     * @returns generateTimeOptions: Generates an array of time options in 30-minute intervals.
     * startTime.setHours: Sets the start time to 10:00 AM
     * endTime.setHours: Sets the end time to 11:00 PM.
     * while (startTime <= endTime): Loops through every 30 minutes from 10:00 AM to 11:00 PM, adding each time as an option in the ComboBox
     * timeStr: Converts the date object to a human-readable time string (e.g., "10:00 AM")
     */
    const generateTimeOptions = (): IComboBoxOption[] => {
        const times: IComboBoxOption[] = [];
        const startTime = new Date();
        startTime.setHours(0, 0); // 10:00 AM

        const endTime = new Date();
        endTime.setHours(23, 0); // 11:00 PM

        while (startTime <= endTime) {
            const timeStr = moment(startTime).format('hh:mm A');
            times.push({ key: timeStr, text: timeStr });
            startTime.setMinutes(startTime.getMinutes() + 30); // Increment by 30 minutes
        }

        return times;
    };

    const onStartTimeChange = useCallback((event: React.FormEvent<IComboBox>, option?: IComboBoxOption) => {
        if (option) {
            setStartTime(option.key as string);
            // update the couponCodeDetails validUntil time
            setCouponCodeDetails((prevState) => {
                if (!prevState) return prevState;
                const newState = { ...prevState };
                newState.validUntil = new Date(`${prevState.validUntil?.toDateString()} ${option.key as string}`);
                return newState;
            });
        }
    }, []);

    const comboBoxStyles: Partial<IComboBoxStyles> = {
        optionsContainerWrapper: {
            height: '50vh',
            // width: '100%'
        },
        root: {
            // height: '32px',
            width: '100%',
            borderRadius: '12px',
            outline: 'none',
            border: 'none',
            fontSize: '14px'
        },

    };

    const validateFields = () => {
        if (!couponCodeDetails?.code) {
            toast.error("Please fill in the code field");
            return false
        }

        return true
    }

    const expiryDateRef = useRef(null);

    useEffect(() => {
        if (visibility) {
            setCouponCodeDetails({ code: "", discount: 0, maxUsage: 0, validUntil: new Date(), eventId: "" })
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
                            Create Coupon Code
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
                        Kindly provide the coupon code details below.
                    </p>
                </div>

                <div className="flex flex-col gap-2">
                    <input
                        className="w-full p-2 border-[1px] border-solid border-grey/30 bg-grey/10 rounded-lg outline-none"
                        type="text"
                        placeholder="Code"
                        name={"code"}
                        value={couponCodeDetails?.code || ""}
                        onChange={(e) => {
                            const value = e.target.value;
                            console.log({ value });

                            // check if the value contains any special characters or lowercase letters
                            if (!/^[0-9A-Z]{1,6}$/.test(value)) {
                                toast.error("Code should only contain uppercase letters, numbers, and be up to 6 characters long");
                                return;
                            }

                            setCouponCodeDetails({ ...couponCodeDetails as CouponCodeRequest, code: e.target.value })
                        }}
                    />
                    <input
                        className="w-full p-2 border-[1px] border-solid border-grey/30 bg-grey/10 rounded-lg outline-none"
                        type="text"
                        placeholder="Discount"
                        name={"discount"}
                        value={couponCodeDetails?.discount || ""}
                        onChange={(e) => {
                            const value = Number(e.target.value);
                            console.log({ value });
                            if (isNaN(value)) return;
                            if (value < 0 || value > 99) return;
                            // onFormValueChange(e, setNameErrorMsg)
                            setCouponCodeDetails({ ...couponCodeDetails as CouponCodeRequest, discount: parseInt(e.target.value) })
                        }}
                    />
                    <input
                        className="w-full p-2 border-[1px] border-solid border-grey/30 bg-grey/10 rounded-lg outline-none"
                        type="text"
                        placeholder="Max Usage"
                        name={"maxUsage"}
                        value={couponCodeDetails?.maxUsage || ""}
                        onChange={(e) => {
                            const value = Number(e.target.value);
                            console.log({ value });
                            if (isNaN(value)) return;
                            if (value < 0 || value > 99) return;
                            setCouponCodeDetails({ ...couponCodeDetails as CouponCodeRequest, maxUsage: parseInt(e.target.value) })
                        }}
                    />
                    <div className="relative" ref={eventsDropdownRef}>
                        <input
                            className="w-full p-2 border-[1px] border-solid border-grey/30 bg-grey/10 rounded-lg outline-none"
                            type="text"
                            placeholder="Event Code"
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
                                                setCouponCodeDetails({ ...couponCodeDetails as CouponCodeRequest, eventId: event.id })
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

                    <div className="flex flex-col gap-1">
                        <label htmlFor="expiryDate" className="text-xs text-dark-grey/60">Expiry Date & Time</label>
                        <div className="flex flex-row gap-2">
                            <div className="flex flex-row w-[60%] bg-white p-0 rounded-lg overflow-hidden" ref={expiryDateRef}>
                                <DatePicker
                                    style={{
                                        backgroundColor: '#ed100',
                                        width: '100%',
                                        paddingLeft: '8px'
                                    }}
                                    textField={{
                                        style: {
                                            background: '#ed100'
                                        },
                                        borderless: true,
                                    }}
                                    calloutProps={{
                                        gapSpace: 8,
                                        target: expiryDateRef
                                    }}
                                    placeholder="Expiry date"
                                    ariaLabel="Select a date"
                                    minDate={new Date()}
                                    value={couponCodeDetails?.validUntil ?? new Date()}
                                    onSelectDate={(date) => {
                                        // Set the form value
                                        setCouponCodeDetails({ ...couponCodeDetails as CouponCodeRequest, validUntil: date as Date });
                                    }}
                                    onKeyDown={(e) => {
                                        // console.log('Key down...');

                                        // If backward tab was pressed...
                                        if (e.shiftKey && e.key === 'Tab') {
                                            // console.log("Backward tab pressed...");
                                        }

                                        // If forward was tab was pressed...
                                        if (e.key === 'Tab') {
                                            // console.log("Forward tab pressed...");
                                            // If shit key was enabled...
                                            if (e.shiftKey)
                                                // Exit to aviod backward tab
                                                return;
                                            // console.log('Got here...');
                                        }
                                    }}
                                    underlined={false}
                                    showGoToToday={false}
                                    isMonthPickerVisible={true}
                                />
                            </div>
                            <div className="w-[40%]">
                                <ComboBox
                                    placeholder="Expiry Time"
                                    selectedKey={startTime}
                                    options={generateTimeOptions()}
                                    styles={comboBoxStyles}
                                    onChange={onStartTimeChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* {dateErrorMsg && <span className={styles.errorMsg}>Please enter event date</span>} */}

                <div className="flex justify-end mt-4 gap-2">
                    <button
                        className="text-sm bg-transparent text-container-grey px-4 py-2 rounded-full"
                        onClick={() => setVisibility(false)}>
                        Cancel
                    </button>
                    <Button
                        disabled={!couponCodeDetails?.discount || isCreatingCouponCode}
                        isLoading={isCreatingCouponCode}
                        className="text-sm bg-white !text-black/80 px-4 py-2 rounded-full hover:bg-white/80 transition-all"
                        onClick={() => {
                            if (!validateFields()) return;
                            handleCreateCouponCode();
                        }}>
                        Create
                    </Button>
                </div>
            </div>
        </ModalWrapper>
    );
}

export default CouponCodeCreationModal;