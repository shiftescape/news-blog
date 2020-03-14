'use strict';

describe('myApp.createNews module', function() {

  beforeEach(module('myApp.createNews'));

  describe('CreateNews controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var createNewsCtrl = $controller('CreateNewsCtrl');
      expect(createNewsCtrl).toBeDefined();
    }));

  });
});