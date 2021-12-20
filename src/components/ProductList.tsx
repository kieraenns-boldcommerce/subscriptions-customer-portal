import { VFC } from "react";
import styled from "styled-components";
import Section from "@/components/Section";
import ProductCard, { IProductCard } from "@/components/ProductCard";
import { media } from "@/helpers/index";

export interface IProductList {
  products: IProductCard[]
}

const StyledProductList = styled.div`
  display: grid;
  row-gap: 20px;

  ${media.laptop} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StyledProduct = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 20px;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  ${media.laptop} {
    &:nth-last-child(1),
    &:nth-last-child(2) {
      border-bottom: none;
      padding-bottom: 0;
    }
  }
`;

const ProductList: VFC<IProductList> = (props) => {
  const { products } = props;

  return (
    <Section title="Products in my subscription">
      <StyledProductList>
        {products.map((product, index) => {
          const { image, name, variant, price, quantity } = product;

          return (
            <StyledProduct key={index}>
              <ProductCard
                image={image}
                name={name}
                variant={variant}
                price={price}
                quantity={quantity}
              />
            </StyledProduct>
          );
        })}
      </StyledProductList>
    </Section>
  );
};

export default ProductList;
