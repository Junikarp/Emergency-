const Container = ({ children }) => {
  const footerContainer = {
    backgroundColor: "#141E46",
    padding: "0.7vh 0.7vw",
    display: "flex",
    justifyContent: "space-around",
  };
  return <div style={footerContainer}>{children}</div>;
};

export default Container;
