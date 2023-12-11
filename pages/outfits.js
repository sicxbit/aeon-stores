import Center from "@/components/Center";
import Header from "@/components/Header"
import { mongooseConnect } from "./lib/mongoose";
import { Product } from "@/models/Product";
import Title from "@/components/Title";
import OutfitGrid from "@/components/OutfitGrid";


export default function ProductsPage({products}) {
    return (
        <>
            <Header />
            <Center>
                <Title>Outfits</Title>
                <OutfitGrid products={products} />
            </Center>
        </>
    )
}

  
  export async function getStaticProps() {
    await mongooseConnect();
    const newProducts = await Product.find({}, null, { sort: { '_id': -1 }, limit: 10 });
    
    return {
      props: {
        products: JSON.parse(JSON.stringify(newProducts)),
      },
    };
  }