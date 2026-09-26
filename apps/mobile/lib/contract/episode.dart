class EpisodeTitle {
  const EpisodeTitle({required this.name, required this.code});

  final String name;
  final String code;
}

class EpisodeSummary {
  const EpisodeSummary({required this.id, required this.title});

  final int id;
  final EpisodeTitle title;
}

extension EpisodeFields on EpisodeSummary {
  String get name => title.name;

  String get code => title.code;
}
