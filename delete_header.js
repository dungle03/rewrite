// Hàm set giá trị cho header, hỗ trợ case-insensitive
function setHeaderValue(headers, key, value) {
  const lowerKey = key.toLowerCase();
  // Tìm key thực tế trong headers (case-insensitive)
  const actualKey = Object.keys(headers).find(k => k.toLowerCase() === lowerKey);
  if (actualKey) {
    headers[actualKey] = value;
  } else {
    headers[key] = value; // Nếu không tồn tại, thêm mới
  }
}

const modifiedHeaders = $request.headers;

// Danh sách headers cần modify (dễ mở rộng)
const headersToModify = [
  { key: 'X-RevenueCat-ETag', value: '' } // Set rỗng để xóa
];

headersToModify.forEach(({ key, value }) => {
  setHeaderValue(modifiedHeaders, key, value);
});

$done({ headers: modifiedHeaders });