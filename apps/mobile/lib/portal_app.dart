import 'package:flutter/material.dart';
import 'package:mobile/bff/portal_api.dart';
import 'package:mobile/theme/portal_theme.dart';
import 'package:mobile/ui/catalog_page.dart';

class PortalApp extends StatelessWidget {
  const PortalApp({required this.api, super.key});

  final PortalApi api;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Catálogo de episódios',
      debugShowCheckedModeBanner: false,
      theme: portalTheme(),
      home: CatalogPage(scope: CatalogScope(api: api)),
    );
  }
}
