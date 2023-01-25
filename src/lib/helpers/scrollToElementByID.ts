const scrollToElementByID = (elementID: string) => {
  const element = document.getElementById(elementID);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export default scrollToElementByID;
