sap.ui.core.mvc.Controller.extend("sap.usrmgm.view.AddUser", {
  onInit: function() {
    this.getView().setModel(new sap.ui.model.json.JSONModel(), "newUser");
  },

  onCancel: function() {
    sap.ui.core.UIComponent.getRouterFor(this).backWithoutHash(this.getView());
  },

  onSave: function() {
    var mData = this.getView().getModel("newUser").getData();
    var mNewUser = {
      "Uuid": mData.Uuid,
      "Email": mData.Email,
      "Firtname": mData.Firtname,
      "Lastname": mData.Lastname,
      "Age": parseInt(mData.Age),
      "Phone": parseInt(mData.Phone)
    };
    // send odata create request
    oModel = this.getView().getModel();
    oModel.create("/YWJ_USERSSet", mNewUser, {
      success: jQuery.proxy(function(mResponse) {
        jQuery.sap.require("sap.m.MessageToast");
        sap.m.MessageToast.show("Hello " + mNewUser.Email)
      }, this),
      error: jQuery.proxy(function() {
        alert("Problem creating new user");
      }, this)
    });
  }
});