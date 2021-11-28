import Sentry from '../config/sentry'
import { WooCommerce } from '../config/woocommerce'
import { hexToRGB } from './colors'

export const createWoocommerceOrder = async (address = {}, subscription = {}, customer = {}, order = {}) => {
    const JFY_PRODUCT_ID = "3153"

    try {
      const wooCommerceOrder = await WooCommerce.post('orders',
        {
            status: 'pending',
            payment_method: customer.payment_method?.type,
            payment_method_title: customer.payment_method?.type,
            set_paid: false,
            billing: {
              first_name: customer?.billing_address?.first_name,
              last_name: customer?.billing_address?.last_name,
              address_1: customer?.billing_address?.line1,
              address_2: customer?.billing_address?.line2,
              city: customer?.billing_address?.city,
              state: customer?.billing_address?.state,
              postcode: customer?.billing_address?.zip,
              country: customer?.billing_address?.country,
              phone: address?.phone,
              email: address?.email,
            },
            shipping: {
              first_name: address?.firstName,
              last_name: address?.lastName,
              address_1: address?.address1,
              address_2: address?.address2,
              city: address?.city,
              state: address?.state,
              postcode: address?.zip_code,
              country: address?.country,
              phone: address?.phone,
              email: address?.email,
            },
            line_items: [
                {
                    product_id: JFY_PRODUCT_ID,
                    quantity: 1
                },
            ] 
        },
      );

      if (!wooCommerceOrder?.data?.id) {
          throw Error('Unable to create woocommerce order')
      }

      return {
        woocommerceOrderId: wooCommerceOrder?.data?.id,
      }
    } catch (error) {
        Sentry.captureEvent({
          message: "Unable to create woocommerce order",
          error,
          data: {
            address,
            customer,
            order,
          }
        });
    }
}

export const updateWoocommerceOrderStatus = async (orderId, status, note) => {
  try {
    const wooCommerceOrder = await WooCommerce.put(`orders/${orderId}`,
      {
          status,
          set_paid: true,
      },
    );

    if (!wooCommerceOrder?.data?.id) {
        throw Error('Unable to update woocommerce order')
    }

    if (note) {
      await WooCommerce.post(`orders/${wooCommerceOrder?.data?.id}/notes`, note)
    }

    return {
      woocommerceOrderId: wooCommerceOrder?.data?.id,
    }
  } catch (error) {
      console.info(error)
      Sentry.captureEvent({
        message: "Unable to update woocommerce order",
        error,
        data: {
          subscription,
          customer,
          order,
        }
      });
  }
}