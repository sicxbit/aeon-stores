import Featured from "@/components/Featured";
import Header from "@/components/Header";
import { Product } from "@/models/Product";
import { mongooseConnect } from "./lib/mongoose";
import NewProducts from "@/components/NewProducts";
import axios from "axios";

export default function Homepage({ 
  featuredProduct, newProducts 
}) {
  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts newProducts={newProducts} />
    </div>
  )
};


export async function getServerSideProps() {
  await mongooseConnect();
  const featuredProductId = async () => {
    try {
      const response = await axios.get('/api/featured')
    
    if (response.data && response.data.featuredProduct) {
      return response.data.featuredProduct;}
    } catch (error) {
      console.error("Error fetching featured product:", error.message);
      return null;
    }
  };

  const id = await featuredProductId();

  if (!id) {
    console.log("error")
  }

  const featuredProduct = await Product.findById(id);

  const newProducts = await Product.find({}, null, {sort: {'_id': -1}, limit:10 })

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)) 
    },
  }
};