/*******************************************************
// Script bypass Remini App với gói cao cấp nhất
// URL: https://api.remini.ai/v1/mobile/oracle/setup

[rewrite_local]
https://api.remini.ai/v1/mobile/oracle/setup url script-response-body https://raw.githubusercontent.com/dungle03/rewrite/master/remini.js

[mitm] 
hostname = api.remini.ai 

*******************************************************/

var obj = JSON.parse($response.body);

// Đảm bảo đã đăng ký Premium
if (obj.me) {
  // Sử dụng gói cao cấp nhất với nhiều tính năng
  obj.me.is_spooner = false;
  obj.me.active_bundle_subscriptions = ["com.bigwinepot.nwdn.international.bundle_all"];
  
  // Danh sách gói cao cấp nhất
  obj.me.active_subscriptions_ids = [
    "com.bigwinepot.nwdn.international.1y_t110", // Gói năm cao cấp nhất
    "com.bigwinepot.nwdn.international.1w_t20",  // Gói tuần cao cấp nhất
    "com.bigwinepot.nwdn.international.1m_t24"   // Gói tháng cao cấp nhất
  ];
  
  // Thêm các gói đăng ký
  obj.me.active_subscriptions = [
    {
      "id": "com.bigwinepot.nwdn.international.1y_t110",
      "vendor": "apple",
      "timestamp": Math.floor(Date.now() / 1000)
    },
    {
      "id": "com.bigwinepot.nwdn.international.1w_t20",
      "vendor": "apple",
      "timestamp": Math.floor(Date.now() / 1000)
    },
    {
      "id": "com.bigwinepot.nwdn.international.1m_t24",
      "vendor": "apple",
      "timestamp": Math.floor(Date.now() / 1000)
    }
  ];
  
  // Thêm credits tiêu thụ (consumable) với số lượng cao
  obj.me.available_consumable_credits = {
    "avatar_generations": 9999,
    "enhance_credit": 9999,
    "video_enhance_credit": 9999
  };
  
  // Cập nhật phiên bản đã chấp nhận
  obj.me.privacy_notice.last_acknowledged_version = "3.15.0";
  obj.me.terms_of_service.last_accepted_version = "3.2.0";
}

$done({body: JSON.stringify(obj)});