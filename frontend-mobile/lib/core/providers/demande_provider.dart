import 'package:flutter/material.dart';

class DemandeProvider extends ChangeNotifier {
  List<dynamic> _demandes = [];
  bool _isLoading = false;
  String? _error;

  List<dynamic> get demandes => _demandes;
  bool get isLoading => _isLoading;
  String? get error => _error;

  Future<void> fetchDemandes({String? token}) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    // Simulation d'un délai réseau court
    await Future.delayed(const Duration(milliseconds: 500));
    
    _demandes = _getMockDemandes();
    
    _isLoading = false;
    notifyListeners();
  }

  List<dynamic> _getMockDemandes() {
    return [
      {
        'reference': 'CDB-2026-001234',
        'documentTypeId': {'nom': "Extrait d'acte de naissance"},
        'statut': 'VALIDEE',
        'dateSoumission': '2026-05-12T10:00:00Z',
        'citoyenId': {'nom': 'Ouédraogo', 'prenom': 'Jean-Baptiste'},
        'donnees': {
          'lieuNaissance': 'Ouagadougou',
          'numeroCnib': 'B12345678'
        }
      },
      {
        'reference': 'CDB-2026-005678',
        'documentTypeId': {'nom': 'Certificat de Nationalité'},
        'statut': 'EN_ATTENTE',
        'dateSoumission': '2026-05-18T14:30:00Z',
        'citoyenId': {'nom': 'Koulibaly', 'prenom': 'Awa'},
        'donnees': {
          'lieuNaissance': 'Bobo-Dioulasso',
          'numeroCnib': 'B87654321'
        }
      },
      {
        'reference': 'CDB-2026-009901',
        'documentTypeId': {'nom': 'Casier Judiciaire'},
        'statut': 'REJETEE',
        'dateSoumission': '2026-05-05T09:15:00Z',
        'citoyenId': {'nom': 'Sanou', 'prenom': 'Ibrahim'},
        'donnees': {
          'lieuNaissance': 'Banfora',
          'numeroCnib': 'B11223344'
        }
      },
      {
        'reference': 'DEM-2024-8892-X',
        'documentTypeId': {'nom': "Extrait d'acte de naissance"},
        'statut': 'URGENT',
        'dateSoumission': '2026-03-19T08:00:00Z',
        'citoyenId': {'nom': 'Traoré', 'prenom': 'Moussa'},
        'donnees': {
          'lieuNaissance': 'Koudougou',
          'numeroCnib': 'B55443322'
        }
      }
    ];
  }
}
