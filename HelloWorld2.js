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
JyOS.App.Name        = "Hello World App 2";
JyOS.App.Version     = "1.0";

JyOS.trace("STARTING {0} - v {1}".format(JyOS.App.Name, JyOS.App.Version));

var smileGrinImageID = JyOS.Images.loadImage(JyOS.Resources.png.smile_grin);
JyOS.App.IconId      = smileGrinImageID;
 
var mainTableView = new JyOS.TableView("mainTableView", "Hello World");
  
mainTableView.load = function () {

	this.addSection("JyOS - JavaScript For iOS");
    this.addData({	Type: STRING,            Id: 'HelloWorldControl1', Value : 'Hello World'                               , /*accessory: JyOS.Accessory.None*/ });
    this.addData({	Type: STRING,            Id: 'HelloWorldControl2', Value : 'Hello World',      Image: smileGrinImageID , /*accessory: JyOS.Accessory.None*/ });
    this.addData({	Type: STRING_VALUE1,     Id: 'HelloWorldControl3', Values: ['Hello', 'World'], Image: smileGrinImageID , /*accessory: JyOS.Accessory.None*/ });
   	this.addData({	Type: STRING_VALUE2,     Id: 'HelloWorldControl4', Values: ['Hello', 'World'], Image: smileGrinImageID , /*accessory: JyOS.Accessory.None*/ });
  	this.addData({	Type: STRING_SUBTITLE,   Id: 'HelloWorldControl5', Values: ['Hello', 'World'], Image: smileGrinImageID , /*accessory: JyOS.Accessory.None*/ });

    this.click = function (v) {

        alert("Hi! " + v.Id);
    }
}

function main() {

    JyOS.open(mainTableView);
}