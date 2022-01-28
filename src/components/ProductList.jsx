import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import Section from "./Section";
import ProductCard from "./ProductCard";
import AppContext from "../contexts/AppContext";


const StyledProductList = styled.div`
  display: grid;
  row-gap: 14px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StyledProduct = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 24px;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  @media (min-width: 576px) {
    padding-bottom: 20px;
  }

  @media (min-width: 768px) {
    &:nth-child(even) {
      padding-left: 5px;
    }

    &:nth-child(odd) {
      padding-right: 5px;
    }

    &:nth-last-child(1),
    &:nth-last-child(2) {
      border-bottom: none;
      padding-bottom: 0;
    }
  }
`;

const ProductList = () => {
  const { state } = useContext(AppContext);
  const { activeSubscription } = state;

  const [innerProducts, setInnerProducts] = useState([]);

  useEffect(() => {
    if (!activeSubscription) return;

    const { products } = activeSubscription;

    if (!products) return;

    const innerProducts = products.map((product) => {
      const {
        id,
        image,
        price,
        product_name,
        variant_name,
        quantity
      } = product;

      return {
        id,
        image,
        name: product_name,
        variant: variant_name,
        price,
        quantity
      };
    });

    setInnerProducts(innerProducts);
  }, [activeSubscription]);
  

  return (
    <Section title="Products in my subscription">
      <StyledProductList>
        {innerProducts.map((product) => {
          const { id, image, name, variant, price, quantity } = product;

          return (
            <StyledProduct key={id}>
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
