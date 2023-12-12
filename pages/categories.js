import Center from "@/components/Center";
import Header from "@/components/Header";
import { mongooseConnect } from "./lib/mongoose";
import Title from "@/components/Title";
import CategoryGrid from "@/components/CategoryGrid";
import axios from 'axios';

export default function AcessoriesPage({ categories }) {
    console.log(categories)
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
  
    try {
      const response = await axios.get('/api/categories/');
      const categories = response.data;
  
      console.log('Fetched categories:', categories);
  
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
  