const convertFromLocalStorage = <T>(data: string): T => {
  return JSON.parse(data);
}

export default convertFromLocalStorage;