import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../../../../core/providers/user_management_provider.dart';
import 'package:provider/provider.dart';
import '../../../../core/constants/app_colors.dart';
import 'citizen_model.dart';

class AdminCitizenDetailPage extends StatelessWidget {
  final CitizenData citizen;
  const AdminCitizenDetailPage({super.key, required this.citizen});

  static const routeName = '/admin-citizen-detail';

  @override
  Widget build(BuildContext context) {
    final userProvider = context.watch<UserManagementProvider>();
    // On recherche le citoyen actuel dans le provider de manière sécurisée
    final citizenData = userProvider.citizens.cast<CitizenData?>().firstWhere(
      (c) => c?.id == citizen.id,
      orElse: () => citizen,
    ) ?? citizen;

    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Column(
          children: [
            const _TopBar(),
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.fromLTRB(16, 14, 16, 90),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                   children: [
                    _AvatarHeader(citizen: citizenData),
                    const SizedBox(height: 8),
                    Text(
                      citizenData.name,
                      style: GoogleFonts.outfit(
                        fontSize: 20,
                        fontWeight: FontWeight.w900,
                        color: AppColors.textDark,
                      ),
                    ),
                    const SizedBox(height: 6),
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 12,
                        vertical: 4,
                      ),
                      decoration: BoxDecoration(
                        color: citizenData.statusBg,
                        borderRadius: BorderRadius.circular(999),
                      ),
                      child: Text(
                        citizenData.statusLabel,
                        style: GoogleFonts.outfit(
                          fontSize: 10,
                          fontWeight: FontWeight.w900,
                          color: citizenData.statusColor,
                        ),
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      '${citizenData.city}, Burkina Faso',
                      style: GoogleFonts.outfit(
                        fontSize: 12,
                        fontWeight: FontWeight.w600,
                        color: AppColors.textLight,
                      ),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      'ID SYSTÈME: ${citizenData.id}',
                      style: GoogleFonts.outfit(
                        fontSize: 10,
                        fontWeight: FontWeight.w800,
                        color: AppColors.textLight.withOpacity(0.9),
                      ),
                    ),
                    const SizedBox(height: 22),
                    Align(
                      alignment: Alignment.centerLeft,
                      child: Text(
                        'INFORMATIONS PERSONNELLES',
                        style: GoogleFonts.outfit(
                          fontSize: 11,
                          fontWeight: FontWeight.w900,
                          letterSpacing: 0.7,
                          color: AppColors.textLight.withOpacity(0.9),
                        ),
                      ),
                    ),
                    const SizedBox(height: 10),
                    _InfoCard(citizen: citizenData),
                    const SizedBox(height: 22),
                    Align(
                      alignment: Alignment.centerLeft,
                      child: Row(
                        children: [
                          Text(
                            'HISTORIQUE DES DEMANDES',
                            style: GoogleFonts.outfit(
                              fontSize: 11,
                              fontWeight: FontWeight.w900,
                              letterSpacing: 0.7,
                              color: AppColors.textLight
                                  .withOpacity(0.9),
                            ),
                          ),
                          const Spacer(),
                          Text(
                            'Voir tout',
                            style: GoogleFonts.outfit(
                              fontSize: 11,
                              fontWeight: FontWeight.w700,
                              color: AppColors.primary,
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 10),
                    const _HistoryRow(
                      title: "Extrait d'acte de naissance",
                      statusLabel: 'VALIDÉE',
                      statusColor: Color(0xFF16A34A),
                      statusBg: Color(0xFFDCFCE7),
                      date: 'Dépôt: 12 Oct 2023',
                    ),
                    const SizedBox(height: 8),
                    const _HistoryRow(
                      title: 'Duplicata CNI',
                      statusLabel: 'EN ATTENTE',
                      statusColor: Color(0xFFF97316),
                      statusBg: Color(0xFFFFEDD5),
                      date: 'Dépôt: 05 Nov 2023',
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: _buildActionArea(context, citizenData),
    );
  }

  Widget _buildActionArea(BuildContext context, CitizenData currentCitizen) {
    return SafeArea(
      top: false,
      child: Padding(
        padding: const EdgeInsets.fromLTRB(16, 8, 16, 12),
        child: Row(
          children: _getActions(context, currentCitizen),
        ),
      ),
    );
  }

  List<Widget> _getActions(BuildContext context, CitizenData currentCitizen) {
    final provider = context.read<UserManagementProvider>();

    if (currentCitizen.status == 'EN_ATTENTE') {
      return [
        Expanded(
          child: _SecondaryButton(
            label: 'Rejeter',
            icon: Icons.close_rounded,
            color: const Color(0xFFEF4444),
            onTap: () {
              provider.updateCitizenStatus(currentCitizen.id, 'REJETE');
            },
          ),
        ),
        const SizedBox(width: 10),
        Expanded(
          child: _PrimaryButton(
            label: 'Valider l\'accès',
            icon: Icons.check_rounded,
            onTap: () {
              provider.updateCitizenStatus(currentCitizen.id, 'VALIDE');
            },
          ),
        ),
      ];
    } else if (currentCitizen.status == 'BLOQUE') {
      return [
        Expanded(
          child: _PrimaryButton(
            label: 'Débloquer le compte',
            icon: Icons.lock_open_rounded,
            onTap: () {
              provider.updateCitizenStatus(currentCitizen.id, 'VALIDE');
            },
          ),
        ),
      ];
    } else if (currentCitizen.status == 'VALIDE') {
      return [
        Expanded(
          child: _SecondaryButton(
            label: 'Contacter',
            icon: Icons.mail_outline_rounded,
            onTap: () {},
          ),
        ),
        const SizedBox(width: 10),
        Expanded(
          child: _SecondaryButton(
            label: 'Bloquer',
            icon: Icons.block_flipped,
            color: const Color(0xFF1E293B),
            onTap: () {
              provider.updateCitizenStatus(currentCitizen.id, 'BLOQUE');
            },
          ),
        ),
      ];
    } else {
      // Statut REJETE ou autre
      return [
        Expanded(
          child: _SecondaryButton(
            label: 'Retour',
            icon: Icons.arrow_back,
            onTap: () => Navigator.pop(context),
          ),
        ),
      ];
    }
  }
}

class _TopBar extends StatelessWidget {
  const _TopBar();

  @override
  Widget build(BuildContext context) {
    return Container(
      color: AppColors.cardBg,
      padding: const EdgeInsets.fromLTRB(12, 10, 12, 10),
      child: Row(
        children: [
          InkWell(
            onTap: () => Navigator.of(context).maybePop(),
            borderRadius: BorderRadius.circular(999),
            child: const SizedBox(
              width: 40,
              height: 40,
              child: Icon(
                Icons.arrow_back_ios_new_rounded,
                size: 18,
                color: AppColors.primary,
              ),
            ),
          ),
          const SizedBox(width: 8),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Détail Citoyen',
                style: GoogleFonts.outfit(
                  fontSize: 13,
                  fontWeight: FontWeight.w900,
                  color: AppColors.textDark,
                ),
              ),
              Text(
                'PORTAIL ADMIN',
                style: GoogleFonts.outfit(
                  fontSize: 10,
                  fontWeight: FontWeight.w700,
                  color: AppColors.textLight,
                ),
              ),
            ],
          ),
          const Spacer(),
          Container(
            width: 32,
            height: 32,
            decoration: BoxDecoration(
              color: AppColors.sectionBg,
              shape: BoxShape.circle,
              border: Border.all(color: AppColors.divider),
            ),
            child: const Icon(Icons.account_balance_rounded,
                color: AppColors.primary, size: 18),
          ),
        ],
      ),
    );
  }
}

class _AvatarHeader extends StatelessWidget {
  final CitizenData citizen;
  const _AvatarHeader({required this.citizen});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 10),
      child: Stack(
        children: [
          Container(
            width: 96,
            height: 96,
            decoration: const BoxDecoration(
              shape: BoxShape.circle,
              color: AppColors.sectionBg,
            ),
            child: Icon(
              Icons.person,
              size: 52,
              color: citizen.status == 'VALIDE' ? AppColors.primary : AppColors.textLight,
            ),
          ),
          if (citizen.status == 'VALIDE')
            Positioned(
              right: 4,
              bottom: 4,
              child: Container(
                width: 22,
                height: 22,
                decoration: const BoxDecoration(
                  color: Color(0xFF22C55E),
                  shape: BoxShape.circle,
                ),
                child: const Icon(Icons.check_rounded,
                    size: 16, color: AppColors.white),
              ),
            ),
        ],
      ),
    );
  }
}

class _InfoCard extends StatelessWidget {
  final CitizenData citizen;
  const _InfoCard({required this.citizen});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.fromLTRB(16, 16, 16, 16),
      decoration: BoxDecoration(
        color: AppColors.cardBg,
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: AppColors.divider),
      ),
      child: Column(
        children: [
          _InfoRow(
            icon: Icons.badge_outlined,
            label: 'CNIB',
            value: citizen.cnib,
          ),
          const SizedBox(height: 10),
          _InfoRow(
            icon: Icons.phone_outlined,
            label: 'Téléphone',
            value: citizen.phone,
          ),
          const SizedBox(height: 10),
          _InfoRow(
            icon: Icons.mail_outline_rounded,
            label: 'Email',
            value: citizen.email,
          ),
          const SizedBox(height: 10),
          _InfoRow(
            icon: Icons.cake_outlined,
            label: 'Date de naissance',
            value: citizen.birthDate,
          ),
          const SizedBox(height: 10),
          _InfoRow(
            icon: Icons.location_on_outlined,
            label: 'Adresse',
            value: citizen.address,
          ),
        ],
      ),
    );
  }
}

class _InfoRow extends StatelessWidget {
  final IconData icon;
  final String label;
  final String value;

  const _InfoRow({
    required this.icon,
    required this.label,
    required this.value,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Container(
          width: 32,
          height: 32,
          decoration: BoxDecoration(
            color: AppColors.sectionBg,
            borderRadius: BorderRadius.circular(10),
          ),
          child: Icon(icon, color: AppColors.primary, size: 18),
        ),
        const SizedBox(width: 10),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                label,
                style: GoogleFonts.outfit(
                  fontSize: 11,
                  fontWeight: FontWeight.w700,
                  color: AppColors.textLight,
                ),
              ),
              const SizedBox(height: 2),
              Text(
                value,
                style: GoogleFonts.outfit(
                  fontSize: 13,
                  fontWeight: FontWeight.w800,
                  color: AppColors.textDark,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}

class _HistoryRow extends StatelessWidget {
  final String title;
  final String statusLabel;
  final Color statusColor;
  final Color statusBg;
  final String date;

  const _HistoryRow({
    required this.title,
    required this.statusLabel,
    required this.statusColor,
    required this.statusBg,
    required this.date,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.fromLTRB(14, 10, 14, 10),
      decoration: BoxDecoration(
        color: AppColors.cardBg,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: AppColors.divider),
      ),
      child: Row(
        children: [
          Container(
            width: 32,
            height: 32,
            decoration: BoxDecoration(
              color: AppColors.sectionBg,
              borderRadius: BorderRadius.circular(10),
            ),
            child: const Icon(Icons.description_outlined,
                color: AppColors.primary, size: 18),
          ),
          const SizedBox(width: 10),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: GoogleFonts.outfit(
                    fontSize: 13,
                    fontWeight: FontWeight.w800,
                    color: AppColors.textDark,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  date,
                  style: GoogleFonts.outfit(
                    fontSize: 11,
                    fontWeight: FontWeight.w600,
                    color: AppColors.textLight,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(width: 8),
          Container(
            padding:
                const EdgeInsets.symmetric(horizontal: 9, vertical: 4),
            decoration: BoxDecoration(
              color: statusBg,
              borderRadius: BorderRadius.circular(999),
            ),
            child: Text(
              statusLabel,
              style: GoogleFonts.outfit(
                fontSize: 10,
                fontWeight: FontWeight.w800,
                color: statusColor,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _PrimaryButton extends StatelessWidget {
  final String label;
  final IconData icon;
  final VoidCallback onTap;

  const _PrimaryButton({
    required this.label,
    required this.icon,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 52,
      child: ElevatedButton(
        onPressed: onTap,
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.primary,
          foregroundColor: AppColors.white,
          elevation: 10,
          shadowColor: AppColors.primary.withOpacity(0.35),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(999),
          ),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, size: 18),
            const SizedBox(width: 8),
            Text(
              label,
              style: GoogleFonts.outfit(
                fontSize: 13,
                fontWeight: FontWeight.w900,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _SecondaryButton extends StatelessWidget {
  final String label;
  final IconData icon;
  final VoidCallback onTap;
  final Color? color;

  const _SecondaryButton({
    required this.label,
    required this.icon,
    required this.onTap,
    this.color,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 52,
      child: ElevatedButton(
        onPressed: onTap,
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.sectionBg,
          foregroundColor: color ?? AppColors.textDark,
          elevation: 0,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(999),
          ),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, size: 18),
            const SizedBox(width: 8),
            Text(
              label,
              style: GoogleFonts.outfit(
                fontSize: 13,
                fontWeight: FontWeight.w800,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
