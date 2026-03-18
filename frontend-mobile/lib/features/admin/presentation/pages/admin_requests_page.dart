import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../../../../core/constants/app_colors.dart';

class AdminRequestsPage extends StatefulWidget {
  const AdminRequestsPage({super.key});

  static const routeName = '/admin-requests';

  @override
  State<AdminRequestsPage> createState() => _AdminRequestsPageState();
}

class _AdminRequestsPageState extends State<AdminRequestsPage> {
  int _filter = 0; // 0=tous,1=en attente,2=approuvés

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
                      'Gestion des Demandes',
                      style: GoogleFonts.outfit(
                        fontSize: 22,
                        fontWeight: FontWeight.w900,
                        color: AppColors.textDark,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      "Portail administratif des documents d'État",
                      style: GoogleFonts.outfit(
                        fontSize: 12,
                        fontWeight: FontWeight.w600,
                        color: AppColors.textLight,
                      ),
                    ),
                    const SizedBox(height: 18),
                    _SearchBar(
                      onFilterTap: () {},
                    ),
                    const SizedBox(height: 16),
                    Row(
                      children: [
                        _FilterChip(
                          label: 'Tous',
                          color: const Color(0xFFF97316),
                          selected: _filter == 0,
                          onTap: () => setState(() => _filter = 0),
                        ),
                        const SizedBox(width: 8),
                        _Dot(color: const Color(0xFFF59E0B)),
                        const SizedBox(width: 4),
                        _FilterChip(
                          label: 'En attente',
                          color: const Color(0xFFF59E0B),
                          selected: _filter == 1,
                          onTap: () => setState(() => _filter = 1),
                        ),
                        const SizedBox(width: 8),
                        _Dot(color: const Color(0xFF16A34A)),
                        const SizedBox(width: 4),
                        _FilterChip(
                          label: 'Approuvés',
                          color: const Color(0xFF16A34A),
                          selected: _filter == 2,
                          onTap: () => setState(() => _filter = 2),
                        ),
                      ],
                    ),
                    const SizedBox(height: 18),
                    Row(
                      children: [
                        Text(
                          'DEMANDES RÉCENTES (24)',
                          style: GoogleFonts.outfit(
                            fontSize: 11,
                            fontWeight: FontWeight.w900,
                            letterSpacing: 0.6,
                            color: AppColors.textLight.withValues(alpha: 0.9),
                          ),
                        ),
                        const Spacer(),
                        Text(
                          'Voir tout',
                          style: GoogleFonts.outfit(
                            fontSize: 11,
                            fontWeight: FontWeight.w700,
                            color: AppColors.primary,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    const _RequestRow(
                      icon: Icons.badge_outlined,
                      iconBg: Color(0xFFFFEDD5),
                      title: 'Renouvellement CNIB',
                      ref: 'Dossier #CDB-2026-008842',
                      status: 'EN ATTENTE',
                      statusColor: Color(0xFFB45309),
                      statusBg: Color(0xFFFEF3C7),
                      requester: 'Sawadogo Moussa',
                      date: "Aujourd'hui, 09:45",
                    ),
                    const SizedBox(height: 10),
                    const _RequestRow(
                      icon: Icons.gavel_rounded,
                      iconBg: Color(0xFFE0F2FE),
                      title: 'Casier Judiciaire',
                      ref: 'Dossier #CDB-2026-007120',
                      status: 'APPROUVÉ',
                      statusColor: Color(0xFF15803D),
                      statusBg: Color(0xFFDCFCE7),
                      requester: 'Traoré Alizèta',
                      date: 'Hier, 16:20',
                    ),
                    const SizedBox(height: 10),
                    const _RequestRow(
                      icon: Icons.map_outlined,
                      iconBg: Color(0xFFFFE4E6),
                      title: 'Certificat de Résidence',
                      ref: 'Dossier #CDB-2026-009001',
                      status: 'REJETÉ',
                      statusColor: Color(0xFFB91C1C),
                      statusBg: Color(0xFFFEE2E2),
                      requester: 'Ouédraogo Issa',
                      date: '12 Oct 2023',
                    ),
                    const SizedBox(height: 10),
                    const _RequestRow(
                      icon: Icons.description_outlined,
                      iconBg: Color(0xFFFFEDD5),
                      title: 'Acte de Naissance',
                      ref: 'Dossier #CDB-2026-006652',
                      status: 'EN ATTENTE',
                      statusColor: Color(0xFFB45309),
                      statusBg: Color(0xFFFEF3C7),
                      requester: 'Zongo Fatoumata',
                      date: '11 Oct 2023',
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
            icon: Icon(Icons.home_rounded),
            label: 'Accueil',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.description_outlined),
            label: 'Demandes',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.people_alt_outlined),
            label: 'Citoyens',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.bar_chart_rounded),
            label: 'Stats',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person_outline_rounded),
            label: 'Profil',
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
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Admin E-Gov',
                style: GoogleFonts.outfit(
                  fontSize: 16,
                  fontWeight: FontWeight.w800,
                  color: AppColors.primary,
                ),
              ),
              Text(
                'Burkina Faso',
                style: GoogleFonts.outfit(
                  fontSize: 11,
                  fontWeight: FontWeight.w600,
                  color: AppColors.textLight,
                ),
              ),
            ],
          ),
          const Spacer(),
          Container(
            width: 34,
            height: 34,
            decoration: BoxDecoration(
              color: AppColors.sectionBg,
              shape: BoxShape.circle,
              border: Border.all(color: AppColors.divider),
            ),
            child: const Icon(Icons.notifications_none_rounded,
                color: AppColors.primary, size: 18),
          ),
          const SizedBox(width: 8),
          Container(
            width: 34,
            height: 34,
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

class _SearchBar extends StatelessWidget {
  final VoidCallback onFilterTap;
  const _SearchBar({required this.onFilterTap});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 48,
      decoration: BoxDecoration(
        color: AppColors.cardBg,
        borderRadius: BorderRadius.circular(999),
        border: Border.all(color: AppColors.divider),
      ),
      padding: const EdgeInsets.symmetric(horizontal: 14),
      child: Row(
        children: [
          const Icon(Icons.search_rounded,
              size: 20, color: AppColors.textLight),
          const SizedBox(width: 8),
          Expanded(
            child: TextField(
              decoration: InputDecoration(
                hintText: 'N° de dossier, Nom, CNIB...',
                hintStyle: GoogleFonts.outfit(
                  fontSize: 13,
                  fontWeight: FontWeight.w500,
                  color: AppColors.textLight,
                ),
                border: InputBorder.none,
                isCollapsed: true,
                contentPadding:
                    const EdgeInsets.symmetric(vertical: 12),
              ),
            ),
          ),
          const SizedBox(width: 8),
          InkWell(
            onTap: onFilterTap,
            borderRadius: BorderRadius.circular(999),
            child: Container(
              width: 30,
              height: 30,
              decoration: BoxDecoration(
                color: AppColors.sectionBg,
                shape: BoxShape.circle,
              ),
              child: const Icon(Icons.filter_list_rounded,
                  size: 18, color: AppColors.primary),
            ),
          ),
        ],
      ),
    );
  }
}

class _FilterChip extends StatelessWidget {
  final String label;
  final Color color;
  final bool selected;
  final VoidCallback onTap;

  const _FilterChip({
    required this.label,
    required this.color,
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
          color: selected ? color : AppColors.cardBg,
          borderRadius: BorderRadius.circular(999),
          border: Border.all(color: selected ? color : AppColors.divider),
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

class _Dot extends StatelessWidget {
  final Color color;
  const _Dot({required this.color});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 8,
      height: 8,
      decoration: BoxDecoration(
        color: color,
        shape: BoxShape.circle,
      ),
    );
  }
}

class _RequestRow extends StatelessWidget {
  final IconData icon;
  final Color iconBg;
  final String title;
  final String ref;
  final String status;
  final Color statusColor;
  final Color statusBg;
  final String requester;
  final String date;

  const _RequestRow({
    required this.icon,
    required this.iconBg,
    required this.title,
    required this.ref,
    required this.status,
    required this.statusColor,
    required this.statusBg,
    required this.requester,
    required this.date,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.fromLTRB(14, 12, 14, 12),
      decoration: BoxDecoration(
        color: AppColors.cardBg,
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: AppColors.divider),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                width: 34,
                height: 34,
                decoration: BoxDecoration(
                  color: iconBg,
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Icon(icon, color: const Color(0xFFEA580C), size: 18),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      style: GoogleFonts.outfit(
                        fontSize: 14,
                        fontWeight: FontWeight.w800,
                        color: AppColors.textDark,
                      ),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      ref,
                      style: GoogleFonts.outfit(
                        fontSize: 11.5,
                        fontWeight: FontWeight.w600,
                        color: AppColors.textLight,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(width: 8),
              Container(
                padding:
                    const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: statusBg,
                  borderRadius: BorderRadius.circular(999),
                ),
                child: Text(
                  status,
                  style: GoogleFonts.outfit(
                    fontSize: 10,
                    fontWeight: FontWeight.w800,
                    color: statusColor,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),
          Row(
            children: [
              Text(
                'DEMANDEUR',
                style: GoogleFonts.outfit(
                  fontSize: 9.5,
                  fontWeight: FontWeight.w800,
                  letterSpacing: 0.5,
                  color: AppColors.textLight.withValues(alpha: 0.9),
                ),
              ),
              const Spacer(),
              Text(
                'DATE',
                style: GoogleFonts.outfit(
                  fontSize: 9.5,
                  fontWeight: FontWeight.w800,
                  letterSpacing: 0.5,
                  color: AppColors.textLight.withValues(alpha: 0.9),
                ),
              ),
            ],
          ),
          const SizedBox(height: 4),
          Row(
            children: [
              Text(
                requester,
                style: GoogleFonts.outfit(
                  fontSize: 12,
                  fontWeight: FontWeight.w700,
                  color: AppColors.textDark,
                ),
              ),
              const Spacer(),
              Text(
                date,
                style: GoogleFonts.outfit(
                  fontSize: 12,
                  fontWeight: FontWeight.w700,
                  color: AppColors.textDark,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

