import ProductClient from "./ProductClient";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;
  return <ProductClient productId={id} />;
}
