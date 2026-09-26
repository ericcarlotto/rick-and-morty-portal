import 'package:mobile/contract/character.dart';

class LetterGroup {
  const LetterGroup({required this.letter, required this.characters});

  final String letter;
  final List<CastCharacter> characters;
}

class GroupInput {
  const GroupInput({required this.index, required this.characters});

  final List<String> index;
  final List<CastCharacter> characters;
}

List<LetterGroup> groupByLetter(GroupInput input) {
  return [for (final letter in input.index) groupFor(input.characters, letter)];
}

LetterGroup groupFor(List<CastCharacter> characters, String letter) {
  return LetterGroup(letter: letter, characters: matching(characters, letter));
}

List<CastCharacter> matching(List<CastCharacter> characters, String letter) {
  return [for (final character in characters) if (character.letter == letter) character];
}
