import semver from "semver";
const Combination = require("../schemas/combinationSchema");

export function getOrderDetails(orderId, order) {
  const orderDetails = {
    title: "",
    description: "Hi admin, Please prepare to order to complete the shipment.",
    orderId: orderId,
    orderSummary: [
      {
        heading: "Status",
        description: order?.status,
      },
      {
        heading: "Shade Codes",
        description: order?.shadeCodes?.join(", "),
      },
      {
        heading: "Product Codes",
        description: order?.product,
      },
      {
        heading: "Plan ID",
        description: order?.planId,
      },
      {
        heading: "Address 1",
        description: order?.address_id?.address1,
      },
      {
        heading: "Address 2",
        description: order?.address_id?.address2,
      },
      {
        heading: "City",
        description: order?.address_id?.city,
      },

      {
        heading: "Company",
        description: order?.address_id?.company,
      },

      {
        heading: "Phone",
        description: order?.address_id?.phone,
      },

      {
        heading: "Zip Code",
        description: order?.address_id?.zip_code,
      },

    ],
    customer: [
      {
        heading: "Name",
        description: order?.user_id?.name,
      },
      {
        heading: "Email",
        description: order?.user_id?.email,
      },
      {
        heading: "Gender",
        description: order?.user_id?.gender,
      },
    ],
  };
  return orderDetails;
}

export function checkPriority(str) {
  if (str.includes("L")) {
    return "L";
  } else if (str.includes("F")) {
    return "F";
  } else if (str.includes("M")) {
    return "M";
  } else if (str.includes("T")) {
    return "T";
  } else if (str.includes("D")) {
    return "D";
  } else {
    return "P";
  }
}

function convertNtoS(n) {
  let s = "";
  while (s.length < 3) {
    s = String.fromCharCode(97 + (n % 26)) + s;
    n = Math.floor(n / 26);
  }
  return s;
}

let sequences = [];

function generateSequences() {
  const zzz = Math.pow(26, 3) - 1;
  for (var n = 0; n <= zzz; n++) {
    sequences.push(convertNtoS(n));
  }
}

const randomValues = async (type) => {
  if (!sequences.length) {
    generateSequences();
  }
  const getLatestCombination = await Combination.find({ type })
    .limit(1)
    .sort({ addedAt: -1 });
  if (!getLatestCombination.length) {
    return process.env.CODE_STARTED_AT;
  }
  let lastType = getLatestCombination[0].colorCode;
  lastType = lastType.slice(1, lastType.length);

  if (lastType === "ZZZ") {
    return "ZZZ";
  }

  const currentIndex = sequences.indexOf(lastType.toLowerCase());

  const nextType = sequences[currentIndex + 1];

  return nextType.toUpperCase();
};

export const uniqueCode = async (type) => {
  let values = await randomValues(type);

  return type + values;
};


export const versionChecker = async(versionCode)=> {
   if (!versionCode) {
    throw new Error(
      "Old Version, Please upgrade your application from store!"
    );
  } else if (
    versionCode.sentFrom === "Mobile"
     &&
    semver.lt(versionCode.versionName, process.env.mobileMinVersion)
  ) {
    throw new Error(
      `Please upgrade your application from store! Your minimum version should be ${process.env.mobileMinVersion}`
    );
  }
}