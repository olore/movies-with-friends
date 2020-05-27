// from https://github.com/mejiamanuel57/vue-google-signin-button-directive
import Vue from "vue";

export default Vue.directive("google-signin-button", {
  bind: function (el, binding, vnode) {
    CheckComponentMethods();
    let clientId = binding.value;
    let googleSignInAPI = document.createElement("script");
    googleSignInAPI.setAttribute(
      "src",
      "https://apis.google.com/js/api:client.js"
    );
    document.head.appendChild(googleSignInAPI);

    googleSignInAPI.onload = InitGoogleButton;

    function InitGoogleButton() {
      gapi.load("signin2:auth2", () => {
        const googleAuth = gapi.auth2.init({
          client_id: clientId,
          cookiepolicy: "single_host_origin",
        });
        googleAuth.then(
          (sth) => {
            vnode.context.OnGoogleAuthInit(sth);
          },
          (err) => {
            vnode.context.OnGoogleAuthInitError(err);
          }
        );

        googleAuth.attachClickHandler(el, {}, OnSuccess, Onfail);
        gapi.signin2.render("my-signin2", {
          scope: "profile",
          width: 240,
          height: 50,
          longtitle: false,
          theme: "dark",
          onsuccess: OnSuccess,
          onfailure: Onfail,
        });
      });
    }
    function OnSuccess(googleUser) {
      vnode.context.OnGoogleAuthSuccess(googleUser);
    }

    function Onfail(error) {
      vnode.context.OnGoogleAuthFail(error);
    }

    function CheckComponentMethods() {
      if (!vnode.context.OnGoogleAuthSuccess) {
        throw new Error(
          "The method OnGoogleAuthSuccess must be defined on the component"
        );
      }

      if (!vnode.context.OnGoogleAuthFail) {
        throw new Error(
          "The method OnGoogleAuthFail must be defined on the component"
        );
      }
    }
  },
});
