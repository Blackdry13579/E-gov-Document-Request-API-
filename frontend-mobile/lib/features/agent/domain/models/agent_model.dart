import 'agent_config.dart';
import '../../../auth/domain/models/user_model.dart';

class AgentModel {
  final String id;
  final String nom;
  final String service;
  final AgentRole role;
  final String? email;
  final String? telephone;

  AgentModel({
    required this.id,
    required this.nom,
    required this.service,
    required this.role,
    this.email,
    this.telephone,
  });

  UserModel toUserModel() => UserModel(
    id: id,
    nom: nom,
    email: email ?? "agent@egov.bf",
    telephone: telephone ?? "+226 25 XX XX XX",
    adresse: "Ouagadougou, BF",
  );
}
