import 'package:flutter/material.dart';

class DocumentModel {
  final String id;
  final String title;
  final String description;
  final String price;
  final String delivery;
  final IconData deliveryIcon;
  final String status;
  final IconData icon;
  final String category;

  const DocumentModel({
    required this.id,
    required this.title,
    required this.description,
    required this.price,
    required this.delivery,
    required this.deliveryIcon,
    required this.status,
    required this.icon,
    this.category = 'Tout',
  });
}
