'use client'

import { useFormStatus } from 'react-dom'

function SubmitButton({ modalMessage }: { modalMessage: string }) {
    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            disabled={pending}
            className="text-red-600 hover:text-red-900 px-2 disabled:opacity-50"
            onClick={(e) => {
                if (!confirm(modalMessage)) e.preventDefault()
            }}
        >
            {pending ? 'Deleting...' : 'Delete'}
        </button>
    )
}

export default function DeleteButton({
    onDelete,
    id,
    modalMessage = 'Are you sure?'
}: {
    onDelete: (id: string | FormData) => void,
    id: string,
    modalMessage?: string
}) {
    return (
        <form action={onDelete} className="inline-block">
            <input type="hidden" name="id" value={id} />
            <SubmitButton modalMessage={modalMessage} />
        </form>
    )
}
