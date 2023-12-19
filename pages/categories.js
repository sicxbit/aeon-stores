import Center from "@/components/Center";
import Header from "@/components/Header";
import { mongooseConnect } from "./lib/mongoose";
import Title from "@/components/Title";
import CategoryGrid from "@/components/CategoryGrid";
import axios from 'axios';

export default function AcessoriesPage({ categories }) {
  return (
    <>
      <Header />
      <Center>
        <Title>Categories</Title>
        <CategoryGrid categories={categories} />
      </Center>
    </>
  );
}


export async function getStaticProps() {
    await mongooseConnect();

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL
  
    try {
      const response = await axios.get(`${apiBaseUrl}/categories`);
      const categories = response.data;

      return {
        props: {
          categories: JSON.parse(JSON.stringify(categories)),
        },
      };
    } catch (error) {
      console.error('Error fetching categories:', error.message);
  
      return {
        props: {
          categories: [],
        },
      };
    }
  }
  