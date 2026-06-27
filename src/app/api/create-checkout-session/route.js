import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req) {
  try {
    const {
      productId,
      title,
      price,
      image,
      buyerEmail,
    } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      mode: "payment",

      customer_email: buyerEmail,

      line_items: [
        {
          quantity: 1,

          price_data: {
           currency: "huf",

            unit_amount: Number(price) * 100,

            product_data: {
              name: title,
              images: image ? [image] : [],
            },
          },
        },
      ],

      metadata: {
        productId,
        buyerEmail,
      },

      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancel`,
    });

    return NextResponse.json({
      success: true,
      url: session.url,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}