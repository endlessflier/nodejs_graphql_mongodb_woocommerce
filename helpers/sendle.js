import fetch, { Headers } from "node-fetch"
import Sentry from "../config/sentry";
import { calculateNextBusinessDay } from "./moment";
import { getStateCode } from "./utils";


export const createSendleOrder = async (order = {}, user = {}, address = {}) => {
  try {
    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + Buffer.from(process.env.SENDLE_ID + ":" + process.env.SENDLE_API_KEY).toString('base64'));
    headers.set('Content-Type', 'application/json')
    headers.set('Accept', 'application/json')

    const order = await fetch(`${process.env.SENDLE_API_URL}/api/orders`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            pickup_date: calculateNextBusinessDay(),
            first_mile_option: 'pickup',
            description: 'Just For You Foundation',
            weight: {"value": "1", "units": "kg"},
            volume: {"value": "12", "units": "in3"},
            metadata: {
              userId: String(user._id),
            },
            sender: {
              contact: {
                name: 'Mica Beauty',
              },
              address: {
                address_line1: '902 Columbia Ave.',
                suburb: 'Riverside',
                state_code: 'CA',
                postcode: '92507',
                country: 'United States'
              },
            },
            receiver: {
              instructions: "Thank you",
              contact: {
                name:  `${address?.firstName} ${address.lastName}`,
                email: user?.email,
              },
              address: {
                address_line1: address.address1,
                suburb: address.city,
                state_code: getStateCode(address.state),
                postcode: address.zip_code,
                country: 'United States',
              },
            },
          })
    });

    const json = await order.json();

    if (!json.tracking_url) {
      throw Error('Unknown error generating shipping label')
    }
    
    return {
      trackingUrl: json?.tracking_url,
      label: json?.labels?.find((label) => label?.size === "cropped")?.url
    }
  } catch (err) {
    console.log("Sendle Error", err);
    Sentry.captureException(err);
  }
};

export const getSendleLabel = async (url) => {
  try {
    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + Buffer.from(process.env.SENDLE_ID + ":" + process.env.SENDLE_API_KEY).toString('base64'));
    headers.set('Content-Type', 'application/json')
    headers.set('Accept', 'application/json')

    const label = await fetch(url, {
        method: "GET",
        headers: headers,
    });
    
    return label?.url
  } catch (err) {
    Sentry.captureException(err);
  }
};
