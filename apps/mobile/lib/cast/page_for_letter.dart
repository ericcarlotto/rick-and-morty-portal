import 'package:mobile/contract/character.dart';
import 'package:mobile/ui/page_window.dart';

int countForLetter(List<CastCharacter> characters, String letter) {
  final index = characters.indexWhere((character) => character.letter == letter);
  if (index < 0) return countUntil(0);
  return countUntil(index);
}

List<String> lettersWithin(List<CastCharacter> characters, int count) {
  final letters = <String>[];
  for (final character in takeCount(characters, count)) {
    collectLetter(letters, character.letter);
  }
  return letters;
}

List<String> lettersKept(List<String> index, List<CastCharacter> characters) {
  final present = <String>{for (final character in characters) character.letter};
  return [for (final letter in index) if (present.contains(letter)) letter];
}

void collectLetter(List<String> letters, String letter) {
  if (letters.contains(letter)) return;
  letters.add(letter);
}
