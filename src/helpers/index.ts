
export function FormatCurrency(amount: number) {
    return new Intl.NumberFormat('en-us', {style: 'currency', currency: 'USD'}).format(amount)
}

export function formatDate (dateSTr: string) : string {
const dateObj = new Date(dateSTr)
const options : Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
}
return new Intl.DateTimeFormat('es-Es', options).format(dateObj)

}