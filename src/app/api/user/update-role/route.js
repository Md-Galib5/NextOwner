import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb"; // your mongodb connection

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      photo,
      role = "buyer",
      status = "active",
    } = body;

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(process.env.AUTH_DB_NAME);

    const users = db.collection("user");

    const existingUser = await users.findOne({ email });

    if (existingUser) {
      await users.updateOne(
        { email },
        {
          $set: {
            name,
            image: photo,
            role,
            status,
            updatedAt: new Date(),
          },
        }
      );

      return NextResponse.json({
        success: true,
        message: "User updated",
      });
    }

    await users.insertOne({
      name,
      email,
      image: photo,
      role,
      status,
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: "User created",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}