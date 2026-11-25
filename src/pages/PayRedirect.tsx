import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { payCheckoutUrl } from "@/data/payLinks";
import NotFound from "./NotFound";

/** Leaves the site for Stripe. An unknown slug stays on the normal 404 page. */
export default function PayRedirect({ slug: forcedSlug }: { slug?: string }) {
  const { slug: paramSlug } = useParams();
  const url = payCheckoutUrl(forcedSlug ?? paramSlug);

  useEffect(() => {
    if (url) window.location.replace(url);
  }, [url]);

  if (!url) {
    return (
      <AppLayout>
        <NotFound />
      </AppLayout>
    );
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#0A0F1A] px-6 text-center text-white">
      <Helmet>
        <title>Checkout | Zain Adtani</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div>
        <p className="font-sans text-[18px]">Taking you to checkout.</p>
        <a href={url} className="mt-4 inline-block font-sans text-[16px] text-[#E9E4A6] underline underline-offset-4">
          Continue
        </a>
      </div>
    </main>
  );
}
