import styled from "styled-components";
import Link from "next/link";

const CategoryWrapper = styled.div`
  // Your styles for CategoryWrapper
`;

const WhiteBox = styled.div`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  border-radius: 10px;
  justify-content: center;

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const CategoryBox = ({ _id, name }) => {
  const url = '/category/' + _id;

  return (
    <CategoryWrapper>
      <WhiteBox>
        <Link href={url}>
          <span>{name}</span>
        </Link>
      </WhiteBox>
    </CategoryWrapper>
  );
};

export default CategoryBox;
