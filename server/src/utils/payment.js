import axios from "axios";
import config from "../config/config.js";

const payViaKhalti = async (data) => {
  if (!data) throw { statusCode: 400, message: "Data not found" };

  if (!data.amount) throw { statusCode: 400, message: "Amount not found" };

  if (!data.purchaseOrderID)
    throw { statusCode: 400, message: "Purchase order id not found" };

  if (!data.purchaseOrderName)
    throw { statusCode: 400, message: "Purchase order name not found" };

  const body = {
    return_url: config.khalti.returnUrl,
    website_url: config.appUrl,
    amount: data.amount * 100, 
    purchase_order_id: data.purchaseOrderID,
    purchase_order_name: data.purchaseOrderName,
    customer_info: {
      name: data.customer.name,
      email: data.customer.email,
      phone: data.customer.phone,
    },
  };

  const khaltiresponse = await axios.post(
    `${config.khalti.apiUrl}/epayment/initiate/`,   
    body,
    {
      headers: {
        Authorization: `Key ${config.khalti.apiKey}`,
      },
    }
  );

  return khaltiresponse.data;
};

export default { payViaKhalti };