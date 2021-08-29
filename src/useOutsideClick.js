import { useEffect, useRef, useCallback } from "react";
/**
 *  useOutsideClick hook
 * Checks if a click happened outside a Ref. Handy for dropdowns, modals and popups etc.
 *
 * @param ref Ref whose outside click needs to be listened to
 * @param handler Callback to fire on outside click
 * @param when A boolean which which activates the hook only when it is true. Useful for conditionally enable the outside click
 */
function useOutsideClick(ref, handler, when) {
  if (when === void 0) {
    when = true;
  }
  var savedHandler = useRef(handler);
  var memoizedCallback = useCallback(function (event) {
    if (
      (ref === null || ref === void 0 ? void 0 : ref.current) &&
      !ref.current.contains(event.target)
    ) {
      savedHandler.current(event);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var memoizedOnBlurCallback = useCallback(function (event) {
    // will only detect the first click
    // Note: on firefox clicking on iframe triggers blur, but only on
    // next event loop it becomes document.activeElement
    // https://stackoverflow.com/q/2381336#comment61192398_23231136
    setTimeout(function () {
      var _a;
      if (
        ((_a = document.activeElement) === null || _a === void 0
          ? void 0
          : _a.tagName) === "IFRAME"
      ) {
        savedHandler.current(event);
      }
    }, 0);
  }, []);
  useEffect(
    function () {
      if (when) {
        document.addEventListener("click", memoizedCallback, true);
        document.addEventListener("ontouchstart", memoizedCallback, true);
        window.addEventListener("blur", memoizedOnBlurCallback);
        return function () {
          document.removeEventListener("click", memoizedCallback, true);
          document.removeEventListener("ontouchstart", memoizedCallback, true);
          window.removeEventListener("blur", memoizedOnBlurCallback);
        };
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ref, handler, when]
  );
}
export { useOutsideClick };
