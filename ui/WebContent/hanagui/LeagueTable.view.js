sap.ui.jsview("hanagui.LeagueTable", {

      getControllerName : function() {
         return "hanagui.LeagueTable";
      },

      createContent : function(oController) {
    	  
    	  var layout = new sap.ui.commons.layout.MatrixLayout('layout');  
          layout.setWidth('80%');  
    	  
      var url = "http://dewdftzld018u.pgdev.sap.corp:8000/I027737/HanaBall/services/LeagueTable.xsjs";
	  var jsonModel = new sap.ui.model.json.JSONModel(url);
	  
	  var oControl; 
	  oTable = new sap.ui.table.Table("League",{tableId: "LeagueID", visibleRowCount: 20}); 
	  oTable.setTitle("League Table"); 
	  
	  oControl = new sap.ui.commons.TextField().bindProperty("value","HOMETEAM"); 
	  oTable.addColumn(new sap.ui.table.Column({label:new sap.ui.commons.Label({text:"Team"}), template: oControl, sortProperty: "HOMETEAM", filterProperty: "HOMETEAM", width: "125px" }));  
  	  
	  oControl = new sap.ui.commons.TextField().bindProperty("value","FTHG"); 
	  oTable.addColumn(new sap.ui.table.Column({label:new sap.ui.commons.Label({text:"Home Goals"}), template: oControl, width: "125px" })); 

	  oControl = new sap.ui.commons.TextField().bindProperty("value","FTAG"); 
	  oTable.addColumn(new sap.ui.table.Column({label:new sap.ui.commons.Label({text:"Away Goals"}), template: oControl, width: "125px" })); 

	  oControl = new sap.ui.commons.TextField().bindProperty("value","GOALDIFF"); 
	  oTable.addColumn(new sap.ui.table.Column({label:new sap.ui.commons.Label({text:"Goal Difference"}), template: oControl, sortProperty: "GOALDIFF", filterProperty: "GOALDIFF", width: "125px" }));

	  
	  oControl = new sap.ui.commons.TextField().bindProperty("value","POINTS"); 
	  oTable.addColumn(new sap.ui.table.Column({label:new sap.ui.commons.Label({text:"Points"}), template: oControl, sortProperty: "POINTS", filterProperty: "POINTS", width: "125px" }));
	  
	  oTable.setModel(jsonModel); 

	  
//	  //Create Sorter and Bind to the Entity 
//	  //To-Do: Place Code Here  

	  var sort = new sap.ui.model.Sorter("POINTS", true);
	  oTable.bindRows("/entries",sort);
	  layout.createRow(oTable);
	  //Lets create a chart
	  sap.ui.getCore().setModel(jsonModel);  
	  
	  var chartData = new sap.viz.ui5.data.FlattenedDataset({
          dimensions : [ 
                         {
                    axis : 1,
                    name : 'Team',
                    value : "{HOMETEAM}"
          }
          ],
          measures : [ {
                    name : 'Points',
                    value : '{POINTS}'
          } ,{
              name : 'Goal Difference',
              value : '{GOALDIFF}'
    },{
        name : 'Goals For',
        value : '{FTHG}'
},{
    name : 'Goals Against',
    value : '{FTAG}'
}
          
          ],
          data : {
                    path : "/entries",
                    factory : function() {
                    }
          }
});
	  var oBarChart = new sap.viz.ui5.Bar({
          width : "80%",
          height : "400px",
          plotArea : {
          
          },
          title : {
                    visible : true,
                    text : 'League Table Graph'
          },
          dataset : chartData
});



oBarChart.setModel(jsonModel);

layout.createRow(oBarChart);
	  //return oTable;
		return layout;
      }
});
