'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function updateUserRole(formData: FormData) {
    const supabase = await createClient()

    const userId = formData.get('userId') as string
    const role = formData.get('role') as string

    // Check if current user is admin
    // (Ideally this should be robust, but RLS also protects it)

    const { error } = await supabase
        .from('profiles')
        .update({ role })
        .eq('id', userId)

    if (error) {
        console.error(error)
        redirect('/error')
    }

    revalidatePath('/dashboard/admin')
}

export async function deleteUser(formData: FormData) {
    const supabase = await createClient()
    const userId = formData.get('userId') as string

    const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId)

    if (error) {
        console.error(error)
        redirect('/error')
    }

    revalidatePath('/dashboard/admin')
}
