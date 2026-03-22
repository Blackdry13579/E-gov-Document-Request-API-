class ServiceDocuments {
  static bool isAdmin(String service) {
    final s = service.toLowerCase();
    return s == 'admin' || s == 'direction' || s == 'mairie centrale';
  }
}
