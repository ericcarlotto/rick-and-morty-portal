import 'package:http/http.dart' as http;

class BffLink {
  const BffLink({required this.origin, required this.client});

  final String origin;
  final http.Client client;
}
