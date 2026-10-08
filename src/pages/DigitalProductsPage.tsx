import { ScrollReveal } from "@/components/ScrollReveal";
import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FREE_PRODUCTS, PAID_PRODUCTS, STORE_URL, type StoreProduct } from "@/data/products";
import Logo3D from "@/components/Logo3D";

function ProductCard({ product, index }: { product: StoreProduct; index: number }) {
  const isFree = product.price === 0;
  return (
    <ScrollReveal delay={index * 100}>
      <Card className="group overflow-hidden border-2 bg-card motion-safe:hover:shadow-xl motion-safe:transition-all motion-safe:duration-300 motion-safe:hover:-translate-y-1 flex flex-col h-full">
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex items-end justify-end gap-2 mb-3">
            <Badge variant={isFree ? "default" : "secondary"} className="shrink-0 text-xs">
              {isFree ? "FREE" : `$${product.price}`}
            </Badge>
          </div>

          <h3 className="font-bold text-lg leading-snug line-clamp-2 text-foreground mb-2">
            {product.name}
          </h3>

          <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{product.blurb}</p>

          <div className="mt-auto">
            <Button asChild className="w-full">
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${isFree ? "Get it free" : "Get yours"}: ${product.name}`}
              >
                {isFree ? "Get it free →" : "Get yours →"}
              </a>
            </Button>
          </div>
        </div>
      </Card>
    </ScrollReveal>
  );
}

function ProductSection({
  title,
  subtitle,
  products,
}: {
  title: string;
  subtitle: string;
  products: StoreProduct[];
}) {
  return (
    <section className="mt-14 first:mt-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">{title}</h2>
        <p className="text-muted-foreground mt-2">{subtitle}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}

export default function DigitalProductsPage() {
  const total = FREE_PRODUCTS.length + PAID_PRODUCTS.length;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Digital Product HQ — Free Guides & Tools | Zain Adtani</title>
        <meta name="description" content="Free guides and simple tools from Zain Adtani — AI prompt packs, budget worksheets, and family protection planners, all sold through Gumroad." />
        <meta property="og:title" content="Digital Product HQ — Zain Adtani" />
        <meta property="og:description" content="Free guides and simple tools for your money, your family, and your business." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://zainadtani.com/digital-products" />
      </Helmet>

      <header className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <div className="flex justify-center mb-4">
            <Logo3D />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground">Digital Product HQ</h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Free guides and simple tools — all in one place.
          </p>
          <p className="text-muted-foreground mt-1 text-sm tracking-wide">
            {total} {total === 1 ? "product" : "products"}, sold through my Gumroad store
          </p>
          <div className="mt-6">
            <Button asChild size="lg">
              <a href={STORE_URL} target="_blank" rel="noopener noreferrer">
                Visit the full store on Gumroad →
              </a>
            </Button>
          </div>
        </div>
      </header>

      <main className="pb-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <ProductSection
            title="Free guides"
            subtitle="Start here. No cost, no catch — just useful."
            products={FREE_PRODUCTS}
          />
          <ProductSection
            title="Tools that go deeper"
            subtitle="When you're ready for the full system."
            products={PAID_PRODUCTS}
          />
        </div>
      </main>
    </div>
  );
}
