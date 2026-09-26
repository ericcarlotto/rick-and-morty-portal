enum CharacterStatus {
  vivo('Vivo'),
  morto('Morto'),
  desconhecido('Desconhecido');

  const CharacterStatus(this.label);

  final String label;
}

class CharacterIdentity {
  const CharacterIdentity({required this.id, required this.name});

  final int id;
  final String name;
}

class CharacterProfile {
  const CharacterProfile({required this.species, required this.status});

  final String species;
  final CharacterStatus status;
}

class CharacterPlace {
  const CharacterPlace({required this.origin, required this.letter});

  final String origin;
  final String letter;
}

class CharacterFacts {
  const CharacterFacts({required this.profile, required this.place});

  final CharacterProfile profile;
  final CharacterPlace place;
}

class CastCharacter {
  const CastCharacter({required this.identity, required this.facts});

  final CharacterIdentity identity;
  final CharacterFacts facts;
}

extension CastCharacterFields on CastCharacter {
  int get id => identity.id;

  String get name => identity.name;

  String get species => facts.profile.species;

  CharacterStatus get status => facts.profile.status;

  String get origin => facts.place.origin;

  String get letter => facts.place.letter;
}
