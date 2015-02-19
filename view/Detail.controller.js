sap.ui.core.mvc.Controller.extend("sap.usrmgm.view.Detail", {
  onInit : function() {
    var oView = this.getView();

    sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(function(oEvent) {
      // when detail navigation occurs, update the binding context
      if (oEvent.getParameter("name") === "entity") {
        var sEntityPath = "/" + oEvent.getParameter("arguments").entity;
        oView.bindElement(sEntityPath);
      }
    }, this);
  },

  onUpdate: function() {
    var oSimpleForm = sap.ui.getCore().byId("idDetailUserForm");
    alert(oSimpleForm);
  }
});