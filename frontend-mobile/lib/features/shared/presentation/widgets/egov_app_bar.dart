import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class EgovAppBar extends StatelessWidget implements PreferredSizeWidget {
  final String title;
  final Color? backgroundColor;
  final Widget? leading;
  final List<Widget>? actions;
  final bool automaticallyImplyLeading;
  final Color? titleColor;

  const EgovAppBar({
    super.key,
    this.title = 'E-Gov Burkina',
    this.backgroundColor,
    this.leading,
    this.actions,
    this.automaticallyImplyLeading = true,
    this.titleColor,
  });

  @override
  Widget build(BuildContext context) {
    return AppBar(
      title: Text(
        title,
        style: GoogleFonts.inter(
          fontWeight: FontWeight.bold,
          fontSize: 18,
          color: titleColor ?? const Color(0xFF1A1A2E),
        ),
      ),
      backgroundColor: backgroundColor ?? Colors.white,
      leading: leading,
      actions: actions,
      automaticallyImplyLeading: automaticallyImplyLeading,
      elevation: 0,
      centerTitle: true,
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}
