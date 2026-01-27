import { createClient } from '@/utils/supabase/server'
import { updateActivity } from '../../actions'
import { redirect } from 'next/navigation'

export default async function EditActivityPage({ params }: { params: { id: string } }) {
    const supabase = await createClient()
    const { id } = await params

    const { data: activity } = await supabase
        .from('activities')
        .select('*')
        .eq('id', id)
        .single()

    if (!activity) {
        redirect('/dashboard')
    }

    const updateActivityWithId = updateActivity.bind(null, id)

    // Format date for datetime-local input (YYYY-MM-DDThh:mm)
    const dateValue = new Date(activity.date).toISOString().slice(0, 16)

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Edit Activity</h1>
            <form action={updateActivityWithId} className="space-y-6 bg-white p-6 shadow rounded-lg">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <div className="mt-1">
                        <input
                            type="text"
                            name="title"
                            id="title"
                            defaultValue={activity.title}
                            required
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <div className="mt-1">
                        <textarea
                            name="description"
                            id="description"
                            rows={3}
                            defaultValue={activity.description}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                        Date
                    </label>
                    <div className="mt-1">
                        <input
                            type="datetime-local"
                            name="date"
                            id="date"
                            defaultValue={dateValue}
                            required
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                        Status
                    </label>
                    <div className="mt-1">
                        <select
                            name="status"
                            id="status"
                            defaultValue={activity.status}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                        >
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Update Activity
                    </button>
                </div>
            </form>
        </div>
    )
}
