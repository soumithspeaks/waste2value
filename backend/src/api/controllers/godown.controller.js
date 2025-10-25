// Godown controller stub
exports.getAllGodowns = async (req, res, next) => {
  try {
    res.json({ status: 'success', message: 'Get all godowns endpoint' });
  } catch (error) {
    next(error);
  }
};

exports.getGodownById = async (req, res, next) => {
  try {
    res.json({ status: 'success', message: 'Get godown by ID endpoint' });
  } catch (error) {
    next(error);
  }
};

exports.getNearestGodown = async (req, res, next) => {
  try {
    res.json({ status: 'success', message: 'Get nearest godown endpoint' });
  } catch (error) {
    next(error);
  }
};
