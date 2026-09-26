import 'package:mobile/contract/character.dart';

List<CastCharacter> keepReceivedOrder(List<CastCharacter> characters) {
  return List<CastCharacter>.from(characters);
}

List<String> indexAsReceived(List<String> index) {
  return List<String>.from(index);
}

int compareIndexLetters(String left, String right) {
  return foldLetter(left).compareTo(foldLetter(right));
}

String foldLetter(String letter) => letter.toLowerCase();
