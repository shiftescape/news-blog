'use strict';

describe('myApp.news module', function() {

  beforeEach(module('myApp.news'));

  describe('News controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var newsCtrl = $controller('NewsCtrl');
      expect(newsCtrl).toBeDefined();
    }));

  });
});