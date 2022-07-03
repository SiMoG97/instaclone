// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

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
      console.log("get");
      // res.status(200).json({ success: true });
      try {
        const users = await User.find({});
        console.log(users);
        res.status(200).json({
          success: true,
          data: {
            firstName: "timo",
            lastName: "echaarani",
            age: 14,
            sex: "male",
          },
        });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const user = await User.create(req.body);
        res.status(201).json({
          success: true,
          data: {
            firstName: "timo",
            lastName: "echaarani",
            age: 14,
            sex: "male",
          },
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
