export default function uniqueID() {
  function random() {
    return (
      (Math.random() * 250).toString(36) +
      Math.random()
        .toString(16)
        .slice(-4)
    );
  }

  return `${random()}${random()}`.replace(/(\.)/g, '').toUpperCase();
}
