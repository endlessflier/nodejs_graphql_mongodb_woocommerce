import chargebee from "chargebee"
import { DEFAULT_PLAN_ID } from '../helpers/constants'

chargebee.configure({
  site :  process.env.CHARGEBEE_SITE, 
  api_key : process.env.CHARGEBEE_API_KEY,
});


const createSubscription = async (data) => {
  const payload = {
    token_id: data.tokenId,
    plan_id : data.planId,
    customer: data.customer,
    shipping_address: data.shippingAddress,
    billing_address: data.billingAddress,
    card: data.card,
  }

  return await chargebee.subscription.create(payload).request(); 
}

const createSubscriptionForExistingCustomer = async (params) => {
  const payload = {
    plan_id : params.planId,
    payment_source_id: params.paymentSourceId,
  }

  if (params.shipping_address) {
    payload.shipping_address = params.shipping_address
  }

  return chargebee.subscription.create_for_customer(params.chargebeeCustomerId, payload).request(); 
}


const createCustomer = async (data) => {
  return chargebee.customer.create({
    first_name : data.first_name,
    last_name : data.last_name,
    email : data.email,
    billing_address : {
      first_name : data.first_name,
      last_name : data.last_name,
      line1: data.address1,
      line2: data.address2,
      city : data.city,
      state : data.state,
      zip : data.zip_code,
      country : DEFAULT_COUNTRY,
    }
  }).request();
}

const createPaymentSource = async (data) => {
  return chargebee.payment_source.create_using_token({
    customer_id : data.customer_id,
    token_id : data.cbToken
  }).request()
}

const listPaymentSources = async (data) => {

  return await chargebee.payment_source.list({
  "customer_id[is]" : data.customer_id,
  limit:50,
  "type[is]" : "card"
  }).request()

}

/* pause subscription after term ends */

const pauseSubscription = async (data) => {

    const date = new Date();
    let resumeDate = new Date(date.setMonth(date.getMonth()+data.interval));
    resumeDate = parseInt(resumeDate.getTime() / 1000);
    
    return await chargebee.subscription.pause(data.subscription_id,{
      pause_option : "immediately",
      resume_date:resumeDate
    }).request();
}

/* cancel subscription after term ends */

const cancelSubscription= async (subscriptionID) => {

  return await chargebee.subscription.cancel(subscriptionID,{
    end_of_term : true
  }).request();
}

const resumeSubscription= async (subscriptionID) => {

  return await chargebee.subscription.resume(subscriptionID,{
    resume_option : "immediately",
  }).request();
}

const deletePaymentSource = async (payment_source_id) => {

  return await chargebee.payment_source.delete(payment_source_id).request();
}

const listPlans = async () => {
  return await chargebee.plan.list({
    limit : 3,
    "status[is]" : "active"
  }).request()
}

const getSubscriptions = async (data) => {

  return await chargebee.subscription.list({
    limit : data.limit,
    "customer_id[is]" :data.customer_id
  }).request()
}

const listAddons = async () => {

  return await chargebee.addon.list({
    limit : 3,
    "status[is]" : "active"
  }).request()

}

const changeTermEnd = async (subscription_id,term_end_date) => {

  const date = new Date();
  let end_date = new Date(date.setMonth(date.getMonth()+term_end_date));
  end_date = parseInt(end_date.getTime() / 1000);

  console.log(subscription_id,end_date);

  return await chargebee.subscription.change_term_end(subscription_id,{
    term_ends_at : end_date
  }).request();

}

const getSubscription = async (subscriptionID) => {

  try {
    return await chargebee.subscription.retrieve(subscriptionID).request();
  } catch (err) {
    // console.log(err);
    return null;
  }
};

const getCoupon = async (couponCode) => {

  try {
    return await chargebee.coupon.retrieve(couponCode).request();
  } catch (err) {
    return null;
  }
};

const getChargebeeDefaultSubscription = async () => {
  return chargebee.plan.retrieve(DEFAULT_PLAN_ID).request()
}

const chargebeeApi = {
  createSubscription,
  createSubscriptionForExistingCustomer,
  createCustomer,
  listPlans,
  listAddons,
  listPaymentSources,
  createPaymentSource,
  pauseSubscription,
  cancelSubscription,
  getSubscriptions,
  getChargebeeDefaultSubscription,
  getSubscription,
  changeTermEnd,
  getCoupon,
  resumeSubscription,
  deletePaymentSource
}; 

export default chargebeeApi;