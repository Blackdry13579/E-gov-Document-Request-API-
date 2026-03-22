import 'package:flutter/material.dart';

class DocumentModel {
  final String id;
  final String title;
  final String description;
  final String longDescription;
  final String price;
  final String delay;
  final String delivery;
  final IconData deliveryIcon;
  final String status;
  final IconData icon;
  final String iconName;
  final String category;
  final List<String> requiredDocs;
  final List<Map<String, String>> faqItems;
  final bool isActive;
  final String service;
  final String code;

  const DocumentModel({
    required this.id,
    required this.title,
    required this.description,
    this.longDescription = '',
    required this.price,
    this.delay = '24-48h',
    required this.delivery,
    this.deliveryIcon = Icons.description_outlined,
    required this.status,
    required this.icon,
    this.iconName = 'description',
    this.category = 'Tout',
    this.requiredDocs = const [],
    this.faqItems = const [],
    this.isActive = true,
    required this.service,
    required this.code,
  });

  DocumentModel copyWith({
    bool? isActive,
  }) {
    return DocumentModel(
      id: id,
      title: title,
      description: description,
      longDescription: longDescription,
      price: price,
      delay: delay,
      delivery: delivery,
      deliveryIcon: deliveryIcon,
      status: status,
      icon: icon,
      iconName: iconName,
      category: category,
      requiredDocs: requiredDocs,
      faqItems: faqItems,
      isActive: isActive ?? this.isActive,
      service: service,
      code: code,
    );
  }

  factory DocumentModel.fromJson(Map<String, dynamic> json) {
    // Helper to map icon names to IconData
    IconData getIconData(String name) {
      switch (name) {
        case 'badge': return Icons.badge_outlined;
        case 'history_edu': return Icons.history_edu_outlined;
        case 'gavel': return Icons.gavel_outlined;
        case 'directions_car': return Icons.directions_car_outlined;
        case 'clinical_notes':
        case 'assignment': return Icons.assignment_rounded;
        case 'home': return Icons.home_rounded;
        case 'favorite': return Icons.favorite_rounded;
        case 'flag': return Icons.flag_rounded;
        default: return Icons.description_outlined;
      }
    }

    return DocumentModel(
      id: json['_id'] ?? json['id'] ?? '',
      title: json['title'] ?? '',
      description: json['description'] ?? '',
      longDescription: json['longDescription'] ?? '',
      price: json['price'] ?? '',
      delay: json['delay'] ?? '24-48h',
      delivery: json['delivery'] ?? '',
      deliveryIcon: getIconData(json['deliveryIconName'] ?? 'devices'),
      status: json['status'] ?? 'DISPONIBLE',
      icon: getIconData(json['icon'] ?? 'description'),
      iconName: json['icon'] ?? 'description',
      category: json['category'] ?? 'Tout',
      requiredDocs: List<String>.from(json['requiredDocs'] ?? []),
      faqItems: (json['faqItems'] as List? ?? [])
          .map((item) => Map<String, String>.from(item))
          .toList(),
      isActive: json['isActive'] ?? true,
      service: json['service'] ?? '',
      code: json['code'] ?? '',
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'title': title,
    'description': description,
    'longDescription': longDescription,
    'price': price,
    'delay': delay,
    'delivery': delivery,
    'status': status,
    'icon': iconName,
    'category': category,
    'requiredDocs': requiredDocs,
    'faqItems': faqItems,
    'isActive': isActive,
    'service': service,
    'code': code,
  };
}
