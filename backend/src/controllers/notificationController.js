const Notification = require('../models/Notification');
const AppError = require('../utils/AppError');
const asyncHandler = require('../middleware/asyncHandler');

/**
 * Récupérer les notifications de l'utilisateur
 */
const getMyNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({ userId: req.user._id })
    .sort({ createdAt: -1 })
    .limit(50);

  res.status(200).json({
    success: true,
    count: notifications.length,
    data: notifications
  });
});

/**
 * Marquer toutes les notifications comme lues
 */
const markAllAsRead = asyncHandler(async (req, res) => {
  await Notification.markAllAsRead(req.user._id);

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
  markAllAsRead,
  markAsRead
};
