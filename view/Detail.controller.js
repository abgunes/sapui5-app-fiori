sap.ui.core.mvc.Controller.extend("sap.usrmgm.view.Detail", {
	onInit: function() {
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
		if (!oView.getModel().getData(sEntityPath)) {
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
			currentView: this.getView(),
			targetViewName: "sap.usrmgm.view.NotFound",
			targetViewType: "XML"
		});
	},

	onUpdate: function() {
		var oView = this.getView();
		var oProperty = this.getView().getBindingContext().getProperty();
		var oModel = this.getView().getModel();
		var mUserData = {};

		mUserData.Uuid = oProperty.Uuid;
		mUserData.Email = oView.byId("idEmail").getValue();
		mUserData.Firtname = oView.byId("idFirtname").getValue();
		mUserData.Lastname = oView.byId("idLastname").getValue();
		mUserData.Age = parseInt(oView.byId("idAge").getValue());
		mUserData.Phone = parseInt(oView.byId("idPhone").getValue());

// 		oModel.update("/sap/opu/odata/sap/YWJ_USERS_SRV/YWJ_USERSSet('" + oProperty.Uuid + "')", mUserData, null, function() {
// 			oModel.refresh();
// 			alert("Update successful");
// 		}, function() {
// 			alert("Update failed");
// 		});

		var requestObj = {
			requestUri: "/sap/opu/odata/sap/YWJ_USERS_SRV/YWJ_USERSSet('" + oProperty.Uuid + "')",
			method: 'PUT',
			headers: {
				"X-Requested-With": "XMLHttpRequest",
				"Content-Type": "application/json",
				"DataServiceVersion": "2.0",
				"MaxDataServiceVersion": "2.0",
				"Accept": "application/json",
				"X-CSRF-Token": ''
			},
			data: mUserData
		};

		OData.request({
			requestUri: "/sap/opu/odata/sap/YWJ_USERS_SRV",
			method: "GET",
			headers: {
				"X-Requested-With": "XMLHttpRequest",
				"X-CSRF-Token": "Fetch"
			}
		}, function(data, response) {
			requestObj.headers['X-CSRF-Token'] = response.headers['x-csrf-token'];

			OData.request(requestObj, function() {
				sap.m.MessageToast.show('PUT Operation Succeessfully!');
			}, function() {
			    sap.m.MessageToast.show("PUT Operation Failed");
			});
		});
	},

	onDelete: function() {
		var oView = this.getView();
		var oProperty = oView.getBindingContext().getProperty();
		var oModel = this.getView().getModel();

		oModel.remove("/YWJ_USERSSet('" + oProperty["Uuid"] + "')", null, function() {
			alert("Delete successful");
			oModel.refresh();
		}, function() {
			alert("Delete failed");
		});
	},

	onCall: function() {
		var oData = this.getView().getBindingContext().getProperty();
		sap.m.URLHelper.triggerTel(oData.Phone);
	},

	onText: function() {
		var oData = this.getView().getBindingContext().getProperty();
		sap.m.URLHelper.triggerSms(oData.Phone);
	},

	onEmail: function() {
		var oData = this.getView().getBindingContext().getProperty();
		sap.m.URLHelper.triggerEmail(oData.Email);
	},

});