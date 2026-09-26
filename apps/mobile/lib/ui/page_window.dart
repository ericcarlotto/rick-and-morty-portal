const initialCount = 15;
const scrollStep = 5;

int countUntil(int index) {
  if (index < initialCount) return initialCount;
  final extra = index - initialCount + 1;
  return initialCount + ((extra + scrollStep - 1) ~/ scrollStep) * scrollStep;
}

List<T> takeCount<T>(List<T> items, int count) {
  if (count >= items.length) return items;
  return items.sublist(0, count);
}

int grownCount(int shown, int total) {
  final next = shown + scrollStep;
  if (next < total) return next;
  return total;
}

class RevealInput {
  const RevealInput({required this.shown, required this.next, required this.total});

  final int shown;
  final int next;
  final int total;
}

int revealedCount(RevealInput input) {
  final larger = input.shown > input.next ? input.shown : input.next;
  if (larger < input.total) return larger;
  return input.total;
}

bool pageDone(int shown, int total) => shown >= total;
