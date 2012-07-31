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
JyOS.App.Name = "Hello World App 0";

var mainTableView = new JyOS.TableView("mainTableView", "Hello World");

mainTableView.load = function () {

	this.addSection("JyOS - JavaScript For iOS");
    this.addData({ Type: STRING, Id: 'HelloWorldControl', Value: 'Hello World' });

    this.click = function (control) {

        alert("Hi " + control.Id);
    }
}

function main() {

    JyOS.open(mainTableView);
}
