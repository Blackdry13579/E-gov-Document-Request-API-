import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart' show Icons, Color;
import 'package:egov_mobile/features/admin/presentation/pages/agent_model.dart';
import 'package:egov_mobile/features/admin/presentation/pages/citizen_model.dart';
import 'package:egov_mobile/features/admin/presentation/pages/service_model.dart';

class UserManagementProvider extends ChangeNotifier {
  // Liste des agents initialisée avec les données mockées précédemment dans la vue
  final List<AgentData> _agents = [
    const AgentData(
      initials: 'SO',
      avatarBg: Color(0xFFe0e7ff),
      avatarFg: Color(0xFF4338ca),
      name: 'Agent Sawadogo',
      matricule: 'MAI-OUAGA-2024-089',
      service: 'MAIRIE',
      serviceBg: Color(0xFF1a237e),
      dossiersLabel: '42 dossiers traités',
      actif: true,
      email: 'sawadogo@egov.bf',
      phone: '+226 70 00 00 00',
      dateAjout: '01 Janvier 2026',
      dossiersTraites: 42,
      tauxValidation: 87,
      validees: 38,
      rejetees: 4,
      serviceComplet: 'Mairie de Ouagadougou',
    ),
    const AgentData(
      initials: 'CO',
      avatarBg: Color(0xFFfee2e2),
      avatarFg: Color(0xFF991b1b),
      name: 'Agent Compaoré',
      matricule: 'JUS-OUAGA-2024-045',
      service: 'JUSTICE',
      serviceBg: Color(0xFF991b1b),
      dossiersLabel: '38 dossiers traités',
      actif: true,
      email: 'compaore@egov.bf',
      phone: '+226 71 00 00 00',
      dateAjout: '15 Février 2026',
      dossiersTraites: 38,
      tauxValidation: 82,
      validees: 31,
      rejetees: 7,
      serviceComplet: 'Tribunal de Grande Instance',
    ),
    const AgentData(
      initials: 'TR',
      avatarBg: Color(0xFFf1f5f9),
      avatarFg: Color(0xFF64748b),
      name: 'Agent Traoré',
      matricule: 'POL-OUAGA-2024-032',
      service: 'POLICE',
      serviceBg: Color(0xFF1565c0),
      dossiersLabel: '31 dossiers traités',
      actif: true,
      email: 'traore@egov.bf',
      phone: '+226 72 00 00 00',
      dateAjout: '10 Mars 2026',
      dossiersTraites: 31,
      tauxValidation: 90,
      validees: 28,
      rejetees: 3,
      serviceComplet: 'Direction Générale de la Police',
    ),
  ];

  // Liste des citoyens
  final List<CitizenData> _citizens = [
    const CitizenData(
      id: 'BUR-001',
      name: 'OUEDRAOGO Ibrahim',
      cnib: 'B12345678',
      email: 'ibrahim.o@email.bf',
      phone: '+226 70 12 34 56',
      address: 'Secteur 15',
      city: 'Ouagadougou',
      birthDate: '12/05/1990',
      status: 'VALIDE',
      registrationDate: '01/01/2026',
      requestsCount: 5,
    ),
    const CitizenData(
      id: 'BUR-002',
      name: 'TRAORE Mariam',
      cnib: 'B87654321',
      email: 'mariam.t@email.bf',
      phone: '+226 76 54 32 10',
      address: 'Koulouba',
      city: 'Bobo-Dioulasso',
      birthDate: '22/08/1995',
      status: 'EN_ATTENTE',
      registrationDate: '15/02/2026',
      requestsCount: 2,
    ),
    const CitizenData(
      id: 'BUR-003',
      name: 'DIALLO Moussa',
      cnib: 'B11223344',
      email: 'moussa.d@email.bf',
      phone: '+226 77 66 55 44',
      address: 'Paspanga',
      city: 'Ouagadougou',
      birthDate: '05/11/1988',
      status: 'BLOQUE',
      registrationDate: '20/02/2026',
      requestsCount: 0,
    ),
  ];

  // Liste des services pour la gestion admin
  final List<ServiceData> _services = [
    ServiceData(
      id: '1',
      name: 'MAIRIE',
      description: 'Actes de naissance, mariage, décès et documents civils.',
      icon: Icons.account_balance_rounded,
      color: const Color(0xFF1A237E),
      isActive: true,
    ),
    ServiceData(
      id: '2',
      name: 'JUSTICE',
      description: 'Casier judiciaire, certificats de nationalité.',
      icon: Icons.gavel_rounded,
      color: const Color(0xFFB91C1C),
      isActive: true,
    ),
    ServiceData(
      id: '3',
      name: 'POLICE',
      description: 'CNIB, Passeports, certificats de résidence.',
      icon: Icons.shield_rounded,
      color: const Color(0xFF1E40AF),
      isActive: true,
    ),
    ServiceData(
      id: '4',
      name: 'SANTÉ',
      description: 'Carnets de santé, certificats médicaux.',
      icon: Icons.local_hospital_rounded,
      color: const Color(0xFF059669),
      isActive: false,
    ),
  ];

  // Getters
  List<AgentData> get agents => _agents;
  List<CitizenData> get citizens => _citizens;
  List<ServiceData> get services => _services;

  // --- ACTIONS AGENTS ---

  void addAgent(AgentData agent) {
    _agents.add(agent);
    notifyListeners();
  }

  void toggleAgentStatus(String matricule) {
    final index = _agents.indexWhere((a) => a.matricule == matricule);
    if (index != -1) {
      final old = _agents[index];
      _agents[index] = AgentData(
        initials: old.initials,
        avatarBg: old.avatarBg,
        avatarFg: old.avatarFg,
        name: old.name,
        matricule: old.matricule,
        service: old.service,
        serviceBg: old.serviceBg,
        dossiersLabel: old.dossiersLabel,
        actif: !old.actif,
        email: old.email,
        phone: old.phone,
        dateAjout: old.dateAjout,
        dossiersTraites: old.dossiersTraites,
        tauxValidation: old.tauxValidation,
        validees: old.validees,
        rejetees: old.rejetees,
        serviceComplet: old.serviceComplet,
      );
      notifyListeners();
    }
  }

  // --- ACTIONS CITOYENS ---

  void updateCitizenStatus(String id, String newStatus) {
    final index = _citizens.indexWhere((c) => c.id == id);
    if (index != -1) {
      final old = _citizens[index];
      _citizens[index] = CitizenData(
        id: old.id,
        name: old.name,
        cnib: old.cnib,
        email: old.email,
        phone: old.phone,
        address: old.address,
        city: old.city,
        birthDate: old.birthDate,
        status: newStatus,
        registrationDate: old.registrationDate,
        requestsCount: old.requestsCount,
      );
      notifyListeners();
    }
  }

  // --- ACTIONS SERVICES ---

  void toggleServiceStatus(String id) {
    final index = _services.indexWhere((s) => s.id == id);
    if (index != -1) {
      _services[index] = _services[index].copyWith(isActive: !_services[index].isActive);
      notifyListeners();
    }
  }

  void addService(ServiceData service) {
    _services.add(service);
    notifyListeners();
  }
}
