import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../../../../core/constants/app_colors.dart';
import '../../../shared/presentation/widgets/citizen_bottom_nav.dart';
import '../../../shared/presentation/widgets/egov_sub_app_bar.dart';

class NotificationsPage extends StatefulWidget {
  final String? role; // 'citizen', 'agent', 'admin'
  const NotificationsPage({super.key, this.role});

  static const routeName = '/notifications';

  @override
  State<NotificationsPage> createState() => _NotificationsPageState();
}

class _NotificationsPageState extends State<NotificationsPage> {
  int _filter = 0; // 0=tout,1=Demandes,2=Services

  @override
  Widget build(BuildContext context) {
    final effectiveRole = widget.role ?? 'citizen';

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: EgovSubAppBar(
        title: 'Notifications',
        subtitle: effectiveRole == 'admin' ? 'ADMINISTRATION' : (effectiveRole == 'agent' ? 'PORTAIL AGENT' : 'MON COMPTE'),
      ),
      body: SafeArea(
        child: Column(
          children: [
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.fromLTRB(16, 10, 16, 18),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
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
                          label: effectiveRole == 'citizen' ? 'Dossiers' : 'Important',
                          selected: _filter == 1,
                          onTap: () => setState(() => _filter = 1),
                        ),
                        const SizedBox(width: 10),
                        _FilterChip(
                          label: effectiveRole == 'admin' ? 'Système' : (effectiveRole == 'agent' ? 'Urgences' : 'Services'),
                          selected: _filter == 2,
                          onTap: () => setState(() => _filter = 2),
                        ),
                      ],
                    ),
                    const SizedBox(height: 18),
                    const _SectionLabel('RÉCENT'),
                    const SizedBox(height: 10),
                    
                    // Filtered Recent Notifications
                    ..._buildFilteredRecent(effectiveRole, _filter),

                    const SizedBox(height: 22),
                    const _SectionLabel('PLUS ANCIENS'),
                    const SizedBox(height: 10),
                    
                    // Older notifications (usually stay visible or filter them too)
                    if (_filter == 0 || _filter == 2)
                      const _NotificationTile(
                        iconBg: Color(0xFFE5E7EB),
                        iconColor: Color(0xFF4B5563),
                        icon: Icons.update_rounded,
                        title: 'Mise à jour système',
                        time: 'Hier',
                        body: 'La plateforme E-Gov a été mise à jour vers la version 2.4. Plus de stabilité et de rapidité.',
                      ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: effectiveRole == 'citizen' ? const CitizenBottomNav(currentIndex: 2) : null,
    );
  }

  List<Widget> _buildFilteredRecent(String role, int filter) {
    List<Widget> all = [];
    
    if (role == 'admin') {
      if (filter == 0 || filter == 1) {
        all.add(const _NotificationTile(
          iconBg: Color(0xFFFEE2E2),
          iconColor: Color(0xFFB91C1C),
          icon: Icons.error_outline_rounded,
          title: 'Alerte Système',
          time: '10:00',
          body: 'Tentative de connexion inhabituelle détectée sur le nœud serveur #04. Sécurité renforcée active.',
          badgeLabel: 'CRITIQUE',
          badgeColor: Color(0xFFB91C1C),
          badgeBg: Color(0xFFFEE2E2),
        ));
        all.add(const SizedBox(height: 10));
      }
      if (filter == 0 || filter == 2) {
        all.add(const _NotificationTile(
          iconBg: Color(0xFFE0F2FE),
          iconColor: Color(0xFF0369A1),
          icon: Icons.person_add_rounded,
          title: 'Nouvel Agent',
          time: '08:45',
          body: 'Un nouvel agent (Mairie - Service État Civil) a complété son inscription et attend validation.',
        ));
      }
    } else if (role == 'agent') {
      if (filter == 0 || filter == 2) {
        all.add(const _NotificationTile(
          iconBg: Color(0xFFFef3c7),
          iconColor: Color(0xFFd97706),
          icon: Icons.priority_high_rounded,
          title: 'Demande Urgente',
          time: '11:20',
          body: 'Une demande de Certificat de Nationalité est en attente depuis 48h. Priorité élevée.',
          badgeLabel: 'URGENT',
          badgeColor: Color(0xFFd97706),
          badgeBg: Color(0xFFFef3c7),
        ));
        all.add(const SizedBox(height: 10));
      }
      if (filter == 0 || filter == 1) {
        all.add(const _NotificationTile(
          iconBg: Color(0xFFE0F2FE),
          iconColor: Color(0xFF0369A1),
          icon: Icons.folder_shared_rounded,
          title: 'Dossier Assigné',
          time: '09:15',
          body: 'Le dossier NAT-2024-001 vous a été assigné pour traitement immédiat.',
        ));
      }
    } else { // citizen
      if (filter == 0 || filter == 1) {
        all.add(const _NotificationTile(
          iconBg: Color(0xFFDCFCE7),
          iconColor: Color(0xFF16A34A),
          icon: Icons.check_circle_rounded,
          title: 'Dossier Validé',
          time: '09:42',
          body: 'Votre demande de Passeport CEDEAO a été approuvée par la direction de la police nationale.',
          badgeLabel: 'DÉLIVRÉ',
          badgeColor: Color(0xFF16A34A),
          badgeBg: Color(0xFFDCFCE7),
        ));
        all.add(const SizedBox(height: 10));
      }
      if (filter == 0 || filter == 2) {
        all.add(const _NotificationTile(
          iconBg: Color(0xFFE0F2FE),
          iconColor: Color(0xFF0369A1),
          icon: Icons.info_outline_rounded,
          title: 'Action Requise',
          time: '14:15',
          body: 'Votre dossier de déclaration d\'entreprise n°2024-BF-8839 nécessite un complément d\'information.',
          badgeLabel: 'EN ATTENTE',
          badgeColor: Color(0xFFF97316),
          badgeBg: Color(0xFFFFEDD5),
        ));
      }
    }
    
    if (all.isEmpty) {
      all.add(Padding(
        padding: const EdgeInsets.symmetric(vertical: 40),
        child: Center(
          child: Text(
            'Aucune notification dans cette catégorie.',
            style: GoogleFonts.outfit(color: AppColors.textLight, fontSize: 13),
          ),
        ),
      ));
    }
    
    return all;
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
        color: AppColors.textLight.withOpacity(0.8),
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

