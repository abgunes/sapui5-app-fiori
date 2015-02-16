jQuery.sap.declare("sap.usrmgm.Component");

sap.ui.core.UIComponent.extend("sap.usrmgm.Component", {
  metadata: {
    name: "User Management Tool",
    version: "1.0",
    dependencies: {
      libs: ["sap.m", "sap.ui.layout"],
    },
    config: {
      serviceConfig: {
        name: "AG3",
        serviceUrl: "https://ldai1ag3.wdf.sap.corp:44355/sap/opu/odata/sap/ZWJ_USERS_ODATA_SRV/"
      }
    }
  },

  createContent: function() {
    var mConfig = this.getMetadata().getConfig();
    var sServiceUrl = mConfig.serviceConfig.serviceUrl;
    var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true);
    this.setModel(oModel);
    var oApp = new sap.m.SplitApp({
      id: "SplitApp"
    });
    var oMaster = sap.ui.view({
      id: "MasterView",
      viewName: "sap.usrmgm.view.Master",
      type: sap.ui.core.mvc.ViewType.XML
    });
    var oDetail = sap.ui.view({
      id: "DetailView",
      viewName: "sap.usrmgm.view.Detail",
      type: sap.ui.core.mvc.ViewType.XML
    });
    oApp.addMasterPage(oMaster);
    oApp.addDetailPage(oDetail);
    oApp.setInitialMaster("MasterView");
    oApp.setInitialDetail("DetailView");
    return oApp;
  }
});