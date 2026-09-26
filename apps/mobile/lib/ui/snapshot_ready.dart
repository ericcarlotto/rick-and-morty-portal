import 'package:flutter/widgets.dart';

bool snapshotIsReady<T>(AsyncSnapshot<T> snapshot) {
  return snapshot.connectionState == ConnectionState.done;
}
