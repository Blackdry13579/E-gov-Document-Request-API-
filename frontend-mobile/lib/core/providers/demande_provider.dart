import 'package:flutter/material.dart';

class DemandeProvider extends ChangeNotifier {
  final List<dynamic> _demandes = [];
  List<dynamic> get demandes => _demandes;
}
