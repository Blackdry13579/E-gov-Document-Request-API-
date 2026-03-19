import 'package:flutter/material.dart';

class RequestProvider extends ChangeNotifier {
  final List<dynamic> _requests = [];
  List<dynamic> get requests => _requests;
}
