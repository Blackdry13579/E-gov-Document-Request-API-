import 'package:flutter/material.dart';
import 'agent_home_page.dart';
import 'agent_requests_page.dart';
import 'profil_page.dart';
import '../../domain/models/agent_config.dart';

class AgentShell extends StatefulWidget {
  final AgentRole role;
  const AgentShell({super.key, this.role = AgentRole.justice});

  static const routeName = '/agent-shell';

  @override
  State<AgentShell> createState() => _AgentShellState();
}

class _AgentShellState extends State<AgentShell> {
  int _currentIndex = 0;

  late final List<Widget> _pages;

  @override
  void initState() {
    super.initState();
    _pages = [
      AgentHomePage(role: widget.role),
      AgentRequestsPage(role: widget.role),
      const ProfilPage(),
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
        unselectedItemColor: Colors.grey,
        type: BottomNavigationBarType.fixed,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.dashboard_outlined), label: 'Tableau'),
          BottomNavigationBarItem(icon: Icon(Icons.assignment_outlined), label: 'Demandes'),
          BottomNavigationBarItem(icon: Icon(Icons.person_outline), label: 'Profil'),
        ],
      ),
    );
  }
}
