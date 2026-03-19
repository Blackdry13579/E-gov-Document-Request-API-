import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../auth/presentation/pages/citizen_auth_page.dart';
import '../auth/presentation/pages/agent_auth_page.dart';



// ============================================================================
// COULEURS — NE PAS MODIFIER SANS AUTORISATION
// ============================================================================
class AppColors {
  static const Color primaryBlue  = Color(0xFF1A3A5C);
  static const Color darkBlue     = Color(0xFF0D1F35);
  static const Color accentOrange = Color(0xFFE88C2A);
  static const Color white        = Colors.white;
  static const Color lightGray    = Color(0xFFF5F5F7);
  static const Color textGray     = Color(0xFF6B7280);
  static const Color iconBgGray   = Color(0xFFF3F4F6);
  static const Color divider      = Color(0xFFE5E7EB);
}

// ============================================================================
// LANDING PAGE
// ============================================================================
class LandingPage extends StatelessWidget {
  const LandingPage({super.key});

  static const routeName = '/landing';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.white,
      body: SingleChildScrollView(
        child: Column(
          children: [
            _buildAppBar(context),
            _buildHeroSection(),
            _buildCategoriesSection(),
            _buildWhySection(),        // ← CORRIGÉ : blocs verticaux centrés
            _buildCtaSection(context),
            _buildFooter(),
          ],
        ),
      ),
    );
  }

  // ==========================================================================
  // APP BAR
  // ==========================================================================
  Widget _buildAppBar(BuildContext context) {
    return Container(
      color: AppColors.white,
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
      child: SafeArea(
        bottom: false,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
              children: [
                Image.asset(
                  'assets/images/embleme.png',
                  width: 40,
                  height: 40,
                  fit: BoxFit.contain,
                ),
                const SizedBox(width: 10),
                Text(
                  'E-Gov',
                  style: GoogleFonts.poppins(
                    fontSize: 18,
                    fontWeight: FontWeight.w700,
                    color: AppColors.primaryBlue,
                  ),
                ),
              ],
            ),
            GestureDetector(
              onTap: () {
                Navigator.of(context).pushNamed(AgentAuthPage.routeName);
              },
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                decoration: BoxDecoration(
                  color: AppColors.primaryBlue,
                  borderRadius: BorderRadius.circular(999),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const Icon(Icons.badge_outlined, color: Colors.white, size: 14),
                    const SizedBox(width: 6),
                    Text(
                      'ESPACE AGENT',
                      style: GoogleFonts.poppins(
                        fontSize: 11,
                        fontWeight: FontWeight.w800,
                        color: Colors.white,
                        letterSpacing: 0.5,
                      ),
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

  // ==========================================================================
  // HERO SECTION
  // ==========================================================================
  Widget _buildHeroSection() {
    return SizedBox(
      height: 300,
      child: Stack(
        children: [
          // Image de fond
          Positioned.fill(
            child: Image.asset(
              'assets/images/building.png',
              fit: BoxFit.cover,
              errorBuilder: (context, error, stackTrace) {
                return Container(
                  decoration: const BoxDecoration(
                    gradient: LinearGradient(
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                      colors: [Color(0xFF1A5276), Color(0xFF1A3A5C)],
                    ),
                  ),
                );
              },
            ),
          ),
          // Overlay bleu semi-transparent
          Positioned.fill(
            child: Container(
              color: AppColors.primaryBlue.withValues(alpha: 0.65),
            ),
          ),
          // Contenu texte
          Positioned.fill(
            child: SafeArea(
              child: Padding(
                padding: const EdgeInsets.all(24),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    // Badge
                    _buildBadge(),
                    const SizedBox(height: 20),
                    // Titre
                    Text(
                      'Simplifiez vos\ndémarches administratives',
                      style: GoogleFonts.poppins(
                        fontSize: 26,
                        fontWeight: FontWeight.w800,
                        color: AppColors.white,
                        height: 1.2,
                      ),
                    ),
                    const SizedBox(height: 12),
                    // Sous-titre
                    Text(
                      'Accédez aux services de l\'État burkinabè en\nquelques clics, où que vous soyez.',
                      style: GoogleFonts.poppins(
                        fontSize: 13,
                        fontWeight: FontWeight.w400,
                        color: AppColors.white.withValues(alpha: 0.9),
                        height: 1.5,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildBadge() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: AppColors.white.withValues(alpha: 0.18),
        borderRadius: BorderRadius.circular(999),
        border: Border.all(
          color: AppColors.white.withValues(alpha: 0.25),
          width: 1,
        ),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: 6,
            height: 6,
            decoration: const BoxDecoration(
              color: AppColors.accentOrange,
              shape: BoxShape.circle,
            ),
          ),
          const SizedBox(width: 8),
          Text(
            'SERVICES PUBLICS NUMÉRIQUES',
            style: GoogleFonts.poppins(
              fontSize: 10,
              fontWeight: FontWeight.w600,
              color: AppColors.white,
              letterSpacing: 0.5,
            ),
          ),
        ],
      ),
    );
  }

  // ==========================================================================
  // CATÉGORIES DE SERVICES — Grille 2x2
  // ==========================================================================
  Widget _buildCategoriesSection() {
    final categories = [
      _CategoryData(icon: Icons.badge_outlined,         title: 'Identité &\nDocuments',   color: const Color(0xFF3B82F6)),
      _CategoryData(icon: Icons.family_restroom_rounded, title: 'État Civil',              color: const Color(0xFF10B981)),
      _CategoryData(icon: Icons.business_center_rounded, title: 'Entreprises &\nCommerce', color: const Color(0xFFF59E0B)),
      _CategoryData(icon: Icons.school_rounded,          title: 'Éducation &\nExamens',    color: const Color(0xFF8B5CF6)),
    ];

    return Container(
      color: AppColors.lightGray,
      padding: const EdgeInsets.symmetric(vertical: 28, horizontal: 20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Catégories de services',
                style: GoogleFonts.poppins(
                  fontSize: 16,
                  fontWeight: FontWeight.w700,
                  color: AppColors.primaryBlue,
                ),
              ),
              Text(
                'Voir tout',
                style: GoogleFonts.poppins(
                  fontSize: 13,
                  fontWeight: FontWeight.w500,
                  color: AppColors.accentOrange,
                ),
              ),
            ],
          ),
          const SizedBox(height: 20),
          GridView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 2,
              mainAxisSpacing: 16,
              crossAxisSpacing: 16,
              childAspectRatio: 1.3,
            ),
            itemCount: categories.length,
            itemBuilder: (context, index) => _buildCategoryCard(categories[index]),
          ),
        ],
      ),
    );
  }

  Widget _buildCategoryCard(_CategoryData data) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.04),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            width: 48,
            height: 48,
            decoration: BoxDecoration(
              color: data.color.withValues(alpha: 0.15),
              shape: BoxShape.circle,
            ),
            child: Icon(data.icon, color: data.color, size: 24),
          ),
          const SizedBox(height: 12),
          Text(
            data.title,
            textAlign: TextAlign.center,
            style: GoogleFonts.poppins(
              fontSize: 12,
              fontWeight: FontWeight.w600,
              color: AppColors.primaryBlue,
              height: 1.3,
            ),
          ),
        ],
      ),
    );
  }

  // ==========================================================================
  // POURQUOI E-GOV — ✅ CORRIGÉ : blocs verticaux centrés (icône + titre + texte)
  // ==========================================================================
  Widget _buildWhySection() {
    final features = [
      _FeatureData(
        icon: Icons.access_time_rounded,
        title: 'Gain de temps',
        description: 'Plus besoin de vous déplacer pour vos formalités administratives.',
      ),
      _FeatureData(
        icon: Icons.shield_outlined,
        title: 'Sécurité',
        description: 'Vos données personnelles et vos documents officiels sont hautement protégés.',
      ),
      _FeatureData(
        icon: Icons.visibility_outlined,
        title: 'Suivi en temps réel',
        description: 'Consultez l\'état d\'avancement de vos demandes à tout moment depuis votre espace.',
      ),
    ];

    return Container(
      color: AppColors.white,
      padding: const EdgeInsets.symmetric(vertical: 40, horizontal: 20),
      child: Column(
        children: [
          Text(
            'Pourquoi utiliser E-Gov ?',
            textAlign: TextAlign.center,
            style: GoogleFonts.poppins(
              fontSize: 18,
              fontWeight: FontWeight.w700,
              color: AppColors.primaryBlue,
            ),
          ),
          const SizedBox(height: 36),
          // ⚠️ Blocs VERTICAUX centrés (comme dans le design)
          ...features.map((f) => _buildFeatureBlock(f)),
        ],
      ),
    );
  }

  // Bloc vertical : icône (cercle gris) → titre → description
  Widget _buildFeatureBlock(_FeatureData data) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 36),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          // Icône dans un cercle gris clair
          Container(
            width: 64,
            height: 64,
            decoration: const BoxDecoration(
              color: AppColors.iconBgGray,
              shape: BoxShape.circle,
            ),
            child: Icon(
              data.icon,
              color: AppColors.primaryBlue,
              size: 28,
            ),
          ),
          const SizedBox(height: 16),
          // Titre en gras centré
          Text(
            data.title,
            textAlign: TextAlign.center,
            style: GoogleFonts.poppins(
              fontSize: 15,
              fontWeight: FontWeight.w700,
              color: AppColors.primaryBlue,
            ),
          ),
          const SizedBox(height: 8),
          // Description centrée, gris
          Text(
            data.description,
            textAlign: TextAlign.center,
            style: GoogleFonts.poppins(
              fontSize: 13,
              color: AppColors.textGray,
              height: 1.5,
            ),
          ),
        ],
      ),
    );
  }

  // ==========================================================================
  // CTA — Banner bleu foncé arrondi
  // ==========================================================================
  Widget _buildCtaSection(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 20),
      padding: const EdgeInsets.all(28),
      decoration: BoxDecoration(
        color: AppColors.primaryBlue,
        borderRadius: BorderRadius.circular(20),
        // Image de fond optionnelle
        image: const DecorationImage(
          image: AssetImage('assets/images/cta_bg.png'),
          fit: BoxFit.cover,
          opacity: 0.15,
        ),
        boxShadow: [
          BoxShadow(
            color: AppColors.primaryBlue.withValues(alpha: 0.3),
            blurRadius: 15,
            offset: const Offset(0, 8),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Pour tous les Burkinabè',
            style: GoogleFonts.poppins(
              fontSize: 20,
              fontWeight: FontWeight.w700,
              color: AppColors.white,
            ),
          ),
          const SizedBox(height: 10),
          Text(
            'Une administration de proximité, accessible à tous les citoyens, résidents ou de la diaspora.',
            style: GoogleFonts.poppins(
              fontSize: 13,
              color: AppColors.white.withValues(alpha: 0.85),
              height: 1.5,
            ),
          ),
          const SizedBox(height: 24),
          // Bouton "Créer mon compte" — outline blanc arrondi
          OutlinedButton(
            onPressed: () {
              Navigator.of(context).pushNamed(
                CitizenAuthPage.routeName,
                arguments: {'initialIndex': 1},
              );
            },
            style: OutlinedButton.styleFrom(
              foregroundColor: AppColors.white,
              side: const BorderSide(color: AppColors.white, width: 1.5),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(999),
              ),
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
            ),
            child: Text(
              'Créer mon compte',
              style: GoogleFonts.poppins(
                fontSize: 14,
                fontWeight: FontWeight.w700,
              ),
            ),
          ),
        ],
      ),
    );
  }

  // ==========================================================================
  // FOOTER
  // ==========================================================================
  Widget _buildFooter() {
    return Container(
      color: AppColors.darkBlue,
      padding: const EdgeInsets.fromLTRB(20, 32, 20, 28),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Logo + nom
          Row(
            children: [
              Image.asset(
                'assets/images/embleme.png',
                width: 32,
                height: 32,
                fit: BoxFit.contain,
              ),
              const SizedBox(width: 10),
              Text(
                'E-Gov Burkina',
                style: GoogleFonts.poppins(
                  fontSize: 15,
                  fontWeight: FontWeight.w700,
                  color: AppColors.white,
                ),
              ),
            ],
          ),
          const SizedBox(height: 28),
          // Deux colonnes de liens
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'LIENS UTILES',
                      style: GoogleFonts.poppins(
                        fontSize: 10,
                        fontWeight: FontWeight.w600,
                        color: AppColors.accentOrange,
                        letterSpacing: 0.8,
                      ),
                    ),
                    const SizedBox(height: 12),
                    _buildFooterLink('Aide & FAQ'),
                    _buildFooterLink('Annuaire Public'),
                    _buildFooterLink('Open Data'),
                  ],
                ),
              ),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'LÉGAL',
                      style: GoogleFonts.poppins(
                        fontSize: 10,
                        fontWeight: FontWeight.w600,
                        color: AppColors.accentOrange,
                        letterSpacing: 0.8,
                      ),
                    ),
                    const SizedBox(height: 12),
                    _buildFooterLink('Confidentialité'),
                    _buildFooterLink('Mentions légales'),
                    _buildFooterLink('Accessibilité'),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 28),
          Divider(color: AppColors.white.withValues(alpha: 0.1)),
          const SizedBox(height: 16),
          Row(
            children: [
              Expanded(
                child: Text(
                  '© 2025 GOUVERNEMENT DU BURKINA FASO',
                  style: GoogleFonts.poppins(
                    fontSize: 9,
                    color: AppColors.white.withValues(alpha: 0.5),
                  ),
                ),
              ),
              _buildSocialIcon(Icons.facebook_rounded),
              const SizedBox(width: 12),
              _buildSocialIcon(Icons.language_rounded),
              const SizedBox(width: 12),
              _buildSocialIcon(Icons.email_outlined),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildFooterLink(String text) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Text(
        text,
        style: GoogleFonts.poppins(
          fontSize: 12,
          color: AppColors.white.withValues(alpha: 0.7),
        ),
      ),
    );
  }

  Widget _buildSocialIcon(IconData icon) {
    return Container(
      width: 32,
      height: 32,
      decoration: BoxDecoration(
        color: AppColors.white.withValues(alpha: 0.1),
        shape: BoxShape.circle,
      ),
      child: Icon(icon, color: AppColors.white, size: 16),
    );
  }
}

// ============================================================================
// MODÈLES DE DONNÉES
// ============================================================================
class _CategoryData {
  final IconData icon;
  final String title;
  final Color color;
  _CategoryData({required this.icon, required this.title, required this.color});
}

class _FeatureData {
  final IconData icon;
  final String title;
  final String description;
  _FeatureData({required this.icon, required this.title, required this.description});
}
