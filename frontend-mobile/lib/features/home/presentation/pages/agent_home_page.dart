import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';


import 'package:egov_mobile/core/constants/app_colors.dart';
import 'package:egov_mobile/features/shared/presentation/widgets/agent_bottom_nav.dart';
import 'package:egov_mobile/features/shared/presentation/widgets/egov_app_bar.dart';
import 'package:egov_mobile/features/requests/presentation/pages/agent_requests_page.dart';

class AgentDashboardPage extends StatefulWidget {
  const AgentDashboardPage({super.key});

  static const routeName = '/agent-dashboard';

  @override
  State<AgentDashboardPage> createState() => _AgentDashboardPageState();
}

class _AgentDashboardPageState extends State<AgentDashboardPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: EgovAppBar(
        backgroundColor: AppColors.white,
        automaticallyImplyLeading: false,
        leading: Container(
          margin: const EdgeInsets.only(left: 16, top: 4, bottom: 4),
          decoration: const BoxDecoration(
            shape: BoxShape.circle,
            image: DecorationImage(
              image: AssetImage('assets/images/building.png'), // Placeholder
              fit: BoxFit.cover,
            ),
          ),
        ),
        actions: const [
          Icon(Icons.notifications_rounded, color: AppColors.primaryDark, size: 24),
          SizedBox(width: 16),
        ],
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 24),
              
              // ── Header Section
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Tableau de Bord',
                      style: GoogleFonts.outfit(
                        fontSize: 24,
                        fontWeight: FontWeight.w900,
                        color: AppColors.textDark,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      'Bienvenue, Agent Municipal',
                      style: GoogleFonts.outfit(
                        fontSize: 13,
                        fontWeight: FontWeight.w600,
                        color: AppColors.textLight,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 24),

              // ── KPI Section
              const Padding(
                padding: EdgeInsets.symmetric(horizontal: 20),
                child: Row(
                  children: [
                    Expanded(
                      child: _KpiCard(
                        icon: Icons.list_alt_rounded,
                        title: 'Mes Demandes',
                        value: '142',
                        iconBg: Color(0xFFE0F2FE),
                        iconColor: Color(0xFF0284C7),
                      ),
                    ),
                    SizedBox(width: 12),
                    Expanded(
                      child: _KpiCard(
                        icon: Icons.pending_actions_rounded,
                        title: 'À Valider',
                        value: '18',
                        iconBg: Color(0xFFFEF3C7),
                        iconColor: Color(0xFFD97706),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 12),
              const Padding(
                padding: EdgeInsets.symmetric(horizontal: 20),
                child: Row(
                  children: [
                    Expanded(
                      child: _KpiCard(
                        icon: Icons.check_circle_outline_rounded,
                        title: 'Validées',
                        value: '124',
                        iconBg: Color(0xFFDCFCE7),
                        iconColor: Color(0xFF16A34A),
                      ),
                    ),
                    SizedBox(width: 12),
                    Expanded(child: SizedBox.shrink()),
                  ],
                ),
              ),
              const SizedBox(height: 32),

              // ── Quick Actions
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      'Actions Rapides',
                      style: GoogleFonts.outfit(
                        fontSize: 16,
                        fontWeight: FontWeight.w800,
                        color: AppColors.textDark,
                      ),
                    ),
                    Text(
                      'Configuration',
                      style: GoogleFonts.outfit(
                        fontSize: 12,
                        fontWeight: FontWeight.w600,
                        color: AppColors.primary,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),
              SizedBox(
                height: 100,
                child: ListView(
                  padding: const EdgeInsets.symmetric(horizontal: 20),
                  scrollDirection: Axis.horizontal,
                  children: [
                    _buildActionItem(
                      context, 
                      Icons.qr_code_scanner_rounded, 
                      'Scanner QR', 
                      const Color(0xFFF3E8FF),
                      () {},
                    ),
                    _buildActionItem(
                      context, 
                      Icons.assignment_rounded, 
                      'Mes Tâches', 
                      const Color(0xFFDBEAFE),
                      () => Navigator.pushReplacement(context, MaterialPageRoute(builder: (_) => const AgentRequestsPage())),
                    ),
                    _buildActionItem(
                      context, 
                      Icons.people_alt_outlined, 
                      'Citoyens', 
                      const Color(0xFFDCFCE7),
                      () {},
                    ),
                    _buildActionItem(
                      context, 
                      Icons.settings_outlined, 
                      'Paramètres', 
                      const Color(0xFFF1F5F9),
                      () {},
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 32),

              // ── Recent Section
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      'Dernières Demandes',
                      style: GoogleFonts.outfit(
                        fontSize: 16,
                        fontWeight: FontWeight.w800,
                        color: AppColors.textDark,
                      ),
                    ),
                    GestureDetector(
                      onTap: () => Navigator.pushReplacement(context, MaterialPageRoute(builder: (_) => const AgentRequestsPage())),
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
              ),
              const SizedBox(height: 16),
              const Padding(
                padding: EdgeInsets.symmetric(horizontal: 20),
                child: Column(
                  children: [
                    _RecentRequestCard(
                      title: 'Acte de Naissance',
                      user: 'Jean-Baptiste O.',
                      status: 'En cours',
                      color: Color(0xFF0284C7),
                    ),
                    SizedBox(height: 12),
                    _RecentRequestCard(
                      title: 'Certificat de Résidence',
                      user: 'Mariam SANKARA',
                      status: 'À valider',
                      color: Color(0xFFD97706),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 40),
            ],
          ),
        ),
      ),
      bottomNavigationBar: const AgentBottomNav(currentIndex: 0),
    );
  }

  Widget _buildActionItem(BuildContext context, IconData icon, String label, Color bg, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: 85,
        margin: const EdgeInsets.only(right: 12),
        decoration: BoxDecoration(
          color: AppColors.white,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: AppColors.divider.withValues(alpha: 0.5)),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: bg,
                shape: BoxShape.circle,
              ),
              child: Icon(icon, color: AppColors.primaryDark, size: 20),
            ),
            const SizedBox(height: 8),
            Text(
              label,
              style: GoogleFonts.outfit(
                fontSize: 11,
                fontWeight: FontWeight.w600,
                color: AppColors.textMedium,
              ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }
}

class _KpiCard extends StatelessWidget {
  final IconData icon;
  final String title;
  final String value;
  final Color iconBg;
  final Color iconColor;

  const _KpiCard({
    required this.icon,
    required this.title,
    required this.value,
    required this.iconBg,
    required this.iconColor,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        color: AppColors.white,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: AppColors.divider.withValues(alpha: 0.5)),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.03),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: iconBg,
              shape: BoxShape.circle,
            ),
            child: Icon(icon, color: iconColor, size: 20),
          ),
          const SizedBox(height: 16),
          Text(
            value,
            style: GoogleFonts.outfit(
              fontSize: 22,
              fontWeight: FontWeight.w900,
              color: AppColors.textDark,
            ),
          ),
          Text(
            title,
            style: GoogleFonts.outfit(
              fontSize: 11,
              fontWeight: FontWeight.w600,
              color: AppColors.textLight,
            ),
          ),
        ],
      ),
    );
  }
}

class _RecentRequestCard extends StatelessWidget {
  final String title;
  final String user;
  final String status;
  final Color color;

  const _RecentRequestCard({
    required this.title,
    required this.user,
    required this.status,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.divider.withValues(alpha: 0.5)),
      ),
      child: Row(
        children: [
          Container(
            width: 8,
            height: 48,
            decoration: BoxDecoration(
              color: color,
              borderRadius: BorderRadius.circular(4),
            ),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: GoogleFonts.outfit(
                    fontSize: 14,
                    fontWeight: FontWeight.w700,
                    color: AppColors.textDark,
                  ),
                ),
                Text(
                  user,
                  style: GoogleFonts.outfit(
                    fontSize: 12,
                    color: AppColors.textLight,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ],
            ),
          ),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
            decoration: BoxDecoration(
              color: color.withValues(alpha: 0.1),
              borderRadius: BorderRadius.circular(999),
            ),
            child: Text(
              status,
              style: GoogleFonts.outfit(
                fontSize: 10,
                fontWeight: FontWeight.w800,
                color: color,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
