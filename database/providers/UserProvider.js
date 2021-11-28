import User from "../schemas/User";
import Orders from "../schemas/orderSchema";
import bcrypt from "bcrypt";
import { generateJWT } from "../../helpers/generateJWT";
import sgMailProvider from "../../config/sendgrid";
import Sentry from "../../config/sentry";
import { forgotPassword } from "../../templates/resetPassword";

  const userOrders = async (_, params, { user, versionCode }) => {
  try {
    let currentUser = await user;
    const orders = await Orders.find({ user_id: currentUser._id })
      .populate("user_id")
      .populate("address_id")
      // .populate("product")
      .populate("assigner");

    return orders;
  } catch (error) {
    let currentUser = await user;
    Sentry.captureException({
      error,
      message: "catch userOrders",
      versionCode,
      currentUser,
    });
    throw new Error(error);
  }
};

const getOrderShadeCode = async (_, params, { user, versionCode }) => {
  let currentUser = await user;
  try {
    const order = await Orders.find({
      user_id: currentUser._id,
      product: { $ne: "" },
    })
      .sort({ updatedAt: -1 })
      .limit(1)
      .populate("user_id")
      .populate("address_id")
      .populate("assigner");
    return order;
  } catch (error) {
    let currentUser = await user;
    Sentry.captureException({
      error,
      message: "catch userOrders",
      versionCode,
      currentUser,
    });
    throw new Error(error);
  }
};

const loginUser = async (_, params, { versionCode }) => {
  let { email, password } = params;
  try {
    const user = await User.findOne({ email: email }).exec();
    if (user) {
      let result = await bcrypt.compare(password, user.password);
      if (result) {
        let token = generateJWT(user);
        return {
          accessToken: token,
          userId: user._id,
          message: "Successfully Login",
          user,
        };
      }
    } else {
      // Sentry.captureException({message:"User not Registered with this email",user});
      throw new Error("User not Registered with this email");
    }
  } catch (error) {
    Sentry.captureException({
      error,
      message: "catch loginUser",
      versionCode,
      email,
    });
    console.log("error", error);
    throw new Error(error);
  }
};


const addUser = async (_, params, { versionCode }) => {
  const {
    email,
    name,
    image = "https://res.cloudinary.com/daxfzj6pg/image/upload/v1607027894/no_img_n6c8sp.jpg",
    password,
    chargebeeCustomerID,
  } = params;
  try {
    const user = await User.findOne({ email: email }).exec();

    if (user) {
      Sentry.captureException({ message: "User already exist !", user });
      throw new Error("User already exist !");
    }
    let full_name = name.split(" ");
    let data = {
      first_name: full_name[0],
      last_name: full_name[1] ? full_name[1] : "mica",
      email,
    };
    const userModel = new User({
      email,
      name,
      image: image ? image : "https://res.cloudinary.com/daxfzj6pg/image/upload/v1607027894/no_img_n6c8sp.jpg",
      password,
    });
    let updatedUser = await userModel.save();
    const token = generateJWT(updatedUser);
    return {
      message: "Successfully Registered",
      status: 200,
      user: updatedUser,
      accessToken: token,
    };
  } catch (error) {
    Sentry.captureException({
      error,
      message: "catch addUser",
      versionCode,
      email,
      name,
      image,
    });
    throw new Error(error);
  }
};

// userData ={
//   "firstName": "",
//   "lastName": "",
//   "email": "",
//   "password": ""
// }

const userUpdate = async (_, params, { user }) => {
  try {
    const { name, image } = params.userData;
    let currentUser = await user;
    const userData = await User.findByIdAndUpdate(
      { _id: currentUser._id },
      { name, image }
    );
    return {
      status: 200,
      message: "successfully updated",
      user: userData,
    };
  } catch (error) {
    Sentry.captureException(error);
    throw new Error(error);
  }
};

const passwordReset = async (_, params, { user, versionCode }) => {
  try {
    const { email } = params;

    const fUser = await User.findOne({ email: email }).exec();
    if (!fUser) {
      Sentry.captureException({ message: "User not exist !", fUser });
      throw new Error("User not exist !");
    } else {
      var code = new Date().valueOf().toString().slice(8);
      var mailOptions = {
        from: "info@micabeauty.com",
        to: email,
        subject: "Let's get you Mica Beauty Verified",
        html: forgotPassword(fUser.name, code),
      };
      await sgMailProvider.send(mailOptions);
      return {
        userId: fUser._id,
        message: "An Email with code has been sent",
        code: code,
        status: 200,
      };
    }
  } catch (error) {
    Sentry.captureException(error);
    throw new Error(error);
  }
};

const passwordChanged = async (_, params, context) => {
  try {
    const { confirmPassword, userId } = params;

    const fUser = await User.findOne({ _id: userId }).exec();
    fUser.password = confirmPassword;
    await fUser.save();
    return {
      message: "Successfully Updated",
      status: 200,
    };
  } catch (error) {
    Sentry.captureException(error);
    throw new Error(error);
  }
};

const socialAuth = async (_, params, { versionCode }) => {
  try {
    throw Error('Not Implemented')
    
    const { name, email, image, socialLoginId } = params;
    const fUser = await User.findOne({ email: email }).exec();
    let token = generateJWT(fUser);
    if (fUser) {
      return {
        accessToken: token,
        userId: fUser._id,
        message: "Successfully Login",
        user: fUser,
      };
    } else {
      let data = {
        first_name: name[0],
        last_name: name[1] ? name[1] : "",
        email,
      };
      let customer = null;
      let customerData = null
      if (customerData.length) {
        customer = customerData[0];
      } else {
        customer = {}
      }
      let newUser = await User.create({
        name,
        email,
        image,
        socialLoginId,
        password: "mecabeauty1214",
      });
      return {
        accessToken: token,
        userId: newUser._id,
        message: "Successfully Signup",
        user: newUser,
      };
    }
  } catch (error) {
    Sentry.captureException(error);
    throw new Error(error);
  }
};

const getCurrentUser = async (_, params, { user, versionCode }) => {
  try {
    let currentUser = await user;
    const userStatus = await User.findOne({ _id: currentUser._id }).exec();
    if (userStatus) {
      return {
        message: "User Found",
        status: 200,
      };
    }
    return {
      message: "Session has been expired, Please login again!",
      status: 300,
    };
  } catch (error) {
    Sentry.captureException(error);
    return {
      message: "Session has been expired, Please login again!",
      status: 300,
    };
    // throw new Error(error);
  }
};

const UserProvider = {
  loginUser,
  addUser,
  userUpdate,
  socialAuth,
  passwordReset,
  passwordChanged,
  userOrders,
  getOrderShadeCode,
  getCurrentUser,
};

export default UserProvider;
