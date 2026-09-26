import 'package:mobile/contract/character.dart';
import 'package:mobile/contract/parse_guards.dart';

CastCharacter parseCharacter(Object? value) {
  final record = recordOf(value);
  return CastCharacter(identity: parseIdentity(record), facts: parseFacts(record));
}

CharacterIdentity parseIdentity(Map<String, Object?> record) {
  return CharacterIdentity(id: intOf(record['id']), name: textOf(record['name']));
}

CharacterFacts parseFacts(Map<String, Object?> record) {
  return CharacterFacts(profile: parseProfile(record), place: parsePlace(record));
}

CharacterProfile parseProfile(Map<String, Object?> record) {
  return CharacterProfile(species: textOf(record['species']), status: parseStatus(record['status']));
}

CharacterPlace parsePlace(Map<String, Object?> record) {
  return CharacterPlace(origin: textOf(record['origin']), letter: textOf(record['letter']));
}

CharacterStatus parseStatus(Object? value) {
  final label = textOf(value);
  if (label == CharacterStatus.vivo.label) return CharacterStatus.vivo;
  if (label == CharacterStatus.morto.label) return CharacterStatus.morto;
  if (label == CharacterStatus.desconhecido.label) return CharacterStatus.desconhecido;
  throw const FormatException(contractError);
}

List<CastCharacter> parseCharacters(Object? value) {
  if (value is! List) throw const FormatException(contractError);
  return [for (final item in value) parseCharacter(item as Object?)];
}
