/**
 * Created by matthewhounslow on 2016-03-29.
 */
'use strict';

class Lightbox implements ng.IDirective {

  restrict = 'A';
  replace = true;

  constructor() {
  }

  link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ctrl: any) => {
    var blownUp = false;
    var width = attrs.width, height = attrs.height;

    element.parent().on('click.lightbox', clickHandler);
    element.on('dblclick', dblClickHandler);

    function dblClickHandler(){
      toggleAll();
    }

    function clickHandler(){
      if(blownUp){
        blownUp = false;
        blowDown()}
      else {
        blownUp = true;
        blowUp();
      }
    }

    function blowUp(){
      element.css("width", "800px");
      element.css("height", "800px");
    }

    function showingAll(){
      return element.closest("li")[0].classList.contains("show-all");
    }

    function blowDown(){
      element.css("width", width);
      element.css("height", height);
    }

    function toggleAll(show: Boolean){

      if(show == undefined){
        show = !showingAll();
      } else {
        show = show;
      }

      if(show){
        angular.element(element.closest("li")).addClass("show-all");
      } else {
        angular.element(element.closest("li")).removeClass("show-all");
      }
    }
  };

  static factory(): ng.IDirectiveFactory {
    const directive = () => new Lightbox();
    directive.$inject = [];
    return directive;
  }
}

angular.module('teamNameApp')
  .directive('lightbox', Lightbox.factory());
