import HeroProductPage from "@/components/shop/hero";
import ShopBreadcrumb from "@/components/shop/shop-breadcrumb";
import ForYou from "@/components/shop/for-you";
import ReadingList from "@/components/shop/reading-list";
import ViewTracker from "@/components/shop/view-tracker";

export default async function ShopPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await fetch(
    `https://bukuacak-9bdcb4ef2605.herokuapp.com/api/v1/book/${id}`,
    {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; BukuApp/1.0)",
        Accept: "application/json",
      },
    }
  );
  if (!response.ok) {
    return <div>Book not found</div>;
  }
  const product = await response.json();
  if (!product || !product.details) {
    return <div>Book data not available</div>;
  }
  return (
    <>
      <ShopBreadcrumb />
      <HeroProductPage
        id={product._id}
        title={product.title}
        coverImage={product.cover_image}
        author={product.author}
        summary={product.summary}
        details={product.details}
        tags={product.tags}
        buy={product.buy_links}
        publisher={product.publisher}
      />
      <ViewTracker book={product} />
      <ReadingList currentId={product._id} />
      <ForYou tags={product.tags} id={product._id} />
    </>
  );
}
