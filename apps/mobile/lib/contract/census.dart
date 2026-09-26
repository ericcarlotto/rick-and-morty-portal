class CensusCount {
  const CensusCount({required this.label, required this.count});

  final String label;
  final int count;
}

class Census {
  const Census({required this.byStatus, required this.bySpecies});

  final List<CensusCount> byStatus;
  final List<CensusCount> bySpecies;
}
