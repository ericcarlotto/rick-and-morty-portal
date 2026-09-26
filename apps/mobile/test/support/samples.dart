import 'package:mobile/contract/cast.dart';
import 'package:mobile/contract/catalog.dart';
import 'package:mobile/contract/census.dart';
import 'package:mobile/contract/character.dart';
import 'package:mobile/contract/episode.dart';

EpisodeSummary episodeOf(int id, String name, String code) {
  return EpisodeSummary(id: id, title: EpisodeTitle(name: name, code: code));
}

final EpisodeSummary pilotEpisode = episodeOf(1, 'Pilot', 'S01E01');
final EpisodeSummary lawnEpisode = episodeOf(2, 'Lawnmower Dog', 'S01E02');
final EpisodeSummary anatomyEpisode = episodeOf(3, 'Anatomy Park', 'S01E03');

class PersonSeed {
  const PersonSeed({
    required this.id,
    required this.name,
    required this.letter,
    this.species = 'Human',
    this.status = CharacterStatus.vivo,
    this.origin = 'Earth',
  });

  final int id;
  final String name;
  final String letter;
  final String species;
  final CharacterStatus status;
  final String origin;
}

CastCharacter person(PersonSeed seed) {
  return CastCharacter(
    identity: CharacterIdentity(id: seed.id, name: seed.name),
    facts: CharacterFacts(
      profile: CharacterProfile(species: seed.species, status: seed.status),
      place: CharacterPlace(origin: seed.origin, letter: seed.letter),
    ),
  );
}

Census counts(List<CensusCount> byStatus, List<CensusCount> bySpecies) {
  return Census(byStatus: byStatus, bySpecies: bySpecies);
}

Cast makeCast(CastSeed seed) {
  return Cast(
    head: CastHead(
      episode: seed.episode,
      neighbors: EpisodeNeighbors(previousEpisode: seed.previousEpisode, nextEpisode: seed.nextEpisode),
    ),
    body: CastBody(index: seed.index, people: CastPeople(characters: seed.characters, census: seed.census)),
  );
}

class CastSeed {
  const CastSeed({
    required this.episode,
    required this.previousEpisode,
    required this.nextEpisode,
    required this.index,
    required this.characters,
    required this.census,
  });

  final EpisodeSummary episode;
  final EpisodeSummary? previousEpisode;
  final EpisodeSummary? nextEpisode;
  final List<String> index;
  final List<CastCharacter> characters;
  final Census census;
}

Cast pilotCast() {
  return makeCast(
    CastSeed(
      episode: pilotEpisode,
      previousEpisode: null,
      nextEpisode: lawnEpisode,
      index: const ['J', 'S'],
      characters: [
        person(const PersonSeed(id: 5, name: 'Jerry Smith', letter: 'J')),
        person(const PersonSeed(id: 3, name: 'Summer Smith', letter: 'S')),
      ],
      census: counts(const [CensusCount(label: 'Vivo', count: 2)], const [CensusCount(label: 'Human', count: 2)]),
    ),
  );
}

Cast lawnCast() {
  return makeCast(
    CastSeed(
      episode: lawnEpisode,
      previousEpisode: pilotEpisode,
      nextEpisode: anatomyEpisode,
      index: const ['A', 'B', 'M', 'R'],
      characters: [
        person(const PersonSeed(id: 7, name: 'Abradolf Lincler', letter: 'A', status: CharacterStatus.morto)),
        person(
          const PersonSeed(
            id: 9,
            name: 'Birdperson',
            letter: 'B',
            species: 'Alien',
            status: CharacterStatus.desconhecido,
            origin: 'Bird World',
          ),
        ),
        person(const PersonSeed(id: 2, name: 'Morty Smith', letter: 'M')),
        person(const PersonSeed(id: 1, name: 'Rick Sanchez', letter: 'R')),
      ],
      census: counts(const [
        CensusCount(label: 'Morto', count: 1),
        CensusCount(label: 'Desconhecido', count: 1),
        CensusCount(label: 'Vivo', count: 2),
      ], const [
        CensusCount(label: 'Human', count: 3),
        CensusCount(label: 'Alien', count: 1),
      ]),
    ),
  );
}

Cast anatomyCast() {
  return makeCast(
    CastSeed(
      episode: anatomyEpisode,
      previousEpisode: lawnEpisode,
      nextEpisode: null,
      index: const ['A'],
      characters: [person(const PersonSeed(id: 11, name: 'Annie', letter: 'A'))],
      census: counts(const [CensusCount(label: 'Vivo', count: 1)], const [CensusCount(label: 'Human', count: 1)]),
    ),
  );
}

Cast castById(int id) {
  if (id == 1) return pilotCast();
  if (id == 2) return lawnCast();
  if (id == 3) return anatomyCast();
  throw Exception('sem episódio');
}

List<EpisodeSummary> filteredEpisodes(CatalogQuery query) {
  return [
    for (final episode in [pilotEpisode, lawnEpisode, anatomyEpisode])
      if (keepsEpisode(episode, query)) episode,
  ];
}

bool keepsEpisode(EpisodeSummary episode, CatalogQuery query) {
  final name = query.name?.toLowerCase();
  final code = query.code?.toLowerCase();
  if (name != null && !episode.name.toLowerCase().contains(name)) return false;
  if (code != null && !episode.code.toLowerCase().contains(code)) return false;
  return true;
}
