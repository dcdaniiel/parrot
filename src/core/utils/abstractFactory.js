function abstractFactory(class_map_) {
  return (class_key, ...parameters) => {
    const class_ = class_map_[class_key];
    return new class_(...parameters);
  };
}

module.exports = {
  abstractFactory,
};
