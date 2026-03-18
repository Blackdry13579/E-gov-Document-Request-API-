import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../../../../core/constants/app_colors.dart';

class AdminCitizensPage extends StatefulWidget {
  const AdminCitizensPage({super.key});

  static const routeName = '/admin-citizens';

  @override
  State<AdminCitizensPage> createState() => _AdminCitizensPageState();
}

class _AdminCitizensPageState extends State<AdminCitizensPage> {
  int _filter = 0; // 0=tous,1=validés,2=en attente,3=rejetés

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
                      'Gestion des Citoyens',
                      style: GoogleFonts.outfit(
                        fontSize: 22,
                        fontWeight: FontWeight.w900,
                        color: AppColors.textDark,
                      ),
                    ),
                    const SizedBox(height: 16),
                    _SearchField(),
                    const SizedBox(height: 14),
                    Row(
                      children: [
                        _FilterChip(
                          label: 'Tous',
                          selected: _filter == 0,
                          onTap: () => setState(() => _filter = 0),
                        ),
                        const SizedBox(width: 8),
                        _FilterChip(
                          label: 'Validés',
                          selected: _filter == 1,
                          onTap: () => setState(() => _filter = 1),
                        ),
                        const SizedBox(width: 8),
                        _FilterChip(
                          label: 'En attente',
                          selected: _filter == 2,
                          onTap: () => setState(() => _filter = 2),
                        ),
                        const SizedBox(width: 8),
                        _FilterChip(
                          label: 'Rejetés',
                          selected: _filter == 3,
                          onTap: () => setState(() => _filter = 3),
                        ),
                      ],
                    ),
                    const SizedBox(height: 18),
                    const _CitizenRow(
                      name: 'OUEDRAOGO Ibrahim',
                      cnib: 'B12345678',
                      city: 'Ouagadougou, Secteur 15',
                      statusLabel: 'VALIDÉ',
                      statusColor: Color(0xFF16A34A),
                      statusBg: Color(0xFFDCFCE7),
                    ),
                    const SizedBox(height: 10),
                    const _CitizenRow(
                      name: 'TRAORE Mariam',
                      cnib: 'B87654321',
                      city: 'Bobo-Dioulasso, Koulouba',
                      statusLabel: 'EN ATTENTE',
                      statusColor: Color(0xFFF97316),
                      statusBg: Color(0xFFFFEDD5),
                    ),
                    const SizedBox(height: 10),
                    const _CitizenRow(
                      name: 'DIALLO Moussa',
                      cnib: 'B11223344',
                      city: 'Dori, Secteur 2',
                      statusLabel: 'VALIDÉ',
                      statusColor: Color(0xFF16A34A),
                      statusBg: Color(0xFFDCFCE7),
                    ),
                    const SizedBox(height: 10),
                    const _CitizenRow(
                      name: 'ZONGO Alice',
                      cnib: 'B55667788',
                      city: 'Koudougou, Secteur 4',
                      statusLabel: 'REJETÉ',
                      statusColor: Color(0xFFB91C1C),
                      statusBg: Color(0xFFFEE2E2),
                    ),
                    const SizedBox(height: 22),
                    Row(
                      children: [
                        Expanded(
                          child: _StatCard(
                            title: 'Inscrits',
                            value: '12,458',
                            bg: const Color(0xFFFFF7ED),
                            accent: const Color(0xFFF97316),
                          ),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: _StatCard(
                            title: 'Nouveaux (24h)',
                            value: '+142',
                            bg: const Color(0xFFEFF6FF),
                            accent: const Color(0xFF2563EB),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        backgroundColor: const Color(0xFFF97316),
        foregroundColor: AppColors.white,
        shape: const CircleBorder(),
        child: const Icon(Icons.add_rounded, size: 26),
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
            icon: Icon(Icons.people_alt_rounded),
            label: 'Citoyens',
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
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'E-GOV BURKINA',
                style: GoogleFonts.outfit(
                  fontSize: 12,
                  fontWeight: FontWeight.w900,
                  letterSpacing: 0.7,
                  color: AppColors.primary,
                ),
              ),
              Text(
                'Admin',
                style: GoogleFonts.outfit(
                  fontSize: 10,
                  fontWeight: FontWeight.w700,
                  color: const Color(0xFFF97316),
                ),
              ),
            ],
          ),
          const Spacer(),
          const Icon(Icons.notifications_none_rounded,
              color: AppColors.textDark, size: 22),
          const SizedBox(width: 10),
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

class _SearchField extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      height: 46,
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
                hintText: 'Rechercher par Nom, CNIB ou NIP...',
                hintStyle: GoogleFonts.outfit(
                  fontSize: 12.5,
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
        ],
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

class _CitizenRow extends StatelessWidget {
  final String name;
  final String cnib;
  final String city;
  final String statusLabel;
  final Color statusColor;
  final Color statusBg;

  const _CitizenRow({
    required this.name,
    required this.cnib,
    required this.city,
    required this.statusLabel,
    required this.statusColor,
    required this.statusBg,
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
            width: 40,
            height: 40,
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
                  'CNIB: $cnib',
                  style: GoogleFonts.outfit(
                    fontSize: 11.5,
                    fontWeight: FontWeight.w700,
                    color: AppColors.textLight,
                  ),
                ),
                const SizedBox(height: 2),
                Row(
                  children: [
                    const Icon(Icons.location_on_outlined,
                        size: 14, color: AppColors.textLight),
                    const SizedBox(width: 4),
                    Expanded(
                      child: Text(
                        city,
                        style: GoogleFonts.outfit(
                          fontSize: 11.5,
                          fontWeight: FontWeight.w600,
                          color: AppColors.textLight,
                        ),
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
              padding:
                  const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
              decoration: BoxDecoration(
                color: statusBg,
                borderRadius: BorderRadius.circular(999),
              ),
              child: Text(
                statusLabel,
                style: GoogleFonts.outfit(
                  fontSize: 10,
                  fontWeight: FontWeight.w800,
                  color: statusColor,
                ),
              ),
            ),
            const SizedBox(height: 10),
            const Icon(Icons.chevron_right_rounded,
                size: 20, color: AppColors.textLight),
          ],),
        ],
      ),
    );
  }
}

class _StatCard extends StatelessWidget {
  final String title;
  final String value;
  final Color bg;
  final Color accent;

  const _StatCard({
    required this.title,
    required this.value,
    required this.bg,
    required this.accent,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.fromLTRB(14, 12, 14, 12),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(18),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: GoogleFonts.outfit(
              fontSize: 11.5,
              fontWeight: FontWeight.w700,
              color: accent,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            value,
            style: GoogleFonts.outfit(
              fontSize: 18,
              fontWeight: FontWeight.w900,
              color: AppColors.textDark,
            ),
          ),
        ],
      ),
    );
  }
}

