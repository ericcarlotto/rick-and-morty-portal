import 'package:flutter/material.dart';
import 'package:mobile/contract/character.dart';
import 'package:mobile/theme/portal_colors.dart';

Color statusColor(CharacterStatus status) {
  if (status == CharacterStatus.vivo) return PortalColors.vivo;
  if (status == CharacterStatus.morto) return PortalColors.morto;
  return PortalColors.desconhecido;
}
