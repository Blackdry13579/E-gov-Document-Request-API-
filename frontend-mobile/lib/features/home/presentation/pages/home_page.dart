import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../../../../core/constants/app_colors.dart';
import '../../../services/presentation/pages/service_details_page.dart';
import '../../../shared/presentation/widgets/citizen_bottom_nav.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  static const routeName = '/home';

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Column(
          children: [
            const SizedBox(height: 8),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: _TopHeader(
                onNotificationsTap: () {},
                onProfileTap: () {},
              ),
            ),
            const SizedBox(height: 14),
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.fromLTRB(16, 0, 16, 18),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    _WelcomeCard(
                      title: 'Bonjour, Ibrahim',
                      subtitle: 'Bienvenue sur votre portail',
                      onTap: () {},
                    ),
                    const SizedBox(height: 14),
                    _PrimaryAction(
                      label: 'NOUVELLE DEMANDE',
                      onPressed: () => _openServiceDetails(context),
                    ),
                    const SizedBox(height: 22),
                    _SectionTitle(title: 'Services Populaires'),
                    const SizedBox(height: 12),
                    Row(
                      children: [
                        Expanded(
                          child: _ServiceCard(
                            icon: Icons.groups_outlined,
                            label: 'État Civil',
                            onTap: () => _openServiceDetails(context),
                          ),
                        ),
                        SizedBox(width: 12),
                        Expanded(
                          child: _ServiceCard(
                            icon: Icons.gavel_rounded,
                            label: 'Justice',
                            onTap: () => _openServiceDetails(context),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 22),
                    Row(
                      children: [
                        const Expanded(
                          child: _SectionTitle(title: 'Demandes Récentes'),
                        ),
                        GestureDetector(
                          onTap: () {},
                          child: Text(
                            'Voir tout',
                            style: GoogleFonts.outfit(
                              fontSize: 12,
                              fontWeight: FontWeight.w700,
                              color: AppColors.primary,
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    _RequestCard(
                      accent: Color(0xFF22C55E),
                      title: 'Acte de Naissance',
                      code: 'CDB - 2026 - 004521',
                      date: 'Effectuée le 12 Mai 2026',
                      statusLabel: 'VALIDÉE',
                      statusBg: Color(0xFFDCFCE7),
                      statusFg: Color(0xFF166534),
                      actionLabel: 'Détails',
                      actionIcon: Icons.open_in_new_rounded,
                      onTap: () => _openServiceDetails(context),
                    ),
                    const SizedBox(height: 12),
                    _RequestCard(
                      accent: Color(0xFFEAB308),
                      title: 'Renouvellement CNI',
                      code: 'CDB - 2026 - 008912',
                      date: 'Effectuée le 18 Mai 2026',
                      statusLabel: 'EN COURS',
                      statusBg: Color(0xFFFEF9C3),
                      statusFg: Color(0xFF854D0E),
                      actionLabel: 'Suivre',
                      actionIcon: Icons.track_changes_rounded,
                      onTap: () => _openServiceDetails(context),
                    ),
                    const SizedBox(height: 12),
                    _RequestCard(
                      accent: Color(0xFFEF4444),
                      title: 'Casier Judiciaire',
                      code: 'CDB - 2026 - 003301',
                      date: 'Effectuée le 05 Mai 2026',
                      statusLabel: 'REJETÉE',
                      statusBg: Color(0xFFFEE2E2),
                      statusFg: Color(0xFF991B1B),
                      actionLabel: 'Motif',
                      actionIcon: Icons.info_outline_rounded,
                      onTap: () => _openServiceDetails(context),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: const CitizenBottomNav(currentIndex: 0),
    );
  }

  void _openServiceDetails(BuildContext context) {
    Navigator.of(context).push(
      MaterialPageRoute(builder: (_) => const ServiceDetailsPage()),
    );
  }
}

class _TopHeader extends StatelessWidget {
  final VoidCallback onNotificationsTap;
  final VoidCallback onProfileTap;

  const _TopHeader({
    required this.onNotificationsTap,
    required this.onProfileTap,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Container(
          width: 34,
          height: 34,
          decoration: BoxDecoration(
            color: AppColors.sectionBg,
            shape: BoxShape.circle,
            border: Border.all(color: AppColors.divider),
          ),
          child: const Icon(
            Icons.account_balance_outlined,
            size: 18,
            color: AppColors.primary,
          ),
        ),
        const SizedBox(width: 10),
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'E-Gov',
              style: GoogleFonts.outfit(
                fontSize: 16,
                fontWeight: FontWeight.w800,
                color: AppColors.primary,
              ),
            ),
            Text(
              'BURKINA FASO',
              style: GoogleFonts.outfit(
                fontSize: 9,
                fontWeight: FontWeight.w800,
                color: AppColors.accent,
                letterSpacing: 0.8,
              ),
            ),
          ],
        ),
        const Spacer(),
        Stack(
          children: [
            InkWell(
              onTap: onNotificationsTap,
              borderRadius: BorderRadius.circular(999),
              child: Container(
                width: 40,
                height: 40,
                alignment: Alignment.center,
                child: const Icon(
                  Icons.notifications_none_rounded,
                  color: AppColors.primary,
                ),
              ),
            ),
            Positioned(
              right: 11,
              top: 9,
              child: Container(
                width: 7,
                height: 7,
                decoration: const BoxDecoration(
                  color: Color(0xFFEF4444),
                  shape: BoxShape.circle,
                ),
              ),
            ),
          ],
        ),
        const SizedBox(width: 8),
        InkWell(
          onTap: onProfileTap,
          borderRadius: BorderRadius.circular(999),
          child: Container(
            width: 40,
            height: 40,
            decoration: BoxDecoration(
              color: AppColors.sectionBg,
              shape: BoxShape.circle,
              border: Border.all(color: AppColors.divider),
            ),
            child: const Icon(
              Icons.person_outline_rounded,
              color: AppColors.primary,
            ),
          ),
        ),
      ],
    );
  }
}

class _WelcomeCard extends StatelessWidget {
  final String title;
  final String subtitle;
  final VoidCallback onTap;

  const _WelcomeCard({
    required this.title,
    required this.subtitle,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(18),
      child: Container(
        height: 132,
        width: double.infinity,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(18),
          color: AppColors.primary,
          image: const DecorationImage(
            image: AssetImage('assets/images/hero_bg.png'),
            fit: BoxFit.cover,
          ),
        ),
        child: Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(18),
            gradient: LinearGradient(
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
              colors: [
                Colors.black.withValues(alpha: 0.05),
                Colors.black.withValues(alpha: 0.55),
              ],
            ),
          ),
          padding: const EdgeInsets.fromLTRB(16, 16, 16, 16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              Text(
                subtitle,
                style: GoogleFonts.outfit(
                  fontSize: 12,
                  color: AppColors.white.withValues(alpha: 0.85),
                  fontWeight: FontWeight.w600,
                ),
              ),
              const SizedBox(height: 2),
              Text(
                '$title 👋',
                style: GoogleFonts.outfit(
                  fontSize: 22,
                  color: AppColors.white,
                  fontWeight: FontWeight.w800,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _PrimaryAction extends StatelessWidget {
  final String label;
  final VoidCallback onPressed;

  const _PrimaryAction({
    required this.label,
    required this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      height: 52,
      child: ElevatedButton(
        onPressed: onPressed,
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.primary,
          foregroundColor: AppColors.white,
          elevation: 10,
          shadowColor: AppColors.primary.withValues(alpha: 0.35),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(999),
          ),
        ),
        child: Row(
          children: [
            Container(
              width: 26,
              height: 26,
              decoration: BoxDecoration(
                color: AppColors.white.withValues(alpha: 0.12),
                shape: BoxShape.circle,
                border: Border.all(
                  color: AppColors.white.withValues(alpha: 0.12),
                ),
              ),
              child: const Icon(Icons.add, size: 16),
            ),
            const SizedBox(width: 12),
            Text(
              label,
              style: GoogleFonts.outfit(
                fontWeight: FontWeight.w800,
                letterSpacing: 0.6,
                fontSize: 13,
              ),
            ),
            const Spacer(),
            const Icon(Icons.chevron_right_rounded),
          ],
        ),
      ),
    );
  }
}

class _SectionTitle extends StatelessWidget {
  final String title;
  const _SectionTitle({required this.title});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Container(
          width: 4,
          height: 16,
          decoration: BoxDecoration(
            color: AppColors.accent,
            borderRadius: BorderRadius.circular(999),
          ),
        ),
        const SizedBox(width: 8),
        Text(
          title,
          style: GoogleFonts.outfit(
            fontSize: 14,
            fontWeight: FontWeight.w800,
            color: AppColors.textDark,
          ),
        ),
      ],
    );
  }
}

class _ServiceCard extends StatelessWidget {
  final IconData icon;
  final String label;
  final VoidCallback? onTap;

  const _ServiceCard({required this.icon, required this.label, this.onTap});

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(16),
      child: Container(
        height: 90,
        decoration: BoxDecoration(
          color: AppColors.cardBg,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: AppColors.divider),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.03),
              blurRadius: 10,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              width: 34,
              height: 34,
              decoration: BoxDecoration(
                color: AppColors.sectionBg,
                shape: BoxShape.circle,
                border: Border.all(color: AppColors.divider),
              ),
              child: Icon(icon, color: AppColors.primary, size: 18),
            ),
            const SizedBox(height: 10),
            Text(
              label,
              style: GoogleFonts.outfit(
                fontSize: 12,
                fontWeight: FontWeight.w700,
                color: AppColors.textDark,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _RequestCard extends StatelessWidget {
  final Color accent;
  final String title;
  final String code;
  final String date;
  final String statusLabel;
  final Color statusBg;
  final Color statusFg;
  final String actionLabel;
  final IconData actionIcon;
  final VoidCallback? onTap;

  const _RequestCard({
    required this.accent,
    required this.title,
    required this.code,
    required this.date,
    required this.statusLabel,
    required this.statusBg,
    required this.statusFg,
    required this.actionLabel,
    required this.actionIcon,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(16),
      child: Container(
        decoration: BoxDecoration(
          color: AppColors.cardBg,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: AppColors.divider),
        ),
        child: Row(
          children: [
            Container(
              width: 5,
              height: 92,
              decoration: BoxDecoration(
                color: accent,
                borderRadius: const BorderRadius.only(
                  topLeft: Radius.circular(16),
                  bottomLeft: Radius.circular(16),
                ),
              ),
            ),
            Expanded(
              child: Padding(
                padding: const EdgeInsets.fromLTRB(14, 12, 14, 12),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Expanded(
                          child: Text(
                            title,
                            style: GoogleFonts.outfit(
                              fontSize: 13,
                              fontWeight: FontWeight.w800,
                              color: AppColors.textDark,
                            ),
                          ),
                        ),
                        Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 10,
                            vertical: 5,
                          ),
                          decoration: BoxDecoration(
                            color: statusBg,
                            borderRadius: BorderRadius.circular(999),
                          ),
                          child: Text(
                            statusLabel,
                            style: GoogleFonts.outfit(
                              fontSize: 9.5,
                              fontWeight: FontWeight.w900,
                              color: statusFg,
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 2),
                    Text(
                      code,
                      style: GoogleFonts.outfit(
                        fontSize: 10.5,
                        color: AppColors.textLight,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    const SizedBox(height: 10),
                    Row(
                      children: [
                        Expanded(
                          child: Text(
                            date,
                            style: GoogleFonts.outfit(
                              fontSize: 10.5,
                              color: AppColors.textLight,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ),
                        Text(
                          actionLabel,
                          style: GoogleFonts.outfit(
                            fontSize: 11,
                            fontWeight: FontWeight.w800,
                            color: AppColors.primary,
                          ),
                        ),
                        const SizedBox(width: 6),
                        Icon(actionIcon, size: 16, color: AppColors.primary),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

