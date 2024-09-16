import { FunctionComponent, ReactElement, Dispatch, SetStateAction, useEffect } from "react";
import ModalWrapper from "./ModalWrapper";
import { CloseIcon } from "../SVGs/SVGicons";
import { toast } from "sonner";
import { CouponCodeRequest } from "@/app/models/ICoupon";
import Button from "../ui/button";
import { IEventEmail } from "@/app/models/IEmail";
import { EventResponse } from "@/app/models/IEvent";
import TextEditor from "../Editor/TextEditor";

interface EmailInfoModalProps {
    visibility: boolean
    setVisibility: Dispatch<SetStateAction<boolean>>
    handleSendEmailToAllTicketOrderContacts: (eventId: string) => Promise<void>
    isSendingEmail: boolean
    selectedEvent: EventResponse | undefined
    emailInfo: IEventEmail | undefined
    setEmailInfo: Dispatch<SetStateAction<IEventEmail | undefined>>
}

const EmailInfoModal: FunctionComponent<EmailInfoModalProps> = (
    { visibility, setVisibility, isSendingEmail, emailInfo, setEmailInfo,
        handleSendEmailToAllTicketOrderContacts, selectedEvent }): ReactElement => {

    const validateFields = () => {
        if (!emailInfo?.subject || !emailInfo?.body) {
            toast.error("Please provide all required fields");
            return false
        }

        return true
    }

    return (
        <ModalWrapper visibility={visibility} setVisibility={setVisibility} styles={{ backgroundColor: 'transparent', color: '#fff', width: "fit-content" }}>
            <div className="w-full max-w-full max-h-[60vh] overflow-y-auto md:w-[400px] md:max-w-[400px] p-6 rounded-2xl bg-light-grey text-container-grey">
                <div className="flex flex-row justify-between items-center mb-2">
                    <div className="flex flex-col items-start">
                        <h3 className="font-medium">
                            Email Info
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
                        {`Kindly provide the email information to be sent to all attendees of - ${selectedEvent?.title} event.`}
                    </p>
                </div>

                <div className="flex flex-col gap-2">
                    {/* <input
                        className="w-full p-2 border-[1px] border-solid border-grey/30 bg-grey/10 rounded-lg outline-none disabled:bg-grey/10 disabled:border-grey/30"
                        type="text"
                        placeholder="Event Code"
                        name={"eventId"}
                        value={selectedEvent?.id || ""}
                        disabled
                    /> */}
                    <input
                        className="w-full p-2 border-[1px] border-solid border-grey/30 bg-grey/10 rounded-lg outline-none"
                        type="text"
                        placeholder="Subject"
                        name={"subject"}
                        value={emailInfo?.subject || ""}
                        onChange={(e) => setEmailInfo({ ...emailInfo as IEventEmail, subject: e.target.value })}
                    />
                    {/* <textarea
                        className="w-full p-2 border-[1px] border-solid border-grey/30 bg-grey/10 rounded-lg outline-none"
                        placeholder="Body"
                        name={"body"}
                        value={emailInfo?.body || ""}
                        onChange={(e) => setEmailInfo({ ...emailInfo as IEventEmail, body: e.target.value })}
                    /> */}
                    <TextEditor
                        content={emailInfo?.body}
                        setTextContent={(value) => setEmailInfo({ ...emailInfo as IEventEmail, body: value })}
                    />
                </div>

                <div className="flex justify-end mt-4 gap-2">
                    <button
                        className="text-sm bg-transparent text-container-grey px-4 py-2 rounded-full"
                        onClick={() => setVisibility(false)}>
                        Cancel
                    </button>
                    <Button
                        disabled={!emailInfo?.subject || isSendingEmail}
                        isLoading={isSendingEmail}
                        className="text-sm bg-white !text-black/80 px-4 py-2 rounded-full hover:bg-white/80 transition-all"
                        onClick={() => {
                            if (!validateFields()) return;
                            handleSendEmailToAllTicketOrderContacts(selectedEvent?.id || "");
                        }}>
                        Send
                    </Button>
                </div>
            </div>
        </ModalWrapper>
    );
}

export default EmailInfoModal;