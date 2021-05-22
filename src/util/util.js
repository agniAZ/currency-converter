export function formatDate() {
    let date = new Date();

    let today = (new Date(date.getFullYear(), date.getMonth(), date.getDate()+1)).toISOString();

    let yesterday = (new Date(date.getFullYear(), date.getMonth(), date.getDate())).toISOString();

    let lastWeek = (new Date(date.getFullYear(), date.getMonth(), date.getDate()-6)).toISOString();

    let lastMonth = (new Date(date.getFullYear(), date.getMonth()-1, date.getDate())).toISOString();

    let lastYear = (new Date(date.getFullYear()-1, date.getMonth(), date.getDate())).toISOString();

    let formattedDate = [today.split('T')[0], yesterday.split('T')[0], lastWeek.split('T')[0],lastMonth.split('T')[0], lastYear.split('T')[0]]
    return formattedDate;
}