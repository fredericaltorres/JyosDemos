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
JyOS.App.Name        = "Hello World App 1";
JyOS.App.Version     = "1.0";

var mainTableView = new JyOS.TableView("mainTableView", "Hello World");

mainTableView.load = function () {

	this.addSection("JyOS - JavaScript For iOS");
    this.addData({ Type: STRING, Id: 'HelloWorldControl', Value: 'Hello World', Image: smileGrinImageID });

    this.HelloWorldControl.click = function () {

        alert("Hi!");
    }
}

function main(){

    JyOS.open(mainTableView);
}