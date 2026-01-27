'use client'

import { useFormStatus } from 'react-dom'

function Select({ defaultValue }: { defaultValue: string }) {
    const { pending } = useFormStatus()
    return (
        <select
            name="role"
            defaultValue={defaultValue}
            disabled={pending}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-xs border p-1 disabled:opacity-50"
            onChange={(e) => e.target.form?.requestSubmit()}
        >
            <option value="user">User</option>
            <option value="admin">Admin</option>
        </select>
    )
}

export default function UserRoleSelect({
    action,
    userId,
    role
}: {
    action: (formData: FormData) => void,
    userId: string,
    role: string
}) {
    return (
        <form action={action} className="flex items-center gap-2">
            <input type="hidden" name="userId" value={userId} />
            <Select defaultValue={role} />
        </form>
    )
}
