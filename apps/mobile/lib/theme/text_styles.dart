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
  return linkStyle().copyWith(foregroundColor: const WidgetStatePropertyAll(PortalColors.indigo));
}

ButtonStyle filterStyle() {
  return FilledButton.styleFrom(
    backgroundColor: PortalColors.tinta,
    foregroundColor: PortalColors.papel,
    minimumSize: const Size(48, 48),
    tapTargetSize: MaterialTapTargetSize.padded,
    textStyle: bodyStyle().copyWith(color: PortalColors.papel),
  );
}

InputDecoration fieldDecoration(String label) {
  return InputDecoration(
    labelText: label,
    labelStyle: bodyStyle(),
    floatingLabelStyle: bodyStyle(),
    constraints: const BoxConstraints(minHeight: 48),
    enabledBorder: const OutlineInputBorder(borderSide: BorderSide(color: PortalColors.tinta)),
    focusedBorder: const OutlineInputBorder(borderSide: BorderSide(color: PortalColors.indigo, width: 2)),
  );
}
