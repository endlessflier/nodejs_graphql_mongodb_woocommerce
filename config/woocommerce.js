import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api"; // Supports ESM

export const WooCommerce = process.env.WORDPRESS_URL ? new WooCommerceRestApi({
    url: process.env.WORDPRESS_URL,
    consumerKey: process.env.WORDPRESS_CONSUMER_KEY,
    consumerSecret: process.env.WORDPRESS_CONSUMER_SECRET,
    version: 'wc/v3'
}) : null