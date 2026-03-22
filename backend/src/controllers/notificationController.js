const Notification = require('../models/Notification');
const AppError = require('../utils/AppError');
const asyncHandler = require('../middleware/asyncHandler');

/**
 * Récupérer les notifications de l'utilisateur
 */
const getMyNotifications = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 50;
  const skip = (page - 1) * limit;

  const filter = { userId: req.user._id };
  if (req.query.lue !== undefined) {
    filter.lue = req.query.lue === 'true';
  }

  const total = await Notification.countDocuments(filter);
  const notifications = await Notification.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    success: true,
    count: notifications.length,
    total,
    totalPages: Math.ceil(total / limit),
    data: notifications
  });
});

/**
 * Récupérer le nombre de notifications non lues
 */
const getUnreadCount = asyncHandler(async (req, res) => {
  const count = await Notification.countDocuments({ userId: req.user._id, lue: false });
  res.status(200).json({ success: true, count });
});

/**
 * Marquer toutes les notifications comme lues
 */
const markAllAsRead = asyncHandler(async (req, res) => {
  await Notification.updateMany({ userId: req.user._id, lue: false }, { lue: true, dateLecture: new Date() });

  res.status(200).json({
    success: true,
    message: 'Toutes les notifications marquées comme lues'
  });
});

/**
 * Marquer une notification spécifique comme lue
 */
const markAsRead = asyncHandler(async (req, res, next) => {
  const notification = await Notification.findById(req.params.id);

  if (!notification) return next(new AppError('Notification non trouvée', 404));

  if (notification.userId.toString() !== req.user._id.toString()) {
    return next(new AppError('Accès interdit', 403));
  }

  notification.lue = true;
  notification.dateLecture = new Date();
  await notification.save();

  res.status(200).json({
    success: true,
    data: notification
  });
});

module.exports = {
  getMyNotifications,
  getUnreadCount,
  markAllAsRead,
  markAsRead
};
