import { VFC } from "react";
import styled from "styled-components";

type TabContent = boolean | number | string | JSX.Element

export type Tab = {
  content: TabContent
  isActive?: boolean
}

export interface ITabs {
  tabs: Tab[]
}

interface IStyledTabs {
  tabsAmount: number
}

const StyledTabs = styled.div<IStyledTabs>`
  display: grid;
  grid-template-columns: repeat(${({ tabsAmount }) => tabsAmount}, 1fr);
  column-gap: 16px;
`;

interface IStyledTab {
  isActive: boolean
}

const StyledTab = styled.div<IStyledTab>`
  border-bottom: 8px solid ${({ isActive }) => isActive ? "rgba(0, 0, 0, 0.3)" : "transparent"};
  padding-bottom: 32px;

  transition: border-color 0.4s;
`;

const Tabs: VFC<ITabs> = (props) => {
  const { tabs } = props;

  const tabsAmount = tabs.length;

  return (
    <StyledTabs tabsAmount={tabsAmount}>
      {tabs.map((tab, index) => {
        const { content, isActive = false } = tab;

        return (
          <StyledTab key={index} isActive={isActive}>
            { content }
          </StyledTab>
        );
      })}
    </StyledTabs>
  );
};

export default Tabs;
