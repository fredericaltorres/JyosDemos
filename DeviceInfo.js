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
JyOS.App.Name        = "Device Info";
JyOS.App.Version     = "1.0";

var mainTableView = new JyOS.TableView("mainTableView", "Device Info");

mainTableView.load = function () {
	var
		i = 0;
		
	JyOS.Location.start();
		
	this.addSection("Device");
	this.addData({ Type: STRING_VALUE1, Id: 'id'+(++i), Values: ['Name', JyOS.Device.Name]   , Accessory: JyOS.Accessory.None });
	this.addData({ Type: STRING_VALUE1, Id: 'id'+(++i), Values: ['Model', JyOS.Device.Model] , Accessory: JyOS.Accessory.None });
														
	this.addSection("Location");						
	this.addData({ Type: STRING_VALUE1, Id: 'Location', Values: ['Location','?'] , Accessory: JyOS.Accessory.None });
	 								  				  
	this.addSection("OS");			  				  
	this.addData({ Type: STRING_VALUE1, Id: 'id'+(++i), Values: ['Name', JyOS.Device.OS] , Accessory: JyOS.Accessory.None });
	this.addData({ Type: STRING_VALUE1, Id: 'id'+(++i), Values: ['Version', JyOS.Device.OSVersion] , Accessory: JyOS.Accessory.None });
													
	this.addSection("JyOS");							
	this.addData({ Type: STRING_VALUE1, Id: 'id'+(++i), Values: ['Version', JyOS.Version] , Accessory: JyOS.Accessory.None });
	this.addData({ Type: STRING_VALUE1, Id: 'id'+(++i), Values: ['TimeZoneOffset', JyOS.Device.TimeZoneOffset] , Accessory: JyOS.Accessory.None });
	this.addData({ Type: JyOS.Device.ifIPad(STRING_VALUE1, STRING_VALUE2), Id: 'id'+(++i), Values: ['Time', (new Date()).toString()] , Accessory: JyOS.Accessory.None });
 
}

JyOS.Location.onNotification = function(loc) {
	var 
		m = "La:{0} Lo:{1}".format(loc.Latitude.toFixed(2), loc.Longitude.toFixed(2));
		
	mainTableView.setValues('Location', ['Location', m]);
	print(m);
	JyOS.Location.stop();
}

function main(){

    JyOS.open(mainTableView);
}