// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Joi from "joi";
import { isEmail } from "../../utils/FormSchema";
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

  switch (method) {
    case "GET":
      try {
        await dbConnect();
        const users = await User.find({});
        console.log(users);
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        // const user = await User.create({

        // });
        const { phoneEmail, password, fullName, userName, date_of_birth } =
          req.body;
        // Joi.validate
        // const obj = {
        //   email: phoneEmail,
        // };
        // console.log(isEmail.validate(obj));
        if (validator.isEmail(phoneEmail)) {
          console.log("test");
          const user = new User({
            email: phoneEmail,
            password,
            fullName,
            userName,
            date_of_birth,
          });
          await user.save();
          res.status(201).json({
            success: true,
            data: user,
          });
        }
        // console.log(req.body);
        // const user = new User({
        //   userName: "SimoGG97",
        //   email: "echaaranimohamed@gmail.com",
        //   phone: "0690224004",
        //   fullName: "simo echaarani",
        //   password: "sir7tatji",
        // });
        // await user.save();
        // res.status(201).json({
        //   success: true,
        //   data: user,
        // });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
