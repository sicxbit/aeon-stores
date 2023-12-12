import styled from "styled-components";
import Link from "next/link";

const CategoryWrapper = styled.div`
  /* Add any styling you need for the category box */
`;

const CategoryBox = ({ _id, name }) => {
  const url = '/category/' + _id;

  return (
    <CategoryWrapper>
      <WhiteBox href={url}>
        <div>{name}</div>
      </WhiteBox>
    </CategoryWrapper>
  );
};

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  border-radius: 10px;
  justify-content: center;
`;

export default CategoryBox;
