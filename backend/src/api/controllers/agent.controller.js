// Agent controller stub
exports.getProfile = async (req, res, next) => {
  try {
    res.json({ status: 'success', message: 'Agent profile endpoint' });
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    res.json({ status: 'success', message: 'Agent update profile endpoint' });
  } catch (error) {
    next(error);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    res.json({ status: 'success', message: 'Agent update status endpoint' });
  } catch (error) {
    next(error);
  }
};

exports.updateLocation = async (req, res, next) => {
  try {
    res.json({ status: 'success', message: 'Agent update location endpoint' });
  } catch (error) {
    next(error);
  }
};

exports.getDashboard = async (req, res, next) => {
  try {
    res.json({ status: 'success', message: 'Agent dashboard endpoint' });
  } catch (error) {
    next(error);
  }
};

exports.getEarnings = async (req, res, next) => {
  try {
    res.json({ status: 'success', message: 'Agent earnings endpoint' });
  } catch (error) {
    next(error);
  }
};

exports.getPickupRequests = async (req, res, next) => {
  try {
    res.json({ status: 'success', message: 'Agent pickup requests endpoint' });
  } catch (error) {
    next(error);
  }
};

exports.acceptRequest = async (req, res, next) => {
  try {
    res.json({ status: 'success', message: 'Agent accept request endpoint' });
  } catch (error) {
    next(error);
  }
};

exports.rejectRequest = async (req, res, next) => {
  try {
    res.json({ status: 'success', message: 'Agent reject request endpoint' });
  } catch (error) {
    next(error);
  }
};
