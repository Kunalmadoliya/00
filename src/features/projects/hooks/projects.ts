import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { createProject, getAllProject, getProject } from "../actions"


export type ActionError = {
    error: string
}

function isActionError(value: unknown): value is ActionError {
    return (
        typeof value === 'object' &&
        value !== null &&
        "error" in value &&
        typeof (value as ActionError).error === 'string'
    )
}


async function unwrapActionResult<T>(result: T | { error: string }): Promise<T> {
    if (isActionError(result)) {
        throw new Error(result.error)
    }
    return result
}

export const useCreateProject = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (value: string) => await unwrapActionResult(createProject(value)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] })
        }
    })
}


export const useGetAllProject = () => {
    return useQuery({
        queryKey: ["projects"],
        queryFn: async () => unwrapActionResult(await getAllProject())
    })


}

export const useGetProject = (id: string) => {
    return useQuery({
        queryKey: ["projects", id],
        queryFn: async () => unwrapActionResult(await getProject(id))
    })

}