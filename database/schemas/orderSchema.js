import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

let orderSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    address_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "address",
    },
    subscriptionID: {
      type: String,
      default: ''
    },
    planId: {
      type: String,
      default: ''
    },
    woocommerceOrderCreated: {
      type: Boolean,
      default: false, 
    },
    woocommerceOrderId: {
      type: String,
    },
    brand: {
      type: String,
      default: "",
    },
    product: {
      type: String,
      default: "",
    },
    faceRgb: {
      type: String,
      default: "",
    },
    nickName: {
      type: String,
      default: "",
    },
    thumbs: [String],
    shadeCodes: [String],
    assignerCodes: {
      type: [String],
      default: [],
    },
    requiresInitialAssignment: {
      type: Boolean,
      default: true,
    },
    product: {
      type: String,
      default: '',
    },
    productAssigned:{
      type: Boolean,
      default: false,
    }, 
    customerUniqueCode: {
      type: String,
      default: '', 
    },
    assignedImage: {
      type: String,
      default: '',
    },
    assignmentCode: {
      type: String,
      default: '',
    },
    formulaCode: {
      type: String,
      default: '', 
    },
    baseCode: {
      type: String,
      default: '',
    },
    primaryColor: {
      type: String,
      default: "",
    },
    coverageCode: {
      type: String,
      default: '',
    }, 
    status: {
      type: String
    },
    camera_image_1: {
      type: String,
    },
    camera_image_2: {
      type: String,
    },
    camera_image_3: {
      type: String,
    },
    camera_image_4: {
      type: String,
    },
    correction: {
      type: Boolean,
      default: false,
    },
    assigner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admins",
    },
    layoutSelection: {
      type: String,
      default: '',
    },
    subTotal: {
      type: String,
      default: '',
    },
    total: {
      type: String,
      default: '',
    },
    tax: {
      type: String,
      default: '',
    },
    salesTaxPercentage: {
      type: String,
      default: '',
    },
    shippingRate: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.plugin(aggregatePaginate);


const orderModal = mongoose.model("orders", orderSchema);

export default orderModal;
