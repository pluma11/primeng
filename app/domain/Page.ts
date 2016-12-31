export interface Page<T> {
    content: Array<T>;
    last: boolean,
    totalElements: number,
    totalPages: number,
    size: number,
    number: number,
    sort: string,
    numberOfElements: number,
    first: boolean
}
