/*
	JyOS - Source Code Sample
	Copyright (c) 2012 Frederic Torres. All rights reserved.
	 
	THE FILE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
	FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
	DEALINGS IN THE SOFTWARE.
*/
var smileGrinImageID = JyOS.Images.loadImage(JyOS.Resources.png.smile_grin);
JyOS.App.IconId      = smileGrinImageID;
JyOS.App.Name        = "Map Demo";
JyOS.App.Version     = "1.0";

var locations 				= { };
locations["Cupertino, CA"] 	= { 
	Latitude : 37.33233141, 
	Longitude: -122.031218 
};
locations["Redmond, WA"] 	= { 
	Latitude	: 47.640568390488625, 
	Longitude	: -122.1293731033802,
 	Annotations : [
				{ Latitude:47.640568390488625-0.001, Longitude:-122.12937-0.0015, Title:"Building 11", Subtitle:"Company" },
				{ Latitude:47.640568390488625-0.001, Longitude:-122.12937+0.001 , Title:"Building 9" , Subtitle:"Company" }
	]
}; 

 
var mainTableView = new JyOS.TableView("mainTableView", JyOS.App.Name);

mainTableView.load = function () {
	var
		i = 0;
 
	this.addSection("Locations");
	this.addData({ Type: STRING, Id:'CurrentLocation', Values: "Current Location" });
	
	for(k in locations) {
	
		this.addData({ Type: STRING, Id:k, Values:k });
	}
 
	this.CurrentLocation.click = function () {
	
		JyOS.Location.start();
	}
	this.click = function(control) {
		var 
			location, locationId = control.Id;
 
		if(locationId in locations){
	 
			location = locations[locationId];
			JyOS.Map.open(location.Latitude, location.Longitude, locationId, JyOS.MapType.Standard, true, 15, location.Annotations);
		}
	}
}
JyOS.Location.onNotification = function(loc) {
	var 
		m = "La:{0} Lo:{1}".format(loc.Latitude.toFixed(2), loc.Longitude.toFixed(2));
 
	print(m);
	JyOS.Location.stop();
	JyOS.Map.open(loc.Latitude, loc.Longitude, "Current Location", JyOS.MapType.Standard, true, 15);
}
function main(){

    JyOS.open(mainTableView);
}