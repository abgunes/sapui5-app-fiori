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
    var oView = this.getView();
    var oProperty = this.getView().getBindingContext().getProperty();
    var oModel = this.getView().getModel();
    var mUserData = {};

    mUserData.Firstname = oView.byId("idFirstnameInput").getValue();
    mUserData.Lastname = oView.byId("idLastnameInput").getValue();
    mUserData.Age = parseInt(oView.byId("idAgeInput").getValue()); //TODO: better way to do it?
    mUserData.Address = oView.byId("idAddressInput").getValue();

    oModel.update("/ZWJ_USERSSet('" + oProperty["Email"] + "')", mUserData, null, function(){
      oModel.refresh();
      alert("Update successful");

      console.log("/ZWJ_USERSSet('" + oProperty["Email"] + "')");
      console.log(mUserData);
      console.log(oProperty["Email"]);

    }, function() {
      alert("Update failed");
    });


  }
});