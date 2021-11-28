import client from "../config/recurly";

const checkoutPurchase = async (data) => {
  if (data.couponCode) {
    let purchaseReq = {
      currency: 'USD',
      coupon_codes:[data.couponCode],
      account: {
        code: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        billingInfo: {
          tokenId: data.token,
        },
      },
      subscriptions: [{ planCode: data.planCode }],
    };
    return client.createPurchase(purchaseReq);
  } else {
    let purchaseReq = {
      currency: 'USD',
      account: {
        code: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        billingInfo: {
          tokenId: data.token,
        },
      },
      subscriptions: [{ planCode: data.planCode }],
    };
    return client.createPurchase(purchaseReq);
  }
  
};




const validateCouponCode = (couponId)=>{
return client.getCoupon("code-"+couponId)
}

const getListPlans =async ()=>{
  let plansData={};
  const plans = client.listPlans()
  for await (const plan of plans.each()) {
    plansData[plan.code]=plan
  }
  return plansData;
  }

const recurlyApi = {
  checkoutPurchase,
  validateCouponCode,
  getListPlans
};

export default recurlyApi;
