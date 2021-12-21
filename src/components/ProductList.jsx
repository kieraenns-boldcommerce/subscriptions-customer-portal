import PT from "prop-types";
import styled from "styled-components";
import Section from "./Section";
import ProductCard, { ProductCardPropTypes } from "./ProductCard";

const ProductListPropTypes = {
  products: PT.arrayOf(PT.shape(ProductCardPropTypes)).isRequired
};

const StyledProductList = styled.div`
  display: grid;
  row-gap: 20px;

  @media (min-width: 1024px) {
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

  @media (min-width: 1024px) {
    &:nth-last-child(1),
    &:nth-last-child(2) {
      border-bottom: none;
      padding-bottom: 0;
    }
  }
`;

const ProductList = (props) => {
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

ProductList.propTypes = ProductListPropTypes;

export default ProductList;
