const handleGenerateNumber = () => {
  let generate = Math.floor(
    Math.random() * (9999999999 - 1000000000) + 1000000000
  );
  return generate;
};

export default handleGenerateNumber;
