describe('clinical:hl7-resources-endpoint', function () {
  var server = meteor();
  var client = browser(server);

  it('Endpoints should exist on the client', function () {
    return client.execute(function () {
      expect(Endpoints).to.exist;
    });
  });

  it('Endpoints should exist on the server', function () {
    return server.execute(function () {
      expect(Endpoints).to.exist;
    });
  });

});
