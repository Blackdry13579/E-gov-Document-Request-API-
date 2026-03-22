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
        'id': '1',
        'reference': 'CDB-2026-001234',
        'documentTypeId': {'nom': "Extrait d'acte de naissance"},
        'statut': 'VALIDEE',
        'dateSoumission': '2026-03-12T10:00:00Z',
        'citoyenId': {'nom': 'Ouédraogo', 'prenom': 'Jean-Baptiste'},
        'service': 'Mairie Centrale',
        'type': "Extrait d'acte de naissance",
      },
      {
        'id': '2',
        'reference': 'CDB-2026-005678',
        'documentTypeId': {'nom': 'Certificat de Nationalité'},
        'statut': 'EN_ATTENTE',
        'dateSoumission': '2026-03-18T14:30:00Z',
        'citoyenId': {'nom': 'Koulibaly', 'prenom': 'Awa'},
        'service': 'Justice',
        'type': 'Certificat de Nationalité',
      },
      {
        'id': '3',
        'reference': 'CDB-2026-009901',
        'documentTypeId': {'nom': 'Casier Judiciaire'},
        'statut': 'REJETEE',
        'dateSoumission': '2026-03-15T09:15:00Z',
        'citoyenId': {'nom': 'Sanou', 'prenom': 'Ibrahim'},
        'service': 'Justice',
        'type': 'Casier Judiciaire',
        'motif': 'Casier non vierge (infractions constatées)',
      },
      {
        'id': '4',
        'reference': 'DEM-2024-8892-X',
        'documentTypeId': {'nom': "Extrait d'acte de naissance"},
        'statut': 'EN_ATTENTE',
        'dateSoumission': '2026-03-19T08:00:00Z',
        'citoyenId': {'nom': 'Traoré', 'prenom': 'Moussa'},
        'service': 'Mairie Centrale',
        'type': "Extrait d'acte de naissance",
      },
      {
        'id': '5',
        'reference': 'NAT-2024-5512-B',
        'documentTypeId': {'nom': 'Certificat de Nationalité'},
        'statut': 'EN_ATTENTE',
        'dateSoumission': '2026-03-20T11:20:00Z',
        'citoyenId': {'nom': 'Zongo', 'prenom': 'Fatimata'},
        'service': 'Justice',
        'type': 'Certificat de Nationalité',
      },
      {
        'id': '6',
        'reference': 'CAS-2024-1102-M',
        'documentTypeId': {'nom': 'Casier Judiciaire'},
        'statut': 'EN_ATTENTE',
        'dateSoumission': '2026-02-28T16:45:00Z',
        'citoyenId': {'nom': 'Barry', 'prenom': 'Amadou'},
        'service': 'Justice',
        'type': 'Casier Judiciaire',
      },
      {
        'id': '7',
        'reference': 'MAI-2024-0092-P',
        'documentTypeId': {'nom': "Légalisation de Signature"},
        'statut': 'VALIDEE',
        'dateSoumission': '2026-01-15T10:30:00Z',
        'citoyenId': {'nom': 'Sawadogo', 'prenom': 'Issouf'},
        'service': 'Mairie Centrale',
        'type': "Légalisation de Signature",
      },
      {
        'id': '8',
        'reference': 'JUS-2024-7781-D',
        'documentTypeId': {'nom': 'Certificat de Nationalité'},
        'statut': 'EN_ATTENTE',
        'dateSoumission': '2026-03-21T09:00:00Z',
        'citoyenId': {'nom': 'Compaoré', 'prenom': 'Sali'},
        'service': 'Justice',
        'type': 'Certificat de Nationalité',
      },
      {
        'id': '9',
        'reference': 'MAI-2024-1122-K',
        'documentTypeId': {'nom': "Extrait d'acte de naissance"},
        'statut': 'EN_ATTENTE',
        'dateSoumission': '2026-03-21T10:15:00Z',
        'citoyenId': {'nom': 'Kabré', 'prenom': 'Paul'},
        'service': 'Mairie Centrale',
        'type': "Extrait d'acte de naissance",
      },
      {
        'id': '10',
        'reference': 'JUS-2024-5566-T',
        'documentTypeId': {'nom': 'Casier Judiciaire'},
        'statut': 'VALIDEE',
        'dateSoumission': '2026-03-20T16:30:00Z',
        'citoyenId': {'nom': 'Tiendrébéogo', 'prenom': 'Alice'},
        'service': 'Justice',
        'type': 'Casier Judiciaire',
      },
      {
        'id': '11',
        'reference': 'MAI-2024-9900-L',
        'documentTypeId': {'nom': "Légalisation de Signature"},
        'statut': 'REJETEE',
        'dateSoumission': '2026-03-19T14:45:00Z',
        'citoyenId': {'nom': 'Lingani', 'prenom': 'Ousmane'},
        'service': 'Mairie Centrale',
        'type': "Légalisation de Signature",
        'motif': 'Signature non conforme au document original',
      },
      {
        'id': '12',
        'reference': 'JUS-2024-3344-V',
        'documentTypeId': {'nom': 'Certificat de Nationalité'},
        'statut': 'EN_ATTENTE',
        'dateSoumission': '2026-03-21T11:00:00Z',
        'citoyenId': {'nom': 'Vokouma', 'prenom': 'Sylvie'},
        'service': 'Justice',
        'type': 'Certificat de Nationalité',
      },
    ];
  }
}
