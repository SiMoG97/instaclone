// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";

import dbConnect from "../../lib/dbConnection";
import User from "../../models/User";

type Data = {
  success: boolean;
  data?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // res.status(200).json({ name: "John Doe" });
  // console.log(req);
  const { method } = req;
  await dbConnect();

  switch (method) {
    case "GET":
      try {
        // await dbConnect();
        const users = await User.find({});
        console.log(users);
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        console.log(req.body);
        const { password, userName, fullName, phoneEmail } = req.body;
        let email = "";
        let phone = "";
        if (validator.isEmail(phoneEmail)) {
          email = phoneEmail;
        } else if (validator.isMobilePhone(phoneEmail)) {
          phone = phoneEmail;
        } else {
          res.status(400).json({ success: false });

          return Error("phoneEmail is not a phone number or an email");
        }
        const user = new User({
          userName,
          email,
          phone,
          fullName,
          password,
        });
        await user.save();
        res.status(201).json({
          success: true,
          data: user,
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
