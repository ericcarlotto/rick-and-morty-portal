import 'package:flutter_test/flutter_test.dart';
import 'package:mobile/ui/page_window.dart';

void main() {
  test('abre em quinze e cresce de cinco em cinco', () {
    expect(countUntil(0), 15);
    expect(countUntil(14), 15);
    expect(countUntil(15), 20);
    expect(countUntil(20), 25);
    expect(takeCount([1, 2, 3], 2), [1, 2]);
    expect(takeCount([1], 5), [1]);
    expect(grownCount(15, 22), 20);
    expect(grownCount(20, 22), 22);
    expect(revealedCount(const RevealInput(shown: 15, next: 20, total: 16)), 16);
    expect(pageDone(16, 16), isTrue);
    expect(pageDone(15, 16), isFalse);
  });
}
