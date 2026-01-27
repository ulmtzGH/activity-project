'use client'

import { useFormStatus } from 'react-dom'

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            disabled={pending}
            className="text-red-600 hover:text-red-900 disabled:opacity-50"
            onClick={(e) => {
                if (!confirm('Are you sure you want to delete this user?')) {
                    e.preventDefault()
                }
            }}
        >
            {pending ? 'Deleting...' : 'Delete'}
        </button>
    )
}

export default function DeleteUserButton({
    onDelete,
    userId
}: {
    onDelete: (formData: FormData) => void,
    userId: string
}) {
    return (
        <form action={onDelete}>
            <input type="hidden" name="userId" value={userId} />
            <SubmitButton />
        </form>
    )
}
