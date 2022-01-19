import PT from "prop-types";
import styled from "styled-components";

const TabContentType = PT.oneOfType([
  PT.bool,
  PT.number,
  PT.string,
  PT.node
]);

const TabType = {
  content: TabContentType.isRequired,
  isActive: PT.bool
};

const TabsPropTypes = {
  tabs: PT.arrayOf(PT.shape(TabType)).isRequired
};

const StyledTabs = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ tabsAmount }) => tabsAmount}, 1fr);
  column-gap: 16px;
`;

const StyledTab = styled.div`
  border-bottom: 8px solid ${({ isActive }) => isActive ? "rgba(0, 0, 0, 0.3)" : "transparent"};
  padding-bottom: 32px;

  transition: border-color 0.4s;
`;

const Tabs = (props) => {
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

Tabs.propTypes = TabsPropTypes;

export default Tabs;
