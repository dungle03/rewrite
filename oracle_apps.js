/*******************************************************
[rewrite_local]
^https?:\/\/[^.]+\.oracle\.bendingspoonsapps\.com\/v2\/users\/.* url script-response-body https://raw.githubusercontent.com/dungle03/rewrite/master/oracle_apps.js

[mitm] 
hostname = *.oracle.bendingspoonsapps.com
*******************************************************/

let obj = JSON.parse($response.body);
const url = $request.url;
console.log(`Đang xử lý URL: ${url}`);

// Xử lý phản hồi cho tất cả các ứng dụng Oracle Bendingspoons
if (obj.me) {
  // Kích hoạt đăng ký premium
  obj.me.active_subscriptions = [{
    "id": "premium_yearly",
    "vendor": "apple",
    "timestamp": Math.floor(Date.now() / 1000)
  }];
  
  // Kích hoạt gói premium
  obj.me.active_bundle_subscriptions = ["premium"];
  
  // Thêm ids nếu cần
  obj.me.active_subscriptions_ids = ["premium_yearly", "premium_monthly"];
  
  // Thêm credit nếu ứng dụng hỗ trợ
  if (obj.me.available_consumable_credits !== undefined) {
    // Nếu ứng dụng có cấu trúc credits
    const creditKeys = Object.keys(obj.me.available_consumable_credits);
    for (const key of creditKeys) {
      obj.me.available_consumable_credits[key] = 9999;
    }
    
    // Thêm các loại credits phổ biến
    obj.me.available_consumable_credits = {
      ...obj.me.available_consumable_credits,
      "standard": 9999,
      "premium": 9999,
      "coins": 9999
    };
  }
  
  // Đặt các giá trị khác
  if (obj.me.privacy_notice) {
    obj.me.privacy_notice.last_acknowledged_version = "999.0.0";
  }
  
  if (obj.me.terms_of_service) {
    obj.me.terms_of_service.last_accepted_version = "999.0.0";
  }
  
  // Xóa các giới hạn
  obj.me.limitations = {};
  
  // Điều chỉnh các thuộc tính khác có thể có trong các ứng dụng Oracle
  if (obj.me.is_spooner !== undefined) {
    obj.me.is_spooner = false;
  }
  
  console.log("Đã mở khóa ứng dụng Oracle thành công!");
}

$done({body: JSON.stringify(obj)});
