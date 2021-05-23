export function formatDate() {
    const date = new Date();

    const today = (new Date(date.getFullYear(), date.getMonth(), date.getDate()+1)).toISOString();

    const yesterday = (new Date(date.getFullYear(), date.getMonth(), date.getDate())).toISOString();

    const lastWeek = (new Date(date.getFullYear(), date.getMonth(), date.getDate()-6)).toISOString();

    const lastMonth = (new Date(date.getFullYear(), date.getMonth()-1, date.getDate())).toISOString();

    const lastYear = (new Date(date.getFullYear()-1, date.getMonth(), date.getDate())).toISOString();

    const formattedDate = [today.split('T')[0], yesterday.split('T')[0], lastWeek.split('T')[0],lastMonth.split('T')[0], lastYear.split('T')[0]]
    return formattedDate;
}