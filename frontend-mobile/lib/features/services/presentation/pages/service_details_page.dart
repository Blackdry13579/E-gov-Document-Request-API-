import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../../../../core/constants/app_colors.dart';
import '../../../requests/presentation/pages/service_request_flow_page.dart';

class ServiceDetailsPage extends StatefulWidget {
  const ServiceDetailsPage({super.key});

  static const routeName = '/service-details';

  @override
  State<ServiceDetailsPage> createState() => _ServiceDetailsPageState();
}

class _ServiceDetailsPageState extends State<ServiceDetailsPage> {
  final _faqOpen = <int>{};

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Column(
          children: [
            _TopBar(
              title: 'Détails du Service',
              subtitle: 'Portail » SINTA',
              onBack: () => Navigator.of(context).maybePop(),
              onProfile: () {},
            ),
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.fromLTRB(18, 14, 18, 90),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Center(
                      child: Container(
                        width: 70,
                        height: 70,
                        decoration: BoxDecoration(
                          color: AppColors.cardBg,
                          borderRadius: BorderRadius.circular(18),
                          border: Border.all(color: AppColors.divider),
                        ),
                        child: const Icon(
                          Icons.description_outlined,
                          color: AppColors.primary,
                          size: 34,
                        ),
                      ),
                    ),
                    const SizedBox(height: 10),
                    Center(
                      child: Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 10,
                          vertical: 5,
                        ),
                        decoration: BoxDecoration(
                          color: const Color(0xFFDCFCE7),
                          borderRadius: BorderRadius.circular(999),
                        ),
                        child: Text(
                          '100% EN LIGNE',
                          style: GoogleFonts.outfit(
                            fontSize: 10,
                            fontWeight: FontWeight.w900,
                            color: const Color(0xFF166534),
                            letterSpacing: 0.4,
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(height: 10),
                    Center(
                      child: Text(
                        "Extrait d'Acte de Naissance",
                        textAlign: TextAlign.center,
                        style: GoogleFonts.outfit(
                          fontSize: 18,
                          fontWeight: FontWeight.w900,
                          color: AppColors.textDark,
                        ),
                      ),
                    ),
                    const SizedBox(height: 6),
                    Center(
                      child: Text(
                        "Service officiel de délivrance des actes d'état civil de\nla République du Burkina Faso.",
                        textAlign: TextAlign.center,
                        style: GoogleFonts.outfit(
                          fontSize: 11.5,
                          height: 1.45,
                          color: AppColors.textLight,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                    const SizedBox(height: 14),
                    _InfoTilesRow(
                      tiles: const [
                        _InfoTileData(
                          icon: Icons.payments_outlined,
                          value: '500 FCFA',
                          label: 'PRIX',
                        ),
                        _InfoTileData(
                          icon: Icons.schedule_rounded,
                          value: '24h',
                          label: 'DÉLAI',
                        ),
                        _InfoTileData(
                          icon: Icons.picture_as_pdf_outlined,
                          value: 'PDF',
                          label: 'LIVRAISON',
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),
                    _H2('Description'),
                    const SizedBox(height: 8),
                    Text(
                      "Ce service vous permet de demander et de recevoir une\ncopie certifiée conforme de votre acte de naissance de\nmanière totalement dématérialisée. Le document est\nsigné électroniquement et a la même valeur juridique\nque la version papier.",
                      style: GoogleFonts.outfit(
                        fontSize: 11.5,
                        height: 1.55,
                        color: AppColors.textLight,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const SizedBox(height: 16),
                    _H2('Documents Requis'),
                    const SizedBox(height: 10),
                    const _DocChip(
                      text: 'Copie de la CNIB en cours de validité',
                    ),
                    const SizedBox(height: 10),
                    const _DocChip(
                      text: "Scan de l'ancien extrait (si disponible)",
                    ),
                    const SizedBox(height: 18),
                    _H2('Étapes du processus'),
                    const SizedBox(height: 12),
                    const _StepItem(
                      number: 1,
                      title: 'Remplissage du formulaire',
                      subtitle:
                          "Saisissez vos informations personnelles et les détails\nde l'acte.",
                    ),
                    const _StepItem(
                      number: 2,
                      title: 'Paiement sécurisé',
                      subtitle:
                          'Réglez les frais via Orange Money, Moov Money ou\nCarte Bancaire.',
                    ),
                    const _StepItem(
                      number: 3,
                      title: 'Validation administrative',
                      subtitle:
                          "Traitement de votre demande par les services de l'état\ncivil.",
                    ),
                    const _StepItem(
                      number: 4,
                      title: 'Téléchargement',
                      subtitle:
                          'Récupérez votre document signé au format PDF dans\nvotre espace.',
                      isLast: true,
                    ),
                    const SizedBox(height: 18),
                    _H2('FAQ'),
                    const SizedBox(height: 10),
                    _FaqItem(
                      title: "Le document PDF est-il officiel ?",
                      open: _faqOpen.contains(0),
                      onTap: () => _toggleFaq(0),
                    ),
                    _FaqItem(
                      title: 'Puis-je payer en espèces ?',
                      open: _faqOpen.contains(1),
                      onTap: () => _toggleFaq(1),
                    ),
                    _FaqItem(
                      title: "Quels sont les délais en cas d'urgence ?",
                      open: _faqOpen.contains(2),
                      onTap: () => _toggleFaq(2),
                      isLast: true,
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: SafeArea(
        top: false,
        child: Padding(
          padding: const EdgeInsets.fromLTRB(18, 10, 18, 12),
          child: SizedBox(
            height: 54,
            width: double.infinity,
            child: ElevatedButton.icon(
              onPressed: () {
                Navigator.of(context).push(
                  MaterialPageRoute(
                    builder: (_) => const ServiceRequestFlowPage(),
                  ),
                );
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.primary,
                foregroundColor: AppColors.white,
                elevation: 10,
                shadowColor: AppColors.primary.withValues(alpha: 0.35),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(14),
                ),
              ),
              icon: const Icon(Icons.edit_document, size: 18),
              label: Text(
                'COMMENCER LA DEMANDE',
                style: GoogleFonts.outfit(
                  fontWeight: FontWeight.w900,
                  letterSpacing: 0.7,
                  fontSize: 12,
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  void _toggleFaq(int idx) {
    setState(() {
      if (_faqOpen.contains(idx)) {
        _faqOpen.remove(idx);
      } else {
        _faqOpen.add(idx);
      }
    });
  }
}

class _TopBar extends StatelessWidget {
  final String title;
  final String subtitle;
  final VoidCallback onBack;
  final VoidCallback onProfile;

  const _TopBar({
    required this.title,
    required this.subtitle,
    required this.onBack,
    required this.onProfile,
  });

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
                color: AppColors.primary,
                size: 18,
              ),
            ),
          ),
          const SizedBox(width: 8),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: GoogleFonts.outfit(
                    fontSize: 14,
                    fontWeight: FontWeight.w900,
                    color: AppColors.textDark,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  subtitle,
                  style: GoogleFonts.outfit(
                    fontSize: 10.5,
                    fontWeight: FontWeight.w700,
                    color: AppColors.textLight,
                  ),
                ),
              ],
            ),
          ),
          InkWell(
            onTap: onProfile,
            borderRadius: BorderRadius.circular(999),
            child: Container(
              width: 38,
              height: 38,
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
      ),
    );
  }
}

class _H2 extends StatelessWidget {
  final String text;
  const _H2(this.text);

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      style: GoogleFonts.outfit(
        fontSize: 13,
        fontWeight: FontWeight.w900,
        color: AppColors.textDark,
      ),
    );
  }
}

class _InfoTileData {
  final IconData icon;
  final String value;
  final String label;
  const _InfoTileData({
    required this.icon,
    required this.value,
    required this.label,
  });
}

class _InfoTilesRow extends StatelessWidget {
  final List<_InfoTileData> tiles;
  const _InfoTilesRow({required this.tiles});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        for (int i = 0; i < tiles.length; i++) ...[
          Expanded(child: _InfoTile(tile: tiles[i])),
          if (i != tiles.length - 1) const SizedBox(width: 10),
        ],
      ],
    );
  }
}

class _InfoTile extends StatelessWidget {
  final _InfoTileData tile;
  const _InfoTile({required this.tile});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 72,
      decoration: BoxDecoration(
        color: AppColors.cardBg,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: AppColors.divider),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(tile.icon, color: AppColors.primary, size: 20),
          const SizedBox(height: 6),
          Text(
            tile.value,
            style: GoogleFonts.outfit(
              fontSize: 12,
              fontWeight: FontWeight.w900,
              color: AppColors.textDark,
            ),
          ),
          const SizedBox(height: 2),
          Text(
            tile.label,
            style: GoogleFonts.outfit(
              fontSize: 9,
              fontWeight: FontWeight.w900,
              color: AppColors.textLight,
              letterSpacing: 0.6,
            ),
          ),
        ],
      ),
    );
  }
}

class _DocChip extends StatelessWidget {
  final String text;
  const _DocChip({required this.text});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      decoration: BoxDecoration(
        color: AppColors.cardBg,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppColors.divider),
      ),
      child: Row(
        children: [
          Container(
            width: 18,
            height: 18,
            decoration: const BoxDecoration(
              color: AppColors.primary,
              shape: BoxShape.circle,
            ),
            child: const Icon(Icons.check, size: 12, color: AppColors.white),
          ),
          const SizedBox(width: 10),
          Expanded(
            child: Text(
              text,
              style: GoogleFonts.outfit(
                fontSize: 11.5,
                fontWeight: FontWeight.w700,
                color: AppColors.textDark,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _StepItem extends StatelessWidget {
  final int number;
  final String title;
  final String subtitle;
  final bool isLast;

  const _StepItem({
    required this.number,
    required this.title,
    required this.subtitle,
    this.isLast = false,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 14),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Column(
            children: [
              Container(
                width: 26,
                height: 26,
                decoration: const BoxDecoration(
                  color: AppColors.primary,
                  shape: BoxShape.circle,
                ),
                alignment: Alignment.center,
                child: Text(
                  '$number',
                  style: GoogleFonts.outfit(
                    fontSize: 12,
                    fontWeight: FontWeight.w900,
                    color: AppColors.white,
                  ),
                ),
              ),
              if (!isLast)
                Container(
                  width: 2,
                  height: 38,
                  margin: const EdgeInsets.only(top: 6),
                  color: AppColors.divider,
                ),
            ],
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Padding(
              padding: const EdgeInsets.only(top: 1),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: GoogleFonts.outfit(
                      fontSize: 12,
                      fontWeight: FontWeight.w900,
                      color: AppColors.textDark,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    subtitle,
                    style: GoogleFonts.outfit(
                      fontSize: 11.2,
                      height: 1.45,
                      fontWeight: FontWeight.w600,
                      color: AppColors.textLight,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _FaqItem extends StatelessWidget {
  final String title;
  final bool open;
  final VoidCallback onTap;
  final bool isLast;

  const _FaqItem({
    required this.title,
    required this.open,
    required this.onTap,
    this.isLast = false,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 14),
        decoration: BoxDecoration(
          border: Border(
            bottom: BorderSide(
              color: isLast ? Colors.transparent : AppColors.divider,
            ),
          ),
        ),
        child: Row(
          children: [
            Expanded(
              child: Text(
                title,
                style: GoogleFonts.outfit(
                  fontSize: 11.8,
                  fontWeight: FontWeight.w700,
                  color: AppColors.textDark,
                ),
              ),
            ),
            Icon(
              open ? Icons.expand_less_rounded : Icons.expand_more_rounded,
              color: AppColors.textLight,
            ),
          ],
        ),
      ),
    );
  }
}

