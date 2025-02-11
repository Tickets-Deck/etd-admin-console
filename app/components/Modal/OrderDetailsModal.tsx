import React, { Dispatch, SetStateAction } from 'react'
import ModalWrapper from './ModalWrapper'
import { CloseIcon } from '../SVGs/SVGicons'
import { SingleTicketOrder } from '@/app/models/ITicketOrder'

type Props = {
    visibility: boolean
    setVisibility: Dispatch<SetStateAction<boolean>>
    ticketOrder: SingleTicketOrder
}

const OrderDetailsModal = ({ visibility, setVisibility, ticketOrder }: Props) => {
    return (
        <ModalWrapper
            visibility={visibility}
            setVisibility={setVisibility} styles={{ backgroundColor: 'transparent', color: '#fff', width: "fit-content" }}
            disallowOverlayFunction
            disallowRemovalTrigger>
            <div className="w-full max-w-full md:w-96 md:max-w-96 p-6 rounded-2xl bg-white text-dark-grey">
                <div className="flex flex-row justify-between items-center mb-2">
                    <div className="flex flex-col itrems-start">
                        <h3 className="font-medium">Order Information</h3>
                    </div>
                    <span
                        className="ml-auto w-8 h-8 min-w-8 min-h-8 rounded-full grid place-items-center cursor-pointer hover:bg-failed/10"
                        onClick={() => setVisibility(false)}>
                        <CloseIcon />
                    </span>
                </div>
                <div className="flex flex-col">
                    <div className='flex flex-col items-center'>
                        <p className='text-center text-xs text-dark-grey/40'>Order ID</p>
                        <span className='text-center text-primary font-semibold mb-1'>{ticketOrder.orderId}</span>
                    </div>
                    <div className='flex flex-row gap-2 p-1 rounded-md'>
                        <p className="text-sm text-dark-grey/50 font-semibold">
                            Event:
                        </p>
                        <p className="text-sm">
                            {ticketOrder.eventName}
                        </p>
                    </div>
                    <div className='flex flex-row gap-2 p-1 rounded-md'>
                        <p className="text-sm text-dark-grey/50 font-semibold">
                            {ticketOrder.tickets.length > 1 ? "Tickets:" : "Ticket:"}
                        </p>
                        <p className="text-sm">
                            {ticketOrder.tickets.map((ticket) => ticket).join(', ')}
                        </p>
                    </div>
                    <span className='text-sm p-1 text-dark-grey/50 text-center'>{ticketOrder.user ? 'Customer' : 'Contact'} details:</span>
                    {
                        ticketOrder.user ?
                            <>
                                <div className='flex flex-row gap-2 p-1 rounded-md'>
                                    <p className="text-sm text-dark-grey/50 font-semibold">
                                        Full name:
                                    </p>
                                    <p className="text-sm">
                                        {`${ticketOrder.user.firstName} ${ticketOrder.user.lastName}`}
                                    </p>
                                </div>
                                <div className='flex flex-row gap-2 p-1 rounded-md'>
                                    <p className="text-sm text-dark-grey/50 font-semibold">
                                        Phone number:
                                    </p>
                                    <p className="text-sm">
                                        {ticketOrder.user.phone || ticketOrder.contactNumber || 'N/A'}
                                    </p>
                                </div>
                                <div className='flex flex-row gap-2 p-1 rounded-md'>
                                    <p className="text-sm text-dark-grey/50 font-semibold">
                                        Email:
                                    </p>
                                    <p className="text-sm">
                                        {ticketOrder.user.email}
                                    </p>
                                </div>
                            </> :
                            <div>
                                <div className='flex flex-row gap-2 p-1 rounded-md'>
                                    <p className="text-sm text-dark-grey/50 font-semibold">
                                        Email:
                                    </p>
                                    <p className="text-sm">
                                        {ticketOrder.contactEmail}
                                    </p>
                                </div>
                                <div className='flex flex-row gap-2 p-1 rounded-md'>
                                    <p className="text-sm text-dark-grey/50 font-semibold">
                                        Full name:
                                    </p>
                                    <p className="text-sm">
                                        {ticketOrder.contactFirstName ? `${ticketOrder.contactFirstName} ${ticketOrder.contactLastName}` : 'N/A'}
                                    </p>
                                </div>
                                <div className='flex flex-row gap-2 p-1 rounded-md'>
                                    <p className="text-sm text-dark-grey/50 font-semibold">
                                        Phone number:
                                    </p>
                                    <p className="text-sm">
                                        {ticketOrder.contactNumber || 'N/A'}
                                    </p>
                                </div>
                                {/* <span className='p-1 italic text-sm text-dark-grey/50'>
                                    No customer information available.
                                </span> */}
                            </div>
                    }
                </div>
                <div className="flex justify-end mt-4 gap-2">
                    {/* <button
                        className="text-sm bg-transparent text-dark-grey px-4 py-2 rounded-full"
                        onClick={() => setVisibility(false)}>
                        No
                    </button> */}
                    <button
                        className="text-sm bg-dark-grey text-white px-4 py-2 rounded-full"
                        onClick={() => setVisibility(false)}>
                        Close
                    </button>
                </div>
            </div>
        </ModalWrapper>
    )
}

export default OrderDetailsModal