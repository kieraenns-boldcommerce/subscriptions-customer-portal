import { VFC } from "react";
import styled from "styled-components";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Price } from "../../node_modules/@boldcommerce/stacks-ui/lib";

export interface IProductCard {
  image: string
  name: string
  variant: string
  price: number
  quantity: number
}

const StyledProductCard = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
  align-items: center;
  column-gap: 34px;
`;

const StyledImage = styled.img`
  width: 80px;
  height: 80px;

  object-fit: cover;
`;

const StyledTextWrapper = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: var(--color-text-default);

  .price {
    .stx-price__amount {
      font-size: inherit;
      font-weight: inherit;
      line-height: inherit;
      text-align: left;
      color: inherit;
    }
  }
`;

const StyledLink = styled.a`
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
  text-decoration: underline;
  color: var(--color-text-link);
`;

const ProductCard: VFC<IProductCard> = (props) => {
  const { image, name, variant, price, quantity } = props;

  return (
    <StyledProductCard>

      <StyledImage src={image} />

      <StyledTextWrapper>
        <StyledLink>
          { name } - { variant }
        </StyledLink>
        <Price className="price" amount={price} />
        Quantity: { quantity }
      </StyledTextWrapper>

    </StyledProductCard>
  );
};

export default ProductCard;
