import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import 'package:egov_mobile/core/constants/app_colors.dart';
import 'package:egov_mobile/features/shared/presentation/widgets/agent_bottom_nav.dart';
import 'package:egov_mobile/features/shared/presentation/widgets/egov_app_bar.dart';
import 'agent_request_details_page.dart';

class AgentRequestsPage extends StatefulWidget {
  const AgentRequestsPage({super.key});

  @override
  State<AgentRequestsPage> createState() => _AgentRequestsPageState();
}

class _AgentRequestsPageState extends State<AgentRequestsPage> {
  String _selectedFilter = 'Tous';

  final List<String> _filters = ['Tous', 'En attente', 'En cours', 'Validées'];

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
              image: AssetImage('assets/images/hero_bg.png'), // Placeholder
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
        child: Column(
          children: [
            
            Expanded(
              child: SingleChildScrollView(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const SizedBox(height: 24),
                    // ── Title
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 20),
                      child: Text(
                        'Mes Demandes Mairie',
                        style: GoogleFonts.outfit(
                          fontSize: 22,
                          fontWeight: FontWeight.w800,
                          color: AppColors.textDark,
                        ),
                      ),
                    ),
                    const SizedBox(height: 16),
                    
                    // ── Search Bar
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 20),
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 16),
                        height: 48,
                        decoration: BoxDecoration(
                          color: AppColors.sectionBg.withValues(alpha: 0.7),
                          borderRadius: BorderRadius.circular(999),
                        ),
                        child: Row(
                          children: [
                            const Icon(Icons.search_rounded, color: AppColors.textLight, size: 20),
                            const SizedBox(width: 10),
                            Expanded(
                              child: TextField(
                                style: GoogleFonts.outfit(
                                  fontSize: 14,
                                  color: AppColors.textDark,
                                  fontWeight: FontWeight.w500,
                                ),
                                decoration: InputDecoration(
                                  hintText: 'Rechercher par nom, réf ou type...',
                                  hintStyle: GoogleFonts.outfit(
                                    fontSize: 14,
                                    color: AppColors.textLight,
                                    fontWeight: FontWeight.w500,
                                  ),
                                  border: InputBorder.none,
                                  contentPadding: const EdgeInsets.symmetric(vertical: 14),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(height: 20),
                    
                    // ── Filters
                    SizedBox(
                      height: 36,
                      child: ListView.separated(
                        padding: const EdgeInsets.symmetric(horizontal: 20),
                        scrollDirection: Axis.horizontal,
                        itemCount: _filters.length,
                        separatorBuilder: (context, index) => const SizedBox(width: 10),
                        itemBuilder: (context, index) {
                          final filter = _filters[index];
                          final isSelected = filter == _selectedFilter;
                          return GestureDetector(
                            onTap: () => setState(() => _selectedFilter = filter),
                            child: AnimatedContainer(
                              duration: const Duration(milliseconds: 200),
                              padding: const EdgeInsets.symmetric(horizontal: 20),
                              alignment: Alignment.center,
                              decoration: BoxDecoration(
                                color: isSelected ? AppColors.primaryDark : AppColors.sectionBg,
                                borderRadius: BorderRadius.circular(999),
                              ),
                              child: Text(
                                filter,
                                style: GoogleFonts.outfit(
                                  fontSize: 13,
                                  fontWeight: isSelected ? FontWeight.w700 : FontWeight.w500,
                                  color: isSelected ? AppColors.white : AppColors.textMedium,
                                ),
                              ),
                            ),
                          );
                        },
                      ),
                    ),
                    const SizedBox(height: 24),
                    
                    // ── Request List
                    const Padding(
                      padding: EdgeInsets.symmetric(horizontal: 20),
                      child: Column(
                        children: [
                          _RequestCard(
                            icon: Icons.description_outlined,
                            title: 'Acte de Naissance',
                            ref: 'Ref: CDB-2026-001234',
                            status: 'Validée',
                            statusColor: Colors.green,
                            statusBgColor: Color(0xFFDCFCE7),
                            user: 'Jean-Baptiste OUÉDRAOGO',
                            date: '12/10/2026',
                          ),
                          SizedBox(height: 16),
                          _RequestCard(
                            icon: Icons.fingerprint_rounded,
                            title: 'Certificat de Résidence',
                            ref: 'Ref: CDB-2026-001255',
                            status: 'En attente',
                            statusColor: Color(0xFFB45309), // Dark orange/brown
                            statusBgColor: Color(0xFFFEF3C7), // Light amber
                            user: 'Mariam SANKARA',
                            date: '15/10/2026',
                          ),
                          SizedBox(height: 16),
                          _RequestCard(
                            icon: Icons.receipt_long_outlined,
                            title: 'Acte de Mariage',
                            ref: 'Ref: CDB-2026-001290',
                            status: 'En cours',
                            statusColor: Color(0xFF1D4ED8), // Blue
                            statusBgColor: Color(0xFFDBEAFE), // Light blue
                            user: 'Idrissa SAWADOGO',
                            date: '16/10/2026',
                          ),
                          SizedBox(height: 16),
                          _RequestCard(
                            icon: Icons.domain_rounded,
                            title: "Permis d'Urb. Sommaire",
                            ref: 'Ref: CDB-2026-001302',
                            status: 'Rejetée',
                            statusColor: Color(0xFFB91C1C), // Red
                            statusBgColor: Color(0xFFFEE2E2), // Light red
                            user: 'Alizèta COMPAORÉ',
                            date: '18/10/2026',
                          ),
                          SizedBox(height: 100), // Spacing for FAB
                        ],
                      ),
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
        backgroundColor: AppColors.primaryDark,
        elevation: 4,
        child: const Icon(Icons.add_rounded, color: AppColors.white, size: 28),
      ),
      bottomNavigationBar: const AgentBottomNav(currentIndex: 1),
    );
  }
}

// ─── REQUEST CARD ───────────────────────────────────────────────────────────
class _RequestCard extends StatelessWidget {
  final IconData icon;
  final String title;
  final String ref;
  final String status;
  final Color statusColor;
  final Color statusBgColor;
  final String user;
  final String date;

  const _RequestCard({
    required this.icon,
    required this.title,
    required this.ref,
    required this.status,
    required this.statusColor,
    required this.statusBgColor,
    required this.user,
    required this.date,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        Navigator.of(context).push(
          MaterialPageRoute(builder: (_) => const AgentRequestDetailsPage()),
        );
      },
      borderRadius: BorderRadius.circular(20),
      child: Container(
        padding: const EdgeInsets.all(18),
        decoration: BoxDecoration(
          color: AppColors.white,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: AppColors.divider, width: 0.5),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  width: 48,
                  height: 48,
                  decoration: BoxDecoration(
                    color: AppColors.sectionBg,
                    borderRadius: BorderRadius.circular(14),
                  ),
                  child: Icon(icon, color: AppColors.primaryDark, size: 22),
                ),
                const SizedBox(width: 14),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        title,
                        style: GoogleFonts.outfit(
                          fontSize: 15,
                          fontWeight: FontWeight.w800,
                          color: AppColors.textDark,
                        ),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        ref,
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
                  padding:
                      const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                  decoration: BoxDecoration(
                    color: statusBgColor,
                    borderRadius: BorderRadius.circular(999),
                  ),
                  child: Text(
                    status,
                    style: GoogleFonts.outfit(
                      fontSize: 10.5,
                      fontWeight: FontWeight.w700,
                      color: statusColor,
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 18),
            Divider(
              color: AppColors.divider.withValues(alpha: 0.5),
              height: 1,
            ),
            const SizedBox(height: 14),
            Row(
              children: [
                const Icon(Icons.person_rounded,
                    size: 16, color: AppColors.textLight),
                const SizedBox(width: 8),
                Text(
                  user,
                  style: GoogleFonts.outfit(
                    fontSize: 13,
                    fontWeight: FontWeight.w500,
                    color: AppColors.textMedium,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Row(
              children: [
                const Icon(Icons.calendar_today_rounded,
                    size: 14, color: AppColors.textLight),
                const SizedBox(width: 10),
                Text(
                  date,
                  style: GoogleFonts.outfit(
                    fontSize: 13,
                    fontWeight: FontWeight.w500,
                    color: AppColors.textMedium,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
