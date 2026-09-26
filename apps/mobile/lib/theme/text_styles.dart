import 'package:flutter/material.dart';
import 'package:mobile/theme/portal_colors.dart';

TextStyle bodyStyle() {
  return const TextStyle(
    color: PortalColors.tinta,
    fontFamily: 'Atkinson Hyperlegible',
    fontSize: 16,
    height: 1.4,
  );
}

TextStyle titleStyle() {
  return const TextStyle(
    color: PortalColors.tinta,
    fontFamily: 'Bricolage Grotesque',
    fontSize: 32,
    height: 1.15,
  );
}

TextStyle chosenStyle() => titleStyle().copyWith(color: PortalColors.indigo);

TextStyle sectionHeading() => titleStyle().copyWith(fontSize: 22);

TextStyle eyebrowStyle() {
  return const TextStyle(
    color: PortalColors.indigo,
    fontFamily: 'IBM Plex Mono',
    fontSize: 12,
    height: 1.2,
    letterSpacing: 1.4,
  );
}

TextStyle codeStyle() {
  return const TextStyle(
    color: PortalColors.tinta,
    fontFamily: 'IBM Plex Mono',
    fontSize: 16,
    height: 1.4,
  );
}

TextStyle indexStyle() {
  return const TextStyle(
    color: PortalColors.indigo,
    fontFamily: 'Bricolage Grotesque',
    fontSize: 22,
    height: 1.2,
  );
}

TextStyle statusStyle(Color color) => bodyStyle().copyWith(color: color);

ButtonStyle linkStyle() {
  return TextButton.styleFrom(
    foregroundColor: PortalColors.tinta,
    minimumSize: const Size(48, 48),
    tapTargetSize: MaterialTapTargetSize.padded,
    alignment: Alignment.centerLeft,
    padding: const EdgeInsets.symmetric(vertical: 4),
    textStyle: bodyStyle(),
  );
}

ButtonStyle indexLinkStyle() {
  return TextButton.styleFrom(
    foregroundColor: PortalColors.indigo,
    minimumSize: const Size(48, 48),
    fixedSize: const Size(48, 48),
    tapTargetSize: MaterialTapTargetSize.shrinkWrap,
    alignment: Alignment.center,
    padding: EdgeInsets.zero,
    textStyle: indexStyle(),
  );
}

InputDecoration fieldDecoration(String label) {
  return InputDecoration(
    labelText: label,
    labelStyle: bodyStyle(),
    floatingLabelStyle: bodyStyle(),
    constraints: const BoxConstraints(minHeight: 52),
    contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 16),
    enabledBorder: const OutlineInputBorder(borderSide: BorderSide(color: PortalColors.linha)),
    focusedBorder: const OutlineInputBorder(borderSide: BorderSide(color: PortalColors.indigo, width: 2)),
  );
}
