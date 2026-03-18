import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../core/constants/app_colors.dart';
import '../auth/presentation/pages/citizen_auth_page.dart';
import '../auth/presentation/pages/agent_auth_page.dart';

class LandingPage extends StatelessWidget {
  const LandingPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: CustomScrollView(
        slivers: [
          _buildAppBar(context),
          SliverToBoxAdapter(child: _buildHeroSection()),
          SliverToBoxAdapter(child: _buildCategoriesSection()),
          SliverToBoxAdapter(child: _buildWhySection()),
          SliverToBoxAdapter(child: _buildCtaBanner(context)),
          SliverToBoxAdapter(child: _buildFooter()),
        ],
      ),
    );
  }

  // ─── APPBAR ───────────────────────────────────────────────────────────────
  SliverAppBar _buildAppBar(BuildContext context) {
    return SliverAppBar(
      pinned: true,
      backgroundColor: AppColors.cardBg,
      expandedHeight: 0,
      titleSpacing: 16,
      title: Row(
        children: [
          Text(
            'E-GOV',
            style: GoogleFonts.outfit(
              fontSize: 15,
              fontWeight: FontWeight.w700,
              color: AppColors.primary,
            ),
          ),
          const SizedBox(width: 4),
          Text(
            'Burkina Faso',
            style: GoogleFonts.outfit(
              fontSize: 10.5,
              color: AppColors.textLight,
              fontWeight: FontWeight.w500,
            ),
          ),
        ],
      ),
      actions: [
        // Espace Agent button
        GestureDetector(
          onTap: () => Navigator.of(context).push(
            MaterialPageRoute(builder: (_) => const AgentAuthPage()),
          ),
          child: Container(
            margin: const EdgeInsets.only(right: 8),
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
            decoration: BoxDecoration(
              color: AppColors.primary.withValues(alpha: 0.10),
              borderRadius: BorderRadius.circular(999),
              border: Border.all(
                color: AppColors.primary.withValues(alpha: 0.25),
              ),
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                const Icon(
                  Icons.badge_outlined,
                  color: AppColors.primary,
                  size: 14,
                ),
                const SizedBox(width: 5),
                Text(
                  'Agents',
                  style: GoogleFonts.outfit(
                    fontSize: 11.5,
                    fontWeight: FontWeight.w700,
                    color: AppColors.primary,
                  ),
                ),
              ],
            ),
          ),
        ),
        const SizedBox(width: 6),
      ],
    );
  }

  // ─── HERO SECTION ─────────────────────────────────────────────────────────
  Widget _buildHeroSection() {
    return SizedBox(
      height: 330,
      child: Stack(
        fit: StackFit.expand,
        children: [
          Image.asset(
            'assets/images/hero_bg.png',
            fit: BoxFit.cover,
          ),
          Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [
                  Colors.black.withValues(alpha: 0.10),
                  Colors.black.withValues(alpha: 0.62),
                ],
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 22, 16, 22),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Align(
                  alignment: Alignment.topCenter,
                  child: Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 12,
                      vertical: 6,
                    ),
                    decoration: BoxDecoration(
                      color: AppColors.white.withValues(alpha: 0.18),
                      borderRadius: BorderRadius.circular(999),
                      border: Border.all(
                        color: AppColors.white.withValues(alpha: 0.25),
                      ),
                    ),
                    child: Text(
                      'SERVICES PUBLICS NUMÉRIQUES',
                      style: GoogleFonts.outfit(
                        fontSize: 10,
                        fontWeight: FontWeight.w700,
                        color: AppColors.white.withValues(alpha: 0.92),
                        letterSpacing: 0.6,
                      ),
                    ),
                  ),
                ),
                const Spacer(),
                Text(
                  'Simplifiez vos\ndémarches\nadministratives',
                  style: GoogleFonts.outfit(
                    fontSize: 30,
                    fontWeight: FontWeight.w700,
                    color: AppColors.white,
                    height: 1.15,
                  ),
                ),
                const SizedBox(height: 10),
                Text(
                  'Accédez aux services de l\'État burkinabè en\nquelques clics, où que vous soyez.',
                  style: GoogleFonts.outfit(
                    fontSize: 12.5,
                    fontWeight: FontWeight.w500,
                    color: AppColors.white.withValues(alpha: 0.85),
                    height: 1.55,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  // ─── CATEGORIES SECTION ───────────────────────────────────────────────────
  Widget _buildCategoriesSection() {
    final categories = [
      _CategoryItem(Icons.badge_outlined, 'Identité &\nDocuments'),
      _CategoryItem(Icons.people_outline, 'État Civil'),
      _CategoryItem(Icons.store_outlined, 'Entreprises &\nCommerce'),
      _CategoryItem(Icons.school_outlined, 'Éducation &\nExamens'),
    ];

    return Container(
      color: AppColors.cardBg,
      padding: const EdgeInsets.symmetric(vertical: 26, horizontal: 20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Catégories de services',
                style: GoogleFonts.outfit(
                  fontSize: 14,
                  fontWeight: FontWeight.w700,
                  color: AppColors.textDark,
                ),
              ),
              Text(
                'Voir tout',
                style: GoogleFonts.outfit(
                  fontSize: 11.5,
                  color: AppColors.primary,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
          const SizedBox(height: 20),
          GridView.count(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            crossAxisCount: 2,
            mainAxisSpacing: 14,
            crossAxisSpacing: 14,
            childAspectRatio: 1.6,
            children: categories.map((c) => _buildCategoryCard(c)).toList(),
          ),
        ],
      ),
    );
  }

  Widget _buildCategoryCard(_CategoryItem item) {
    return DecoratedBox(
      decoration: BoxDecoration(
        color: AppColors.cardBg,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppColors.divider),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.03),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: InkWell(
        borderRadius: BorderRadius.circular(12),
        onTap: () {},
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 14),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(item.icon, color: AppColors.primary, size: 22),
              const SizedBox(height: 10),
              Text(
                item.label,
                textAlign: TextAlign.center,
                style: GoogleFonts.outfit(
                  fontSize: 11.5,
                  fontWeight: FontWeight.w600,
                  color: AppColors.textDark,
                  height: 1.25,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  // ─── WHY SECTION ──────────────────────────────────────────────────────────
  Widget _buildWhySection() {
    final features = [
      _FeatureItem(
        Icons.access_time_rounded,
        'Gain de temps',
        'Plus besoin de vous déplacer pour vos formalités administratives.',
      ),
      _FeatureItem(
        Icons.shield_outlined,
        'Sécurité',
        'Vos données personnelles et vos documents officiels sont hautement protégés.',
      ),
      _FeatureItem(
        Icons.remove_red_eye_outlined,
        'Suivi en temps réel',
        'Consultez l\'état d\'avancement de vos demandes à tout moment depuis votre espace.',
      ),
    ];

    return Container(
      color: AppColors.background,
      padding: const EdgeInsets.symmetric(vertical: 32, horizontal: 20),
      child: Column(
        children: [
          Text(
            'Pourquoi utiliser E-Gov ?',
            textAlign: TextAlign.center,
            style: GoogleFonts.outfit(
              fontSize: 15,
              fontWeight: FontWeight.w700,
              color: AppColors.textDark,
            ),
          ),
          const SizedBox(height: 24),
          ...features.map((f) => _buildFeatureItem(f)),
        ],
      ),
    );
  }

  Widget _buildFeatureItem(_FeatureItem item) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 32),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Container(
            width: 52,
            height: 52,
            decoration: BoxDecoration(
              color: AppColors.sectionBg,
              shape: BoxShape.circle,
            ),
            child: Icon(item.icon, color: AppColors.primary, size: 24),
          ),
          const SizedBox(height: 14),
          Text(
            item.title,
            textAlign: TextAlign.center,
            style: GoogleFonts.outfit(
              fontSize: 13,
              fontWeight: FontWeight.w700,
              color: AppColors.textDark,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            item.description,
            textAlign: TextAlign.center,
            style: GoogleFonts.outfit(
              fontSize: 11.5,
              color: AppColors.textLight,
              height: 1.55,
            ),
          ),
        ],
      ),
    );
  }


  // ─── CTA BANNER ───────────────────────────────────────────────────────────
  Widget _buildCtaBanner(BuildContext context) {
    return Container(
      color: AppColors.background,
      padding: const EdgeInsets.fromLTRB(16, 8, 16, 18),
      child: Container(
        width: double.infinity,
        padding: const EdgeInsets.fromLTRB(18, 18, 18, 18),
        decoration: BoxDecoration(
          color: AppColors.primary,
          borderRadius: BorderRadius.circular(14),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Pour tous les Burkinabè',
              style: GoogleFonts.outfit(
                fontSize: 16,
                fontWeight: FontWeight.w700,
                color: AppColors.white,
                height: 1.2,
              ),
            ),
            const SizedBox(height: 10),
            Text(
              'Une administration de proximité, accessible à\ntous les citoyens, résidents et de la diaspora.',
              style: GoogleFonts.outfit(
                fontSize: 11.5,
                color: AppColors.white.withValues(alpha: 0.85),
                height: 1.6,
              ),
            ),
            const SizedBox(height: 14),
            OutlinedButton(
              onPressed: () {
                Navigator.of(context).push(
                  MaterialPageRoute(
                    builder: (_) => const CitizenAuthPage(),
                  ),
                );
              },
              style: OutlinedButton.styleFrom(
                backgroundColor: AppColors.cardBg,
                foregroundColor: AppColors.textDark,
                side: const BorderSide(color: AppColors.cardBg),
                padding: const EdgeInsets.symmetric(
                  horizontal: 14,
                  vertical: 10,
                ),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(999),
                ),
              ),
              child: Text(
                'Créer mon compte',
                style: GoogleFonts.outfit(
                  fontWeight: FontWeight.w700,
                  fontSize: 12,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  // ─── FOOTER ───────────────────────────────────────────────────────────────
  Widget _buildFooter() {
    return Container(
      color: AppColors.footerBg,
      padding: const EdgeInsets.fromLTRB(20, 28, 20, 20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Logo row
          Row(
            children: [
              Container(
                width: 32,
                height: 32,
                decoration: BoxDecoration(
                  color: AppColors.accent,
                  borderRadius: BorderRadius.circular(6),
                ),
                child: const Icon(
                  Icons.account_balance_rounded,
                  color: AppColors.textDark,
                  size: 18,
                ),
              ),
              const SizedBox(width: 10),
              Text(
                'E-Gov Burkina',
                style: GoogleFonts.outfit(
                  fontSize: 15,
                  fontWeight: FontWeight.w700,
                  color: AppColors.white,
                ),
              ),
            ],
          ),
          const SizedBox(height: 24),
          // Link columns
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'LIENS UTILES',
                      style: GoogleFonts.outfit(
                        fontSize: 10,
                        fontWeight: FontWeight.w700,
                        color: AppColors.white.withValues(alpha: 0.55),
                        letterSpacing: 0.8,
                      ),
                    ),
                    const SizedBox(height: 12),
                    _footerLink('Aide & FAQ'),
                    _footerLink('Annuaire Public'),
                    _footerLink('Open Data'),
                  ],
                ),
              ),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'LÉGAL',
                      style: GoogleFonts.outfit(
                        fontSize: 10,
                        fontWeight: FontWeight.w700,
                        color: AppColors.white.withValues(alpha: 0.55),
                        letterSpacing: 0.8,
                      ),
                    ),
                    const SizedBox(height: 12),
                    _footerLink('Confidentialité'),
                    _footerLink('Mentions légales'),
                    _footerLink('Accessibilité'),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 24),
          Divider(color: AppColors.white.withValues(alpha: 0.12)),
          const SizedBox(height: 14),
          Row(
            children: [
              Expanded(
                child: Text(
                  '© 2024 E-GOV BURKINA | BURKINA FASO',
                  style: GoogleFonts.outfit(
                    fontSize: 9,
                    color: AppColors.white.withValues(alpha: 0.45),
                  ),
                ),
              ),
              _socialIcon(Icons.facebook_rounded),
              const SizedBox(width: 8),
              _socialIcon(Icons.alternate_email_rounded),
              const SizedBox(width: 8),
              _socialIcon(Icons.phone_rounded),
            ],
          ),
        ],
      ),
    );
  }

  Widget _footerLink(String text) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Text(
        text,
        style: GoogleFonts.outfit(
          fontSize: 13,
          color: AppColors.white.withValues(alpha: 0.8),
        ),
      ),
    );
  }

  Widget _socialIcon(IconData icon) {
    return Container(
      width: 28,
      height: 28,
      decoration: BoxDecoration(
        color: AppColors.white.withValues(alpha: 0.1),
        shape: BoxShape.circle,
      ),
      child: Icon(icon, color: AppColors.white, size: 14),
    );
  }
}

// ─── DATA MODELS ─────────────────────────────────────────────────────────────
class _CategoryItem {
  final IconData icon;
  final String label;
  const _CategoryItem(this.icon, this.label);
}

class _FeatureItem {
  final IconData icon;
  final String title;
  final String description;
  const _FeatureItem(this.icon, this.title, this.description);
}
