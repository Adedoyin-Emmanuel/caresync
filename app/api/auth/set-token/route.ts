import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const POST = async (request: Request) => {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { message: "No token provided" },
        { status: 400 }
      );
    }

    cookies().set("next_refresh_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: 604800000,
    });

    return NextResponse.json({ message: "Cookie set successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
