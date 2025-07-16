const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': { entitlement: 'vip+watch_vip' },
  'Locket': { entitlement: 'Gold', subscription: 'com.locket.premium.yearly' }  // Giả sử subscription cho Locket, điều chỉnh nếu cần
};

const ua = $request.headers['User-Agent'] || $request.headers['user-agent'];
const obj = JSON.parse($response.body);

obj.Attention = 'Chúc mừng bạn! Vui lòng không bán hoặc chia sẻ cho người khác!';

const currentDate = new Date().toISOString().slice(0, 19) + 'Z';  // Lấy ngày hiện tại UTC
const futureExpiresDate = '2099-12-18T01:04:17Z';

const subscriptionInfo = {
  is_sandbox: false,
  ownership_type: 'PURCHASED',
  billing_issues_detected_at: null,
  period_type: 'normal',
  expires_date: futureExpiresDate,
  grace_period_expires_date: null,
  unsubscribe_detected_at: null,
  original_purchase_date: currentDate,
  purchase_date: currentDate,
  store: 'app_store'
};

const entitlementInfo = {
  grace_period_expires_date: null,
  purchase_date: currentDate,
  expires_date: futureExpiresDate
};

const defaultSubscription = 'com.locket02.premium.yearly';
const defaultEntitlement = 'pro';

const match = Object.keys(mapping).find(key => ua.includes(key));

let subProduct = defaultSubscription;
let entProduct = defaultEntitlement;

if (match) {
  const { entitlement, subscription } = mapping[match];
  entProduct = entitlement || defaultEntitlement;
  subProduct = subscription || defaultSubscription;
}

entitlementInfo.product_identifier = subProduct;
obj.subscriber.subscriptions[subProduct] = subscriptionInfo;
obj.subscriber.entitlements[entProduct] = entitlementInfo;

$done({ body: JSON.stringify(obj) });

