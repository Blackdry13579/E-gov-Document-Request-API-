import 'package:flutter/material.dart';

class CitizenData {
  final String id;
  final String name;
  final String cnib;
  final String email;
  final String phone;
  final String address;
  final String city;
  final String birthDate;
  final String status; // 'VALIDE', 'EN_ATTENTE', 'REJETE', 'BLOQUE'
  final String registrationDate;
  final int requestsCount;

  const CitizenData({
    required this.id,
    required this.name,
    required this.cnib,
    required this.email,
    required this.phone,
    required this.address,
    required this.city,
    required this.birthDate,
    required this.status,
    required this.registrationDate,
    this.requestsCount = 0,
  });

  Color get statusColor {
    switch (status) {
      case 'VALIDE':     return const Color(0xFF16A34A);
      case 'EN_ATTENTE': return const Color(0xFFF97316);
      case 'REJETE':     return const Color(0xFFB91C1C);
      case 'BLOQUE':     return const Color(0xFF1E293B);
      default:           return Colors.grey;
    }
  }

  Color get statusBg {
    switch (status) {
      case 'VALIDE':     return const Color(0xFFDCFCE7);
      case 'EN_ATTENTE': return const Color(0xFFFFEDD5);
      case 'REJETE':     return const Color(0xFFFEE2E2);
      case 'BLOQUE':     return const Color(0xFFE2E8F0);
      default:           return Colors.grey.shade100;
    }
  }

  String get statusLabel {
    switch (status) {
      case 'VALIDE':     return 'VALIDÉ';
      case 'EN_ATTENTE': return 'EN ATTENTE';
      case 'REJETE':     return 'REJETÉ';
      case 'BLOQUE':     return 'BLOQUÉ';
      default:           return status;
    }
  }
}
