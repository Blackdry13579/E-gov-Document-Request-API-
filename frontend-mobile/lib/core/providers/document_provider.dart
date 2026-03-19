import 'package:flutter/material.dart';

class DocumentProvider extends ChangeNotifier {
  final List<dynamic> _documents = [];
  List<dynamic> get documents => _documents;
}
