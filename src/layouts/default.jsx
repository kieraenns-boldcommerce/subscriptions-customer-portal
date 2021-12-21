import PT from "prop-types";

const ChildType = PT.oneOfType([
  PT.bool,
  PT.number,
  PT.string,
  PT.node
]);

export const DefaultLayoutPropTypes = {
  children: PT.oneOfType([ChildType, PT.arrayOf(ChildType)]).isRequired
};

const DefaultLayout = (props) => {
  const { children } = props;

  return (
    <div>
      { children }
    </div>
  );
};

DefaultLayout.propTypes = DefaultLayoutPropTypes;

export default DefaultLayout;
