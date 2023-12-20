import axios from 'axios';
import Header from '@/components/Header';
import Center from '@/components/Center';
import Title from '@/components/Title';
import { mongooseConnect } from '../lib/mongoose';
import { Product } from '@/models/Product';
import ProductGrid from '@/components/ProductsGrid';
import styled from 'styled-components';




export default function categoryPage({ products, category, parentCategory }) {
  
  return (
    <>
      <Header />
      <Center>
        <Title>{category.name}</Title>
        {parentCategory && (
          <span>Subcategory of {parentCategory.name}</span>
        )}
        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <p>No products available in this category. Coming soon!</p>
        )}
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  await mongooseConnect();

  try {
    // Fetch category data using Axios
    const categoryResponse = await axios.get(`${apiBaseUrl}/category/${id}`);
    const categoryData = categoryResponse.data;

    let parentCategoryData = null;

    // Check if the category has a parent
    if (categoryData.parent) {
      // Fetch parent category data using Axios
      const parentCategoryResponse = await axios.get(`${apiBaseUrl}/category/${categoryData.parent}`);
      parentCategoryData = parentCategoryResponse.data;
    }

    // Fetch products that belong to the category using MongoDB query
    const productsData = await Product.find({ category: id }).sort({ _id: -1 }).limit(10);

    return {
      props: {
        category: categoryData,
        parentCategory: parentCategoryData,
        products: JSON.parse(JSON.stringify(productsData)),
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);

    return {
      notFound: true,
    };
  }
}
