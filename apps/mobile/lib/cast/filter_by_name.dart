import 'package:mobile/contract/character.dart';

List<CastCharacter> filterByName(List<CastCharacter> characters, String name) {
  final query = name.trim().toLowerCase();
  if (query.isEmpty) return characters;
  return [for (final character in characters) if (character.name.toLowerCase().contains(query)) character];
}
