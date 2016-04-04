function createJSONEntry(rs) {
      return {
            "HOMETEAM" : rs.getString(1),
            "FTHG" : rs.getInteger(2),
            "FTAG" : rs.getInteger(3),
            "GOALDIFF" : rs.getInteger(4),
            "POINTS" : rs.getInteger(5),
      };

}


	var sql = 'SELECT \"HOMETEAM", SUM(\"FTHG\") AS \"FTHG_SUM\", ' + 
				'SUM(\"FTAG\") AS \"FTAG_SUM\", SUM(\"GOALDIFF\") AS \"GOALDIFF_SUM\", ' +
				'SUM(\"POINTS\") AS \"POINTS_SUM\" FROM (SELECT \"MATCHID\", \"HOMETEAM\", ' +
				'\"DATE\", \"AWAYTEAM\", sum(\"FTHG\") AS \"FTHG\", sum(\"FTAG\") AS \"FTAG\", ' + 
				'sum(\"GOALDIFF\") AS \"GOALDIFF\", sum(\"POINTS\") AS \"POINTS\" FROM ' + 
				'\"_SYS_BIC\".\"I027737.HanaBall.model/CV_MATCHTABLE\" GROUP BY \"MATCHID\", ' + 
				'\"HOMETEAM\", \"DATE\", \"AWAYTEAM\") TMP GROUP BY \"HOMETEAM\"';
	var conn = $.db.getConnection();  
	var pstmt = conn.prepareStatement(sql);
    var rs = pstmt.executeQuery();  


    var list = [];
    while (rs.next()) {
        list.push(createJSONEntry(rs));
    }
    var body = JSON.stringify({"entries" : list});
 
    //JSON body
    $.response.contentType = "text/json";   
    $.response.setBody(body);  
      
    // cleanup  
    rs.close();  
    pstmt.close();  
    conn.close();  