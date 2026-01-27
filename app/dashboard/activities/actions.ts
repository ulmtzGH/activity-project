'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createActivity(formData: FormData) {
    const supabase = await createClient()

    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const date = formData.get('date') as string
    const status = formData.get('status') as string

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        throw new Error('User not authenticated')
    }

    const { error } = await supabase.from('activities').insert({
        title,
        description,
        date,
        status,
        user_id: user.id,
    })

    if (error) {
        console.error('Error creating activity:', error)
        redirect('/error')
    }

    revalidatePath('/dashboard')
    redirect('/dashboard')
}

export async function updateActivity(id: string, formData: FormData) {
    const supabase = await createClient()

    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const date = formData.get('date') as string
    const status = formData.get('status') as string

    const { error } = await supabase
        .from('activities')
        .update({
            title,
            description,
            date,
            status,
        })
        .eq('id', id)

    if (error) {
        console.error('Error updating activity:', error)
        redirect('/error')
    }

    revalidatePath('/dashboard')
    redirect('/dashboard')
}

export async function deleteActivity(id: string | FormData) {
    const supabase = await createClient()

    // Handle both direct ID call or FormData from form
    const activityId = typeof id === 'string' ? id : (id.get('id') as string)

    const { error } = await supabase.from('activities').delete().eq('id', activityId)

    if (error) {
        console.error('Error deleting activity:', error)
        redirect('/error')
    }

    revalidatePath('/dashboard')
}
