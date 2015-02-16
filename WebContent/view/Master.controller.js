sap.ui.core.mvc.Controller.extend("sap.usrmgm.view.Master", {
  onSelect: function(oEvent) {
    sap.ui.getCore().byId("DetailView").setBindingContext(oEvent.getParameter("listItem").getBindingContext());
    sap.ui.getCore().byId("SplitApp").toDetail("DetailView");
  }
});