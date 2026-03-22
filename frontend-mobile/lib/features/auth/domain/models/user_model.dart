class UserModel {
  final String id;
  final String nom;
  final String? email;
  final String? telephone;
  final String? adresse;

  UserModel({
    required this.id,
    required this.nom,
    this.email,
    this.telephone,
    this.adresse,
  });
}
