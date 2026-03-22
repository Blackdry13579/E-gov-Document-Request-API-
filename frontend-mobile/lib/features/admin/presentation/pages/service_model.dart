import 'package:flutter/material.dart';

class ServiceData {
  final String id;
  final String name;
  final String description;
  final IconData icon;
  final Color color;
  final bool isActive;
  final int agentCount;
  final int docCount;

  const ServiceData({
    required this.id,
    required this.name,
    required this.description,
    required this.icon,
    required this.color,
    required this.isActive,
    this.agentCount = 0,
    this.docCount = 0,
  });

  ServiceData copyWith({bool? isActive}) {
    return ServiceData(
      id: id,
      name: name,
      description: description,
      icon: icon,
      color: color,
      isActive: isActive ?? this.isActive,
      agentCount: agentCount,
      docCount: docCount,
    );
  }
}
