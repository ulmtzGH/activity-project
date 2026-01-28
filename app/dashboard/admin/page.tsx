import { createClient } from '@/utils/supabase/server'
import { updateUserRole, deleteUser } from './actions'
import UserRoleSelect from '@/components/UserRoleSelect'
import DeleteUserButton from '@/components/DeleteUserButton'

export default async function AdminUsersPage() {
    const supabase = await createClient()

    const { data: profiles } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">User Management</h1>
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                Email
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Full Name
                            </th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Role
                            </th>
                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {profiles?.map((profile) => (
                            <tr key={profile.id}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                    {profile.email}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{profile.full_name}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-2">
                                        <a href={`/dashboard/admin/users/${profile.id}/edit`} className="text-indigo-600 hover:text-indigo-900">Edit</a>
                                        <span className="text-gray-300">|</span>
                                        <UserRoleSelect action={updateUserRole} userId={profile.id} role={profile.role} />
                                    </div>
                                </td>
                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    <DeleteUserButton onDelete={deleteUser} userId={profile.id} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
