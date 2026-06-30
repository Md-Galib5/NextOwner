import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req) {
  try {
    const { buyerInfo, sellerInfo, productInfo } = await req.json();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: buyerInfo?.email || undefined,

      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: Math.round(Number(productInfo?.price || 0) * 100),
            product_data: {
              name: productInfo?.title || "NextOwner Product",
              description: String(productInfo?.description || "").slice(0, 500),
              images: productInfo?.image ? [productInfo.image] : [],
            },
          },
        },
      ],

      metadata: {
        buyerEmail: String(buyerInfo?.email || ""),
        buyerName: String(buyerInfo?.name || "").slice(0, 100),
        sellerEmail: String(sellerInfo?.email || ""),
        sellerName: String(sellerInfo?.name || "").slice(0, 100),
        productId: String(productInfo?.productId || productInfo?._id || ""),
        productTitle: String(productInfo?.title || "").slice(0, 100),
      },

      success_url: `${process.env.BETTER_AUTH_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.BETTER_AUTH_URL}/payment/cancel`,
    });

    return NextResponse.json({
      success: true,
      url: session.url,
    });
  } catch (error) {
    console.error("Stripe checkout error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to create checkout session",
      },
      { status: 500 }
    );
  }
}