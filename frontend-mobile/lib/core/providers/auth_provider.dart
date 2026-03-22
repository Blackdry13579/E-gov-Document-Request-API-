import 'package:flutter/material.dart';
import '../../features/agent/domain/models/agent_model.dart';
import '../../features/agent/domain/models/agent_config.dart';

class AuthProvider extends ChangeNotifier {
  bool _isAuthenticated = false;
  final bool _isLoading = false;
  String? _token;
  AgentModel? _agent;

  bool get isAuthenticated => _isAuthenticated;
  bool get isLoading => _isLoading;
  String? get token => _token;
  AgentModel? get agent => _agent;
  AgentModel? get user => _agent; // Alias pour compatibilité portail citoyen/agent

  void login() {
    _isAuthenticated = true;
    _token = 'mock_token_123';
    // Initialise un agent fictif pour les besoins de l'interface agent
    _agent = AgentModel(
      id: 'agent_01',
      nom: 'Agent Burkina',
      service: 'mairie',
      role: AgentRole.mairie,
    );
    notifyListeners();
  }

  void logout() {
    _isAuthenticated = false;
    _token = null;
    _agent = null;
    notifyListeners();
  }
}
