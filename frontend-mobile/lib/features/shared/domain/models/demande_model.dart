class DemandeModel {
  static const String enAttente = 'En attente';
  static const String validee = 'Validée';
  static const String rejetee = 'Rejetée';

  final String id;
  final String reference;
  final String citoyenNom;
  final String typeDocument;
  final String? agentNom;
  final String statut;
  final DateTime dateSoumission;
  final String service;
  final String type;
  final String? motifRejet;

  DemandeModel({
    required this.id,
    required this.reference,
    required this.citoyenNom,
    required this.typeDocument,
    this.agentNom,
    required this.statut,
    required this.dateSoumission,
    required this.service,
    required this.type,
    this.motifRejet,
  });

  factory DemandeModel.fromMap(Map<String, dynamic> map) {
    final citoyen = map['citoyenId'] as Map<String, dynamic>? ?? {};
    final typeDoc = map['documentTypeId'] as Map<String, dynamic>? ?? {};
    
    return DemandeModel(
      id: map['id'] ?? map['reference'] ?? '',
      reference: map['reference'] ?? '',
      citoyenNom: '${citoyen['prenom'] ?? ''} ${citoyen['nom'] ?? ''}'.trim(),
      typeDocument: typeDoc['nom'] ?? 'Demande',
      agentNom: map['agentNom'],
      statut: map['statut'] ?? 'En attente',
      dateSoumission: DateTime.tryParse(map['dateSoumission'] ?? '') ?? DateTime.now(),
      service: map['service'] ?? 'Général',
      type: typeDoc['nom'] ?? 'Demande',
      motifRejet: map['motif'] ?? map['motifRejet'],
    );
  }
}
