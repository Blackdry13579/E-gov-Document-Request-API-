import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'core/constants/app_theme.dart';
import 'core/providers/auth_provider.dart';
import 'core/providers/demande_provider.dart';
import 'core/providers/document_provider.dart';
import 'core/providers/request_provider.dart';

import 'features/splash/presentation/pages/splash_page.dart';
import 'features/landing/landing_page.dart';
import 'features/auth/presentation/pages/citizen_auth_page.dart';
import 'features/auth/presentation/pages/agent_auth_page.dart';
import 'features/home/presentation/pages/home_page_design.dart';
import 'features/agent/presentation/pages/agent_home_page.dart';
import 'features/agent/presentation/pages/agent_shell.dart';
import 'features/agent/presentation/pages/detail_demande_page.dart';
import 'features/agent/presentation/pages/validation_succes_page.dart';
import 'features/agent/domain/models/agent_config.dart';
import 'features/requests/presentation/pages/request_tracking_page_new.dart';
import 'features/requests/presentation/pages/payment_confirmation_page.dart';
import 'features/services/presentation/pages/services_page.dart';
import 'features/services/presentation/pages/service_details_page.dart';
import 'features/requests/presentation/pages/service_request_flow_page.dart';
import 'features/notifications/presentation/pages/notifications_page.dart';
import 'features/profile/presentation/pages/profile_page.dart';
import 'features/catalogue/presentation/pages/catalogue_page.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const EGovApp());
}

class EGovApp extends StatelessWidget {
  const EGovApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        ChangeNotifierProvider(create: (_) => DemandeProvider()),
        ChangeNotifierProvider(create: (_) => DocumentProvider()),
        ChangeNotifierProvider(create: (_) => RequestProvider()),
      ],
      child: MaterialApp(
        title: 'E-Gov Burkina',
        debugShowCheckedModeBanner: false,
        theme: AppTheme.lightTheme,
        initialRoute: SplashPage.routeName,
        routes: {
          SplashPage.routeName: (_) => const SplashPage(),
          LandingPage.routeName: (_) => const LandingPage(),
          CitizenAuthPage.routeName: (_) => const CitizenAuthPage(),
          AgentAuthPage.routeName: (_) => const AgentAuthPage(),
          HomePageSimple.routeName: (_) => const HomePageSimple(),
          // Legacy route kept for compatibility if needed, but AgentShell is preferred
          '/agent-dashboard': (_) => const AgentHomePage(role: AgentRole.justice),
          AgentShell.routeName: (_) => const AgentShell(),
          DetailDemandePage.routeName: (_) => const DetailDemandePage(),
          ValidationSuccesPage.routeName: (context) {
            final args = ModalRoute.of(context)!.settings.arguments as Map<String, dynamic>;
            return ValidationSuccesPage(
              reference: args['reference'] as String,
              citoyen: args['citoyen'] as String,
              typeDemande: args['typeDemande'] as String,
            );
          },
          RequestTrackingPageNew.routeName: (_) => const RequestTrackingPageNew(),
          ServicesPage.routeName: (_) => const ServicesPage(),
          ServiceDetailsPage.routeName: (_) => const ServiceDetailsPage(),
          ServiceRequestFlowPage.routeName: (_) => const ServiceRequestFlowPage(),
          NotificationsPage.routeName: (_) => const NotificationsPage(),
          ProfilePage.routeName: (_) => const ProfilePage(),
          CataloguePage.routeName: (_) => const CataloguePage(),
        },
        onGenerateRoute: (settings) {
          if (settings.name == PaymentConfirmationPage.routeName) {
            final args = settings.arguments as Map<String, dynamic>;
            return MaterialPageRoute(
              builder: (_) => PaymentConfirmationPage(
                reference: args['reference'],
                date: args['date'],
                serviceType: args['serviceType'],
              ),
            );
          }
          
          if (settings.name == AgentShell.routeName) {
            final args = settings.arguments as Map<String, dynamic>?;
            final role = args?['role'] as AgentRole? ?? AgentRole.justice;
            return MaterialPageRoute(
              builder: (_) => AgentShell(role: role),
            );
          }
          return null;
        },
      ),
    );
  }
}
