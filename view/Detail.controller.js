sap.ui.core.mvc.Controller.extend("sap.usrmgm.view.Detail", {
  onInit : function() {
    sap.ui.core.UIComponent.getRouterFor(this).attachRouteMatched(this.onRouteMatched, this);
  },

  onRouteMatched: function(oEvent) {
    var oParameters = oEvent.getParameters();

    // when detail navigation occurs, update the binding context
    if (oParameters.name !== "detail") {
      return;
    }

    var sEntityPath = "/" + oParameters.arguments.entity;
    this.bindView(sEntityPath);
  },

  bindView: function(sEntityPath) {
    var oView = this.getView();
    oView.bindElement(sEntityPath);

    // check if the data already on the client
    if(!oView.getModel().getData(sEntityPath)) {
      // check that the entity specified actually was found
      oView.getElementBinding().attachEventOnce("dataReceived", jQuery.proxy(function() {
        var oData = oView.getModel().getData(sEntityPath);
        if (!oData) {
          this.showEmptyView();
        } else {
          // 
        }
      }, this));
    }
  },

  showEmptyView: function() {
    sap.ui.core.UIComponent.getRouterFor(this).myNavToWithoutHash({ 
      currentView : this.getView(),
      targetViewName : "sap.usrmgm.view.NotFound",
      targetViewType : "XML"
    });    
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
      // oModel.refresh();
      alert("Update successful");

      console.log("/ZWJ_USERSSet('" + oProperty["Email"] + "')");
      console.log(mUserData);
      console.log(oProperty["Email"]);

    }, function() {
      alert("Update failed");
    });
  },

  onDelete: function() {
    var oView = this.getView();
    var oProperty = oView.getBindingContext().getProperty();
    var oModel = this.getView().getModel();

    oModel.remove("/ZWJ_USERSSet('" + oProperty["Email"] + "')", null, function(){
      alert("Delete successful");
      oModel.refresh();
    }, function() {
      alert("Delete failed");
    });
  }

});