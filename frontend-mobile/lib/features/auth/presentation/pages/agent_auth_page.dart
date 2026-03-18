import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../../../../core/constants/app_colors.dart';
import '../../../home/presentation/pages/agent_home_page.dart';

class AgentAuthPage extends StatefulWidget {
  const AgentAuthPage({super.key});

  static const routeName = '/agent-auth';

  @override
  State<AgentAuthPage> createState() => _AgentAuthPageState();
}

class _AgentAuthPageState extends State<AgentAuthPage> {
  bool _obscurePassword = true;

  final _matriculeCtrl = TextEditingController();
  final _passwordCtrl = TextEditingController();

  @override
  void dispose() {
    _matriculeCtrl.dispose();
    _passwordCtrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Column(
          children: [
_AgentTopBar(onBack: () => Navigator.of(context).maybePop()),
            Expanded(
              child: CustomScrollView(
                slivers: [
SliverToBoxAdapter(child: _AgentHeroHeader()),
                  SliverToBoxAdapter(
                    child: Container(
                      color: AppColors.cardBg,
                      padding: const EdgeInsets.fromLTRB(18, 26, 18, 28),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          // ── Title
                          Text(
                            'Authentification',
                            style: GoogleFonts.outfit(
                              fontSize: 22,
                              fontWeight: FontWeight.w700,
                              color: AppColors.textDark,
                            ),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            'Accédez à votre compte professionnel',
                            style: GoogleFonts.outfit(
                              fontSize: 13,
                              color: AppColors.textLight,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                          const SizedBox(height: 28),

                          // ── Matricule
const _AgentFieldLabel('Identifiant / Matricule'),
                          const SizedBox(height: 8),
                          _AgentInputField(
                            controller: _matriculeCtrl,
                            hintText: 'Ex: 1234567A',
                            prefixIcon: Icons.person_outline_rounded,
                            keyboardType: TextInputType.text,
                          ),
                          const SizedBox(height: 20),

                          // ── Password label + forgot
                          Row(
                            children: [
                              Expanded(
                              child: _AgentFieldLabel('Mot de passe'),
                              ),
                              GestureDetector(
                                onTap: () {},
                                child: Text(
                                  'Mot de passe oublié ?',
                                  style: GoogleFonts.outfit(
                                    fontSize: 12,
                                    fontWeight: FontWeight.w700,
                                    color: AppColors.primary,
                                  ),
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 8),

                          // ── Password field
                          _AgentPasswordInput(
                            controller: _passwordCtrl,
                            obscureText: _obscurePassword,
                            onToggle: () => setState(
                              () => _obscurePassword = !_obscurePassword,
                            ),
                          ),
                          const SizedBox(height: 28),

                          // ── Login button
                          _AgentLoginButton(
                            onTap: () {
                              Navigator.of(context).pushReplacement(
                                MaterialPageRoute(
                                  builder: (_) => const AgentDashboardPage(),
                                ),
                              );
                            },
                          ),

                          const SizedBox(height: 28),

                          // ── Security indicator
const _AgentSecurityBar(),

                          const SizedBox(height: 24),

                          // ── Footer
                          Center(
                            child: Text(
                              'UN SERVICE DU GOUVERNEMENT DU BURKINA FASO',
                              textAlign: TextAlign.center,
                              style: GoogleFonts.outfit(
                                fontSize: 9,
                                letterSpacing: 0.5,
                                color:
                                    AppColors.divider.withValues(alpha: 0.95),
                                fontWeight: FontWeight.w700,
                              ),
                            ),
                          ),
                          const SizedBox(height: 8),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.center,
children: [
                              _FooterTextLink("Conditions d'utilisation"),
                              Container(
                                width: 4,
                                height: 4,
                                margin: const EdgeInsets.symmetric(
                                  horizontal: 10,
                                ),
                                decoration: BoxDecoration(
                                  color:
                                      AppColors.textLight.withValues(alpha: 0.5),
                                  shape: BoxShape.circle,
                                ),
                              ),
                              _FooterTextLink('Confidentialité'),
                            ],
                          ),
                        ],
                      ),
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
}

// ─── TOP BAR ─────────────────────────────────────────────────────────────────
class _AgentTopBar extends StatelessWidget {
  final VoidCallback onBack;
  const _AgentTopBar({required this.onBack});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: AppColors.cardBg,
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
      child: Row(
        children: [
          // Back button
          InkWell(
            onTap: onBack,
            borderRadius: BorderRadius.circular(999),
            child: Container(
              width: 36,
              height: 36,
              decoration: BoxDecoration(
                color: AppColors.sectionBg,
                shape: BoxShape.circle,
                border: Border.all(color: AppColors.divider),
              ),
              child: const Icon(
                Icons.arrow_back_rounded,
                size: 18,
                color: AppColors.primary,
              ),
            ),
          ),
          const SizedBox(width: 12),
          // Logo + title
          Text(
            'E-GOV',
            style: GoogleFonts.outfit(
              fontSize: 16,
              fontWeight: FontWeight.w700,
              color: AppColors.primary,
            ),
          ),
          const SizedBox(width: 4),
          Text(
            'Burkina Faso',
            style: GoogleFonts.outfit(
              fontSize: 11,
              color: AppColors.textLight,
              fontWeight: FontWeight.w500,
            ),
          ),
          const Spacer(),
          // Help button
          InkWell(
            onTap: () {},
            borderRadius: BorderRadius.circular(999),
            child: Container(
              width: 36,
              height: 36,
              decoration: BoxDecoration(
                color: AppColors.sectionBg,
                shape: BoxShape.circle,
                border: Border.all(color: AppColors.divider),
              ),
              child: const Icon(
                Icons.help_outline_rounded,
                size: 18,
                color: AppColors.textLight,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

// ─── HERO HEADER (sans image profil) ─────────────────────────────────────────
class _AgentHeroHeader extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 200,
      child: Stack(
        fit: StackFit.expand,
        children: [
          Image.asset(
            'assets/images/hero_bg.png',
            fit: BoxFit.cover,
          ),
          // Gradient overlay
          Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [
                  Colors.black.withValues(alpha: 0.25),
                  Colors.black.withValues(alpha: 0.65),
                ],
              ),
            ),
          ),
          // Content (NO profile image)
          Padding(
            padding: const EdgeInsets.fromLTRB(18, 18, 18, 20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                // Badge "ESPACE SÉCURISÉ"
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 10,
                    vertical: 4,
                  ),
                  decoration: BoxDecoration(
                    color: AppColors.white.withValues(alpha: 0.18),
                    borderRadius: BorderRadius.circular(999),
                    border: Border.all(
                      color: AppColors.white.withValues(alpha: 0.28),
                    ),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(
                        Icons.lock_outline_rounded,
                        color: AppColors.white.withValues(alpha: 0.9),
                        size: 11,
                      ),
                      const SizedBox(width: 5),
                      Text(
                        'ESPACE SÉCURISÉ',
                        style: GoogleFonts.outfit(
                          fontSize: 10,
                          fontWeight: FontWeight.w700,
                          color: AppColors.white.withValues(alpha: 0.92),
                          letterSpacing: 0.6,
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 10),
                Text(
                  'Espace Agent',
                  style: GoogleFonts.outfit(
                    fontSize: 26,
                    fontWeight: FontWeight.w700,
                    color: AppColors.white,
                    height: 1.15,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  "Portail sécurisé des agents de l'État",
                  style: GoogleFonts.outfit(
                    fontSize: 12.5,
                    fontWeight: FontWeight.w500,
                    color: AppColors.white.withValues(alpha: 0.85),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

// ─── FIELD LABEL ─────────────────────────────────────────────────────────────
class _AgentFieldLabel extends StatelessWidget {
  final String text;
  const _AgentFieldLabel(this.text);

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Icon(
          text.contains('Identifiant')
              ? Icons.person_outline_rounded
              : Icons.lock_outline_rounded,
          size: 15,
          color: AppColors.primary,
        ),
        const SizedBox(width: 6),
        Text(
          text,
          style: GoogleFonts.outfit(
            fontSize: 13,
            fontWeight: FontWeight.w600,
            color: AppColors.textDark,
          ),
        ),
      ],
    );
  }
}

// ─── INPUT FIELD ─────────────────────────────────────────────────────────────
class _AgentInputField extends StatelessWidget {
  final TextEditingController controller;
  final String hintText;
  final IconData prefixIcon;
  final TextInputType? keyboardType;

  const _AgentInputField({
    required this.controller,
    required this.hintText,
    required this.prefixIcon,
    this.keyboardType,
  });

  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: controller,
      keyboardType: keyboardType,
      style: GoogleFonts.outfit(
        fontSize: 13,
        color: AppColors.textDark,
        fontWeight: FontWeight.w500,
      ),
      decoration: InputDecoration(
        hintText: hintText,
        hintStyle: GoogleFonts.outfit(
          fontSize: 13,
          color: AppColors.textLight,
          fontWeight: FontWeight.w500,
        ),
        filled: true,
        fillColor: AppColors.background,
        contentPadding:
            const EdgeInsets.symmetric(horizontal: 18, vertical: 16),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide:
              BorderSide(color: AppColors.divider.withValues(alpha: 0.9)),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: const BorderSide(color: AppColors.primary, width: 1.5),
        ),
      ),
    );
  }
}

// ─── PASSWORD INPUT ───────────────────────────────────────────────────────────
class _AgentPasswordInput extends StatelessWidget {
  final TextEditingController controller;
  final bool obscureText;
  final VoidCallback onToggle;

  const _AgentPasswordInput({
    required this.controller,
    required this.obscureText,
    required this.onToggle,
  });

  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: controller,
      obscureText: obscureText,
      style: GoogleFonts.outfit(
        fontSize: 13,
        color: AppColors.textDark,
        fontWeight: FontWeight.w500,
      ),
      decoration: InputDecoration(
        hintText: '••••••••',
        hintStyle: GoogleFonts.outfit(
          fontSize: 13,
          color: AppColors.textLight,
          fontWeight: FontWeight.w500,
        ),
        filled: true,
        fillColor: AppColors.background,
        contentPadding:
            const EdgeInsets.symmetric(horizontal: 18, vertical: 16),
        suffixIcon: IconButton(
          onPressed: onToggle,
          icon: Icon(
            obscureText
                ? Icons.visibility_outlined
                : Icons.visibility_off_outlined,
            size: 20,
            color: AppColors.textLight,
          ),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide:
              BorderSide(color: AppColors.divider.withValues(alpha: 0.9)),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide: const BorderSide(color: AppColors.primary, width: 1.5),
        ),
      ),
    );
  }
}

// ─── LOGIN BUTTON ─────────────────────────────────────────────────────────────
class _AgentLoginButton extends StatelessWidget {
  final VoidCallback onTap;
  const _AgentLoginButton({required this.onTap});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      height: 54,
      child: ElevatedButton(
        onPressed: onTap,
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.primary,
          foregroundColor: AppColors.white,
          elevation: 8,
          shadowColor: AppColors.primary.withValues(alpha: 0.35),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              'Se connecter',
              style: GoogleFonts.outfit(
                fontWeight: FontWeight.w700,
                fontSize: 15,
              ),
            ),
            const SizedBox(width: 10),
            const Icon(Icons.login_rounded, size: 20),
          ],
        ),
      ),
    );
  }
}

// ─── SECURITY BAR ─────────────────────────────────────────────────────────────
class _AgentSecurityBar extends StatelessWidget {
  const _AgentSecurityBar();

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: ClipRRect(
            borderRadius: BorderRadius.circular(999),
            child: SizedBox(
              height: 5,
              child: LinearProgressIndicator(
                value: 1,
                backgroundColor: AppColors.divider,
                valueColor: AlwaysStoppedAnimation(Colors.red.shade400),
              ),
            ),
          ),
        ),
        const SizedBox(width: 6),
        Expanded(
          child: ClipRRect(
            borderRadius: BorderRadius.circular(999),
            child: SizedBox(
              height: 5,
              child: LinearProgressIndicator(
                value: 1,
                backgroundColor: AppColors.divider,
                valueColor: AlwaysStoppedAnimation(Colors.orange.shade400),
              ),
            ),
          ),
        ),
        const SizedBox(width: 6),
        Expanded(
          child: ClipRRect(
            borderRadius: BorderRadius.circular(999),
            child: SizedBox(
              height: 5,
              child: LinearProgressIndicator(
                value: 1,
                backgroundColor: AppColors.divider,
                valueColor: AlwaysStoppedAnimation(Colors.green.shade500),
              ),
            ),
          ),
        ),
      ],
    );
  }
}

// ─── FOOTER TEXT LINK ─────────────────────────────────────────────────────────
class _FooterTextLink extends StatelessWidget {
  final String text;
  const _FooterTextLink(this.text);

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      style: GoogleFonts.outfit(
        fontSize: 11,
        color: AppColors.textLight,
        fontWeight: FontWeight.w500,
      ),
    );
  }
}
