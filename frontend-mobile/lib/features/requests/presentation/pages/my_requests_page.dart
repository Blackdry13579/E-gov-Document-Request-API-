import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../../../../core/constants/app_colors.dart';
import '../../../shared/presentation/widgets/citizen_bottom_nav.dart';
import 'request_tracking_page.dart';

class MyRequestsPage extends StatefulWidget {
  const MyRequestsPage({super.key});

  static const routeName = '/my-requests';

  @override
  State<MyRequestsPage> createState() => _MyRequestsPageState();
}

class _MyRequestsPageState extends State<MyRequestsPage> {
  int _filter = 0; // 0=tout,1=en attente,2=validé,3=rejeté

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Column(
          children: [
            _TopHeader(onMenuTap: () {}),
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.fromLTRB(16, 10, 16, 18),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Mes Demandes',
                      style: GoogleFonts.outfit(
                        fontSize: 26,
                        fontWeight: FontWeight.w900,
                        color: AppColors.textDark,
                      ),
                    ),
                    const SizedBox(height: 12),
                    SingleChildScrollView(
                      scrollDirection: Axis.horizontal,
                      child: Row(
                        children: [
                          _FilterChip(
                            label: 'Tout',
                            selected: _filter == 0,
                            onTap: () => setState(() => _filter = 0),
                          ),
                          const SizedBox(width: 10),
                          _FilterChip(
                            label: 'En attente',
                            selected: _filter == 1,
                            onTap: () => setState(() => _filter = 1),
                          ),
                          const SizedBox(width: 10),
                          _FilterChip(
                            label: 'Validé',
                            selected: _filter == 2,
                            onTap: () => setState(() => _filter = 2),
                          ),
                          const SizedBox(width: 10),
                          _FilterChip(
                            label: 'Rejeté',
                            selected: _filter == 3,
                            onTap: () => setState(() => _filter = 3),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 14),
                    _RequestTile(
                      status: 'VALIDÉ',
                      statusColor: const Color(0xFF22C55E),
                      icon: Icons.description_outlined,
                      title: "Extrait d'acte de naissance",
                      ref: 'CDB-2026-001234',
                      date: '12/05/2026',
                      onDetails: () => _openTracking(context),
                    ),
                    const SizedBox(height: 14),
                    _RequestTile(
                      status: 'EN ATTENTE',
                      statusColor: const Color(0xFFF59E0B),
                      icon: Icons.badge_outlined,
                      title: 'Certificat de Nationalité',
                      ref: 'CDB-2026-005678',
                      date: '18/05/2026',
                      onDetails: () => _openTracking(context),
                    ),
                    const SizedBox(height: 14),
                    _RequestTile(
                      status: 'REJETÉ',
                      statusColor: const Color(0xFFEF4444),
                      icon: Icons.gavel_rounded,
                      title: 'Casier Judiciaire',
                      ref: 'CDB-2026-009901',
                      date: '05/05/2026',
                      onDetails: () => _openTracking(context),
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
        backgroundColor: AppColors.primary,
        foregroundColor: AppColors.white,
        shape: const CircleBorder(),
        child: const Icon(Icons.add_rounded, size: 28),
      ),
      bottomNavigationBar: const CitizenBottomNav(currentIndex: 1),
    );
  }

  void _openTracking(BuildContext context) {
    Navigator.of(context).push(
      MaterialPageRoute(builder: (_) => const RequestTrackingPage()),
    );
  }
}

class _TopHeader extends StatelessWidget {
  final VoidCallback onMenuTap;
  const _TopHeader({required this.onMenuTap});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: AppColors.cardBg,
      padding: const EdgeInsets.fromLTRB(16, 10, 16, 10),
      child: Row(
        children: [
          Container(
            width: 36,
            height: 36,
            decoration: BoxDecoration(
              color: AppColors.sectionBg,
              shape: BoxShape.circle,
              border: Border.all(color: AppColors.divider),
            ),
            child: const Icon(Icons.person_outline_rounded, color: AppColors.primary),
          ),
          const SizedBox(width: 10),
          Text(
            'E-Gov',
            style: GoogleFonts.outfit(
              fontSize: 16,
              fontWeight: FontWeight.w900,
              color: AppColors.primary,
            ),
          ),
          const Spacer(),
          InkWell(
            onTap: onMenuTap,
            borderRadius: BorderRadius.circular(999),
            child: Container(
              width: 42,
              height: 42,
              alignment: Alignment.center,
              child: const Icon(Icons.menu_rounded, color: AppColors.textDark),
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
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
        decoration: BoxDecoration(
          color: selected ? AppColors.primary : AppColors.cardBg,
          borderRadius: BorderRadius.circular(999),
          border: Border.all(color: AppColors.divider),
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

class _RequestTile extends StatelessWidget {
  final String status;
  final Color statusColor;
  final IconData icon;
  final String title;
  final String ref;
  final String date;
  final VoidCallback onDetails;

  const _RequestTile({
    required this.status,
    required this.statusColor,
    required this.icon,
    required this.title,
    required this.ref,
    required this.date,
    required this.onDetails,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.fromLTRB(16, 14, 16, 14),
      decoration: BoxDecoration(
        color: AppColors.cardBg,
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: AppColors.divider),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.03),
            blurRadius: 16,
            offset: const Offset(0, 8),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Text(
                status,
                style: GoogleFonts.outfit(
                  fontSize: 10.5,
                  fontWeight: FontWeight.w900,
                  color: statusColor,
                  letterSpacing: 0.6,
                ),
              ),
              const Spacer(),
              Icon(icon, color: AppColors.textLight, size: 18),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            title,
            style: GoogleFonts.outfit(
              fontSize: 16,
              fontWeight: FontWeight.w900,
              color: AppColors.textDark,
            ),
          ),
          const SizedBox(height: 10),
          Row(
            children: [
              const Icon(Icons.confirmation_number_outlined,
                  size: 16, color: AppColors.textLight),
              const SizedBox(width: 8),
              Text(
                'Réf: $ref',
                style: GoogleFonts.outfit(
                  fontSize: 12,
                  fontWeight: FontWeight.w700,
                  color: AppColors.textLight,
                ),
              ),
            ],
          ),
          const SizedBox(height: 6),
          Row(
            children: [
              const Icon(Icons.calendar_today_outlined,
                  size: 16, color: AppColors.textLight),
              const SizedBox(width: 8),
              Text(
                'Date: $date',
                style: GoogleFonts.outfit(
                  fontSize: 12,
                  fontWeight: FontWeight.w700,
                  color: AppColors.textLight,
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Divider(color: AppColors.divider.withValues(alpha: 0.9)),
          const SizedBox(height: 12),
          Align(
            alignment: Alignment.centerRight,
            child: SizedBox(
              height: 42,
              child: ElevatedButton(
                onPressed: onDetails,
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.primary,
                  foregroundColor: AppColors.white,
                  elevation: 0,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(999),
                  ),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      'Voir les détails',
                      style: GoogleFonts.outfit(
                        fontWeight: FontWeight.w900,
                        fontSize: 12,
                      ),
                    ),
                    const SizedBox(width: 8),
                    const Icon(Icons.chevron_right_rounded, size: 18),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

