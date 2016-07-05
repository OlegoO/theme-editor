;(function() {
  'use strict';

  describe('theme-editor controller', function() {
    var ctrl, scope, httpBackend, settings, presetsData, modelBuilderService;

    beforeEach(module("theme-editor"));

    beforeEach(inject(function ($controller, $rootScope, $httpBackend, defaultSchema, presets, modelBuilder) {
      scope = $rootScope.$new();
      httpBackend = $httpBackend;
      settings = defaultSchema;
      presetsData = presets;
      modelBuilderService = modelBuilder

      ctrl = $controller('EditorCtrl', {
        defaultSchema: settings,
        presets: presetsData,
        modelBuilder: modelBuilderService
      });
    }));

    // it('should load schema', function() {
    //   httpBackend.expect('GET', 'settings_schema.json')
    //     .respond(200, [{id: "test"}]);
    //   httpBackend.expect('GET', 'settings_data.json')
    //     .respond(200, [{id: "test"}]);
    //   httpBackend.flush();
    //
    //   var data = ctrl.settings;
    //   expect(data).toBeDefined();
    //   expect(data[0].test).toEqual('test');
    // });

    it('should replace spaces in pane name', function() {
      expect(ctrl.convertName("home la la")).toBe("home-la-la");
    });

  });

})();
