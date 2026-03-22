import 'package:egov_mobile/features/shared/presentation/widgets/egov_sub_app_bar.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../../../../core/constants/app_colors.dart';
import '../../domain/models/document_model.dart';
import 'formulaire_etape1_page.dart';

class DetailDocumentPage extends StatefulWidget {
  final DocumentModel document;

  const DetailDocumentPage({super.key, required this.document});

  @override
  State<DetailDocumentPage> createState() => _DetailDocumentPageState();
}

class _DetailDocumentPageState extends State<DetailDocumentPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: const EgovSubAppBar(
        title: 'Détails du Service',
        subtitle: 'Portail e-SINTA',
      ),
      body: Stack(
        children: [
          SingleChildScrollView(
            padding: const EdgeInsets.only(bottom: 100),
            child: Column(
              children: [
                _buildHeroSection(),
                _buildInfoCards(),
                _buildDescription(),
                _buildDocumentsRequis(),
                _buildEtapesProcessus(),
                _buildFAQ(),
              ],
            ),
          ),
          Positioned(
            bottom: 0,
            left: 0,
            right: 0,
            child: _buildBottomButton(),
          ),
        ],
      ),
    );
  }

  // ──────────────────────────────────────────────────────────────────
  // HERO
  // ──────────────────────────────────────────────────────────────────
  Widget _buildHeroSection() {
    return Center(
      child: Column(
        children: [
          const SizedBox(height: 24),
          Container(
            width: 100,
            height: 100,
            decoration: BoxDecoration(
              color: AppColors.primary.withOpacity(0.08),
              borderRadius: BorderRadius.circular(20),
            ),
            child: Icon(
              widget.document.icon,
              color: AppColors.primary,
              size: 52,
            ),
          ),
          const SizedBox(height: 16),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
            decoration: BoxDecoration(
              color: const Color(0xFFdcfce7),
              borderRadius: BorderRadius.circular(20),
            ),
            child: Text(
              '100% EN LIGNE',
              style: GoogleFonts.publicSans(
                color: const Color(0xFF16a34a),
                fontSize: 11,
                fontWeight: FontWeight.bold,
                letterSpacing: 1.0,
              ),
            ),
          ),
          const SizedBox(height: 12),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 24),
            child: Text(
              widget.document.title,
              textAlign: TextAlign.center,
              style: GoogleFonts.publicSans(
                color: const Color(0xFF1e293b),
                fontSize: 22,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
          const SizedBox(height: 8),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 32),
            child: Text(
              widget.document.longDescription.isNotEmpty
                  ? widget.document.longDescription
                  : 'Service officiel de délivrance des actes administratifs de la République du Burkina Faso.',
              textAlign: TextAlign.center,
              style: GoogleFonts.publicSans(
                color: const Color(0xFF64748b),
                fontSize: 13,
                height: 1.5,
              ),
            ),
          ),
          const SizedBox(height: 24),
        ],
      ),
    );
  }

  // ──────────────────────────────────────────────────────────────────
  // INFO CARDS
  // ──────────────────────────────────────────────────────────────────
  Widget _buildInfoCards() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Row(
        children: [
          _buildInfoCard(
            icon: Icons.payments_outlined,
            value: widget.document.price,
            label: 'PRIX',
          ),
          const SizedBox(width: 10),
          _buildInfoCard(
            icon: Icons.schedule_rounded,
            value: widget.document.delay,
            label: 'DÉLAI',
          ),
          const SizedBox(width: 10),
          _buildInfoCard(
            icon: Icons.picture_as_pdf_rounded,
            value: 'PDF',
            label: 'LIVRAISON',
          ),
        ],
      ),
    );
  }

  Widget _buildInfoCard({
    required IconData icon,
    required String value,
    required String label,
  }) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 8),
        decoration: BoxDecoration(
          border: Border.all(color: const Color(0xFFe2e8f0)),
          borderRadius: BorderRadius.circular(10),
        ),
        child: Column(
          children: [
            Icon(icon, color: AppColors.primary, size: 22),
            const SizedBox(height: 6),
            Text(
              value,
              style: GoogleFonts.publicSans(
                color: const Color(0xFF1e293b),
                fontSize: 13,
                fontWeight: FontWeight.bold,
              ),
              textAlign: TextAlign.center,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
            ),
            Text(
              label,
              style: GoogleFonts.publicSans(
                color: const Color(0xFF94a3b8),
                fontSize: 10,
                letterSpacing: 0.5,
              ),
            ),
          ],
        ),
      ),
    );
  }

  // ──────────────────────────────────────────────────────────────────
  // DESCRIPTION
  // ──────────────────────────────────────────────────────────────────
  Widget _buildDescription() {
    return Padding(
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Description',
            style: GoogleFonts.publicSans(
              color: const Color(0xFF1e293b),
              fontSize: 17,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 10),
          Text(
            widget.document.description,
            style: GoogleFonts.publicSans(
              color: const Color(0xFF64748b),
              fontSize: 13,
              height: 1.6,
            ),
          ),
        ],
      ),
    );
  }

  // ──────────────────────────────────────────────────────────────────
  // DOCUMENTS REQUIS
  // ──────────────────────────────────────────────────────────────────
  Widget _buildDocumentsRequis() {
    final docs = widget.document.requiredDocs.isNotEmpty
        ? widget.document.requiredDocs
        : [
            'Photo d\'identité récente',
            'Copie de la CNIB en cours de validité',
            'Timbre fiscal',
          ];

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Documents Requis',
            style: GoogleFonts.publicSans(
              color: const Color(0xFF1e293b),
              fontSize: 17,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 12),
          ...docs.map(
            (doc) => Container(
              margin: const EdgeInsets.only(bottom: 8),
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
              decoration: BoxDecoration(
                color: const Color(0xFFf8fafc),
                borderRadius: BorderRadius.circular(10),
                border: Border.all(color: const Color(0xFFe2e8f0)),
              ),
              child: Row(
                children: [
                  const Icon(Icons.check_circle_rounded,
                      color: AppColors.primary, size: 20),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Text(
                      doc,
                      style: GoogleFonts.publicSans(
                        color: const Color(0xFF475569),
                        fontSize: 13,
                      ),
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

  // ──────────────────────────────────────────────────────────────────
  // ÉTAPES DU PROCESSUS
  // ──────────────────────────────────────────────────────────────────
  Widget _buildEtapesProcessus() {
    final steps = [
      {
        'title': 'Remplissage du formulaire',
        'desc':
            'Saisissez vos informations personnelles et les détails de l\'acte.',
      },
      {
        'title': 'Paiement sécurisé',
        'desc':
            'Réglez les frais via Orange Money, Moov Money ou Carte Bancaire.',
      },
      {
        'title': 'Validation administrative',
        'desc':
            'Traitement de votre demande par les services de l\'état civil.',
      },
      {
        'title': 'Téléchargement',
        'desc':
            'Récupérez votre document signé au format PDF dans votre espace.',
      },
    ];

    return Padding(
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Étapes du processus',
            style: GoogleFonts.publicSans(
              color: const Color(0xFF1e293b),
              fontSize: 17,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 16),
          ...List.generate(steps.length, (i) {
            return Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Column(
                  children: [
                    Container(
                      width: 32,
                      height: 32,
                      decoration: const BoxDecoration(
                        color: AppColors.primary,
                        shape: BoxShape.circle,
                      ),
                      child: Center(
                        child: Text(
                          '${i + 1}',
                          style: GoogleFonts.publicSans(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                            fontSize: 14,
                          ),
                        ),
                      ),
                    ),
                    if (i < steps.length - 1)
                      Container(
                        width: 2,
                        height: 40,
                        color: const Color(0xFFe2e8f0),
                      ),
                  ],
                ),
                const SizedBox(width: 14),
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.only(bottom: 24),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          steps[i]['title']!,
                          style: GoogleFonts.publicSans(
                            color: const Color(0xFF1e293b),
                            fontSize: 14,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          steps[i]['desc']!,
                          style: GoogleFonts.publicSans(
                            color: const Color(0xFF64748b),
                            fontSize: 12,
                            height: 1.5,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            );
          }),
        ],
      ),
    );
  }

  // ──────────────────────────────────────────────────────────────────
  // FAQ
  // ──────────────────────────────────────────────────────────────────
  Widget _buildFAQ() {
    final faqs = widget.document.faqItems.isNotEmpty
        ? widget.document.faqItems
        : [
            {
              'question': 'Le document PDF est-il officiel ?',
              'answer':
                  'Oui, le document est signé électroniquement et a la même valeur juridique que la version papier.',
            },
            {
              'question': 'Puis-je payer en espèces ?',
              'answer':
                  'Non, le paiement se fait uniquement via Mobile Money ou carte bancaire.',
            },
            {
              'question': 'Quels sont les délais en cas d\'urgence ?',
              'answer':
                  'En cas d\'urgence, contactez directement le service concerné pour un traitement prioritaire.',
            },
          ];

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'FAQ',
            style: GoogleFonts.publicSans(
              color: const Color(0xFF1e293b),
              fontSize: 17,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 12),
          ...faqs.map((faq) => _buildFaqItem(faq)),
          const SizedBox(height: 16),
        ],
      ),
    );
  }

  Widget _buildFaqItem(Map<String, String> faq) {
    return Container(
      decoration: const BoxDecoration(
        border: Border(
          bottom: BorderSide(color: Color(0xFFf0f4f8)),
        ),
      ),
      child: ExpansionTile(
        tilePadding: EdgeInsets.zero,
        title: Text(
          faq['question']!,
          style: GoogleFonts.publicSans(
            color: const Color(0xFF475569),
            fontSize: 14,
            fontWeight: FontWeight.w500,
          ),
        ),
        trailing: const Icon(
          Icons.keyboard_arrow_down_rounded,
          color: Color(0xFF94a3b8),
        ),
        children: [
          Padding(
            padding: const EdgeInsets.only(bottom: 12),
            child: Text(
              faq['answer']!,
              style: GoogleFonts.publicSans(
                color: const Color(0xFF64748b),
                fontSize: 13,
                height: 1.5,
              ),
            ),
          ),
        ],
      ),
    );
  }

  // ──────────────────────────────────────────────────────────────────
  // BOTTOM BUTTON
  // ──────────────────────────────────────────────────────────────────
  Widget _buildBottomButton() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.08),
            blurRadius: 12,
            offset: const Offset(0, -4),
          ),
        ],
      ),
      child: SafeArea(
        top: false,
        child: SizedBox(
          width: double.infinity,
          height: 56,
          child: ElevatedButton.icon(
            onPressed: () => Navigator.push(
              context,
              MaterialPageRoute(
                builder: (_) =>
                    FormulaireEtape1Page(document: widget.document),
              ),
            ),
            style: ElevatedButton.styleFrom(
              backgroundColor: AppColors.primary,
              foregroundColor: Colors.white,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
              elevation: 0,
            ),
            icon: const Icon(Icons.task_alt_rounded, size: 20),
            label: Text(
              'COMMENCER LA DEMANDE',
              style: GoogleFonts.publicSans(
                fontWeight: FontWeight.bold,
                fontSize: 15,
                letterSpacing: 0.8,
              ),
            ),
          ),
        ),
      ),
    );
  }
}
