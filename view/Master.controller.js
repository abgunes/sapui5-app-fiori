sap.ui.core.mvc.Controller.extend("sap.usrmgm.view.Master", {
  onInit: function() {
    this.oUpdateFinishedDeferred = jQuery.Deferred();
        this.getView().byId("list").attachEventOnce("updateFinished", function() {
      this.oUpdateFinishedDeferred.resolve();
    }, this);

    sap.ui.core.UIComponent.getRouterFor(this).attachRoutePatternMatched(this.onRouteMatched, this);
  },

  onRouteMatched: function(oEvent) {
    var oList = this.getView().byId("list");
    var sName = oEvent.getParameter("name");
    var oArguments = oEvent.getParameter("arguments");

    // wait for the list to be loaded
    jQuery.when(this.oUpdateFinishedDeferred).then(jQuery.proxy(function() {
      var aItems;
      if (sName === "main") {
        // on the empty hash select the first item
        this.selectDetail();
      }

      if (sName === "entity") {
        aItems = oList.getItems();
        for (var i = 0; i < aItems.length; i++) {
          if (aItems[i].getBindingContext().getPath() === "/" + oArguments.entity) {
            oList.setSelectedItem(aItems[i], true);
            break;
          }
        }
      }
    }, this));
  },

  selectDetail: function() {
    if (!sap.ui.Device.system.phone) {
      var oList = this.getView().byId("list");
      var aItems = oList.getItems();
      if (aItems.length && !oList.getSelectedItem()) {
        oList.setSelectedItem(aItems[0], true);
        this.showDetail(aItems[0]);
      }
    } 
  },

  onSelect: function(oEvent) {
    this.showDetail(oEvent.getParameter("listItem") || oEvent.getSource());
  },

  showDetail: function(oItem) {
    // If we're on a phone, include nav in history; if not, don't.
    var bReplace = jQuery.device.is.phone ? false : true;
    sap.ui.core.UIComponent.getRouterFor(this).navTo("entity", {
      from: "master",
      entity: oItem.getBindingContext().getPath().substr(1)
      // tab: 
    }, bReplace);
  }
});