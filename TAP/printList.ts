type Link<T> = {
    data: T,
    next: Link<T> | null
}

type PrintListFn = <T> (list: Link<T> | null) => void

export const printList = (list: Link<any> | null) => {
    let current = list;
    while (current !== null) {
        console.log(current.data);
        console.log('->');
        current = current.next;
    }
}