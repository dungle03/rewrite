/*******************************************************
[rewrite_local]
^https?:\/\/[^.]+\.oracle\.bendingspoonsapps\.com\/v2\/users\/.* url script-response-body https://raw.githubusercontent.com/dungle03/rewrite/master/oracle_apps.js
^https?:\/\/[^.]+\.oracle\.bendingspoonsapps\.com\/v2\/purchases\/sign\/apple url script-response-body https://raw.githubusercontent.com/dungle03/rewrite/master/oracle_apps.js
^https?:\/\/[^.]+\.oracle\.bendingspoonsapps\.com\/v2\/users\/refund_consent url script-response-body https://raw.githubusercontent.com/dungle03/rewrite/master/oracle_apps.js

[mitm] 
hostname = *.oracle.bendingspoonsapps.com
*******************************************************/

let obj = JSON.parse($response.body);
const url = $request.url;
console.log(`Đang xử lý URL: ${url}`);

// Xác định loại ứng dụng dựa vào URL
const isRemini = url.includes('remini.oracle.bendingspoonsapps.com');

// Xử lý phản hồi cho tất cả các ứng dụng Oracle Bendingspoons
if (obj.me) {
  if (isRemini) {
    // Cấu hình đặc biệt cho Remini
    obj.me.is_spooner = false;
    obj.me.active_bundle_subscriptions = ["com.bigwinepot.nwdn.international.bundle_all"];
    
    obj.me.active_subscriptions_ids = [
      "com.bigwinepot.nwdn.international.1y_t110",
      "com.bigwinepot.nwdn.international.1w_t20", 
      "com.bigwinepot.nwdn.international.1m_t24"
    ];
    
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
    
    obj.me.available_consumable_credits = {
      "avatar_generations": 9999,
      "enhance_credit": 9999,
      "video_enhance_credit": 9999
    };
    
    if (obj.me.privacy_notice) {
      obj.me.privacy_notice.last_acknowledged_version = "3.15.0";
    }
    
    if (obj.me.terms_of_service) {
      obj.me.terms_of_service.last_accepted_version = "3.2.0";
    }
    
    console.log("Đã mở khóa Remini thành công!");
  } else {
    // Cấu hình chung cho các ứng dụng Oracle khác
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
}

// Xử lý các endpoints mua hàng và refund
if (url.includes('/purchases/sign/apple') || url.includes('/users/refund_consent')) {
  // Đặt trạng thái thành công cho các yêu cầu mua hàng và refund
  if (obj.status === undefined) {
    obj.status = "success";
  }
  
  console.log("Đã xử lý yêu cầu mua hàng/refund thành công!");
}

$done({body: JSON.stringify(obj)});