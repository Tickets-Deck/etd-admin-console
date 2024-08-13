import React, { Dispatch, SetStateAction } from 'react'
import ModalWrapper from './ModalWrapper'

type Props = {
    visibility: boolean
    setVisibility: Dispatch<SetStateAction<boolean>>
}

const TransactionDetails = ({ visibility, setVisibility }: Props) => {
    return (
        <ModalWrapper
            visibility={visibility}
            setVisibility={setVisibility} styles={{ backgroundColor: 'transparent', color: '#fff', width: "fit-content" }}
            disallowOverlayFunction
            disallowRemovalTrigger>
            <div className="w-[20rem] max-w-[20rem] p-6 rounded-2xl bg-container-grey">
                <div>TransactionDetails</div>
            </div>
        </ModalWrapper>
    )
}

export default TransactionDetails