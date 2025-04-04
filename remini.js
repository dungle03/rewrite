/*******************************************************
URL: https://api.remini.ai/v1/mobile/oracle/setup

[rewrite_local]
^https?:\/\/api\.remini\.ai\/v1\/mobile\/oracle\/setup url script-response-body https://raw.githubusercontent.com/dungle03/rewrite/master/remini.js

[mitm] 
hostname = api.remini.ai 

*******************************************************/

var obj = JSON.parse($response.body);

if (obj.me) {
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
  
  obj.me.privacy_notice.last_acknowledged_version = "3.15.0";
  obj.me.terms_of_service.last_accepted_version = "3.2.0";
}

$done({body: JSON.stringify(obj)});