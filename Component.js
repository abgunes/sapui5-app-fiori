jQuery.sap.declare("sap.usrmgm.Component");

sap.ui.core.UIComponent.extend("sap.usrmgm.Component", {
  metadata: {
    name: "User Management Tool",
    version: "1.0",
    dependencies: {
      libs: ["sap.m", "sap.ui.layout"],
    },
    rootView: "sap.usrmgm.view.App",
    config: {
      resourceBundle: "i18n/messageBundle.properties",
      serviceConfig: {
        name: "AG3",
        serviceUrl: "https://ldai1ag3.wdf.sap.corp:44355/sap/opu/odata/sap/ZWJ_USERS_ODATA_SRV/"
      }
    },
    routing: {
      // to be implemented
    },
  },

  init: function() {
    sap.ui.core.UIComponent.prototype.init.apply(this, arguments);

    var mConfig = this.getMetadata().getConfig();
    var rootPath = jQuery.sap.getModulePath("sap.usrmgm");

    var i18nModel = new sap.ui.model.resource.ResourceModel({
      bundleUrl: [rootPath, mConfig.resourceBundle].join('/')
    });

    var sServiceUrl = mConfig.serviceConfig.serviceUrl;
    var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true);
    this.setModel(oModel);

    var deviceModel = new sap.ui.model.json.JSONModel({
            isTouch : sap.ui.Device.support.touch,
            isNoTouch : !sap.ui.Device.support.touch,
            isPhone : sap.ui.Device.system.phone,
            isNoPhone : !sap.ui.Device.system.phone,
            listMode : sap.ui.Device.system.phone ? "None" : "SingleSelectMaster",
            listItemType : sap.ui.Device.system.phone ? "Active" : "Inactive"
    });
    deviceModel.setDefaultBindingMode("OneWay");
    this.setModel(deviceModel, "device");

    this.getRouter().initialize();
  }
});