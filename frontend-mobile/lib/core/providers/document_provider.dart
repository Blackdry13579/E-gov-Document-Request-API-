import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import '../services/api_service.dart';
import '../../features/catalogue/domain/models/document_model.dart';

class DocumentProvider extends ChangeNotifier {
  List<DocumentModel> _documents = [];
  bool _isLoading = false;
  String? _error;

  List<DocumentModel> get documents => _documents;
  bool get isLoading => _isLoading;
  String? get error => _error;

  List<DocumentModel> get activeDocuments =>
      _documents.where((d) => d.isActive).toList();

  List<DocumentModel> get allDocuments => _documents;

  Future<void> loadDocuments(String token) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final response = await http.get(
        Uri.parse('${ApiService.baseUrl}/documents'),
        headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        },
      );

      if (response.statusCode == 200) {
        final List data = jsonDecode(response.body);
        _documents = data.map((d) => DocumentModel.fromJson(d)).toList();
      } else {
        _error = 'Erreur de chargement';
        // Fallback to mock data if API fails but we want to show something
        if (_documents.isEmpty) _documents = _getMockDocuments();
      }
    } catch (e) {
      _error = e.toString();
      if (_documents.isEmpty) _documents = _getMockDocuments();
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> toggleDocument({
    required String documentId,
    required bool newValue,
    required String token,
  }) async {
    final index = _documents.indexWhere((d) => d.id == documentId);
    if (index == -1) return;

    // Mise à jour immédiate et locale
    _documents[index] = _documents[index].copyWith(isActive: newValue);
    notifyListeners();

    // On ne tente l'API que si on a un token et que l'ID ne ressemble pas à un mock simple (1, 2, 3...)
    if (token.isEmpty || documentId.length < 5) return;

    try {
      final response = await http.patch(
        Uri.parse('${ApiService.baseUrl}/documents/$documentId/toggle'),
        headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        },
        body: jsonEncode({'isActive': newValue}),
      );

      if (response.statusCode != 200) {
        // En cas d'erreur réelle (404, etc.), on garde quand même le changement local en mode démo 
        // ou on pourrait logger l'erreur. Ici on reste en succès local.
      }
    } catch (e) {
      debugPrint('Erreur toggle document: $e');
    }
  }

  Future<bool> updateDocument({
    required String documentId,
    required Map<String, dynamic> data,
    required String token,
  }) async {
    try {
      final response = await http.put(
        Uri.parse('${ApiService.baseUrl}/documents/$documentId'),
        headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        },
        body: jsonEncode(data),
      );

      if (response.statusCode == 200) {
        final index = _documents.indexWhere((d) => d.id == documentId);
        if (index != -1) {
          final updated = DocumentModel.fromJson(jsonDecode(response.body));
          _documents[index] = updated;
          notifyListeners();
        }
        return true;
      }
      return false;
    } catch (_) {
      return false;
    }
  }

  Future<bool> deleteDocument({
    required String documentId,
    required String token,
  }) async {
    try {
      final response = await http.delete(
        Uri.parse('${ApiService.baseUrl}/documents/$documentId'),
        headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        },
      );

      if (response.statusCode == 200 || response.statusCode == 204) {
        _documents.removeWhere((d) => d.id == documentId);
        notifyListeners();
        return true;
      }
      return false;
    } catch (_) {
      return false;
    }
  }

  List<DocumentModel> _getMockDocuments() {
    return [
      const DocumentModel(
        id: '1',
        title: 'CNIB (Renouvellement)',
        description: 'Carte Nationale d\'Identité Burkinabè',
        code: 'CNIB_REN',
        price: '2 500 FCFA',
        delay: '72h',
        delivery: 'En ligne',
        status: 'DISPONIBLE',
        icon: Icons.badge_outlined,
        iconName: 'badge',
        service: 'police',
        isActive: true,
        category: 'Identité',
      ),
      const DocumentModel(
        id: '2',
        title: 'Extrait d\'Acte de Naissance',
        description: 'Copie intégrale ou extrait simple',
        code: 'NAISS_EX',
        price: '500 FCFA',
        delay: 'Instantané',
        delivery: 'Mobile',
        status: 'INSTANTANÉ',
        icon: Icons.history_edu_outlined,
        iconName: 'history_edu',
        service: 'mairie',
        isActive: true,
        category: 'État Civil',
      ),
      const DocumentModel(
        id: '3',
        title: 'Casier Judiciaire',
        description: 'Bulletin N°3 administratif',
        code: 'CAS_JUD',
        price: '1 000 FCFA',
        delay: '48h',
        delivery: 'Email / Retrait',
        status: '48H DÉLAI',
        icon: Icons.gavel_outlined,
        iconName: 'gavel',
        service: 'justice',
        isActive: true,
        category: 'Justice',
      ),
      const DocumentModel(
        id: '4',
        title: 'Permis de Conduire',
        description: 'Duplicata ou renouvellement',
        code: 'PERM_CON',
        price: '15 000 FCFA',
        delay: '5-7 jours',
        delivery: 'Retrait Guichet',
        status: 'NOUVEAU',
        icon: Icons.directions_car_outlined,
        iconName: 'directions_car',
        service: 'police',
        isActive: true,
        category: 'Transport',
      ),
      const DocumentModel(
        id: '5',
        title: 'Certificat de Décès',
        description: 'Acte officiel de décès',
        code: 'DEC_CERT',
        price: '500 FCFA',
        delay: '24h',
        delivery: 'PDF',
        status: 'DISPONIBLE',
        icon: Icons.assignment_rounded,
        iconName: 'assignment',
        service: 'mairie',
        isActive: false,
        category: 'État Civil',
      ),
    ];
  }
}
