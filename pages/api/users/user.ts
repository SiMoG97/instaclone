import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnection";
import User from "../../../models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await dbConnect();
      // console.log("hhell nah", req.body);
      const user = req.body;
      if (user.phoneEmail) {
        //check if email
      }
      // const Tser = new User({
      //   userName: "SimoGG97",
      //   firstName: "Simo",
      //   lastName: "echaarani",
      //   email: "echaarani@test.com",
      // });
      // console.log(Tser);
      // await Tser.save();
      res.status(200).json({ status: "succsess" });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: "somthing went wrong" });
    }
  }
}
