var sets = {
// CARTO DB //**********************************\*\*\***********************************
"CartoDB_Positron" : function() {
m(), a = "© OpenStreetMap © CartoDB";
source = function(d) {
return "https://cartodb-basemaps-b.global.ssl.fastly.net/light_all/"+d.z+"/"+d.x+"/"+d.y+".png";
}
},
"CartoDB_PositronNoLabels" : function() {
m(), a = "© OpenStreetMap © CartoDB";
source = function(d) {
return "https://cartodb-basemaps-b.global.ssl.fastly.net/light_nolabels/"+d.z+"/"+d.x+"/"+d.y+".png";
}
},
"CartoDB_PositronOnlyLabels" : function() {
m(), a = "© OpenStreetMap © CartoDB";
source = function(d) {
return "https://cartodb-basemaps-b.global.ssl.fastly.net/light_only_labels/"+d.z+"/"+d.x+"/"+d.y+".png";
}
},
"CartoDB_DarkMatter" : function() {
m(), a = "© OpenStreetMap © CartoDB";
source = function(d) {
return "https://cartodb-basemaps-b.global.ssl.fastly.net/dark_all/"+d.z+"/"+d.x+"/"+d.y+".png";
}
},
"CartoDB_DarkMatterNoLabels" : function() {
m(), a = "© OpenStreetMap © CartoDB";
source = function(d) {
return "https://cartodb-basemaps-b.global.ssl.fastly.net/dark_nolabels/"+d.z+"/"+d.x+"/"+d.y+".png";
}
},
"CartoDB_DarkMatterOnlyLabels" : function() {
m(), a = "© OpenStreetMap © CartoDB";
source = function(d) {
return "https://cartodb-basemaps-b.global.ssl.fastly.net/dark_only_labels/"+d.z+"/"+d.x+"/"+d.y+".png";
}
},
"CartoDB_Voyager" : function() {
m(), a = "© OpenStreetMap © CartoDB";
source = function(d) {
return "https://cartodb-basemaps-b.global.ssl.fastly.net/rastertiles/voyager/"+d.z+"/"+d.x+"/"+d.y+".png";
}
},
// ESRI //**********************************\*\*\***********************************
"ESRI_WorldTerrain" : function() {
m(), a = "Tiles © Esri - Source: USGS, Esri, TANA, DeLorme, and NPS"
source = function(d) {
return "https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/"+d.z+"/"+d.y+"/"+d.x+".png";
}
},
"ESRI_WorldShadedRelief" : function() {
m(), a = "Tiles © Esri - Source: Esri";
source = function(d) {
return "https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/"+d.z+"/"+d.y+"/"+d.x+".png";
}
},
"ESRI_WorldPhysical" : function() {
m(), a = "Tiles © Esri - Source: US National Park Service";
source = function(d) {
return "https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/"+d.z+"/"+d.y+"/"+d.x+".png";
}
},
"ESRI_WorldStreetMap" : function() {
m(), a = "Tiles © Esri - Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom";
source = function(d) {
return "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/"+d.z+"/"+d.y+"/"+d.x+".png";
}
},
"ESRI_WorldTopoMap": function() {
m(), a = "Tiles © Esri - Source: Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community";
source = function(d) {
return "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/"+d.z+"/"+d.y+"/"+d.x+".png";
}
},
"ESRI_WorldImagery": function() {
m(), a = "Tiles © Esri - Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community";
source = function(d) {
return "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/"+d.z+"/"+d.y+"/"+d.x+".png";
}
},
"ESRI_OceanBasemap": function() {
m(), a = "Tiles © Esri - Source: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri";
source = function(d) {
return "https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/"+d.z+"/"+d.y+"/"+d.x+".png";
}
},
"ESRI_NGWorld" : function() {
m(), a = "Tiles © Esri - Source: National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC";
source = function(d) {
return "https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/"+d.z+"/"+d.y+"/"+d.x+".png";
}
},
"ESRI_Gray": function() {
m(), a = "Tiles © Esri - Source: Esri, DeLorme, NAVTEQ";
source = function(d) {
return "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/"+d.z+"/"+d.y+"/"+d.x+".png";
}
},
// Open Street Map // **********************************\***********************************
"OSM_Topo" : function() {
m(), a = "Tiles © OpenStreetMap contributors";
source = function(d) {
return "https://tile.opentopomap.org/"+d.z+"/"+d.x+"/"+d.y+".png";
}
},
"OSM" : function() {
m(), a = "Tiles © OpenStreetMap contributors";
source = function(d) {
return "https://tile.opentopomap.org/"+d.z+"/"+d.x+"/"+d.y+".png";
}
},
// STAMEN // ************************************\*\*************************************
"Stamen_Toner" : function() {
m(), a = "Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under ODbL."
source = function(d) {
return "https://stamen-tiles.a.ssl.fastly.net/toner/" + d.z + "/" + d.x + "/" + d.y + ".png";
}
},
"Stamen_TonerBackground": function() {
m(), a = "Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under ODbL."
source = function(d) {
return "https://stamen-tiles.a.ssl.fastly.net/toner-background/" + d.z + "/" + d.x + "/" + d.y + ".png";
}
},
"Stamen_TonerLines": function() {
m(), a = "Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under ODbL."
source = function(d) {
return "https://stamen-tiles.a.ssl.fastly.net/toner-lines/" + d.z + "/" + d.x + "/" + d.y + ".png";
}
},
"Stamen_TonerLite": function() {
m(), a = "Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under ODbL."
source = function(d) {
return "https://stamen-tiles.a.ssl.fastly.net/toner-lite/" + d.z + "/" + d.x + "/" + d.y + ".png";
}
},
"Stamen_Terrain" : function() {
m(), a = "Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under ODbL."
source = function(d) {
return "https://stamen-tiles.a.ssl.fastly.net/terrain/" + d.z + "/" + d.x + "/" + d.y + ".png";
}
},
"Stamen_TerrainBackground" : function() {
m(), a = "Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under ODbL."
source = function(d) {
return "https://stamen-tiles.a.ssl.fastly.net/terrain-background/" + d.z + "/" + d.x + "/" + d.y + ".png";
}
},
"Stamen_TerrainLines": function() {
m(), a = "Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under ODbL."
source = function(d) {
return "https://stamen-tiles.a.ssl.fastly.net/terrain-lines/" + d.z + "/" + d.x + "/" + d.y + ".png";
}
},
"Stamen_Watercolor": function() {
m(); a = "Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under CC BY SA."
source = function(d) {
return "https://stamen-tiles.a.ssl.fastly.net/watercolor/" + d.z + "/" + d.x + "/" + d.y + ".png";
}
},
// Arctic Connect
"ArcticConnect_180": function() {
a0(180); a = "Map © ArcticConnect. Data © OpenStreetMap contributors",
source = function(d) {
return "http://a.tiles.arcticconnect.ca/osm_3571/"+d.z+"/"+d.x+"/"+d.y+".png";
}
},
"ArcticConnect_150w": function() {
a0(150); a = "Map © ArcticConnect. Data © OpenStreetMap contributors",
source = function(d) {
return "http://a.tiles.arcticconnect.ca/osm_3572/"+d.z+"/"+d.x+"/"+d.y+".png";
}
},
"ArcticConnect_100w": function() {
a0(100); a = "Map © ArcticConnect. Data © OpenStreetMap contributors",
source = function(d) {
return "http://a.tiles.arcticconnect.ca/osm_3573/"+d.z+"/"+d.x+"/"+d.y+".png";
}
},
"ArcticConnect_40w": function() {
a0(40); a = "Map © ArcticConnect. Data © OpenStreetMap contributors",
source = function(d) {
return "http://a.tiles.arcticconnect.ca/osm_3574/"+d.z+"/"+d.x+"/"+d.y+".png";
}
},
"ArcticConnect_10e": function() {
a0(-10); a = "Map © ArcticConnect. Data © OpenStreetMap contributors",
source = function(d) {
return "http://a.tiles.arcticconnect.ca/osm_3575/"+d.z+"/"+d.x+"/"+d.y+".png";
}
},
"ArcticConnect_90e": function() {
a0(-90); a = "Map © ArcticConnect. Data © OpenStreetMap contributors",
source = function(d) {
return "http://a.tiles.arcticconnect.ca/osm_3576/"+d.z+"/"+d.x+"/"+d.y+".png";
}
}
