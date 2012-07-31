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

JyOS.App.Name        = "Default Icons";
JyOS.App.Version     = "1.0";
  
  
var smileGrinImageID = JyOS.Images.loadImage(JyOS.Resources.png.smile_grin);
JyOS.App.IconId      = smileGrinImageID;
 
var mainTableView = new JyOS.TableView("mainTableView", "Default Icons");
  
mainTableView.load = function () {

	this.addSection("JyOS - Default Icons");

    var 
        i = 0, k, imageId;

    for(k in JyOS.Resources.png) {

        imageId = JyOS.Images.loadImage(JyOS.Resources.png[k]);
        this.addData({Type: STRING, Id:'c'+(++i), Values: k, Image: imageId });
    }
    this.click = function (v) {
 
    	alert("Hi " + v.Id);
    }
}

function main() {

    JyOS.open(mainTableView);
}