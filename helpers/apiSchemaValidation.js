export const createOrderSchema = {
  camera_image_1: { 
    notEmpty: true,
    errorMessage: "camera images required",
  },

  camera_image_2: { 
    notEmpty: true,
    errorMessage: "camera images required",
  },

  camera_image_3: { 
    notEmpty: true,
    errorMessage: "camera images required",
  },

  camera_image_4: { 
    notEmpty: true,
    errorMessage: "camera images required",
  },

  cbToken: {
    notEmpty: false,
    errorMessage: "cb token required",
  },

  brand: {
    optional: true,
    errorMessage: "brand required",
  },

  product: {
    optional: true,
    errorMessage: "product required",
  },

  base: {
    notEmpty: true,
    errorMessage: "base required",
  },

  coverage: {
    notEmpty: false,
    errorMessage: "coverage required",
  },

  faceRgb: {
    notEmpty: false,
  },

  primaryColor: {
    notEmpty: true,
    errorMessage: "primary color required",
  },

  companyName: {
    optional: true,
    errorMessage: "companyName required",
  },

  shipping_first_name: {
    notEmpty: true,
    errorMessage: "first_name required",
  },

  shipping_last_name: {
    notEmpty: true,
    errorMessage: "last_name required",
  },
  shipping_address_1: {
    notEmpty: true,
    errorMessage: "shipping_address_1 required",
  },
  shipping_address_2: {
    optional: true,
    errorMessage: "shipping_address_2 required",
  },
  shipping_state: {
    notEmpty: true,
    errorMessage: "shipping shipping_state required",
  },
  shipping_zipcode: {
    notEmpty: true,
    errorMessage: "shipping_zipcode required",
  },
  shipping_city: {
    notEmpty: true,
    errorMessage: "shipping_city required",
  },

  shipping_phone: {
    notEmpty: true,
    errorMessage: "shipping_phone required",
  },

  billing_first_name: {
    optional: true,
  },
  billing_last_name: {
    optional: true,
  },
  billing_address_1: {
    optional: true,
  },
  billing_address_2: {
    optional: true,
  },
  billing_state: {
    optional: true,
  },
  billing_zipcode: {
    optional: true,
  },
  billing_city: {
    optional: true,
  },

  billing_phone: {
    optional: true,
  },
  email: {
    notEmpty: true,
  },
  password: {
    optional: true,
  },
  addons: {
    optional: true,
  },
  company: {
    optional: true,
  }
};
