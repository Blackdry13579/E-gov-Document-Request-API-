import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../../../../core/constants/app_colors.dart';
import '../../../shared/presentation/widgets/citizen_bottom_nav.dart';

class NotificationsPage extends StatefulWidget {
  const NotificationsPage({super.key});

  static const routeName = '/notifications';

  @override
  State<NotificationsPage> createState() => _NotificationsPageState();
}

class _NotificationsPageState extends State<NotificationsPage> {
  int _filter = 0; // 0=tout,1=Demandes,2=Services

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Column(
          children: [
            _TopBar(onBack: () => Navigator.of(context).maybePop()),
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.fromLTRB(16, 10, 16, 18),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Notifications',
                      style: GoogleFonts.outfit(
                        fontSize: 24,
                        fontWeight: FontWeight.w900,
                        color: AppColors.textDark,
                      ),
                    ),
                    const SizedBox(height: 12),
                    Row(
                      children: [
                        _FilterChip(
                          label: 'Tout',
                          selected: _filter == 0,
                          onTap: () => setState(() => _filter = 0),
                        ),
                        const SizedBox(width: 10),
                        _FilterChip(
                          label: 'Demandes',
                          selected: _filter == 1,
                          onTap: () => setState(() => _filter = 1),
                        ),
                        const SizedBox(width: 10),
                        _FilterChip(
                          label: 'Services',
                          selected: _filter == 2,
                          onTap: () => setState(() => _filter = 2),
                        ),
                      ],
                    ),
                    const SizedBox(height: 18),
                    _SectionLabel('AUJOURD\'HUI'),
                    const SizedBox(height: 10),
                    const _NotificationTile(
                      iconBg: Color(0xFFDCFCE7),
                      iconColor: Color(0xFF16A34A),
                      icon: Icons.check_circle_rounded,
                      title: 'Dossier Validé',
                      time: '09:42',
                      body:
                          'Votre demande de Passeport CEDEAO a\nété approuvée par la direction de la\npolice nationale.',
                      badgeLabel: 'DÉLIVRÉ',
                      badgeColor: Color(0xFF16A34A),
                      badgeBg: Color(0xFFDCFCE7),
                    ),
                    const SizedBox(height: 10),
                    const _NotificationTile(
                      iconBg: Color(0xFFE0F2FE),
                      iconColor: Color(0xFF0369A1),
                      icon: Icons.info_outline_rounded,
                      title: 'Action Requise',
                      time: '14:15',
                      body:
                          'Votre dossier de déclaration d\'entreprise\nn°2024-BF-8839 nécessite un\ncomplément d\'information.',
                      badgeLabel: 'EN ATTENTE',
                      badgeColor: Color(0xFFF97316),
                      badgeBg: Color(0xFFFFEDD5),
                    ),
                    const SizedBox(height: 22),
                    _SectionLabel('HIER'),
                    const SizedBox(height: 10),
                    const _NotificationTile(
                      iconBg: Color(0xFFE5E7EB),
                      iconColor: Color(0xFF4B5563),
                      icon: Icons.mail_outline_rounded,
                      title: 'Message CNSS',
                      time: '16:30',
                      body:
                          'Votre relevé de cotisations sociales pour le\ntrimestre écoulé est disponible en\nligne.',
                    ),
                    const SizedBox(height: 10),
                    const _NotificationTile(
                      iconBg: Color(0xFFFEE2E2),
                      iconColor: Color(0xFFB91C1C),
                      icon: Icons.close_rounded,
                      title: 'Paiement Échoué',
                      time: '10:00',
                      body:
                          'La transaction pour votre taxe de\nrésidence a été rejetée. Veuillez vérifier\nvotre solde e-money.',
                      badgeLabel: 'REJETÉ',
                      badgeColor: Color(0xFFB91C1C),
                      badgeBg: Color(0xFFFEE2E2),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: const CitizenBottomNav(currentIndex: 2),
    );
  }
}

class _TopBar extends StatelessWidget {
  final VoidCallback onBack;
  const _TopBar({required this.onBack});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: AppColors.cardBg,
      padding: const EdgeInsets.fromLTRB(12, 10, 12, 10),
      child: Row(
        children: [
          InkWell(
            onTap: onBack,
            borderRadius: BorderRadius.circular(999),
            child: const SizedBox(
              width: 40,
              height: 40,
              child: Icon(
                Icons.arrow_back_ios_new_rounded,
                size: 18,
                color: AppColors.primary,
              ),
            ),
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
            child: const Icon(Icons.account_balance_rounded,
                color: AppColors.primary, size: 18),
          ),
          const SizedBox(width: 10),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'BURKINA FASO',
                style: GoogleFonts.outfit(
                  fontSize: 12,
                  fontWeight: FontWeight.w900,
                  letterSpacing: 0.7,
                  color: AppColors.primary,
                ),
              ),
              Text(
                'Portail Citoyen',
                style: GoogleFonts.outfit(
                  fontSize: 9,
                  fontWeight: FontWeight.w700,
                  color: AppColors.textLight,
                ),
              ),
            ],
          ),
          const Spacer(),
          const Icon(Icons.search_rounded, color: AppColors.textDark),
          const SizedBox(width: 12),
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
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 9),
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

class _SectionLabel extends StatelessWidget {
  final String text;
  const _SectionLabel(this.text);

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      style: GoogleFonts.outfit(
        fontSize: 11,
        fontWeight: FontWeight.w800,
        letterSpacing: 0.6,
        color: AppColors.textLight.withValues(alpha: 0.8),
      ),
    );
  }
}

class _NotificationTile extends StatelessWidget {
  final Color iconBg;
  final Color iconColor;
  final IconData icon;
  final String title;
  final String time;
  final String body;
  final String? badgeLabel;
  final Color? badgeColor;
  final Color? badgeBg;

  const _NotificationTile({
    required this.iconBg,
    required this.iconColor,
    required this.icon,
    required this.title,
    required this.time,
    required this.body,
    this.badgeLabel,
    this.badgeColor,
    this.badgeBg,
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
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: 36,
            height: 36,
            decoration: BoxDecoration(
              color: iconBg,
              shape: BoxShape.circle,
            ),
            child: Icon(icon, color: iconColor, size: 20),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Expanded(
                      child: Text(
                        title,
                        style: GoogleFonts.outfit(
                          fontSize: 13.5,
                          fontWeight: FontWeight.w900,
                          color: AppColors.textDark,
                        ),
                      ),
                    ),
                    Text(
                      time,
                      style: GoogleFonts.outfit(
                        fontSize: 11,
                        fontWeight: FontWeight.w700,
                        color: AppColors.textLight,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 4),
                Text(
                  body,
                  style: GoogleFonts.outfit(
                    fontSize: 11.5,
                    height: 1.45,
                    fontWeight: FontWeight.w600,
                    color: AppColors.textLight,
                  ),
                ),
                if (badgeLabel != null &&
                    badgeBg != null &&
                    badgeColor != null) ...[
                  const SizedBox(height: 8),
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 10,
                      vertical: 4,
                    ),
                    decoration: BoxDecoration(
                      color: badgeBg,
                      borderRadius: BorderRadius.circular(999),
                    ),
                    child: Text(
                      badgeLabel!,
                      style: GoogleFonts.outfit(
                        fontSize: 10,
                        fontWeight: FontWeight.w900,
                        letterSpacing: 0.6,
                        color: badgeColor!,
                      ),
                    ),
                  ),
                ],
              ],
            ),
          ),
        ],
      ),
    );
  }
}

