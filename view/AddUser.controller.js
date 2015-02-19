sap.ui.core.mvc.Controller.extend("sap.usrmgm.view.AddUser", {
  onInit: function() {
    this.getView().setModel(new sap.ui.model.json.JSONModel(), "newUser");
  },

  onCancel: function() {
    alert("onCancel");
  },

  onSave: function() {
    var mData = this.getView().getModel("newUser").getData();
    var mNewUser = {
      "Email": mData.Email,
      "Firstname": mData.Firstname,
      "Lastname": mData.Lastname,
      "Age": parseInt(mData.Age), //TODO: better way to do it?
      "Address": mData.Address
    };
    // send odata create request
    oModel = this.getView().getModel();
    oModel.create("/ZWJ_USERSSet", mNewUser, {
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