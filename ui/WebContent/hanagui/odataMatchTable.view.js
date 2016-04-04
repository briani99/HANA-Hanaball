sap.ui.jsview("hanagui.odataMatchTable", {

      getControllerName : function() {
         return "hanagui.odataMatchTable";
      },

      createContent : function(oController) {
    	  
    	  var url = "http://dewdftzld018u.pgdev.sap.corp:8000/I027737/HanaBall/services/MatchTable.xsodata/";
    	  var oModel = new sap.ui.model.odata.ODataModel(url);
    	  
    	  
    	  var oControl; 
    	  oTable = new sap.ui.table.Table("test",{tableId: "tableID", 
    	  visibleRowCount: 20}); 
    	  oTable.setTitle("All results"); 
    	  
    	  oControl = new sap.ui.commons.TextField().bindProperty("value","DATE"); 
    	  oTable.addColumn(new sap.ui.table.Column({label:new sap.ui.commons.Label({text:"Date"}), template: oControl, sortProperty: "DATE", filterProperty: "DATE", width: "125px" }));  

    	  oControl = new sap.ui.commons.TextField().bindProperty("value","HOMETEAM"); 
    	  oTable.addColumn(new sap.ui.table.Column({label:new sap.ui.commons.Label({text:"Home Team"}), template: oControl, sortProperty: "HOMETEAM", filterProperty: "HOMETEAM", width: "125px" }));  
      	  
    	  oControl = new sap.ui.commons.TextField().bindProperty("value","FTHG"); 
    	  oTable.addColumn(new sap.ui.table.Column({label:new sap.ui.commons.Label({text:"Home Goals"}), template: oControl, width: "125px" })); 

    	  oControl = new sap.ui.commons.TextField().bindProperty("value","FTAG"); 
    	  oTable.addColumn(new sap.ui.table.Column({label:new sap.ui.commons.Label({text:"Away Goals"}), template: oControl, width: "125px" })); 

    	  oControl = new sap.ui.commons.TextField().bindProperty("value","AWAYTEAM"); 
    	  oTable.addColumn(new sap.ui.table.Column({label:new sap.ui.commons.Label({text:"Away Team"}), template: oControl, sortProperty: "AWAYTEAM", filterProperty: "AWAYTEAM", width: "125px" }));
   	  
    	  oTable.setModel(oModel); 

    	  //Create Sorter and Bind to the Entity 
    	  //To-Do: Place Code Here  
    	  var sort = new sap.ui.model.Sorter("HOMETEAM");
    	  oTable.bindRows("/MatchTable",sort);

    	  var iNumberOfRows = oTable.getBinding("rows").iLength; 
    	  oTable.setTitle("Number of Matches" + " (" + iNumberOfRows + ")" ); 

    	  return oTable;
      	  
      }
});
