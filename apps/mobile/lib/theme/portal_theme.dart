import 'package:flutter/material.dart';
import 'package:mobile/theme/portal_colors.dart';
import 'package:mobile/theme/text_styles.dart';

ThemeData portalTheme() {
  return ThemeData(
    useMaterial3: true,
    scaffoldBackgroundColor: PortalColors.papel,
    canvasColor: PortalColors.papel,
    fontFamily: 'Atkinson Hyperlegible',
    colorScheme: portalScheme(),
    textTheme: TextTheme(bodyMedium: bodyStyle(), titleLarge: titleStyle()),
  );
}

ColorScheme portalScheme() {
  return const ColorScheme.light(
    primary: PortalColors.indigo,
    onPrimary: PortalColors.papel,
    secondary: PortalColors.indigo,
    onSecondary: PortalColors.papel,
    surface: PortalColors.papel,
    onSurface: PortalColors.tinta,
    error: PortalColors.morto,
    onError: PortalColors.papel,
  );
}
