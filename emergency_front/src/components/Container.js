const Container = ({ children }) => {
  const footerContainer = {
    backgroundColor: "#141E46",
    width: "100%",
    padding: "0.7vh 0.7vw",
    display: "flex",
    justifyContent: "space-around",
    position: "fixed",
    bottom: 0,
  };
  return <div style={footerContainer}>{children}</div>;
};

export default Container;