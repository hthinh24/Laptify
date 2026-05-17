export function formatDate(dateString) {
    if(!dateString) return dateString
    return new Intl.DateTimeFormat('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).format(new Date(dateString));
}

export const getThumbnailUrl = (url, width = 40, height = 40) => {
    return url.replace('/upload/', `/upload/w_${width},h_${height},c_fill/`);
  };