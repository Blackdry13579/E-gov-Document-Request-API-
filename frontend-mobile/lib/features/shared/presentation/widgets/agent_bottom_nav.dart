import 'package:flutter/material.dart';
import 'package:egov_mobile/features/agent/presentation/pages/agent_home_page.dart';
import 'package:egov_mobile/features/agent/presentation/pages/agent_requests_page.dart';
import 'package:egov_mobile/features/agent/domain/models/agent_config.dart';

class AgentBottomNav extends StatefulWidget {
  final int? currentIndex;
  const AgentBottomNav({super.key, this.currentIndex});

  @override
  State<AgentBottomNav> createState() => _AgentBottomNavState();
}

class _AgentBottomNavState extends State<AgentBottomNav> {
  late int _selectedIndex;

  @override
  void initState() {
    super.initState();
    _selectedIndex = widget.currentIndex ?? 0;
  }

  static final List<Widget> _widgetOptions = <Widget>[
    const AgentHomePage(role: AgentRole.justice),
    const AgentRequestsPage(role: AgentRole.justice),
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: _widgetOptions.elementAt(_selectedIndex),
      ),
      bottomNavigationBar: BottomNavigationBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.dashboard),
            label: 'Dashboard',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.list),
            label: 'Requests',
          ),
        ],
        currentIndex: _selectedIndex,
        selectedItemColor: const Color(0xFF1A3C6E),
        onTap: _onItemTapped,
      ),
    );
  }
}
