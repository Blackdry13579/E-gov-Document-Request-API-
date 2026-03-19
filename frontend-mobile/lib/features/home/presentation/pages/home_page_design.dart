import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../../../requests/presentation/pages/request_tracking_page_new.dart';
import '../../../services/presentation/pages/services_page.dart';
import '../../../shared/presentation/widgets/citizen_bottom_nav.dart';

class HomePageSimple extends StatefulWidget {
  const HomePageSimple({super.key});

  static const routeName = '/home-simple';

  @override
  State<HomePageSimple> createState() => _HomePageSimpleState();
}

class _HomePageSimpleState extends State<HomePageSimple> {
  // ============================================================
  // COULEURS — NE PAS MODIFIER
  // ============================================================
  static const Color primaryBlue    = Color(0xFF1A3C6E);
  static const Color accentYellow   = Color(0xFFF5A623);
  static const Color successGreen   = Color(0xFF27AE60);
  static const Color warningOrange  = Color(0xFFF39C12);
  static const Color errorRed       = Color(0xFFE74C3C);
  static const Color backgroundLight = Color(0xFFF4F6F9);
  static const Color textPrimary    = Color(0xFF1C1C1E);
  static const Color textSecondary  = Color(0xFF8E8E93);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: backgroundLight,

      // ============================================================
      // APP BAR
      // ============================================================
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        titleSpacing: 16,
        title: Row(
          children: [
            // Emblème du Burkina Faso
            Image.asset(
              'assets/images/embleme.png',
              width: 40,
              height: 40,
              fit: BoxFit.contain,
            ),
            const SizedBox(width: 8),
            // Texte E-Gov / BURKINA FASO
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  'E-Gov',
                  style: GoogleFonts.inter(
                    fontSize: 16,
                    fontWeight: FontWeight.w700,
                    color: textPrimary,
                  ),
                ),
                Text(
                  'BURKINA FASO',
                  style: GoogleFonts.inter(
                    fontSize: 10,
                    fontWeight: FontWeight.w600,
                    color: accentYellow,
                    letterSpacing: 0.5,
                  ),
                ),
              ],
            ),
            const Spacer(),
            // Cloche avec point rouge
            Stack(
              clipBehavior: Clip.none,
              children: [
                Container(
                  width: 40,
                  height: 40,
                  decoration: BoxDecoration(
                    color: Colors.grey.shade100,
                    shape: BoxShape.circle,
                  ),
                  child: const Icon(
                    Icons.notifications_outlined,
                    color: textPrimary,
                    size: 22,
                  ),
                ),
                Positioned(
                  top: 6,
                  right: 6,
                  child: Container(
                    width: 9,
                    height: 9,
                    decoration: BoxDecoration(
                      color: errorRed,
                      shape: BoxShape.circle,
                      border: Border.all(color: Colors.white, width: 1.5),
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(width: 10),
            // Avatar profil
            Container(
              width: 40,
              height: 40,
              decoration: BoxDecoration(
                color: Colors.grey.shade300,
                shape: BoxShape.circle,
              ),
              child: const Icon(
                Icons.person,
                color: Colors.white,
                size: 22,
              ),
            ),
          ],
        ),
      ),

      // ============================================================
      // BODY
      // ============================================================
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // --------------------------------------------------
            // HERO BANNER avec photo de bâtiment
            // --------------------------------------------------
            _buildHeroBanner(),
            const SizedBox(height: 16),

            // --------------------------------------------------
            // BOUTON NOUVELLE DEMANDE
            // --------------------------------------------------
            _buildNewRequestButton(),
            const SizedBox(height: 24),

            // --------------------------------------------------
            // SERVICES POPULAIRES
            // --------------------------------------------------
            _buildSectionHeader('Services Populaires'),
            const SizedBox(height: 16),
            _buildServicesGrid(),
            const SizedBox(height: 24),

            // --------------------------------------------------
            // DEMANDES RÉCENTES
            // --------------------------------------------------
            _buildSectionHeader('Demandes Récentes', showVoirTout: true),
            const SizedBox(height: 16),
            _buildRequestCard(
              title: 'Acte de Naissance',
              reference: 'CDB-2026-004521',
              date: 'Effectué le 12 Mai 2026',
              statusText: 'VALIDÉE',
              statusColor: successGreen,
              actionLabel: 'Détails',
              actionIcon: Icons.open_in_new_rounded,
            ),
            _buildRequestCard(
              title: 'Renouvellement CNI',
              reference: 'CDB-2026-008912',
              date: 'Effectué le 18 Mai 2026',
              statusText: 'EN COURS',
              statusColor: warningOrange,
              actionLabel: 'Suivre',
              actionIcon: Icons.history_rounded,
            ),
            _buildRequestCard(
              title: 'Casier Judiciaire',
              reference: 'CDB-2026-003301',
              date: 'Effectué le 05 Mai 2026',
              statusText: 'REJETÉE',
              statusColor: errorRed,
              actionLabel: 'Motif',
              actionIcon: Icons.info_outline_rounded,
            ),
            const SizedBox(height: 24),
          ],
        ),
      ),

      // ============================================================
      // BOTTOM NAV
      // ============================================================
      bottomNavigationBar: const CitizenBottomNav(currentIndex: 0),
    );
  }

  // ============================================================
  // HERO BANNER
  // Card arrondie avec photo de bâtiment + texte de bienvenue
  // ============================================================
  Widget _buildHeroBanner() {
    return Container(
      width: double.infinity,
      height: 180,
      margin: const EdgeInsets.fromLTRB(16, 16, 16, 0),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        color: primaryBlue, // fallback si image absente
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(20),
        child: Stack(
          fit: StackFit.expand,
          children: [
            // Photo de bâtiment
            Image.asset(
              'assets/images/building.png',
              fit: BoxFit.cover,
              errorBuilder: (_, __, ___) => Container(
                decoration: const BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                    colors: [Color(0xFF1A7FA8), Color(0xFF1A3C6E)],
                  ),
                ),
              ),
            ),
            // Overlay dégradé sombre en bas pour lisibilité du texte
            Positioned.fill(
              child: DecoratedBox(
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    colors: [
                      Colors.transparent,
                      Colors.black.withValues(alpha: 0.65),
                    ],
                    stops: const [0.3, 1.0],
                  ),
                ),
              ),
            ),
            // Texte de bienvenue en bas à gauche
            Positioned(
              bottom: 20,
              left: 20,
              right: 20,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Bienvenue sur votre portail',
                    style: GoogleFonts.inter(
                      fontSize: 13,
                      fontWeight: FontWeight.w400,
                      color: Colors.white.withValues(alpha: 0.85),
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    'Bonjour, Ibrahim 👋',
                    style: GoogleFonts.inter(
                      fontSize: 22,
                      fontWeight: FontWeight.w700,
                      color: Colors.white,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  // ============================================================
  // BOUTON NOUVELLE DEMANDE
  // Pleine largeur, bleu foncé, icône + flèche
  // ============================================================
  Widget _buildNewRequestButton() {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16),
      width: double.infinity,
      height: 56,
      child: ElevatedButton(
        onPressed: () {
          Navigator.of(context).pushNamed(ServicesPage.routeName);
        },
        style: ElevatedButton.styleFrom(
          backgroundColor: primaryBlue,
          foregroundColor: Colors.white,
          elevation: 0,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(14),
          ),
          padding: EdgeInsets.zero,
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.add_circle_outline, size: 20),
            const SizedBox(width: 10),
            Text(
              'NOUVELLE DEMANDE',
              style: GoogleFonts.inter(
                fontSize: 14,
                fontWeight: FontWeight.w700,
                letterSpacing: 1.2,
              ),
            ),
            const SizedBox(width: 8),
            const Icon(Icons.arrow_forward_ios_rounded, size: 14),
          ],
        ),
      ),
    );
  }

  // ============================================================
  // EN-TÊTE DE SECTION (barre jaune + titre + "Voir tout" optionnel)
  // ============================================================
  Widget _buildSectionHeader(String title, {bool showVoirTout = false}) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Row(
        children: [
          // Barre jaune verticale
          Container(
            width: 4,
            height: 20,
            decoration: BoxDecoration(
              color: accentYellow,
              borderRadius: BorderRadius.circular(2),
            ),
          ),
          const SizedBox(width: 10),
          Text(
            title,
            style: GoogleFonts.inter(
              fontSize: 16,
              fontWeight: FontWeight.w700,
              color: textPrimary,
            ),
          ),
          if (showVoirTout) ...[
            const Spacer(),
            GestureDetector(
              onTap: () {
                Navigator.of(context).pushNamed(RequestTrackingPageNew.routeName);
              },
              child: Text(
                'Voir tout',
                style: GoogleFonts.inter(
                  fontSize: 14,
                  fontWeight: FontWeight.w600,
                  color: primaryBlue,
                ),
              ),
            ),
          ],
        ],
      ),
    );
  }

  // ============================================================
  // GRILLE SERVICES POPULAIRES (2 colonnes)
  // ============================================================
  Widget _buildServicesGrid() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Row(
        children: [
          Expanded(child: _buildServiceCard(Icons.account_tree_outlined, 'État Civil')),
          const SizedBox(width: 12),
          Expanded(child: _buildServiceCard(Icons.gavel_rounded, 'Justice')),
        ],
      ),
    );
  }

  Widget _buildServiceCard(IconData icon, String label) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 24, horizontal: 16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.06),
            blurRadius: 10,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            width: 52,
            height: 52,
            decoration: BoxDecoration(
              color: const Color(0xFFF0F2F5),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Icon(icon, color: primaryBlue, size: 26),
          ),
          const SizedBox(height: 12),
          Text(
            label,
            style: GoogleFonts.inter(
              fontSize: 14,
              fontWeight: FontWeight.w500,
              color: textPrimary,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }

  // ============================================================
  // CARTE DE DEMANDE
  // Bordure gauche colorée selon statut — structure correcte
  // ============================================================
  Widget _buildRequestCard({
    required String title,
    required String reference,
    required String date,
    required String statusText,
    required Color statusColor,
    required String actionLabel,
    required IconData actionIcon,
  }) {
    return GestureDetector(
      onTap: () {
        Navigator.of(context).pushNamed(RequestTrackingPageNew.routeName);
      },
      child: Container(
        margin: const EdgeInsets.fromLTRB(16, 0, 16, 12),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(14),
          // ⚠️ Bordure gauche colorée directement sur le container extérieur
          border: Border(
            left: BorderSide(color: statusColor, width: 4),
          ),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.05),
              blurRadius: 10,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Padding(
          padding: const EdgeInsets.fromLTRB(16, 14, 16, 14),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Ligne 1 : Titre + Badge statut
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    title,
                    style: GoogleFonts.inter(
                      fontSize: 15,
                      fontWeight: FontWeight.w600,
                      color: textPrimary,
                    ),
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 10,
                      vertical: 4,
                    ),
                    decoration: BoxDecoration(
                      color: statusColor.withValues(alpha: 0.12),
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Text(
                      statusText,
                      style: GoogleFonts.inter(
                        fontSize: 11,
                        fontWeight: FontWeight.w700,
                        color: statusColor,
                        letterSpacing: 0.4,
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 4),
              // Référence
              Text(
                reference,
                style: GoogleFonts.inter(
                  fontSize: 12,
                  color: textSecondary,
                ),
              ),
              const SizedBox(height: 10),
              // Ligne 2 : Date + Action
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    date,
                    style: GoogleFonts.inter(
                      fontSize: 12,
                      color: textSecondary,
                    ),
                  ),
                  Row(
                    children: [
                      Text(
                        actionLabel,
                        style: GoogleFonts.inter(
                          fontSize: 13,
                          fontWeight: FontWeight.w600,
                          color: primaryBlue,
                        ),
                      ),
                      const SizedBox(width: 4),
                      Icon(actionIcon, size: 14, color: primaryBlue),
                    ],
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
