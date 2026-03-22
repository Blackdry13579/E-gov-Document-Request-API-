import 'package:flutter/material.dart';

class StatsProvider extends ChangeNotifier {
  // Mock Stats Data
  int _totalDemandes = 12450;
  double _tauxTraitement = 94.0;
  
  final Map<String, double> _deliveryTimes = {
    'Passeports': 4.2,
    'Actes de Naissance': 1.5,
    'CNIB': 3.8,
  };

  final List<Map<String, dynamic>> _activites = [
    {
      'type': 'ALERTE',
      'title': 'Pic de demandes détecté',
      'subtitle': 'Antenne de Ouagadougou · Il y a 15 min',
      'isError': true,
    },
    {
      'type': 'INFO',
      'title': 'Synchronisation système terminée',
      'subtitle': 'Réseau État Civil · Il y a 2h',
      'isError': false,
    },
  ];

  // Getters
  int get totalDemandes => _totalDemandes;
  double get tauxTraitement => _tauxTraitement;
  Map<String, double> get deliveryTimes => _deliveryTimes;
  List<Map<String, dynamic>> get activites => _activites;

  // Real-time update simulations
  void refreshStats() {
    _totalDemandes += 5;
    notifyListeners();
  }
}
