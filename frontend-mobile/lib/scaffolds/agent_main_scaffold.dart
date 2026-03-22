import 'package:flutter/material.dart';
import 'package:egov_mobile/features/notifications/presentation/pages/notifications_page.dart';
import 'package:google_fonts/google_fonts.dart';
import '../core/constants/app_colors.dart';
import '../features/agent/domain/models/agent_config.dart';
import '../features/agent/presentation/pages/agent_dashboard_page.dart';
import '../features/agent/presentation/pages/agent_demandes_page.dart';
import '../features/agent/presentation/pages/agent_profil_page.dart';
import '../features/agent/presentation/pages/agent_documents_page.dart';

class AgentMainScaffold extends StatefulWidget {
  final AgentRole role;
  const AgentMainScaffold({super.key, this.role = AgentRole.justice});

  static const routeName = '/agent-main';

  @override
  State<AgentMainScaffold> createState() => _AgentMainScaffoldState();
}

class _AgentMainScaffoldState extends State<AgentMainScaffold> {
  int _currentIndex = 0;
  List<Widget> _pages = [];

  @override
  void initState() {
    super.initState();
    _initPages();
  }

  @override
  void didUpdateWidget(AgentMainScaffold oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.role != widget.role) {
      _initPages();
    }
  }

  void _initPages() {
    _pages = [
      AgentDashboardPage(
        role: widget.role,
        onSeeAll: () => setState(() => _currentIndex = 1),
        onProfileTap: () => setState(() => _currentIndex = 3),
        onNotificationTap: () => Navigator.push(
          context,
          MaterialPageRoute(builder: (_) => const NotificationsPage(role: 'agent')),
        ),
      ),
      AgentDemandesPage(
        role: widget.role,
        onProfileTap: () => setState(() => _currentIndex = 3),
        onNotificationTap: () => Navigator.push(
          context,
          MaterialPageRoute(builder: (_) => const NotificationsPage(role: 'agent')),
        ),
      ),
      AgentDocumentsPage(
        onProfileTap: () => setState(() => _currentIndex = 3),
        onNotificationTap: () => Navigator.push(
          context,
          MaterialPageRoute(builder: (_) => const NotificationsPage(role: 'agent')),
        ),
      ),
      const AgentProfilPage(),
    ];
  }

  @override
  Widget build(BuildContext context) {
    final config = AgentConfig.getByRole(widget.role);

    return Scaffold(
      body: IndexedStack(
        index: _currentIndex,
        children: _pages,
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (index) => setState(() => _currentIndex = index),
        selectedItemColor: config.primaryColor,
        unselectedItemColor: const Color(0xFF94a3b8),
        selectedLabelStyle: GoogleFonts.publicSans(fontWeight: FontWeight.bold, fontSize: 11),
        unselectedLabelStyle: GoogleFonts.publicSans(fontWeight: FontWeight.w500, fontSize: 11),
        type: BottomNavigationBarType.fixed,
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.dashboard_outlined),
            activeIcon: Icon(Icons.dashboard_rounded),
            label: 'Dashboard',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.folder_open_outlined),
            activeIcon: Icon(Icons.folder_rounded),
            label: 'Demandes',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.description_outlined),
            activeIcon: Icon(Icons.description_rounded),
            label: 'Documents',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person_outline_rounded),
            activeIcon: Icon(Icons.person_rounded),
            label: 'Profil',
          ),
        ],
      ),
    );
  }
}
