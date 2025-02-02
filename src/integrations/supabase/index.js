import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

// EXAMPLE TYPES SECTION
// DO NOT USE TYPESCRIPT AND SHOULD ALWAYS BE COMMENTED OUT

Foo // table: foos
    id: number
    title: string
    bars?: Bar[] // available if .select('*,bars(*)') was done

Bar // table: bars
    id: number
    foo_id: number // foreign key to Foo.id
	
*/

// hooks

// EXAMPLE HOOKS SECTION

export const useFoo = ()=> useQuery({
    queryKey: ['foo'],
    queryFn: () => fromSupabase(supabase.from('foo').select('*,bars(*)')),
})
export const useAddFoo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newFoo)=> fromSupabase(supabase.from('foo').insert([{ title: newFoo.title }])),
        onSuccess: ()=> {
            queryClient.invalidateQueries('foo');
        },
    });
};
