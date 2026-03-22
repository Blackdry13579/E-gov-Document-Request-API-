import 'package:egov_mobile/features/shared/presentation/widgets/egov_main_app_bar.dart';
import 'package:egov_mobile/features/notifications/presentation/pages/notifications_page.dart';
import 'package:egov_mobile/features/admin/presentation/pages/admin_profile_page.dart';
import 'package:egov_mobile/features/shared/presentation/widgets/admin_bottom_nav.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import 'admin_users_page.dart';
import 'admin_demandes_page.dart';
import 'admin_documents_page.dart';
import 'admin_stats_page.dart';
import '../../../../core/constants/app_colors.dart';

class AdminHomePage extends StatelessWidget {
  const AdminHomePage({super.key});

  static const routeName = '/admin-home';

  // Colors
  static const primaryBlue = Color(0xFF1A237E);
  static const accentTeal = Color(0xFF0D7377);
  static const successGreen = Color(0xFF27AE60);
  static const warningOrange = Color(0xFFF39C12);
  static const errorRed = Color(0xFFE74C3C);
  static const backgroundLight = Color(0xFFF4F6F9);
  static const textPrimary = Color(0xFF1C1C1E);
  static const textSecondary = Color(0xFF8E8E93);
  static const heroBg = Color(0xFFE8EEF4);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: backgroundLight,
      appBar: EgovMainAppBar(
        title: 'ADMINISTRATION PUBLIQUE',
        onNotificationTap: () => Navigator.push(
          context,
          MaterialPageRoute(builder: (_) => const NotificationsPage(role: 'admin')),
        ),
        onProfileTap: () => Navigator.push(
          context,
          MaterialPageRoute(builder: (_) => const AdminProfilePage()),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.fromLTRB(16, 20, 16, 32),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              "Tableau de Bord Admin",
              style: GoogleFonts.inter(
                fontSize: 24,
                fontWeight: FontWeight.w800,
                color: textPrimary,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              "Lundi, 24 Mai 2024",
              style: GoogleFonts.inter(
                fontSize: 13,
                color: textSecondary,
              ),
            ),
            const SizedBox(height: 16),
            // Hero Card
            Container(
              width: double.infinity,
              height: 100,
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: heroBg,
                borderRadius: BorderRadius.circular(18),
              ),
              child: Stack(
                children: [
                  Positioned(
                    right: -8,
                    top: -12,
                    child: Icon(
                      Icons.account_balance_rounded,
                      color: primaryBlue.withOpacity(0.07),
                      size: 90,
                    ),
                  ),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        "Bienvenue, Abdoulaye Traoré",
                        style: GoogleFonts.inter(
                          fontSize: 17,
                          fontWeight: FontWeight.w700,
                          color: primaryBlue,
                        ),
                      ),
                      const SizedBox(height: 6),
                      Text(
                        "Unité · Progrès · Justice",
                        style: GoogleFonts.inter(
                          fontSize: 13,
                          fontStyle: FontStyle.italic,
                          color: accentTeal,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),
            Row(
              children: [
                Expanded(
                  child: _buildKpiCard(
                    label: "TOTAL DEMANDES",
                    value: "1,245",
                    trend: "+12%",
                    trendUp: true,
                    onTap: () => Navigator.pushReplacement(context, MaterialPageRoute(builder: (_) => const AdminDemandesPage())),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: _buildKpiCard(
                    label: "CITOYENS",
                    value: "842",
                    trend: "+5%",
                    trendUp: true,
                    valueColor: accentTeal,
                    onTap: () => Navigator.pushReplacement(context, MaterialPageRoute(builder: (_) => const AdminUsersPage())),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                Expanded(
                  child: _buildKpiCard(
                    label: "AGENTS ACTIFS",
                    value: "124",
                    trend: "Stable",
                    trendUp: true,
                    isStable: true,
                    onTap: () => Navigator.pushReplacement(context, MaterialPageRoute(builder: (_) => const AdminUsersPage())),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: _buildKpiCard(
                    label: "STATISTIQUES",
                    value: "Voir",
                    trend: "Global",
                    trendUp: true,
                    valueColor: const Color(0xFFd4af37),
                    onTap: () => Navigator.pushReplacement(context, MaterialPageRoute(builder: (_) => const AdminStatsPage())),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 24),

            // SECTION 1 — BAR CHART
            _buildSectionHeader("Activité cette semaine", rightText: "7 derniers jours"),
            const SizedBox(height: 12),
            _buildBarChartCard(),

            const SizedBox(height: 24),

            // SECTION 2 — DEMANDES RÉCENTES
            _buildSectionHeader("Demandes Récentes",
                rightWidget: TextButton(
                  onPressed: () {
                    // Logique pour basculer vers l'onglet Demandes
                  },
                  style: TextButton.styleFrom(
                    padding: EdgeInsets.zero,
                    minimumSize: Size.zero,
                    tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                  ),
                  child: Text(
                    "Voir tout",
                    style: GoogleFonts.publicSans(
                      fontSize: 13,
                      fontWeight: FontWeight.bold,
                      color: primaryBlue,
                    ),
                  ),
                )),
            const SizedBox(height: 12),
            _buildRecentRequestsList(),

            const SizedBox(height: 24),

            // SECTION 3 — TOP AGENTS ACTIFS
            _buildSectionHeader("Agents les plus actifs"),
            const SizedBox(height: 12),
            _buildTopAgentsCard(),

            const SizedBox(height: 32),
          ],
        ),
      ),
      bottomNavigationBar: const AdminBottomNav(currentIndex: 0),
    );
  }

  // --- UI HELPERS ---

  Widget _buildSectionHeader(String title, {String? rightText, Widget? rightWidget}) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Row(
          children: [
            Container(
              width: 4,
              height: 18,
              decoration: BoxDecoration(
                color: const Color(0xFFd4af37),
                borderRadius: BorderRadius.circular(2),
              ),
            ),
            const SizedBox(width: 10),
            Text(
              title,
              style: GoogleFonts.publicSans(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                color: const Color(0xFF1e293b),
              ),
            ),
          ],
        ),
        if (rightWidget != null)
          rightWidget
        else if (rightText != null)
          Text(
            rightText,
            style: GoogleFonts.publicSans(
              fontSize: 12,
              color: textSecondary,
            ),
          ),
      ],
    );
  }

  Widget _buildBarChartCard() {
    final bars = [
      {'label': 'Lun', 'value': 0.55},
      {'label': 'Mar', 'value': 0.75},
      {'label': 'Mer', 'value': 0.40},
      {'label': 'Jeu', 'value': 0.85},
      {'label': 'Ven', 'value': 0.65},
      {'label': 'Sam', 'value': 0.25},
      {'label': 'Dim', 'value': 0.15},
    ];

    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(14),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 10,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        children: [
          const SizedBox(height: 16),
          SizedBox(
            height: 120,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              crossAxisAlignment: CrossAxisAlignment.end,
              children: bars.map((bar) {
                final isToday = bar['label'] == 'Lun'; // On surligne Lun pour l'exemple
                return Expanded(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      Container(
                        height: 100 * (bar['value'] as double),
                        margin: const EdgeInsets.symmetric(horizontal: 4),
                        decoration: BoxDecoration(
                          color: isToday ? const Color(0xFF2563eb) : primaryBlue,
                          borderRadius: const BorderRadius.vertical(top: Radius.circular(4)),
                        ),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        bar['label'] as String,
                        style: GoogleFonts.publicSans(
                          fontSize: 10,
                          color: textSecondary,
                        ),
                      ),
                    ],
                  ),
                );
              }).toList(),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildRecentRequestsList() {
    return Column(
      children: [
        _buildRequestCard(
          icon: Icons.history_edu_rounded,
          type: "Acte de Naissance",
          name: "Jean-Baptiste OUÉDRAOGO",
          ref: "CDB-2026-001234",
          status: "En attente",
          statusColor: warningOrange,
          service: "MAIRIE",
          serviceColor: primaryBlue,
        ),
        const SizedBox(height: 10),
        _buildRequestCard(
          icon: Icons.gavel_rounded,
          type: "Casier Judiciaire",
          name: "Fatou DIALLO",
          ref: "CDB-2026-001235",
          status: "Validée",
          statusColor: successGreen,
          service: "JUSTICE",
          serviceColor: errorRed,
        ),
        const SizedBox(height: 10),
        _buildRequestCard(
          icon: Icons.badge_rounded,
          type: "CNIB Renouvellement",
          name: "Moussa TRAORÉ",
          ref: "CDB-2026-001236",
          status: "Rejetée",
          statusColor: errorRed,
          service: "POLICE",
          serviceColor: Colors.blue[800]!,
        ),
      ],
    );
  }

  Widget _buildRequestCard({
    required IconData icon,
    required String type,
    required String name,
    required String ref,
    required String status,
    required Color statusColor,
    required String service,
    required Color serviceColor,
  }) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.04),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Row(
        children: [
          Container(
            width: 42,
            height: 42,
            decoration: BoxDecoration(
              color: primaryBlue.withOpacity(0.08),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Icon(icon, color: primaryBlue, size: 22),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  type,
                  style: GoogleFonts.publicSans(
                    fontSize: 14,
                    fontWeight: FontWeight.bold,
                    color: textPrimary,
                  ),
                ),
                Text(
                  name,
                  style: GoogleFonts.publicSans(fontSize: 12, color: textSecondary),
                ),
                Text(
                  ref,
                  style: GoogleFonts.jetBrainsMono(
                    fontSize: 11,
                    color: textSecondary,
                  ),
                ),
              ],
            ),
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: statusColor.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(999),
                ),
                child: Text(
                  status,
                  style: GoogleFonts.publicSans(
                    fontSize: 10,
                    fontWeight: FontWeight.bold,
                    color: statusColor,
                  ),
                ),
              ),
              const SizedBox(height: 4),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                decoration: BoxDecoration(
                  color: serviceColor,
                  borderRadius: BorderRadius.circular(4),
                ),
                child: Text(
                  service,
                  style: GoogleFonts.publicSans(
                    fontSize: 8,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildTopAgentsCard() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(14),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 10,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        children: [
          _buildAgentRow(
            rank: "1",
            rankColor: const Color(0xFFd4af37),
            name: "Agent Sawadogo",
            service: "MAIRIE",
            serviceColor: primaryBlue,
            count: "42 dossiers",
            progress: 0.9,
          ),
          const Divider(height: 24),
          _buildAgentRow(
            rank: "2",
            rankColor: const Color(0xFF94a3b8),
            name: "Agent Compaoré",
            service: "JUSTICE",
            serviceColor: errorRed,
            count: "38 dossiers",
            progress: 0.8,
          ),
          const Divider(height: 24),
          _buildAgentRow(
            rank: "3",
            rankColor: const Color(0xFFcbd5e1),
            name: "Agent Traoré",
            service: "POLICE",
            serviceColor: Colors.blue[800]!,
            count: "31 dossiers",
            progress: 0.65,
          ),
        ],
      ),
    );
  }

  Widget _buildAgentRow({
    required String rank,
    required Color rankColor,
    required String name,
    required String service,
    required Color serviceColor,
    required String count,
    required double progress,
  }) {
    return Row(
      children: [
        Container(
          width: 32,
          height: 32,
          decoration: BoxDecoration(color: rankColor, shape: BoxShape.circle),
          child: Center(
            child: Text(
              rank,
              style: GoogleFonts.publicSans(
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
          ),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                name,
                style: GoogleFonts.publicSans(
                  fontSize: 14,
                  fontWeight: FontWeight.bold,
                  color: textPrimary,
                ),
              ),
              const SizedBox(height: 2),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                decoration: BoxDecoration(
                  color: serviceColor.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(4),
                ),
                child: Text(
                  service,
                  style: GoogleFonts.publicSans(
                    fontSize: 8,
                    fontWeight: FontWeight.bold,
                    color: serviceColor,
                  ),
                ),
              ),
            ],
          ),
        ),
        Column(
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            Text(
              count,
              style: GoogleFonts.publicSans(
                fontSize: 13,
                fontWeight: FontWeight.bold,
                color: primaryBlue,
              ),
            ),
            const SizedBox(height: 4),
            SizedBox(
              width: 60,
              height: 4,
              child: ClipRRect(
                borderRadius: BorderRadius.circular(2),
                child: LinearProgressIndicator(
                  value: progress,
                  backgroundColor: const Color(0xFFe2e8f0),
                  valueColor: AlwaysStoppedAnimation<Color>(primaryBlue),

                ),
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildKpiCard({
    required String label,
    required String value,
    required String trend,
    required bool trendUp,
    bool isStable = false,
    Color valueColor = textPrimary,
    VoidCallback? onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(14),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.04),
            blurRadius: 8,
            offset: const Offset(0, 2),
          )
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            label,
            style: GoogleFonts.inter(
              fontSize: 10,
              fontWeight: FontWeight.w600,
              color: textSecondary,
              letterSpacing: 0.5,
            ),
          ),
          const SizedBox(height: 8),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Text(
                value,
                style: GoogleFonts.inter(
                  fontSize: 24,
                  fontWeight: FontWeight.w800,
                  color: valueColor,
                ),
              ),
              Row(
                children: [
                  if (isStable) ...[
                    const Icon(Icons.check_rounded, color: successGreen, size: 12),
                    const SizedBox(width: 2),
                    Text(
                      "Stable",
                      style: GoogleFonts.inter(
                        fontSize: 11,
                        fontWeight: FontWeight.w600,
                        color: successGreen,
                      ),
                    ),
                  ] else ...[
                    Icon(
                      trendUp ? Icons.trending_up_rounded : Icons.trending_down_rounded,
                      color: trendUp ? successGreen : errorRed,
                      size: 14,
                    ),
                    const SizedBox(width: 2),
                    Text(
                      trend,
                      style: GoogleFonts.inter(
                        fontSize: 11,
                        fontWeight: FontWeight.w600,
                        color: trendUp ? successGreen : errorRed,
                      ),
                    ),
                  ]
                ],
              ),
            ],
          ),
        ],
      ),
    ),
  );
}
}
