(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global["super-simple-modals"] = factory());
})(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  /**
  * Super Simple Modal Class.
  */
  var SuperSimpleModal = /*#__PURE__*/function () {
    function SuperSimpleModal() {
      _classCallCheck(this, SuperSimpleModal);
    }

    _createClass(SuperSimpleModal, [{
      key: "remove",
      value:
      /**
      * Remove the modal & apply focus to the original button.
      * @param {*} initiatorButton The div clicked to open the modal.
      */
      function remove() {
        var initiatorButton = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var modal = document.getElementById('preview-modal');

        if (modal) {
          modal.remove();
        }

        if (initiatorButton) {
          initiatorButton.focus();
        }
      }
      /**
      * Create a modal & display it on screen.
      * @param {array} paramList An array of parameters that output a modal. 
      */

    }, {
      key: "generate",
      value: function generate(_ref) {
        var _this = this;

        var _ref$title = _ref.title,
            title = _ref$title === void 0 ? '' : _ref$title,
            _ref$description = _ref.description,
            description = _ref$description === void 0 ? '' : _ref$description,
            _ref$removeText = _ref.removeText,
            removeText = _ref$removeText === void 0 ? 'Cancel' : _ref$removeText,
            _ref$addText = _ref.addText,
            addText = _ref$addText === void 0 ? '' : _ref$addText,
            _ref$mainContent = _ref.mainContent,
            mainContent = _ref$mainContent === void 0 ? '' : _ref$mainContent,
            callback = _ref.callback,
            _ref$params = _ref.params,
            params = _ref$params === void 0 ? {} : _ref$params,
            initiatorButton = _ref.initiatorButton;
        // If the user submits main content then wrap it in a div.
        var postContent = mainContent ? "<div id=\"content\" class=\"modal__content\">".concat(mainContent, "</div>") : ''; // Base modal markup.

        var modal = "\n\t\t<div role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"modal-title\" id=\"preview-modal\" class=\"modal\">\n\t\t\t<div class=\"modal__container\">\n\t\t\t\t<h3 id=\"modal-title\">".concat(title, "</h3>\n\t\t\t\t").concat(description ? "<p>".concat(description, "</p>") : '', "\n\t\t\n\t\t\t\t").concat(postContent, "\n\t\t\n\t\t\t\t<div class=\"modal-buttons is-flex\">\n\t\t\t\t\t<button id=\"preview-modal__close\" aria-label=\"Close\" class=\"btn btn--preview\">").concat(removeText, "</button>\n\t\t\t\t\t<button id=\"preview-modal__do_it\" class=\"btn btn--fill\">").concat(addText, "</button>\n\t\t\t\t</div>\t\t\n\t\t\t</div>\n\t\t</div>"); // Append the modal to the DOM.

        document.body.insertAdjacentHTML('beforeend', modal); // Initiate focus trap.

        this.initiateFocusTrap('preview-modal'); // Focus the close button on modal open.

        document.getElementById('preview-modal__close').focus(); // Add the cancel modal open action.

        document.getElementById('preview-modal__close').addEventListener('click', function () {
          return _this.remove(initiatorButton);
        }); // Remove the modal if they click the grey area.

        document.getElementById('preview-modal').addEventListener('click', function (e) {
          if ('preview-modal' === e.target.getAttribute('id')) {
            _this.remove(initiatorButton);
          }
        });
        /**
        * When the user clicks escape remove the modal.
        * TODO: Fix this, keypress is detected but not for the escape key,
        * think it's blocked by another script.
        */

        document.body.addEventListener('keydown', function (e) {
          var event = e || window.event;

          if ('key' in event ? event.key === 'Escape' || event.key === 'Esc' : event.keyCode === 27) {
            _this.remove(initiatorButton);
          }
        }); // Add the continue with this action callback.

        document.getElementById('preview-modal__do_it').addEventListener('click', function () {
          callback(params);
        });
      }
      /**
      * Creates a focus trap so the user can't tab the rest of the page while the modal is open.
      * @param {*} parentId The DOM ID of the div you wish to trap focus within.
      */

    }, {
      key: "initiateFocusTrap",
      value: function initiateFocusTrap(parentId) {
        // Query select the modal.
        var parentContainer = document.querySelector('#' + parentId); // Get all of the child items that can be tabbed to.

        var selectableItems = parentContainer.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'); // The first & last item in the list so we can skip to them at the start/end of the trap.

        var firstFocusableEl = selectableItems[0];
        var lastFocusableEl = selectableItems[selectableItems.length - 1]; // Add a keydown event listener to the modal.

        parentContainer.addEventListener('keydown', function (e) {
          // If the user clicks the tab key.
          if (e.key === 'Tab' || e.keyCode === 9) {
            // If the user clicks shift + tab (go to the previous tab item)
            if (e.shiftKey) {
              // If first item, and the user wants to go back select the last item in the trap.
              if (document.activeElement === firstFocusableEl) {
                lastFocusableEl.focus();
                e.preventDefault();
              }
            } else {
              // We're at the last item, select the first item in the trap.
              if (document.activeElement === lastFocusableEl) {
                firstFocusableEl.focus();
                e.preventDefault();
              }
            }
          }
        });
      }
    }]);

    return SuperSimpleModal;
  }();

  return SuperSimpleModal;

}));
