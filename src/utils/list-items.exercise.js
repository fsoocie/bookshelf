import {queryCache, useMutation, useQuery} from "react-query";
import {client} from "./api-client.final";

function useListItems(user) {
    const {data} = useQuery({
        queryKey: 'list-items',
        queryFn: () =>
            client('list-items', {token: user.token}).then(data => data.listItems),
    })
    return data ?? []
}

function useListItem(user, bookId) {
    const listItems = useListItems(user)
    return listItems.find(li => li.bookId === bookId) ?? null
}

function useUpdateListItem(user) {
    return useMutation(
        updates =>
            client(`list-items/${updates.id}`, {
                data: updates,
                method: 'PUT',
                token: user.token,
            }),
        {onSettled: () => queryCache.invalidateQueries('list-items')},
    )
}

export {useListItems, useListItem, useUpdateListItem}