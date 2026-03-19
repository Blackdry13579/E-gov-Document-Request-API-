import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../../../../core/constants/app_colors.dart';

class AdminAgentsPage extends StatefulWidget {
  const AdminAgentsPage({super.key});

  static const routeName = '/admin-agents';

  @override
  State<AdminAgentsPage> createState() => _AdminAgentsPageState();
}

class _AdminAgentsPageState extends State<AdminAgentsPage> {
  int _filter = 0; // 0=tous,1=actifs,2=inactifs,3=en attente

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Column(
          children: [
            const _TopBar(),
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.fromLTRB(16, 14, 16, 18),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Gestion des Agents',
                      style: GoogleFonts.outfit(
                        fontSize: 22,
                        fontWeight: FontWeight.w900,
                        color: AppColors.textDark,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      'Effectif total: 142 agents enregistrés',
                      style: GoogleFonts.outfit(
                        fontSize: 12,
                        fontWeight: FontWeight.w600,
                        color: AppColors.textLight,
                      ),
                    ),
                    const SizedBox(height: 14),
                    Row(
                      children: [
                        Expanded(
                          child: _SearchField(),
                        ),
                        const SizedBox(width: 10),
                        _AddAgentButton(onTap: () {}),
                      ],
                    ),
                    const SizedBox(height: 16),
                    SingleChildScrollView(
                      scrollDirection: Axis.horizontal,
                      child: Row(
                        children: [
                          _FilterChip(
                            label: 'Tous',
                            selected: _filter == 0,
                            onTap: () => setState(() => _filter = 0),
                          ),
                          const SizedBox(width: 8),
                          _FilterChip(
                            label: 'Actifs (128)',
                            selected: _filter == 1,
                            onTap: () => setState(() => _filter = 1),
                          ),
                          const SizedBox(width: 8),
                          _FilterChip(
                            label: 'Inactifs (14)',
                            selected: _filter == 2,
                            onTap: () => setState(() => _filter = 2),
                          ),
                          const SizedBox(width: 8),
                          _FilterChip(
                            label: 'En attente',
                            selected: _filter == 3,
                            onTap: () => setState(() => _filter = 3),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 18),
                    const _AgentRow(
                      name: 'Jean-Baptiste Ouedraogo',
                      ministry: 'Ministère de la Transition Digitale',
                      role: 'Administrateur Système',
                      statusLabel: 'Actif',
                      statusColor: Color(0xFF22C55E),
                      statusIsActive: true,
                    ),
                    const SizedBox(height: 10),
                    const _AgentRow(
                      name: 'Aminata Sawadogo',
                      ministry: "Ministère de l'Économie et des Finances",
                      role: 'Contrôleur de Gestion',
                      statusLabel: 'Actif',
                      statusColor: Color(0xFF22C55E),
                      statusIsActive: true,
                    ),
                    const SizedBox(height: 10),
                    const _AgentRow(
                      name: 'Ibrahim Traoré',
                      ministry: "Ministère de l'Éducation Nationale",
                      role: 'Inactif - Congé',
                      statusLabel: 'Inactif',
                      statusColor: Color(0xFFF97316),
                      statusIsActive: false,
                    ),
                    const SizedBox(height: 10),
                    const _AgentRow(
                      name: 'Saliou Diallo',
                      ministry: 'Secrétariat Général du Gouvernement',
                      role: 'Chargé de Documentation',
                      statusLabel: 'Actif',
                      statusColor: Color(0xFF22C55E),
                      statusIsActive: true,
                    ),
                    const SizedBox(height: 10),
                    const _AgentRow(
                      name: 'Fatoumata Kabré',
                      ministry: 'Ministère de la Santé',
                      role: 'Archiviste Numérique',
                      statusLabel: 'Actif',
                      statusColor: Color(0xFF22C55E),
                      statusIsActive: true,
                    ),
                    const SizedBox(height: 18),
                    Center(
                      child: TextButton.icon(
                        onPressed: () {},
                        icon: const Icon(Icons.expand_more_rounded,
                            color: Color(0xFFF97316)),
                        label: Text(
                          "Voir plus d'agents",
                          style: GoogleFonts.outfit(
                            fontSize: 13,
                            fontWeight: FontWeight.w800,
                            color: const Color(0xFFF97316),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: 1,
        type: BottomNavigationBarType.fixed,
        selectedItemColor: const Color(0xFFF97316),
        unselectedItemColor: AppColors.textLight.withValues(alpha: 0.7),
        selectedLabelStyle: GoogleFonts.outfit(
          fontSize: 10,
          fontWeight: FontWeight.w700,
        ),
        unselectedLabelStyle: GoogleFonts.outfit(
          fontSize: 10,
          fontWeight: FontWeight.w600,
        ),
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.dashboard_rounded),
            label: 'Tableau',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.groups_rounded),
            label: 'Agents',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.description_outlined),
            label: 'Documents',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.settings_outlined),
            label: 'Paramètres',
          ),
        ],
      ),
    );
  }
}

class _TopBar extends StatelessWidget {
  const _TopBar();

  @override
  Widget build(BuildContext context) {
    return Container(
      color: AppColors.cardBg,
      padding: const EdgeInsets.fromLTRB(16, 10, 16, 10),
      child: Row(
        children: [
          Container(
            width: 40,
            height: 40,
            decoration: BoxDecoration(
              color: AppColors.sectionBg,
              borderRadius: BorderRadius.circular(10),
            ),
            child: const Icon(Icons.account_balance_rounded,
                color: AppColors.primary, size: 20),
          ),
          const SizedBox(width: 10),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'ADMINISTRATION',
                style: GoogleFonts.outfit(
                  fontSize: 11,
                  fontWeight: FontWeight.w900,
                  letterSpacing: 0.7,
                  color: const Color(0xFFF97316),
                ),
              ),
              Text(
                'BURKINA FASO · E-GOV',
                style: GoogleFonts.outfit(
                  fontSize: 9,
                  fontWeight: FontWeight.w800,
                  letterSpacing: 0.7,
                  color: AppColors.textLight,
                ),
              ),
            ],
          ),
          const Spacer(),
          const Icon(Icons.search_rounded,
              color: AppColors.textDark, size: 22),
          const SizedBox(width: 10),
          Container(
            width: 36,
            height: 36,
            decoration: BoxDecoration(
              color: AppColors.sectionBg,
              shape: BoxShape.circle,
              border: Border.all(color: AppColors.divider),
            ),
            child: const Icon(Icons.person, color: AppColors.primary, size: 18),
          ),
        ],
      ),
    );
  }
}

class _SearchField extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      height: 42,
      decoration: BoxDecoration(
        color: AppColors.cardBg,
        borderRadius: BorderRadius.circular(999),
        border: Border.all(color: AppColors.divider),
      ),
      padding: const EdgeInsets.symmetric(horizontal: 14),
      child: Row(
        children: [
          const Icon(Icons.search_rounded,
              size: 18, color: AppColors.textLight),
          const SizedBox(width: 8),
          Expanded(
            child: TextField(
              decoration: InputDecoration(
                hintText: 'Rechercher un agent...',
                hintStyle: GoogleFonts.outfit(
                  fontSize: 12.5,
                  fontWeight: FontWeight.w500,
                  color: AppColors.textLight,
                ),
                border: InputBorder.none,
                isCollapsed: true,
                contentPadding:
                    const EdgeInsets.symmetric(vertical: 10),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _AddAgentButton extends StatelessWidget {
  final VoidCallback onTap;
  const _AddAgentButton({required this.onTap});

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(16),
      child: Container(
        width: 42,
        height: 42,
        decoration: BoxDecoration(
          color: const Color(0xFFF97316),
          borderRadius: BorderRadius.circular(16),
        ),
        child: const Icon(
          Icons.person_add_alt_rounded,
          color: AppColors.white,
          size: 22,
        ),
      ),
    );
  }
}

class _FilterChip extends StatelessWidget {
  final String label;
  final bool selected;
  final VoidCallback onTap;

  const _FilterChip({
    required this.label,
    required this.selected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(999),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        decoration: BoxDecoration(
          color: selected ? const Color(0xFFF97316) : AppColors.cardBg,
          borderRadius: BorderRadius.circular(999),
          border: Border.all(
            color:
                selected ? const Color(0xFFF97316) : AppColors.divider,
          ),
        ),
        child: Text(
          label,
          style: GoogleFonts.outfit(
            fontSize: 12,
            fontWeight: FontWeight.w800,
            color: selected ? AppColors.white : AppColors.textDark,
          ),
        ),
      ),
    );
  }
}

class _AgentRow extends StatelessWidget {
  final String name;
  final String ministry;
  final String role;
  final String statusLabel;
  final Color statusColor;
  final bool statusIsActive;

  const _AgentRow({
    required this.name,
    required this.ministry,
    required this.role,
    required this.statusLabel,
    required this.statusColor,
    required this.statusIsActive,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.fromLTRB(14, 10, 14, 10),
      decoration: BoxDecoration(
        color: AppColors.cardBg,
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: AppColors.divider),
      ),
      child: Row(
        children: [
          Container(
            width: 42,
            height: 42,
            decoration: const BoxDecoration(
              shape: BoxShape.circle,
              color: AppColors.sectionBg,
            ),
            child: const Icon(Icons.person, color: AppColors.primary, size: 22),
          ),
          const SizedBox(width: 10),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  name,
                  style: GoogleFonts.outfit(
                    fontSize: 14,
                    fontWeight: FontWeight.w800,
                    color: AppColors.textDark,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  ministry,
                  style: GoogleFonts.outfit(
                    fontSize: 11.5,
                    fontWeight: FontWeight.w700,
                    color: const Color(0xFFF97316),
                  ),
                ),
                const SizedBox(height: 2),
                Row(
                  children: [
                    Icon(
                      Icons.circle,
                      size: 7,
                      color: statusIsActive
                          ? const Color(0xFF22C55E)
                          : AppColors.textLight,
                    ),
                    const SizedBox(width: 6),
                    Text(
                      role,
                      style: GoogleFonts.outfit(
                        fontSize: 11.5,
                        fontWeight: FontWeight.w600,
                        color: AppColors.textLight,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
          const SizedBox(width: 8),
          Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Container(
                padding: const EdgeInsets.symmetric(
                  horizontal: 8,
                  vertical: 3,
                ),
                decoration: BoxDecoration(
                  color: statusColor.withValues(alpha: 0.12),
                  borderRadius: BorderRadius.circular(999),
                ),
                child: Text(
                  statusLabel.toUpperCase(),
                  style: GoogleFonts.outfit(
                    fontSize: 9,
                    fontWeight: FontWeight.w800,
                    color: statusColor,
                  ),
                ),
              ),
              const SizedBox(height: 10),
              const Icon(Icons.more_horiz_rounded,
                  size: 18, color: AppColors.textLight),
            ],
          ),
        ],
      ),
    );
  }
}

