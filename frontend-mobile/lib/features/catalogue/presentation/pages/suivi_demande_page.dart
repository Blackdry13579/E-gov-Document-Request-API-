import 'package:egov_mobile/features/shared/presentation/widgets/egov_sub_app_bar.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../../../../core/constants/app_colors.dart';
import '../../domain/models/document_model.dart';

/// Placeholder — sera complété avec la page de suivi de demande.
class SuiviDemandePage extends StatelessWidget {
  final DocumentModel document;
  final String reference;

  const SuiviDemandePage({
    super.key,
    required this.document,
    required this.reference,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: const EgovSubAppBar(
        title: 'SERVICES PUBLICS',
        subtitle: 'BURKINA FASO',
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(32),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(Icons.track_changes_rounded,
                  size: 80, color: AppColors.primary.withOpacity(0.3)),
              const SizedBox(height: 24),
              Text(
                'Suivi de Demande',
                textAlign: TextAlign.center,
                style: GoogleFonts.publicSans(
                  color: const Color(0xFF1e293b),
                  fontSize: 22,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 12),
              Text(
                'Le suivi pour la demande "${document.title}" (Réf: $reference) sera disponible prochainement.',
                textAlign: TextAlign.center,
                style: GoogleFonts.publicSans(
                  color: const Color(0xFF64748b),
                  fontSize: 14,
                  height: 1.5,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
