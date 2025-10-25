// Waste controller stub
exports.getWasteTypes = async (req, res, next) => {
  try {
    res.json({ status: 'success', message: 'Get waste types endpoint' });
  } catch (error) {
    next(error);
  }
};

exports.getWasteTypeById = async (req, res, next) => {
  try {
    res.json({ status: 'success', message: 'Get waste type by ID endpoint' });
  } catch (error) {
    next(error);
  }
};

exports.classifyWaste = async (req, res, next) => {
  try {
    res.json({ status: 'success', message: 'Classify waste endpoint' });
  } catch (error) {
    next(error);
  }
};

exports.getPricing = async (req, res, next) => {
  try {
    res.json({ status: 'success', message: 'Get pricing endpoint' });
  } catch (error) {
    next(error);
  }
};
